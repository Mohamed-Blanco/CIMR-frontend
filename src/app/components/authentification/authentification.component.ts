import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authentificationservice } from '../../../services/authentification.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Collaborateur } from '../../../models/collaborateur';
import { Competence } from '../../../models/competence';



@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent implements OnInit {

  constructor(private athentificationService: authentificationservice, private router: Router) {

  }

  listcompetence: Competence[] = [];

  ngOnInit(): void {
    this.listcompetence = [
      { titrecompetence: "DEV AS400" },
      { titrecompetence: "DEV NTIC" },
      { titrecompetence: "DEV Analyse" },
      { titrecompetence: "Integration-Coordination" },
      { titrecompetence: "Controle-Qualite" },
    ]
  }





  getAllcompetence() {

    this.athentificationService.Allcompetences().subscribe((response: Competence[]) => {

      this.listcompetence = response;
      console.log(this.listcompetence);

    }, (error) => {
      console.error(' register error: ', error);
    });
  }



  credentials: any = { email: '', password: '' };

  login() {
    this.athentificationService.login(this.credentials).subscribe((response) => {
      console.log("Login")
      console.log("Token : " + response.token)
      localStorage.setItem('token', response.token);
      this.router.navigateByUrl('/Home/collaborateurs')
    }, (error) => {
      console.error('Login error: ', error);
    });
  }

  register(form: NgForm) {

    document.getElementById("email")?.classList.remove("border-red-500");
    document.getElementById("nom")?.classList.remove("border-red-500");
    document.getElementById("prenom")?.classList.remove("border-red-500");
    document.getElementById("password")?.classList.remove("border-red-500");
    document.getElementById("droitdecongee")?.classList.remove("border-red-500");

    if (form.value.email == "") {
      document.getElementById("email")?.classList.add("border-red-500");
      console.log("invalid")
    }

    if (form.value.nom == "") {
      document.getElementById("nom")?.classList.add("border-red-500");
      console.log("invalid")
    }
    if (form.value.prenom == "") {
      document.getElementById("prenom")?.classList.add("border-red-500");
      console.log("invalid")
    }
    if (form.value.password == "") {
      document.getElementById("password")?.classList.add("border-red-500");
      console.log("invalid")
    }
    if (form.value.droitdecongee == "") {
      document.getElementById("droitdecongee")?.classList.add("border-red-500");
      console.log("invalid")
    }
    let CollabReq = new Collaborateur();

    CollabReq.nom = form.value.nom;
    CollabReq.prenom = form.value.prenom;
    CollabReq.email = form.value.email;
    CollabReq.password = form.value.password;
    CollabReq.droitdecongee = form.value.droitdecongee;
    console.log("com" + this.SelectedCompetence);
    CollabReq.compentence = this.SelectedCompetence.titrecompetence;


    console.log("Collaborateur to regisre " + CollabReq.compentence, " email : ", CollabReq.email)


    this.athentificationService.register(CollabReq).subscribe((response) => {
      console.log(response);

    }, (error) => {
      console.error(' register error: ', error);
    });



  }

  viewlogin: boolean = true;

  SelectedCompetence: any;



  onSwitch() {

    if (this.viewlogin) {
      console.log("switch");
      document.getElementById("Background")?.classList.remove("w-[44.5%]");
      document.getElementById("Background")?.classList.add("w-[30%]");
    } else {
      console.log("switch");
      document.getElementById("Background")?.classList.remove("w-[30%]");
      document.getElementById("Background")?.classList.add("w-[44.5%]");
    }


    this.viewlogin = !this.viewlogin;
  }


}
