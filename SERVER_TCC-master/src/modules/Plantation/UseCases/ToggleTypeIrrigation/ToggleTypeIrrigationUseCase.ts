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
    
        
        const repository = new PlantationRepository();
        const situation = await repository.AlterTypeOfIrrigation(id,typeOfIrrigation)

        if(typeOfIrrigation === "IA"){

            ToggleTypeIrrigationUseCase.AtivarAutomacao(id,typeOfIrrigation)
            
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


        await ToggleTypeIrrigationUseCase.killProcess();
        await this.PararRele();

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

       await  exec(`killall -e python3`,async (error, stdout, stderr) => {
   
            if(error) {
                
            }
    
            if(stdout){
                console.log(stdout)
    
            }
    
            if(stderr){
                console.log(stderr)
               
            }
    })

    }

    async PararRele(){

        await  exec(`python3 ./src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/PararRele.py`,async (error, stdout, stderr) => {
   
            if(error) {
                
            }
    
            if(stdout){
                console.log(stdout)
    
            }
    
            if(stderr){
                console.log(stderr)
               
            }
    })
    }

    static async AtivarAutomacao(id:String, typeOfIrrigation: String){
        const repository = new PlantationRepository();
       await  exec(`python3 ./src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/Main.py`,async (error, stdout, stderr) => {
                    
            if(error) {
                console.log(error.message)
            }
    
            if(stdout){
                 
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