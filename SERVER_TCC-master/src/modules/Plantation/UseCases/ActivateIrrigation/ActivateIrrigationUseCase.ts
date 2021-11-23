import { PlantationRepository } from "../../Repository/PlantationRepository";
import {exec} from 'child_process';
import { ToggleTypeIrrigationUseCase } from "../ToggleTypeIrrigation/ToggleTypeIrrigationUseCase";




class ActivateIrrigationUseCase {


    constructor(){}


    async execute(porcentagem : string) : Promise<Void>{
        //COLOCAR O CAMINHO COMPLEO
       const repository = new PlantationRepository();
       
       //porcentagem = porcentagem /100

       ToggleTypeIrrigationUseCase.killProcess()

        return new Promise(async(resolve, reject) =>{

             exec(`python3 ./src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/IrrigacaoManual.py ${porcentagem}`,async (error, stdout, stderr) => {
    
                if(error) {
                    console.log(error.message)
                    reject(error.message)
                }
        
                if(stdout){
                   const datas = stdout.replace('\r\n','').split(' ')
                  const  situations = await  repository.RegisterSituation(datas[0],datas[1],new Date(datas[2]),datas[3] )
                  resolve(situations)
        
                }
        
                if(stderr){
                    console.log(stderr);
                    reject(reject)
                }
        })
        
        const id = 'e2a06b96-5c1b-486c-8e1e-f500d537c0d6'
        ToggleTypeIrrigationUseCase.AtivarAutomacao(id,'IA')

        }) 
    
        
    }
     

    }



export{ActivateIrrigationUseCase}