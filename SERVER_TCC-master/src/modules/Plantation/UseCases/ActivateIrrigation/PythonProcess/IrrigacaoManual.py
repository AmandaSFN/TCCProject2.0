import Automacao
import sys
from datetime import datetime
import sqlite3
import uuid
import os
import FileFunctions

automacao = Automacao.Automacao
file = FileFunctions.FileFunctions

pidfile = "/tmp/mypython3IA.pid"
file.Processo(pidfile)
try:
    automacao.AcionarRele(1, float(sys.argv[1]))
    porcentagemAtual = automacao.MedirUmidadeDoSoloEmPorcentagem()
    data_hora = datetime.now()

    con = sqlite3.connect('plantation')
    cur = con.cursor()
    cur.execute("INSERT INTO PlantingSituation VALUES (?,'e2a06b96-5c1b-486c-8e1e-f500d537c0d6','M',?,?)",
                (str(uuid.uuid4()), data_hora, porcentagemAtual,))
    con.commit()
    con.close()
finally:
    os.unlink(pidfile)
