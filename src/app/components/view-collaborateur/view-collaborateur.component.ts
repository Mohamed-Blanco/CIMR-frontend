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
  filteredItems: string[] = [...this.items];
  searchTerm: string = '';
  dropdownstate2: boolean[] = [];
  projets !: Projet[];
  projetsCount: number = 0;
  collaborateurInformation !: Collaborateur;

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();

    this.filteredItems = this.items.filter((item) =>
      item.toLowerCase().includes(searchTerm),
    );
  }

  getCollaborateur(id: number) {
    this.collaborateurService.FindCollaborateurById(id).subscribe(
      (response: Collaborateur) => {
        this.collaborateurInformation = response;
        console.log("collaborateir", this.collaborateurInformation);
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

    if (this.activatedRoute.snapshot.params['id'] == undefined) {
      console.log("Collaborateur id missing");
    } else {
      this.getCollaborateur(this.collabid);
      this.collabid = this.activatedRoute.snapshot.params['id'];
      this.getCurrentTrimsetreId();
    }

    this.getCountProjetsForCollaborateur(this.collabid);

  }

  getCurrentTrimsetreId() {
    this.trimestreSerivce.CurrentTrimestre().subscribe(
      {
        next: (response: Trimestre) => {
          console.log(response);
          this.CurrentTrimestreId = response.id
        },
        complete: () => {
          this.getProjet(this.collabid, this.CurrentTrimestreId)
        }
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
