import {Request, Response}  from 'express';
import {ToggleTypeIrrigationUseCase } from './ToggleTypeIrrigationUseCase';



class ToggleTypeIrrigationController{


    constructor(){}

   async handle(req:Request, res:Response) : Promise<Response>{

    const {typeOfIrrigation} = req.body;
    const {id} = req.headers

    try {

        const toggleTypeIrrigationUseCase = new ToggleTypeIrrigationUseCase();

        const situation = await toggleTypeIrrigationUseCase.execute({id, typeOfIrrigation} );

        return res.send(situation).status(200)
        
    } catch (error) {

        throw new Error(error.message);
        
    }

    }

}


export {ToggleTypeIrrigationController}