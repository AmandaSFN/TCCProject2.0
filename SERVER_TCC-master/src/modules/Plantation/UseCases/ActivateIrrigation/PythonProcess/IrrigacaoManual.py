import Automacao
import sys
from datetime import datetime
import sqlite3
import uuid

automacao = Automacao.Automacao

automacao.AcionarRele(1, float(sys.argv[1]))
porcentagemAtual = automacao.MedirUmidadeDoSoloEmPorcentagem()
data_hora = datetime.now()
# print('e2a06b96-5c1b-486c-8e1e-f500d537c0d6',
#       'M', data_hora, float(sys.argv[1]))

con = sqlite3.connect('plantation')
cur = con.cursor()
cur.execute("INSERT INTO PlantingSituation VALUES (?,'e2a06b96-5c1b-486c-8e1e-f500d537c0d6','M',?,?)",
            (str(uuid.uuid4()), data_hora, porcentagemAtual,))
con.commit()
con.close()
