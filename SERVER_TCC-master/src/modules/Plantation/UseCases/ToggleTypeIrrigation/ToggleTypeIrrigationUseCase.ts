import { PlantationRepository } from "../../Repository/PlantationRepository";
import {exec} from 'child_process';

interface RegisterSituationDTO{
    id :String, 
    typeOfIrrigation :String, 
}


class ToggleTypeIrrigationUseCase {

    constructor(){}

   async execute({id,  typeOfIrrigation} : RegisterSituationDTO){

    try {
        
        //ATIVAR A IA
        console.log(typeOfIrrigation)
        if(typeOfIrrigation === "IA"){
            
            ToggleTypeIrrigationUseCase.AtivarAutomacao(id,typeOfIrrigation)
            
        //     const repository = new PlantationRepository();
        //     exec(`python3 ./src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/Main.py`,async (error, stdout, stderr) => {
                    
        //         if(error) {
        //             console.log(error.message)
        //         }
        
        //         if(stdout){
        //              const situation = await repository.AlterTypeOfIrrigation(id,typeOfIrrigation)
                     
        //              const datas = stdout.replace('\r\n','').split(' ')
        //              const  situations = await  repository.RegisterSituation(datas[0],datas[1],new Date(datas[2]),datas[3] )
                     
        
        //         }
        
        //         if(stderr){
        //             console.log(stderr); 
        //         }
        // })
        }

    //PARAR A IA
       else {

        ToggleTypeIrrigationUseCase.killProcess();

    //         exec(`killall -e python3`,async (error, stdout, stderr) => {
   
    //            if(error) {
                   
    //            }
       
    //            if(stdout){
       
    //            }
       
    //            if(stderr){
    //                console.log('A schedule finalizado.');
                  
    //            }
    //    })

       }
        
    } 
    catch (error)
    {

        throw new Error(error.message);
    }
     
    }

    static async killProcess(){

        exec(`killall -e python3`,async (error, stdout, stderr) => {
   
            if(error) {
                
            }
    
            if(stdout){
    
            }
    
            if(stderr){
                console.log('A schedule finalizado.');
               
            }
    })

    }

    static async AtivarAutomacao(id:String, typeOfIrrigation: String){
        const repository = new PlantationRepository();
        exec(`python3 ./src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/Main.py`,async (error, stdout, stderr) => {
                    
            if(error) {
                console.log(error.message)
            }
    
            if(stdout){
                 const situation = await repository.AlterTypeOfIrrigation(id,typeOfIrrigation)
                 
                 const datas = stdout.replace('\r\n','').split(' ')
                 const  situations = await  repository.RegisterSituation(datas[0],datas[1],new Date(datas[2]),datas[3] )
                 
    
            }
    
            if(stderr){
                console.log(stderr); 
            }
    })

    }

}


export {ToggleTypeIrrigationUseCase}