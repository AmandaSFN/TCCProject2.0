import { Plantation } from "../../entity/Plantation";
import { PlantationRepository } from "../../Repository/PlantationRepository";





class CreatePlantationUseCase{

    constructor(){}



  async   execute(namePlantation : String, typeOfIrrigation: String) : Promise<Plantation>{

        const repository  = new PlantationRepository();

        try {
            const plantation : Plantation =  repository.CreatePlantation(namePlantation,typeOfIrrigation)

            return plantation;
            
        } catch (error) {
            
            throw new Error(error.message);
        }


    }
}


export {CreatePlantationUseCase}