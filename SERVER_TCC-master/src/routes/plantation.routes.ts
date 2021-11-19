import {Router} from 'express'
import { ActivateIrrigationController } from '../modules/Plantation/UseCases/ActivateIrrigation/ActivateIrrigationController';
import { CreatePlantationController } from '../modules/Plantation/UseCases/CreatePlantation/CreatePlantationController';
import { GetPlantationController } from '../modules/Plantation/UseCases/GetPlantation/GetPlantationController';
import { GetSituationController } from '../modules/Plantation/UseCases/GetSituation/GetSituationController';
import { RegisterSituationController } from '../modules/Plantation/UseCases/RegisterSituation/RegisterSituationController';
import { ToggleTypeIrrigationController } from '../modules/Plantation/UseCases/ToggleTypeIrrigation/ToggleTypeIrrigationController';

const plantationRoute = Router();



plantationRoute.post('/plantation/create-platation', (req,res)=>{
    const controller = new CreatePlantationController();
    controller.handle(req, res);
})

plantationRoute.post('/platation/register-situation',  (req,res)=>{
    const controller = new RegisterSituationController();
    controller.handle(req, res);
})


plantationRoute.post('/platation/get-plantation',  (req,res)=>{
    const controller = new GetPlantationController();
    controller.handle(req, res);
})


plantationRoute.post('/platation/toggle-typeIrrigation',  (req,res)=>{
    const controller = new ToggleTypeIrrigationController(); 
    controller.handle(req, res);
})


plantationRoute.post('/platation/activate-irrigation',  (req,res)=>{

    const controller = new ActivateIrrigationController();
    controller.handle(req, res);

})


export {plantationRoute}