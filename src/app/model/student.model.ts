import { Grupa } from "./grupa.model";
import { Projekat } from "./projekat.model";

export class Student {
    id!: number;
    ime!: string;
    prezime!: string;
    brojIndeksa!: string;
    grupa!: Grupa;
    projekat!: Projekat;
}