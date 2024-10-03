import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Collaborateur } from '../../../models/collaborateur';
import { authentificationservice } from '../../../services/authentification.service';
import { Competence } from '../../../models/competence';
import { collaborateurservice } from '../../../services/collaborateurs.service';
import { FileUploadService } from '../../../services/file.service';

@Component({
  selector: 'app-edit-collaborateur',
  templateUrl: './edit-collaborateur.component.html',
  styleUrl: './edit-collaborateur.component.css',
})
export class EditCollaborateurComponent implements OnInit {


  @ViewChild('editcollaborateurForm') form!: NgForm;
  @Input() CollaborateurToEdit !: Collaborateur;

  localdate: Date = new Date();
  value!: string;
  Competence!: Competence[];

  Selectedoption !: Competence;

  options2: string[] = ["admin", "user"];
  Selectedoption2 !: String;

  constructor(private uploadService: FileUploadService, private athentificationService: authentificationservice, private collaborateurService: collaborateurservice) {

  }

  ngOnInit(): void {
    this.getAllcompetence();

  }

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
    if (this.selectedFiles) {


      const formData = new FormData();
      formData.append('file', this.selectedFiles, this.selectedFiles.name);
      this.uploadService.upload(formData, email).subscribe((response) => console.log(response), (error) => console.log(error));
    }
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
    CollabReq.id = this.CollaborateurToEdit.id;
    CollabReq.nom = this.form.value.nom;
    CollabReq.prenom = this.form.value.prenom;
    CollabReq.email = this.form.value.email;
    CollabReq.password = this.form.value.password;
    CollabReq.role = this.form.value.role;
    CollabReq.droitdecongee = this.form.value.droitdecongee;


    // Check if competence exists and assign it properly
    if (this.form.value.competence) {
      let compReq = new Competence();
      compReq.id = this.form.value.competence.id;

      // Assuming competence is an object inside Collaborateur
      CollabReq.competence = compReq;
    }

    console.log("Selected Competence ID: " + CollabReq.competence?.id);

    console.log("Collaborateur to register: ", CollabReq.id, " Email: ", CollabReq.email);
    this.upload(CollabReq.email);
    // Call the register method of the authentication service
    return this.collaborateurService.updatecollaborateur(CollabReq);

  }



  public oneditCollaborateur(editCollaborateurform: NgForm) { }


}
