class Automacao():

    @staticmethod
    def ObterSinalAnalogico():
        import board
        import busio
        import adafruit_ads1x15.ads1115 as ADS
        from adafruit_ads1x15.analog_in import AnalogIn
        i2c = busio.I2C(board.SCL, board.SDA)
        ads = ADS.ADS1115(i2c)
        chan = AnalogIn(ads, ADS.P0)
        return(chan.value)

    @staticmethod
    def MedirUmidadeDoSolo():

        valor_max_sensor = 26000
        valor_min_sensor = 11000
        percentual = 0
        sinal = Automacao.ObterSinalAnalogico()

        diferenca_valor_max_min = valor_max_sensor - \
            valor_min_sensor  # 17000
        mediaValorMinMax = diferenca_valor_max_min/2

        ptMedio = (valor_max_sensor +
                   valor_min_sensor)/2  # 17500

        if(sinal <= ptMedio):

            if(sinal < valor_min_sensor):
                sinal = valor_min_sensor

            difPtMedio_sinal = ptMedio-sinal
            valor_equivalente_analog = mediaValorMinMax - difPtMedio_sinal
            percentual = 100-((valor_equivalente_analog *
                              100) / diferenca_valor_max_min)

        elif(sinal >= ptMedio):
            if(sinal > valor_max_sensor):
                sinal = valor_max_sensor

            difSinalAnalogico_ValorMax = valor_max_sensor-sinal
            valor_equivalente_analog = diferenca_valor_max_min - \
                difSinalAnalogico_ValorMax
            percentual = 100-((valor_equivalente_analog *
                              100) / diferenca_valor_max_min)

        return round(percentual/100, 2)

    def AcionarRele(binario, sleep):
        import RPi.GPIO as GPIO
        import time
        # Configuracao das GPIOs (BCM)]
        GPIO.setwarnings(False)
        pino_rele_1 = 21
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(pino_rele_1, GPIO.OUT)
        GPIO.output(pino_rele_1, binario)

        if(binario == 1):
            time.sleep(sleep)
            GPIO.output(pino_rele_1, 0)
