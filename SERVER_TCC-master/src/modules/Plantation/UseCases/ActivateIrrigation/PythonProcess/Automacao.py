class Automacao():

    @staticmethod
    def ObterSinalAnalogico(porta_analogica):
        #Bibliotecas ultilizadas
        import board
        import busio
        import adafruit_ads1x15.ads1115 as ADS
        from adafruit_ads1x15.analog_in import AnalogIn

        chan = 0

        #Cria uma interface que acessa o barramento I2C
        i2c = busio.I2C(board.SCL, board.SDA)

        #Cria um objeto ADS para o conversor ADS1115  
        ads = ADS.ADS1115(i2c)

        #Obtem o sinal analogico do sensor de umidade
        if(porta_analogica == 0):
            chan = AnalogIn(ads, ADS.P0)
        elif(porta_analogica == 1):
            chan = AnalogIn(ads, ADS.P1)
        
        return(chan.value)

    @staticmethod
    def MedirUmidadeDoSoloEmPorcentagem():

        valor_max_sensor = 23000 #valor maximo do sinal analogico
        valor_min_sensor = 11000 #valor minimo do sinal analogico
        percentual = 0

        #Obtem o Sinal Analogico
        sinal = Automacao.ObterSinalAnalogico()

        #Pega a diferença entre o valor max e min do sinal
        diferenca_valor_max_min = valor_max_sensor - valor_min_sensor
        
        #Pega o valor que representa a metade da diferença 
        #entre o valor max e min do sinal
        mediaValorMinMax = diferenca_valor_max_min/2

        #Encontra o ponto medio em relacao ao valor max e min do sinal
        ptMedio = (valor_max_sensor + valor_min_sensor)/2

        #Esse bloco de IF serve para o sinal menor que o ponto Medio
        if(sinal <= ptMedio):

            # Caso o valor do sinal analogico seja 
            # menor do que valor min usado como base na calibracao
            # igualamos o valor do sinal ao valor min do sensor
            if(sinal < valor_min_sensor):
                sinal = valor_min_sensor

            #Pega a diferença do ponto medio para o sinal
            difPtMedio_sinal = ptMedio-sinal

            #Pega a diferença entre a metade da diferença e ponto medio
            valor_equivalente_analog = mediaValorMinMax - difPtMedio_sinal

        #Esse bloco de IF serve para o sinal maior que o ponto Medio
        elif(sinal >= ptMedio):

            # Caso o valor do sinal analogico seja 
            #maior do que valor max usado como base na calibracao
            # igualamos o valor do sinal ao valor max do sensor
            if(sinal > valor_max_sensor):
                sinal = valor_max_sensor
            
            #Pega a diferença do valor max do sensor para o sinal 
            difSinalAnalogico_ValorMax = valor_max_sensor-sinal

            #Pega a diferença entre o valor max para o min
            #subtrai a diferença do valor max do sensor para o sinal 
            valor_equivalente_analog = diferenca_valor_max_min - difSinalAnalogico_ValorMax
            

        #Faz uma regra de três para pegar a porcentagem
        #Como o valor menor indica Alta Umidade e o valor maior indica Baixa Umidade 
        #Subtraimos de 100 a porcentagem identificada na regra de três
        #valor do sinal equivalente = 100%
        #diferença entre valor max e min = x
        percentual = 100-((valor_equivalente_analog * 100) / diferenca_valor_max_min)

        return round(percentual/100, 2)

    # def AcionarRelePorTempo(sleep):
    #     import RPi.GPIO as GPIO
    #     import time
    #     # Configuracao das GPIOs (BCM)]
    #     GPIO.setwarnings(False)
    #     pino_rele_1 = 21
    #     GPIO.setmode(GPIO.BCM)
    #     GPIO.setup(pino_rele_1, GPIO.OUT)
    #     GPIO.output(pino_rele_1, binario)

    #     if(binario == 1):
    #         time.sleep(sleep)
    #         GPIO.output(pino_rele_1, 0)

    
     def AcionarRele(acionar,porcentagem):
        if(predictedValue == 1):
            import RPi.GPIO as GPIO
            import time
            # Configuracao das GPIOs (BCM)]
            GPIO.setwarnings(False)
            pino_rele_1 = 21
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(pino_rele_1, GPIO.OUT)
            #Liga o Rele
            GPIO.output(pino_rele_1, 1)

            umidade = MedirUmidadeDoSoloEmPorcentagem()
        
            while(umidade <= porcentagem):
                umidade = MedirUmidadeDoSoloEmPorcentagem()
        
            #Desliga o Rele
            GPIO.output(pino_rele_1, 0)
        


