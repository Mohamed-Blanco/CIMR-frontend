import { Competence } from "./competence";

export class Collaborateur {

  constructor() { }

  id!: number;
  competence!: Competence;
  charge_disponible!: String;
  email!: String;
  password!: String;
  image_url!: String;
  nom!: String;
  prenom!: String;
  about!: String;
  createdAt!: Date;
  enabled !: boolean;
  role !: String;
  droitdecongee !: number;
}
