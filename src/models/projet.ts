import { Action } from "./action";
import { Collaborateur } from "./collaborateur";
import { departement } from "./departement";
import { Planification } from "./planification";
import { Trimestre } from "./trimestre";

export class Projet {

    id!: number | null;
    creele!: Date;
    departement!: departement | null;
    titre!: string | null;
    chargeNTIC!: number;
    chargeWINDEV!: number;
    chargeAS400!: number;
    deleted!: boolean;
    aretenir!: boolean;
    chiffrer!: boolean;
    chargeestimee !: number | null;
    integrationcoordination!: number | null;
    datelimie!: Date;
    datedebut!: Date;
    remarque!: string | null;
    devWINDEV!: number | null;
    controlequalite!: number | null;
    infra!: number | null;
    analyse!: number | null;
    devAS400!: number | null;
    devNTIC!: number | null;
    collaborateur !: Collaborateur[] | null;
    etatdavancement  !: string | null;
    trimestre !: Trimestre;
    retenir  !: boolean;
    action !: Action[];
    constructor() { }
}