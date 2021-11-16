import './Database'
import express from 'express';
import ways from './routes';
import cors from 'cors';

const server = express();
server.use(express.json())
server.use(cors())
server.use(ways)



server.listen(3213, ()=> console.log('SERVER ON'))