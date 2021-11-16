import { PlantationRepository } from "../../Repository/PlantationRepository";
import {exec} from 'child_process';




class ActivateIrrigationUseCase{


    constructor(){}


    async execute() : Promise<Void>{
        //COLOCAR O CAMINHO COMPLEO
        return new Promise((resolve, reject) =>{

            exec('python3 ./src/modules/IA/UseCase/PythonProcess/IrrigacaoManual.py', (error, stdout, stderr) => {
    
                if(error) {
                    reject(error.message)
                    
                }
        
                if(stdout){
                    resolve(stdout);
        
                }
        
                if(stderr){
                    reject(stderr);
                }
        })
        
        })
    
    }
     

    }



export{ActivateIrrigationUseCase}