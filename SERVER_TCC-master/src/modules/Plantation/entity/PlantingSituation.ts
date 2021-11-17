import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Plantation } from "./Plantation";


@Entity('PlantingSituation')
class PlantingSituation{

    @PrimaryColumn()
    id : String;

    @Column()
    plantingId : String;

    @Column()
    typeOfIrrigation : String;

    @Column()
    irrigationDate : Date;

    @Column()
    moisture  : Number;


    constructor( plantingId : String, typeOfIrrigation : String, irrigationDate  : Date, moisture : Integer){

        if(!this.id) this.id = uuid();
        this.plantingId = plantingId;
        this.typeOfIrrigation = typeOfIrrigation;
        this.irrigationDate = irrigationDate;
        this.moisture = moisture;        

    }







}

export {PlantingSituation}