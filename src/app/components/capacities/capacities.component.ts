import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { TrimestreService } from '../../../services/trimestre.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Trimestre } from '../../../models/trimestre';
import { Collaborateur } from '../../../models/collaborateur';
import { authentificationservice } from '../../../services/authentification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-capacities',
  templateUrl: './capacities.component.html',
  styleUrl: './capacities.component.css'
})
export class CapacitiesComponent implements OnInit {

  trimestre  !: Trimestre;
  TrimestreId !: number | undefined;


  public getCurrentTrimestreInfo(): void {
    this.trimestreService.CurrentTrimestre().subscribe(
      (response: Trimestre) => {
        this.trimestre = response;
        this.getAllCapacities(this.trimestre);
        this.date = this.trimestre.dateDebut;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }



  ngOnInit(): void {
    this.Me();
    this.TrimestreId = this.route.snapshot.params['idTrimestre'];

    if (!this.TrimestreId) {
      this.getCurrentTrimestreInfo();
    } else {
      this.getAllCapacitiesByid(this.TrimestreId);
    }

    this.getTrimestres()
  }

  ngAfterViewInit(): void {



  }


  @ViewChild('pieChart') private chartRef!: ElementRef;
  private chart: Chart | undefined;

  constructor(private authentificationservice: authentificationservice, private trimestreService: TrimestreService, private route: ActivatedRoute) {

    Chart.register(...registerables);
  }



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
        data: [this.counts.DevNTIC, this.counts.DevAs400, this.counts.WINDEV, this.counts.Analyse, this.counts.IntegrationCoordination, this.counts.ControleQualite],
        backgroundColor: [
          '#5D45FB',
          '#EF7F5A',
          '#00ECCC',
          '#125B9A',
          '#FFB800',
          '#00BC8B'
        ]
      }]
    };

    const config: ChartConfiguration = {

      type: 'doughnut',
      data: data,

      options: {

        responsive: true,
        plugins: {

          legend: {
            position: 'left',
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

  expanding: boolean = false;
  expand(id: number) {

    console.log("labiad")
    if (!this.expanding) {
      document.getElementById("expand" + id)?.classList.remove("scale-0");
      document.getElementById("expand" + id)?.classList.add("scale-100");
      document.getElementById("expand" + id)?.classList.remove("hidden");
      document.getElementById("expand" + id)?.classList.add("flex");

    } else {
      document.getElementById("expand" + id)?.classList.add("scale-100");
      document.getElementById("expand" + id)?.classList.remove("scale-0");
      document.getElementById("expand" + id)?.classList.remove("flex");
      document.getElementById("expand" + id)?.classList.add("hidden");


    }
    this.expanding = !this.expanding;

  }

  Capacities !: any[];
  counts = {
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

  onSearchCapacities(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    console.log(searchTerm)
    this.Capacities = this.AllCapacities;
    this.Capacities = this.Capacities.filter((item) =>
      item.collaborateur.nom?.toLowerCase().includes(searchTerm) ?? false
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




  AllCapacities !: any[];
  getAllCapacities(TrimestreId: Trimestre) {
    this.trimestre = TrimestreId;
    this.trimestreService.AllCapacities(TrimestreId.id).subscribe(
      (response: any) => {
        this.Capacities = response;
        this.AllCapacities = response;

        console.log(response);
        this.counts = {
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
            this.counts.DevAs400 += capacitie.chargecompetence;
          }

          if (capacitie.collaborateur.competence.titrecompetence == "DEV NTIC") {
            this.counts.DevNTIC += capacitie.chargecompetence;
          }

          this.counts.Analyse += capacitie.analyse;

          if (capacitie.controlequalite) {
            this.counts.ControleQualite += capacitie.controlequalite;

          }
          this.counts.IntegrationCoordination += capacitie.integrationcoordination;

          this.counts.Total1 = this.counts.Analyse + this.counts.ControleQualite + this.counts.DevAs400 + this.counts.DevNTIC + this.counts.IntegrationCoordination;

          this.counts.Maintenence += capacitie.maintenence;

          this.counts.Total2 = this.counts.Total1 + this.counts.Maintenence;


        }
        )

        this.createChart();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  getAllCapacitiesByid(TrimestreId: number | undefined) {

    this.trimestreService.AllCapacities(TrimestreId).subscribe(
      (response: any) => {
        this.Capacities = response;
        this.AllCapacities = response;

        console.log(response);
        this.counts = {
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
            this.counts.DevAs400 += capacitie.chargecompetence;
          }

          if (capacitie.collaborateur.competence.titrecompetence == "DEV NTIC") {
            this.counts.DevNTIC += capacitie.chargecompetence;
          }

          this.counts.Analyse += capacitie.analyse;

          if (capacitie.controlequalite) {
            this.counts.ControleQualite += capacitie.controlequalite;

          }
          this.counts.IntegrationCoordination += capacitie.integrationcoordination;

          this.counts.Total1 = this.counts.Analyse + this.counts.ControleQualite + this.counts.DevAs400 + this.counts.DevNTIC + this.counts.IntegrationCoordination;

          this.counts.Maintenence += capacitie.maintenence;

          this.counts.Total2 = this.counts.Total1 + this.counts.Maintenence;


        }
        )

        this.createChart();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  date: Date | undefined;

  me !: Collaborateur;
  Me() {
    this.authentificationservice.me().subscribe((response) => this.me = response, (error) => alert(error));
  }


}
