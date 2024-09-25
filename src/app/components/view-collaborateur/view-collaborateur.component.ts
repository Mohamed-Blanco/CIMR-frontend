import { Component, inject, OnInit } from '@angular/core';
import { Projet } from '../../../models/projet';
import { collaborateurservice } from '../../../services/collaborateurs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Trimestre } from '../../../models/trimestre';
import { TrimestreService } from '../../../services/trimestre.service';
import { response } from 'express';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { Collaborateur } from '../../../models/collaborateur';

@Component({
  selector: 'app-view-collaborateur',
  templateUrl: './view-collaborateur.component.html',
  styleUrl: './view-collaborateur.component.css',
})
export class ViewCollaborateurComponent implements OnInit {
  Isopen: boolean = true;
  items: string[] = ['T-1-2024', 'T-2-2024', 'T-3-2024'];
  AllTrimestres: Trimestre[] = [];
  filteredItems: Trimestre[] = [...this.AllTrimestres];
  searchTerm: string = '';
  dropdownstate2: boolean[] = [];
  projets !: Projet[];
  projetsCount: number = 0;
  collaborateurInformation !: Collaborateur;



  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    console.log(searchTerm)
    this.filteredItems = this.AllTrimestres.filter((item) =>
      item.nomtrimestre?.toLowerCase().includes(searchTerm) ?? false
    );
  }

  getProjets(id: number, trimestreId: number | undefined) {


    this.collaborateurService.getProjetForCollabByTrimestre(id, trimestreId).subscribe(
      (response: Projet[]) => {
        console.log("Projets : " + response)
        console.log("Projets : " + "Collab Id " + id)
        console.log("Projets : " + "Trimester Id  " + trimestreId)
        this.projets = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  getCollaborateur(id: number) {
    this.collaborateurService.FindCollaborateurById(id).subscribe(
      (response: Collaborateur) => {
        console.log("Information : " + response)
        this.collaborateurInformation = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  getCountProjetsForCollaborateur(id: number) {
    this.collaborateurService.getNumberProjetsforcollaborateur(id).subscribe(
      (response: number) => {
        this.projetsCount = response;
        console.log("Number", this.projetsCount);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  constructor(private collaborateurService: collaborateurservice, private trimestreSerivce: TrimestreService) {

  }
  private activatedRoute = inject(ActivatedRoute);
  collabid !: number;
  CurrentTrimestreId !: number | undefined;




  ngOnInit(): void {
    this.collabid = this.activatedRoute.snapshot.params['id'];

    this.getTrimestres();
    this.getCollaborateur(this.collabid);
    this.getCurrentTrimsetreId();

  }




  public getTrimestres(): void {
    this.trimestreSerivce.Alltrimestres().subscribe(
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

  getTrimestreInformation(id: number | undefined) {
    this.collaborateurService.getProjetForCollabByTrimestre(this.collabid, id).subscribe(
      (response: Projet[]) => {
        console.log("Getting projets")
        this.projets = response;
        console.log("Projets de ce Collaborateurs " + response);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  getCurrentTrimsetreId() {

    this.trimestreSerivce.CurrentTrimestre().subscribe((response: Trimestre) => {
      this.CurrentTrimestreId = response.id;
      this.getTrimestreInformation(response.id);
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    }
    )
  }



  getProjet(collabid: number, trimid: number | undefined) {

    this.collaborateurService.getProjetForCollabByTrimestre(collabid, trimid).subscribe(
      (response: Projet[]) => {
        this.projets = response;
        console.log(this.projets)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );

  }


  Droptablelistmenu(i: number): void {
    if (this.dropdownstate2[i] === true) {
      this.dropdownstate2[i] = false;
      return;
    }

    setTimeout(() => {
      document.getElementById('droplist' + i)?.classList.remove('opacity-0');
    }, 1);

    this.dropdownstate2.fill(false);
    this.dropdownstate2[i] = !this.dropdownstate2[i];
  }

  dropdownbutton(): void {
    this.Isopen = !this.Isopen;

    if (this.Isopen) {
      setTimeout(() => {
        document.getElementById('dropdown-menu')?.classList.remove('opacity-0');
        document.getElementById('dropdown-menu')?.classList.add('opacity-100');
      }, 2);
      return;
    }
    console.log('hey');
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
