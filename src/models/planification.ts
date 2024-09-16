import { Trimestre } from "./trimestre";

export class Planification {
  id!: number;
  titreplanification!: string | null;
  trimestre !: Trimestre[];
  dateplanification !: Date | null;

  constructor() {

  }
}
