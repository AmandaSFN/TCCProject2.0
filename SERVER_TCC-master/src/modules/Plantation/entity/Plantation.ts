import { v4 as uuidv4 } from 'uuid';
import {Entity, PrimaryColumn, Column} from "typeorm";


@Entity('Plantations')
class Plantation {

    @PrimaryColumn()
    id : String ;

    @Column()
    namePlantation : String;

    @Column()
    typeOfIrrigation : String;

    constructor(namePlantation : String, typeOfIrrigation: String){

        this.namePlantation = namePlantation;
        this.typeOfIrrigation = typeOfIrrigation;

        if(!this.id) this.id = uuidv4()

    }





}



export {Plantation}