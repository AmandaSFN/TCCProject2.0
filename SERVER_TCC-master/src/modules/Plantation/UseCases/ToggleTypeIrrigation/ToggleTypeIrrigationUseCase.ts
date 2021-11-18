import { PlantationRepository } from "../../Repository/PlantationRepository";

interface RegisterSituationDTO{
    id :String, 
    typeOfIrrigation :String, 
}


class ToggleTypeIrrigationUseCase {

    constructor(){}

   async execute({id,  typeOfIrrigation} : RegisterSituationDTO){

    try {
        const repository = new PlantationRepository();
        //ATIVAR A IA
        if(typeOfIrrigation === "IA"){
        return new Promise(async(resolve, reject) =>{

            exec(`python3 ./src/modules/Plantation/UseCases/ActivateIrrigation/PythonProcess/Main.py`,async (error, stdout, stderr) => {
   
               if(error) {
                   console.log(error.message)
                   reject(error.message)
               }
       
               if(stdout){
                    const situation = await repository.AlterTypeOfIrrigation(id,typeOfIrrigation)

                    const datas = stdout.replace('\r\n','').split(' ')
                    const  situations = await  repository.RegisterSituation(datas[0],datas[1],new Date(datas[2]),datas[3] )
                    resolve(situations)
       
               }
       
               if(stderr){
                   console.log(stderr);
                   reject(reject)
               }
       })
       
       }) }

    //PARAR A IA
       else {

        return new Promise(async(resolve, reject) =>{

            exec(`killall -e python3`,async (error, stdout, stderr) => {
   
               if(error) {
                   
                   reject("Job não fizalizado")
               }
       
               if(stdout){
                    
                resolve("Job fizalizado")
       
               }
       
               if(stderr){
                   console.log(stderr);
                   reject(reject)
               }
       })
       
       }) 

       }


        return situation;
        
    } catch (error) {

        throw new Error(error.message);
        
    }

    }

}


export {ToggleTypeIrrigationUseCase}