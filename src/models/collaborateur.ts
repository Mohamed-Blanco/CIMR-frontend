import { Competence } from "./competence";

export class Collaborateur {

  constructor() { }

  id!: number;
  compentence!: Competence;
  charge_disponible!: String;
  email!: String;
  password!: String;
  image_url!: String;
  nom!: String;
  prenom!: String;
  about!: String;
  creele!: Date;
  enabled !: boolean;
  role !: String;
}
