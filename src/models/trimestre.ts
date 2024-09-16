import { Planification } from "./planification";
import { Projet } from "./projet";

export class Trimestre {


    id?: number;
    nomtrimestre!: string;
    coefficientmaintenence!: number;
    planification!: {
        id: number;
        titreplanification: string | null;
        trimestre: Trimestre[] | null;
        dateplanification: Date | null;
    } | null;
    integrationcoordination: any | null;
    as400disponible: any | null;
    nticdisponible: any | null;
    as400aconsomer: any | null;
    windevaconsomer: any | null;
    nticaconsomer: any | null;
    integrationcoordinationdisponible: any | null;
    analysedisponible: any | null;
    analyseaconsomer: any | null;
    windevdisponible: any | null;
    projetList !: Projet[];
}