import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { collaborateurservice } from '../../../services/collaborateurs.service';
import { Collaborateur } from '../../../models/collaborateur';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Competence } from '../../../models/competence';
import { authentificationservice } from '../../../services/authentification.service';
import { Observable } from 'rxjs/internal/Observable';
import { FileUploadService } from '../../../services/file.service';
import { error } from 'node:console';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrl: './add-collaborateur.component.css',
})
export class AddCollaborateurComponent implements OnInit {
  constructor(private uploadService: FileUploadService, private CollaborateurService: collaborateurservice, private athentificationService: authentificationservice) { }



  selectedFiles?: any;
  currentFile?: File;
  previewUrl: string | null = null;

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


  upload(email: String): void {

    const formData = new FormData();
    formData.append('file', this.selectedFiles, this.selectedFiles.name);
    this.uploadService.upload(formData, email).subscribe((response) => console.log(response), (error) => console.log(error));

  }


  @ViewChild('addcollaborateurForm') form!: NgForm;



  localdate: Date = new Date();
  value!: string;
  Competence!: Competence[];

  Selectedoption !: Competence;

  options2: string[] = ["Admin", "User"];
  Selectedoption2 !: String;


  ngOnInit(): void {
    this.getAllcompetence();

  }


  getAllcompetence() {

    this.athentificationService.Allcompetences().subscribe((response: Competence[]) => {

      this.Competence = response;
      console.log("options : ", this.Competence);

    }, (error) => {
      console.error(' register error: ', error);
    });
  }

  submitForm() {
    console.log("Selected Competence ID: " + this.form.value.competence.id);



    // Create a new Collaborateur instance and set its properties
    let CollabReq = new Collaborateur();
    CollabReq.nom = this.form.value.nom;
    CollabReq.prenom = this.form.value.prenom;
    CollabReq.email = this.form.value.email;
    CollabReq.password = this.form.value.password;

    // Check if competence exists and assign it properly
    if (this.form.value.competence) {
      let compReq = new Competence();
      compReq.id = this.form.value.competence.id;

      // Assuming competence is an object inside Collaborateur
      CollabReq.competence = compReq;
    }

    console.log("Selected Competence ID: " + CollabReq.competence?.id);

    console.log("Collaborateur to register: ", CollabReq.competence?.titrecompetence, " Email: ", CollabReq.email);


    this.upload(CollabReq.email);
    // Call the register method of the authentication service
    return this.athentificationService.register(CollabReq);


  }


  public onaddCollaborateur(addcollaborateurForm: NgForm) { }

}



