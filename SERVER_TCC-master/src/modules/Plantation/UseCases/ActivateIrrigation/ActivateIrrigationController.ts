import { ActivateIrrigationUseCase } from "./ActivateIrrigationUseCase";
import { GetPlantationUseCase } from "./GetPlantationUseCase";






class ActivateIrrigationController {

    constructor(){

    }


    async handle(req: Request, res: Response){

        const {id} = req.headers

        const activateIrrigationUseCase = new ActivateIrrigationUseCase();

        try {

            const plantation = await activateIrrigationUseCase.execute(id)

            return res.status(200).json(plantation);
            
        } catch (error) {
            return res.status(500).json({message: error.message});


            
        }
    }


}


export {ActivateIrrigationController}