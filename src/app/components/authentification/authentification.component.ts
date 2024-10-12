import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authentificationservice } from '../../../services/authentification.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Collaborateur } from '../../../models/collaborateur';
import { Competence } from '../../../models/competence';
import { FileUploadService } from '../../../services/file.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent implements OnInit {

  constructor(private Messageservice: MessageService, private uploadService: FileUploadService, private athentificationService: authentificationservice, private router: Router) {

  }

  selectFile(event: any): void {
    const file = event.target.files[0];
    this.selectedFiles = file;

    // Create a preview URL
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewUrl = null;
    }
  }

  listcompetence !: Competence[];

  ngOnInit(): void {
    this.getAllcompetence();
  }



  emailsent: boolean = false;

  Onemailsent() {
    this.emailsent = true;
  }

  getAllcompetence() {

    this.athentificationService.Allcompetences().subscribe((response: Competence[]) => {
      console.log(response);

      this.listcompetence = response;

    }, (error) => {
      console.error(' COMPETENECE error: ', error);
    });
  }



  credentials: any = { email: '', password: '' };

  login() {
    this.athentificationService.login(this.credentials).subscribe((response) => {
      console.log("Login")
      console.log("Token : " + response.token)
      localStorage.setItem('token', response.token);
      this.router.navigateByUrl('Home/viewcollaborateur');


    }, (error) => {
      this.Messageservice.add({ severity: 'error', summary: 'Invalide', detail: 'Adresse e-mail ou mot de passe invalide"', life: 2000 });

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



    if (this.SelectedCompetence == null) {

    } else {
      let compReq = new Competence();
      compReq.id = this.SelectedCompetence.id;
      CollabReq.competence = compReq;
    }



    this.Onemailsent();

    if (form.valid) {

      this.athentificationService.register(CollabReq).subscribe((response) => {
        console.log("Collaborateur to regisre " + CollabReq.nom, " email : ", CollabReq.email)
        console.log(response);
        this.upload(CollabReq.email);

      }, (error) => {
        this.upload(CollabReq.email);
        console.error(' register error: ', error);
      });


    }

  }

  selectedFiles?: any;
  currentFile?: File;
  previewUrl: string | null = null;

  upload(email: String): void {

    const formData = new FormData();
    formData.append('file', this.selectedFiles, this.selectedFiles.name);
    this.uploadService.upload(formData, email).subscribe((response) => console.log(response), (error) => console.log(error));

  }
  viewlogin: boolean = true;

  SelectedCompetence !: Competence;



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
