class FileFunctions:

    def SearchFile(fileName):
        import pandas as pd
        return pd.read_csv(fileName)

    def SaveArrayIntoCsvFIle(predictedData, csvFileName):
        import csv
        with open(csvFileName, 'a+', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(predictedData)

    def SaveNewArrayIntoCsvFile(data, csvFileName):
        import csv
        with open(csvFileName, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(data)

    def ConvertCSVToArray(csvFileName):
        import csv
        array = []
        with open(csvFileName) as csvfile:
            array = list(csv.reader(csvfile))
            return array

    def AddInputedDataWithItsResult(input, result):
        input.append(result)
        return input

    def Processo(pidfile):
        import os
        import sys
        pid = str(os.getpid())

        if os.path.isfile(pidfile):
            status = os.popen(
                'ps up `cat /tmp/mypython3IA.pid ` >/dev/null && echo "Running" || echo "Not running"').readline()
            if("Running" in status):
                sys.exit()
        open(pidfile, 'w').write(pid)
