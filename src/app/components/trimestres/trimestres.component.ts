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
  AllTrimestres !: Trimestre[];

  constructor(
    private messageService: MessageService,
    private planificationservice: PlanificationService,
    private trimestreservice: TrimestreService
  ) { }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'votre planification a eté crée',
    });
  }
  showDialog() {
    this.visible = true;
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
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      );
  }

  OnSuprimer(planif: Planification): void {

    console.log("Projet za suprimer : " + planif);
    this.planificationservice.deletePlanificationById(planif.id).subscribe(
      (response: void) => {
        console.log("Projet Suprimer ! ");
        this.getPlanifications();
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
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      );
  }

  PlanificationToAddIn  !: Planification;




  ngOnInit(): void {
    this.getPlanifications();
  }

  public getPlanifications(): void {
    this.planificationservice.getPlanifications().subscribe(
      (response: Planification[]) => {
        this.planifications = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log("Alert" + error.message);
      },
    );
  }


}
