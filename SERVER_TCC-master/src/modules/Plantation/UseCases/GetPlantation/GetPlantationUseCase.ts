import { PlantationRepository } from "../../Repository/PlantationRepository";
import {exec} from 'child_process';
import {util} from 'util';
import { GetHumidityUseCase } from "../GetHumidity/GetHumidityUseCase";






class GetPlantationUseCase{


    constructor(){}



    async execute(id : String) : Promise<Plantation>{

        
       

        const repository = new PlantationRepository();
        const getHumidityUseCase = new GetHumidityUseCase();

        try {

            
            let humidity = await getHumidityUseCase.execute();
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
                "typeOfIrrigation": plantation.typeOfIrrigation,
                "PlantingSituation_typeOfIrrigation": typeOfIrrigation,
                "PlantingSituation_moisture":humidity,
                "PlantingSituation_IrrigationDate": new Date(situations.irrigationDate).toLocaleString()
            })
            console.log(plantingSituation)

            return {plantingSituation}
        } catch (error) {
            console.log(error);
            
        }

        //COLOCAR O CAMINHO COMPLEO
       

           
       



        

    }
}


export{GetPlantationUseCase}