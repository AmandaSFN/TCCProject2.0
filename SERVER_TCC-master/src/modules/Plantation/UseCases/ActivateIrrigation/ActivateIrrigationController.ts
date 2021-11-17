import { ActivateIrrigationUseCase } from "./ActivateIrrigationUseCase";
import { GetPlantationUseCase } from "./GetPlantationUseCase";






class ActivateIrrigationController {

    constructor(){

    }


    async handle(req: Request, res: Response){

        const {porcentagem} = req.body

        const activateIrrigationUseCase = new ActivateIrrigationUseCase();

        try {

            const plantation = await activateIrrigationUseCase.execute(porcentagem)

            return res.status(200).json(plantation);
            
        } catch (error) {
            return res.status(500).json({message: error.message});


            
        }
    }


}


export {ActivateIrrigationController}