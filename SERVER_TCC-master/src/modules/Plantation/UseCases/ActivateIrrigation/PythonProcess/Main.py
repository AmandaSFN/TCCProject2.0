import Knn_Algoritm
import FileFunctions
import APIRequests
import DataProcessing
import Automacao
import MongoDBClass
import schedule
from datetime import datetime
import sqlite3
import uuid
import os
import sys

knn = Knn_Algoritm.Knn_Algoritm
file = FileFunctions.FileFunctions
api = APIRequests.APIRequests
dataP = DataProcessing.DataProcessing
automacao = Automacao.Automacao
mongoDbClass = MongoDBClass.MongoDBClass

currentUmidity = 0.0


def Job():

    # Exporta dados da collection IA do Mongo DB para CSV
    mongoDbClass.ImportIADatabase()

    # Obtem Arquivo de Treinamento para IA
    dbToTrain = file.SearchFile('Export_IA_Traning.csv')

    # Treina a IA
    trainedAI = knn.TrainAI(dbToTrain)

    # Obtem dados de Meteorologia da API
    currentForecast = api.CurrentForeacast('https://api.hgbrasil.com/weather')

    # Mede a Umidade do solo
    currentUmidity = automacao.MedirUmidadeDoSoloEmPorcentagem()

    # Formata Input de Dados para criar Predicao
    dataP.FormatData(currentForecast, currentUmidity)

    # Cria o arquivo CSV com os dados para Predicao
    dataP.SaveCurrentData(
        file, './src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/Export_IA_Traning.csv')

    # Obtem dados para Predicao
    dataToPredict = file.SearchFile(
        './src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/Export_IA_Traning.csv')

    # Prediz a resposta com base no dado informado e na IA treinada
    predictedValue = knn.PredictData(dataToPredict, trainedAI)

    # Adiciona o Valor retornado da IA nos dados de Predicao
    finalData = dataP.SaveProcessedData(file, predictedValue)

    # Cria um documento apartir do finalData
    newDocument = mongoDbClass.ReturnDocument(finalData)

    # Insere o documento no MongoDB
    mongoDbClass.InsertMongoDBCollection_IA_DATABASE_TRAINING(newDocument)

    # Aciona o Rele que realiza a irrigacao
    automacao.AcionarRele(predictedValue, 0.10)

    data_hora = datetime.now()

    if(predictedValue == 1):
        con = sqlite3.connect('plantation')
        cur = con.cursor()
        cur.execute(
            "INSERT INTO PlantingSituation VALUES (?,'e2a06b96-5c1b-486c-8e1e-f500d537c0d6','IA',?,?)", (str(uuid.uuid4()), data_hora, currentUmidity,))
        con.commit()
        con.close()


pidfile = "/tmp/mypython3IA.pid"
file.Processo(pidfile)
try:
    schedule.every(60).seconds.do(Job)
    while(True):
        schedule.run_pending()
finally:
    os.unlink(pidfile)
