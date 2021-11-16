import { PlantationRepository } from "../../Repository/PlantationRepository";
import {exec} from 'child_process';
import {util} from 'util';






class GetPlantationUseCase{


    constructor(){}



    async execute(id : String) : Promise<Plantation>{
        //COLOCAR O CAMINHO COMPLEO

        const repository = new PlantationRepository();

        try {
            let plantation =  await repository.GetPlantation(id)
            let situations = await repository.GetSituation(id);

            let typeOfIrrigation;

            if (situations[0].PlantingSituation_typeOfIrrigation === 'M') typeOfIrrigation = 'Manual'
            else typeOfIrrigation = 'Inteligência Artificial'

            let PlantingSituation = {}
            Object.assign(PlantingSituation, {
                "namePlantation": plantation.namePlantation,
                "typeOfIrrigation": plantation.typeOfIrrigation,
                "PlantingSituation_typeOfIrrigation": typeOfIrrigation,
                "PlantingSituation_moisture": situations[0].PlantingSituation_moisture
                ,"PlantingSituation_IrrigationDate": situations[0].PlantingSituation_IrrigationDate
            })
            
         
            return {PlantingSituation}
        } catch (error) {
            
        }

    }
}


export{GetPlantationUseCase}