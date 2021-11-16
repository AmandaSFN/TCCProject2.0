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

        const situation = await repository.AlterTypeOfIrrigation(id,typeOfIrrigation)
    
        return situation;
        
    } catch (error) {

        throw new Error(error.message);
        
    }

    }

}


export {ToggleTypeIrrigationUseCase}