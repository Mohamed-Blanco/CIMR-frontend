import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../../../models/collaborateur';
import { ActivatedRoute } from '@angular/router';
import { authentificationservice } from '../../../services/authentification.service';
import { DepartementService } from '../../../services/departement.service';
import { departement } from '../../../models/departement';
import { HttpErrorResponse } from '@angular/common/http';
import { Trimestre } from '../../../models/trimestre';
import { TrimestreService } from '../../../services/trimestre.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrl: './departements.component.css'
})
export class DepartementsComponent implements OnInit {


  ngOnInit(): void {
    this.Me();
    this.getCurrentTrimestreInfo();

    this.getTrimestres();
  }


  OnAjouter(form: NgForm) {
    if (form.valid) {
      let depReq = new departement();
      depReq.titre = form.value.titre;
      depReq.description = form.value.description;

      console.log(form);
      console.log("Request ! " + form.value.description)
      this.departementservice.adddepartement(depReq).subscribe((response: departement) => { console.log(response); }, (error: HttpErrorResponse) => alert(error))
    }
  }

  TrimestreId !: number | undefined;
  ajouter: boolean = false;

  public getCurrentTrimestreInfo(): void {
    this.trimestreService.CurrentTrimestre().subscribe(
      (response: Trimestre) => {
        this.TrimestreId = response.id;
        console.log("Current Trimestre Id : " + response.id);
        this.getAlldepartement(this.TrimestreId)

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }




  me !: Collaborateur;
  Me() {
    this.authentificationservice.me().subscribe((response) => this.me = response, (error) => alert(error));
  }

  constructor(private trimestreService: TrimestreService, private departementservice: DepartementService, private authentificationservice: authentificationservice, private route: ActivatedRoute) {
  }

  departements !: any;



  getAlldepartement(id: number | undefined) {
    this.departementservice.getdepartementsByID(id).subscribe((response) => { this.departements = response; console.log(this.departements) }, (error) => alert(error));


  }

  AllTrimestres: Trimestre[] = [];
  searchTerm: string = '';
  filteredItems: Trimestre[] = [...this.AllTrimestres];


  public getTrimestres(): void {
    this.trimestreService.Alltrimestres().subscribe(
      (response: Trimestre[]) => {
        this.AllTrimestres = response;
        console.log("Trimestres ", this.AllTrimestres)
        this.filteredItems = [...this.AllTrimestres];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    console.log(searchTerm)
    this.filteredItems = this.AllTrimestres.filter((item) =>
      item.nomtrimestre?.toLowerCase().includes(searchTerm) ?? false
    );
  }


  Isopen: boolean = true;

  dropdownbutton(): void {
    this.Isopen = !this.Isopen;

    if (this.Isopen) {
      setTimeout(() => {
        document.getElementById('dropdown-menu')?.classList.remove('opacity-0');
        document.getElementById('dropdown-menu')?.classList.add('opacity-100');
      }, 2);
      return;
    }

    if (!this.Isopen) {
      setTimeout(() => {
        document
          .getElementById('dropdown-menu')
          ?.classList.remove('opacity-100');
        document.getElementById('dropdown-menu')?.classList.add('opacity-0');
      }, 2);
      return;
    }
  }

}
