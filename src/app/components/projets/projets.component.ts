import { Component, ElementRef, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Projet } from '../../../models/projet';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjteService } from '../../../services/projet.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MultiSelect } from 'primeng/multiselect';
import { stringify } from 'querystring';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AjouterProjetComponent } from '../ajouter-projet/ajouter-projet.component';
import { EditProjetComponent } from '../edit-projet/edit-projet.component';
import { response } from 'express';
import { Console, error } from 'console';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { TrimestreService } from '../../../services/trimestre.service';
import { Trimestre } from '../../../models/trimestre';
import { RetnirProjetComponent } from '../retnir-projet/retnir-projet.component';
import { Collaborateur } from '../../../models/collaborateur';
import { authentificationservice } from '../../../services/authentification.service';
import { MessageService } from 'primeng/api';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.css',
})
export class ProjetsComponent implements OnInit, OnChanges {



  visibleadd: boolean = false;
  showadd() {
    console.log("Trimstre Id Before ; " + this.TrimestreId)
    if (this.TrimestreId) {
      console.log("Trimstre Id Before ; " + this.TrimestreId)
      this.visibleadd = true;
    }

  }
  @ViewChild(AjouterProjetComponent)
  addProjet!: AjouterProjetComponent;

  @ViewChild('pieChart') private chartRef!: ElementRef;
  private chart: Chart | undefined;

  @ViewChild(EditProjetComponent)
  EditerProjet!: EditProjetComponent;


  @ViewChild(RetnirProjetComponent)
  RetenirProjet!: RetnirProjetComponent;

  ProjetSelectedEdit !: Projet;
  UseEditComponent: boolean = false;
  AllTrimestres: Trimestre[] = [];


  Capacities !: any[];
  Capacitiescounts = {
    DevAs400: 999,
    DevNTIC: 0,
    WINDEV: 0,
    Analyse: 0,
    ControleQualite: 0,
    IntegrationCoordination: 0,
    Maintenence: 0,
    Total1: 0,
    Total2: 0
  };

  Ecartcounts = {
    DevAs400: 999,
    DevNTIC: 0,
    WINDEV: 0,
    Analyse: 0,
    ControleQualite: 0,
    IntegrationCoordination: 0,
    Maintenence: 0,
    Total1: 0,
    Total2: 0
  };

  getAllCapacities(TrimestreId: number | undefined) {

    this.TrimestreId = TrimestreId;
    this.trimestreService.AllCapacities(TrimestreId).subscribe(
      (response: any) => {
        this.Capacities = response;

        console.log("Capacities " + response);
        this.Capacitiescounts = {
          DevAs400: 0,
          DevNTIC: 0,
          WINDEV: 0,
          Analyse: 0,
          ControleQualite: 0,
          IntegrationCoordination: 0,
          Maintenence: 0,
          Total1: 0,
          Total2: 0
        };



        this.Capacities.forEach(capacitie => {
          console.log("proccessing" + capacitie.collaborateur.competence.titrecompetence)
          if (capacitie.collaborateur.competence.titrecompetence == "DEV AS400") {
            this.Capacitiescounts.DevAs400 += capacitie.chargecompetence;
          }



          if (capacitie.collaborateur.competence.titrecompetence == "DEV NTIC") {
            this.Capacitiescounts.DevNTIC += capacitie.chargecompetence;
          }

          this.Capacitiescounts.Analyse += capacitie.analyse;

          if (capacitie.controlequalite !== undefined) {
            this.Capacitiescounts.ControleQualite += capacitie.Controlequalite;
            console.log("Controle et Qualite  =  " + capacitie.controlequalite)
          }


          if (capacitie.controlequalite) {
            this.Capacitiescounts.ControleQualite += capacitie.controlequalite;

          }
          this.Capacitiescounts.IntegrationCoordination += capacitie.integrationcoordination;

          this.Capacitiescounts.Total1 = this.Capacitiescounts.Analyse + this.Capacitiescounts.ControleQualite + this.Capacitiescounts.DevAs400 + this.Capacitiescounts.DevNTIC + this.Capacitiescounts.IntegrationCoordination;

          this.Capacitiescounts.Maintenence += capacitie.maintenence;

          this.Capacitiescounts.Total2 = this.Capacitiescounts.Total1 + this.Capacitiescounts.Maintenence;


        }
        )

        this.createChart();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }


  private createChart(): void {

    if (this.chart) {
      this.chart.destroy(); // Destroy the existing chart before creating a new one
    }

    console.log('Creating chart');
    if (!this.chartRef) {
      console.error('Chart reference not found');
      return;
    }


    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context from canvas');
      return;
    }

    const data = {
      labels: [
        'NTIC', 'NTIC a consomer',
        'AS400', 'AS400 a consomer',
        'WINDEV', 'WINDEV a consomer',
        'Analyse', 'Analyse a consomer',
        'Integration-coordination', 'Integration-coordination a consomer',
        'Controle-Qualité', 'Controle-Qualité a consomer'
      ],
      datasets: [{
        data: [this.Capacitiescounts.DevNTIC, this.counts.DEVNTIC, this.Capacitiescounts.DevAs400, this.counts.DEVAS400, 0, 0, this.Capacitiescounts.Analyse, this.counts.Analyse, this.Capacitiescounts.IntegrationCoordination, this.counts.Intrgration, this.Capacitiescounts.ControleQualite, this.counts.CONTROLEQUALITE],
        backgroundColor: [
          '#EF7F5A', '#ed9b82',    // Green for NTIC
          '#00712D', '#009539',    // Yellow for AS400
          '#00ECCC', '#00ECCC',    // Red for WINDEV
          '#125B9A', '#2f81c4',    // Blue for Analyse
          '#E6A400', '#dbb55e',    // Purple for Integration-coordination
          '#00BC8B', '#32d1a6'     // Brown for Controle-Qualité
        ]
      }]
    };



    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    try {
      this.chart = new Chart(ctx, config);
      console.log('Chart created successfully');
    } catch (error) {
      console.error('Error creating chart:', error);
    }

  }

  onSubmit() {

    let obs = this.addProjet.submitForm();
    if (!obs) return;
    obs.subscribe(
      (response: Projet) => {
        console.log(response);
        if (this.TrimestreId !== undefined) {
          this.getprojetsByTrimestreId(this.TrimestreId);
          this.getTrimestreData(this.TrimestreId);
          console.log("dlsdksmldkMLSK unDEFIENED")

        } else {
          this.getprojets();



        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Projet a été ajouté ' });

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.messageService.add({
          severity: 'error', summary: 'error', detail: 'Erreur lors de l ajout du projet'
        });
      },
    )


  }


  onSubmitRetenir() {
    let obs = this.RetenirProjet.submitForm();
    if (!obs) return;
    obs.subscribe(
      (response: Projet) => {
        console.log(response);
        this.getprojets();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    )
  }

  OnRetenir(projet: Projet) {
    debugger;
    this.ProjetSelectedRetnir = projet;
    console.log("Trimestre IN retenir : ");
    this.UseRetnirComponent = true;

  }

  me !: Collaborateur;
  Me() {
    this.authentificationservice.me().subscribe((response) => this.me = response, (error) => alert(error));
  }

  onSubmitEdit() {

    let obs = this.EditerProjet.submitForm();
    if (!obs) return;
    obs.subscribe(
      (response: Projet) => {
        console.log(response);
        this.getprojets();
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Projet a été Modifier ' });

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la Modification ' });

      },
    )


  }


  suprimer!: boolean;
  ProjettoComment !: Projet;

  AjouterRemarque(addremarque: NgForm, projet: Projet) {


    if (addremarque.valid) {
      console.log('addremarque submitted');

      let projectRequest: Projet = new Projet();

      projectRequest.id = projet.id;
      projectRequest.remarque = addremarque.form.value.body;


      return this.projetsService.ajouterRemarque(projectRequest).subscribe((response: Projet) => {
        console.log(response);
        this.getprojets();
      }, (error: HttpErrorResponse) => {
        console.log(error)
      });
    } else {
      console.log('Form is invalid');
      return null;
    }
  }

  delete !: boolean;

  showDialog() {
    this.suprimer = true;
  }


  Onremarque = false;

  OnSuprimer(projet: Projet): void {

    console.log("Projet za suprimer : " + projet);
    this.projetsService.deleteProjetbyId(projet.id).subscribe(
      (response: void) => {
        console.log("Projet Suprimer ! ");
        this.getprojets();
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Projet a été Suprimer ' });

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  OnEdit(EditedProjet: Projet): void {
    this.ProjetSelectedEdit = EditedProjet;
    this.UseEditComponent = true;

  }

  UseRetnirComponent: boolean = false;
  projets!: Projet[];
  collaborateurs!: string[];
  cols!: Column[];
  dropdownstate: boolean[] = [];
  select: boolean = false;
  Isopen: boolean = false;
  ProjetSelectedRetnir !: Projet;

  searchTerm: string = '';
  filteredItems: Trimestre[] = [...this.AllTrimestres];

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    console.log(searchTerm)
    this.filteredItems = this.AllTrimestres.filter((item) =>
      item.nomtrimestre?.toLowerCase().includes(searchTerm) ?? false
    );
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

  getcollaborateurs(): void { }

  selectitems(): void {
    this.select = !this.select;

    if (this.select) {
      setTimeout(() => {
        document.getElementById('dropitemmenu')?.classList.remove('scale-0');
        document.getElementById('dropitemmenu')?.classList.add('scale-100');

        document.getElementById('selectcolumn')?.classList.remove('hidden');
        document.getElementById('selectrow')?.classList.remove('hidden');

        document.getElementById('selectcolumn')?.classList.add('block');
        document.getElementById('selectrow')?.classList.add('block');
      }, 1);
      return;
    }

    if (!this.select) {
      setTimeout(() => {
        document.getElementById('dropitemmenu')?.classList.remove('scale-100');
        document.getElementById('selectcolumn')?.classList.remove('block');
        document.getElementById('selectrow')?.classList.remove('block');

        document.getElementById('dropitemmenu')?.classList.add('scale-0');
        document.getElementById('selectcolumn')?.classList.add('hidden');
        document.getElementById('selectrow')?.classList.add('hidden');
      }, 1);
      return;
    }
  }

  dropmenu(i: number): void {
    if (this.dropdownstate[i] === true) {
      this.dropdownstate[i] = false;
      return;
    }

    setTimeout(() => {
      document
        .getElementById('dropdownmenu' + i)
        ?.classList.remove('opacity-0');
    }, 1);

    this.dropdownstate.fill(false);
    this.dropdownstate[i] = !this.dropdownstate[i];
  }

  getFirstColumn(): any[] {
    return this.cols.slice(1, 2);
  }
  getThreeColumn(): any[] {
    return this.cols.slice(3, 4);
  }
  getNomprojet(): any[] {
    return this.cols.slice(2, 3);
  }
  getChargeDate(): any[] {
    return this.cols.slice(4, 6);
  }

  getId(): any[] {
    return this.cols.slice(0, 1);
  }

  ngAfterViewInit(): void {



  }

  ngOnChanges(changes: SimpleChanges): void {



  }




  private activatedRoute = inject(ActivatedRoute);
  TrimestreId!: number | undefined;

  trimestre !: Trimestre;

  getTrimestreData(id: number | undefined) {
    this.trimestreService.findTrimestreById(id).subscribe(
      (response: Trimestre) => {
        this.trimestre = response;
        console.log("Trimestre Data : " + this.trimestre)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onSearchProjet(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    console.log(searchTerm)
    this.projets = this.allprojets;

    this.projets = this.allprojets.filter((item) =>
      item.departement?.titre?.toLowerCase().includes(searchTerm) ?? false

    );

    this.projets = this.allprojets.filter((item) =>
      item.titre?.toLowerCase().includes(searchTerm) ?? false

    );

  }

  ngOnInit(): void {


    this.Me();
    this.getTrimestres();
    this.TrimestreId = this.activatedRoute.snapshot.params['idTrimestre'];

    if (this.TrimestreId !== undefined) {
      console.log("Trimestreid : ");
      console.log(this.TrimestreId);
      this.getprojetsByTrimestreId(this.TrimestreId);
      this.getTrimestreData(this.TrimestreId);
    } else {
      console.log("Trimestre Actuel ");
      this.getprojets();
    }


    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'prioritee', header: 'Prioritée' },
      { field: 'nomprojet', header: 'Nom du fichier/Projet' },
      { field: 'entitedemandeuse', header: 'Entite demandeuse' },
      { field: 'chargeestimee', header: 'Charge estimée' },
      { field: 'datelimite', header: 'datelimite' },
    ];


  }


  constructor(private messageService: MessageService, private authentificationservice: authentificationservice, private projetsService: ProjteService, private route: ActivatedRoute, private trimestreService: TrimestreService) {

    Chart.register(...registerables);
  }

  isOutletEmpty = true;

  onOutletActivate(): void {
    this.isOutletEmpty = false;
  }

  onOutletDeactivate(): void {
    this.isOutletEmpty = true;
  }

  dropdowneditmenu(index: number): void {
    if (this.dropdownstate[index] === true) {
      this.dropdownstate[index] = false;
      return;
    }

    setTimeout(() => {
      document
        .getElementById('editmenu' + index)
        ?.classList.remove('hidden');
    }, 1);

    this.dropdownstate.fill(false);
    this.dropdownstate[index] = !this.dropdownstate[index];
  }
  allprojets !: Projet[];
  public getprojets(): void {
    this.trimestreService.CurrentTrimestre().subscribe(
      (response: Trimestre) => {
        this.projets = response.projetList;
        this.allprojets = response.projetList;
        this.TrimestreId = response.id;
        this.getAllCharges();
        this.getAllCapacities(response.id);
        this.getTrimestreData(response.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

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

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  public getprojetsByTrimestreId(id: number | undefined): void {
    this.TrimestreId = id;
    this.trimestreService.findTrimestreById(id).subscribe(
      (response: Trimestre) => {
        this.projets = response.projetList;
        this.allprojets = response.projetList
        this.getAllCharges();
        this.getAllCapacities(response.id);
        this.getTrimestreData(response.id);
        this.createChart();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }



  onRowReorder(event: any) {
    // This method will be called when a row is reordered
    const drageIndex: number = event.drageIndex;
    const dropIndex: number = event.dropIndex;

    const dragedData: Projet = this.projets[drageIndex];
    const dropedData: Projet = this.projets[dropIndex];
  }

  counts = {
    DEVNTIC: 0,
    DEVAS400: 999,
    Analyse: 0,
    INFRA: 0,
    CONTROLEQUALITE: 0,
    Intrgration: 0

  };

  getAllCharges() {

    this.counts = {
      DEVNTIC: 0,
      DEVAS400: 0,
      Analyse: 0,
      INFRA: 0,
      CONTROLEQUALITE: 0,
      Intrgration: 0
    };

    this.projets.forEach(projet => {



      console.log("proccessing  Projets")

      if (projet.analyse) {
        this.counts.Analyse += projet.analyse;

      }

      if (projet.infra) {
        this.counts.INFRA += projet.infra;

      }
      if (projet.integrationcoordination) {
        this.counts.Intrgration += projet.integrationcoordination;

      }

      if (projet.controlequalite) {
        this.counts.CONTROLEQUALITE += projet.controlequalite;

      }


      this.counts.DEVAS400 += projet.chargeAS400;
      this.counts.DEVNTIC += projet.chargeNTIC;


    })

    console.log("COUNTS = " + this.counts.Analyse);
  }



}
