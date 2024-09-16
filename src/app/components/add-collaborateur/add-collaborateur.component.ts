import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { collaborateurservice } from '../../../services/collaborateurs.service';
import { Collaborateur } from '../../../models/collaborateur';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrl: './add-collaborateur.component.css',
})
export class AddCollaborateurComponent {
  constructor(private CollaborateurService: collaborateurservice) { }

  @ViewChild('addcollaborateurForm') form!: NgForm;

  localdate: Date = new Date();
  value!: string;
  options: string[] = ["Dev NTIC", "Dev AS400 "];
  Selectedoption !: String;

  options2: string[] = ["Admin", "User"];
  Selectedoption2 !: String;


  submitForm() {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
      return this.CollaborateurService.addCollaborateur(this.form.value);
    } else {
      console.log('Form is invalid');
      return null;
    }
  }

  public onaddCollaborateur(addcollaborateurForm: NgForm) { }
}
