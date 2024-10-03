import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Planification } from '../../../models/planification';
import { PlanificationService } from '../../../services/planification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { Trimestre } from '../../../models/trimestre';
import { TrimestreService } from '../../../services/trimestre.service';
import { ActivatedRoute } from '@angular/router';
import { authentificationservice } from '../../../services/authentification.service';
import { Collaborateur } from '../../../models/collaborateur';
import { error } from 'console';

@Component({
  selector: 'app-trimestres',
  templateUrl: './trimestres.component.html',
  styleUrl: './trimestres.component.css',
  providers: [MessageService],
})
export class TrimestresComponent implements OnInit {
  date1: Date | undefined;
  indexs: number[] = [2024, 2023, 2022, 2021];
  visible: boolean = false;
  planifications: Planification[] = [];
  private activatedRoute = inject(ActivatedRoute);
  AllTrimsetres !: Trimestre[];
  suprimer: boolean = false;


  onSearchPlanifications(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    console.log(searchTerm)
    this.planifications = this.Allplanif;

    this.planifications = this.planifications.filter((item) =>
      item.titreplanification?.toLowerCase().includes(searchTerm) ?? false

    );



  }
  constructor(
    private messageService: MessageService,
    private planificationservice: PlanificationService,
    private trimestreservice: TrimestreService,
    private authentificationservice: authentificationservice
  ) { }


  showDialog() {
    this.visible = true;
  }
  me !: Collaborateur;
  Me() {
    this.authentificationservice.me().subscribe((response) => this.me = response, (error) => alert(error));
  }


  visible2!: boolean;

  showDialog2(Planification: Planification) {
    this.visible2 = true;
    this.PlanificationToAddIn = Planification;
  }

  isOutletEmpty = true;

  onOutletActivate(): void {
    this.isOutletEmpty = false;
  }

  onOutletDeactivate(): void {
    this.isOutletEmpty = true;
  }

  onaddplanification(onaddplanification: NgForm): void {


    let planif: Planification = new Planification();
    planif.titreplanification = onaddplanification.value.titreplanification;
    planif.dateplanification = onaddplanification.value.dateplanification;

    console.log(planif)
    this.planificationservice
      .addPlanification(planif)
      .subscribe(
        (response: Planification) => {
          console.log(response);
          this.getPlanifications();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Planification est ajouter ' });
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.messageService.add({ severity: 'error', summary: 'Planification non Ajouter', detail: 'erreur lors de l ajoute de la Planification  ' });
        },
      );
  }

  OnSuprimer(planif: Planification): void {

    console.log("Projet za suprimer : " + planif);
    this.planificationservice.deletePlanificationById(planif.id).subscribe(
      (response: void) => {
        console.log("Projet Suprimer ! ");
        this.getPlanifications();
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Planification a était Suprimer' });

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }




  onaddTrimestre(onaddTrimestre: NgForm): void {


    let trimestreRequest: Trimestre = new Trimestre();
    trimestreRequest.nomtrimestre = onaddTrimestre.value.nomtrimestre;
    trimestreRequest.coefficientmaintence = onaddTrimestre.value.coefficientmaintence;
    trimestreRequest.joursferiee = onaddTrimestre.value.joursferiee;

    console.log(trimestreRequest);

    let planificationRequest: Planification = new Planification();
    planificationRequest = this.PlanificationToAddIn;

    trimestreRequest.planification = planificationRequest;

    console.log("Request : ", trimestreRequest);

    this.trimestreservice
      .addTrimestre(trimestreRequest)
      .subscribe(
        (response: Trimestre) => {
          console.log(response);
          this.getPlanifications();
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Trimestre ' + trimestreRequest.nomtrimestre + ' est ajouter' });

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      );


  }

  PlanificationToAddIn  !: Planification;




  ngOnInit(): void {
    this.Me();
    this.getPlanifications();
  }

  Allplanif !: Planification[];
  public getPlanifications(): void {
    this.planificationservice.getPlanifications().subscribe(
      (response: Planification[]) => {
        this.planifications = response;
        this.Allplanif = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log("Alert" + error.message);
      },
    );
  }


}
