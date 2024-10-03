import { Competence } from "./competence";
import { Projet } from "./projet";

export class Collaborateur {

  constructor() { }

  id!: number;
  competence!: Competence;
  charge_disponible!: String;
  email!: String;
  password!: String;
  imageurl!: String;
  nom!: String;
  prenom!: String;
  about!: String;
  createdAt!: Date;
  enabled !: boolean;
  role !: String;
  droitdecongee !: number;
  collabprojet !: Projet[];
}
