import {exec} from 'child_process';





async function iaTraining(): Promise<String> {

    return new Promise((resolve, reject) =>{

        exec('python3 ./src/modules/IA/UseCase/PythonProcess/Main.py', (error, stdout, stderr) => {

            if(error) {
                reject(error.message)
                
            }
    
            if(stdout){
                resolve(stdout);
    
            }
    
            if(stderr){
                reject(stderr);
            }
    })
    })
}


export {iaTraining}