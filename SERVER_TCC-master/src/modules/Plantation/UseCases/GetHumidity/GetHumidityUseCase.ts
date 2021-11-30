import { PlantationRepository } from "../../Repository/PlantationRepository";
import {exec} from 'child_process';
import {util} from 'util';






class GetHumidityUseCase{


    constructor(){}



    async execute() : Promise<Plantation>{

        const repository = new PlantationRepository();

        try {

            
            return new Promise(async (resolve, reject) =>{

                return exec(`python3 ./src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/ObterUmidadeDoSolo.py`,async (error, stdout, stderr) => {
    
                    if(error) {
                        
                    }
            
                    if(stdout){
    
                        stdout =  stdout.replace('\r\n','')
    
                        resolve(
                            stdout
                        )
            
                    }
            
                    if(stderr){
                        reject(stderr);
                    
                    }
                })

            })

           

        } catch (error) {
            console.log(error);
            
        }

        //COLOCAR O CAMINHO COMPLEO
       

           
       



        

    }
}


export{GetHumidityUseCase}