import { GetHumidityUseCase } from "./GetHumidityUseCase";






class GetHumidityController {

    constructor(){

    }


    async handle(req: Request, res: Response){


        const getHumidityUseCase = new GetHumidityUseCase();

        try {

            const plantation = await getHumidityUseCase.execute()
            console.log(plantation)

            return res.status(200).json(plantation);
            
        } catch (error) {
            return res.status(500).json({message: error.message});


            
        }
    }


}


export {GetHumidityController}