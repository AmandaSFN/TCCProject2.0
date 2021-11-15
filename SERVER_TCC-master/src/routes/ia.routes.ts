import {Router} from 'express'
import { iaTraining } from '../modules/IA/UseCase/IAtraining';
const iaRoutes = Router();




iaRoutes.get('/iaTraining', async (req, res) => {
  
   const t =  await iaTraining();

   console.log(t)

return res.status(200).send("IA TRINADA COM SUCESSO")

})

export {iaRoutes}