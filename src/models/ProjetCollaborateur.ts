import { Collaborateur } from "./collaborateur";
import { Projet } from "./projet";

export class ProjetCollaborateur {

    id !: number;
    collaborateur !: Collaborateur;
    projet !: Projet;
    integrationcoordination !: number;
    analyse !: number;
    devAS400 !: number;
    windev !: number;
    devNTIC  !: number;
    controleQualite !: number
}

