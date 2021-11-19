import { PlantationRepository } from "../../Repository/PlantationRepository";
import {exec} from 'child_process';
import {util} from 'util';






class GetPlantationUseCase{


    constructor(){}



    async execute(id : String) : Promise<Plantation>{

        
       

        const repository = new PlantationRepository();

        try {

            
            
            let plantation =  await repository.GetPlantation(id)
            let situations = await repository.GetSituation(id);
            let typeOfIrrigation;

            if(situations.typeOfIrrigation == 'M'){
                typeOfIrrigation = 'Manual'
            }
            else{
                typeOfIrrigation = 'Automatizado' 
            }

         
            const plantingSituation = {}
            Object.assign(plantingSituation, {
                "namePlantation": plantation.namePlantation,
                "typeOfIrrigation": typeOfIrrigation,
                "PlantingSituation_typeOfIrrigation": typeOfIrrigation,
                "PlantingSituation_moisture": (situations.moisture*100).toFixed(0),
                "PlantingSituation_IrrigationDate": new Date(situations.irrigationDate).toLocaleString()
            })

            return {plantingSituation}
        } catch (error) {
            console.log(error);
            
        }

        //COLOCAR O CAMINHO COMPLEO
       

           
       



        

    }
}


export{GetPlantationUseCase}