import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.css',
})
export class ProjetsComponent implements OnInit {


  visibleadd !: boolean;
  showadd() {

    setTimeout(() => {
      this.visibleadd = true;
    }, 2);
  }
  @ViewChild(AjouterProjetComponent)
  addProjet!: AjouterProjetComponent;

  @ViewChild('pieChart') private chartRef!: ElementRef;
  private chart: Chart | undefined;

  @ViewChild(EditProjetComponent)
  EditerProjet!: EditProjetComponent;

  ProjetSelectedEdit !: Projet;
  UseEditComponent: boolean = false;
  AllTrimestres: Trimestre[] = [];

  private createChart(): void {
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
      labels: ['NTIC', 'AS400', 'WINDEV', 'Analyse', 'Integration-coordination', 'Controle-Qualité'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 80],
        backgroundColor: [
          '#00712D',
          'yellow',
          'red',
          '#125B9A',
          'purple',
          'brown'
        ]
      }]
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },

        }
      }
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
          console.log("dlsdksmldkMLSK unDEFIENED")
        } else {
          this.getprojets();
        }

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    )


  }

  onSubmitEdit() {

    let obs = this.EditerProjet.submitForm();
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

  projets!: Projet[];
  collaborateurs!: string[];
  cols!: Column[];
  dropdownstate: boolean[] = [];
  select: boolean = false;
  Isopen: boolean = true;

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

    this.createChart();

  }


  private activatedRoute = inject(ActivatedRoute);
  TrimestreId !: number | undefined;
  ngOnInit(): void {

    this.getTrimestres();
    this.TrimestreId = this.activatedRoute.snapshot.params['idTrimestre'];

    if (this.TrimestreId !== undefined) {
      console.log(this.TrimestreId);
      this.getprojetsByTrimestreId(this.TrimestreId);
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


  constructor(private projetsService: ProjteService, private route: ActivatedRoute, private trimestreService: TrimestreService) {

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
        ?.classList.remove('opacity-0');
    }, 1);

    this.dropdownstate.fill(false);
    this.dropdownstate[index] = !this.dropdownstate[index];
  }

  public getprojets(): void {
    this.trimestreService.CurrentTrimestre().subscribe(
      (response: Trimestre) => {
        this.projets = response.projetList;
        this.getAllCharges();
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
    this.trimestreService.findTrimestreById(id).subscribe(
      (response: Trimestre) => {
        this.projets = response.projetList;
        this.getAllCharges();
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
    DEVAS400: 0,
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



      if (projet.analyse != null && projet.chargeAS400 && projet.controlequalite && projet.integrationcoordination && projet.infra) {
        console.log("proccessing")
        this.counts.Analyse += projet.analyse;
        this.counts.DEVAS400 += projet.chargeAS400;
        this.counts.DEVNTIC += projet.chargeNTIC;
        this.counts.INFRA += projet.infra;
        this.counts.Intrgration += projet.integrationcoordination;
        this.counts.CONTROLEQUALITE += projet.controlequalite;
      }

    })

    console.log("COUNTS = " + this.counts.Analyse);
  }



}
