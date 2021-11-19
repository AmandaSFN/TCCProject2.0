import { Plantation } from "../entity/Plantation";

import {getRepository, Repository} from "typeorm";
import { PlantingSituation } from "../entity/PlantingSituation";




class PlantationRepository{

    
    private repository: Repository<Plantation>

    constructor(){

        this.repository = getRepository(Plantation)

    }



    async CreatePlantation(NamePlantation : String, typeOfIrrigation : String) : Promise<Plantation>{

        const plantation = new Plantation(NamePlantation, typeOfIrrigation)

        await this.repository.createQueryBuilder()
        .insert()
        .into(Plantation)
        .values([plantation])
        .execute();

        

        return plantation;

        
    }

    async RegisterSituation(plantingId, typeOfIrrigation, irrigationDate,moisture) : Promise<PlantingSituation>{

        const plantingSituation = new PlantingSituation(plantingId, typeOfIrrigation, irrigationDate,moisture)

        await this.repository.createQueryBuilder()
        .insert()
        .into(PlantingSituation)
        .values([plantingSituation])
        .execute();

        

        return plantingSituation;

        
    }

    async AlterTypeOfIrrigation(id:String, typeOfIrrigation: String) : Promise<Bool>{

        const repository = getRepository(PlantingSituation)
        const situations = await repository
        .createQueryBuilder()
        .update(Plantation)
        .set({ 
            "typeOfIrrigation" : typeOfIrrigation
        })
        .where("id = :id", { id: id })
        .execute();
        
        console.log(id)
        
        return true;

    }


    async GetSituation(id:String): Promise<UNKNOWN>{

        const repository = getRepository(PlantingSituation)

        const situations = await repository
        .createQueryBuilder()
        .orderBy('PlantingSituation.irrigationDate','DESC')
        .getOne()
        


        return situations;
    }



    async GetPlantation(id:String): Promise<UNKNOWN>{

       

        const plantation = await this.repository
        .createQueryBuilder()
        .where("id = :id",{id:id})
        .getOne();


        return plantation;

    }
}


export {PlantationRepository}