import { Projet } from "./projet";

export class Action {

    id!: number;
    nomaction !: string;
    competence !: string;
    projet !: Projet;
    dateaction!: Date;
    contenue !: string;
    etat !: string;
    charge !: number;
    datelimite !: Date;

    constructor() {

    }

}