import {Request, Response}  from 'express';
import { RegisterSituationUseCase } from './RegisterSituationUseCase';



class RegisterSituationController{


    constructor(){}

   async handle(req:Request, res:Response) : Promise<Response>{

    const {plantingId, typeOfIrrigation, irrigationDate,moisture} = req.body

    try {

        const registerSituationUseCase = new RegisterSituationUseCase();

        const situation = await registerSituationUseCase.execute({plantingId, typeOfIrrigation, irrigationDate,moisture} );

        return res.send(situation).status(200)
        
    } catch (error) {

        throw new Error(error.message);
        
    }

    }

}


export {RegisterSituationController}