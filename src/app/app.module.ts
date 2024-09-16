import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollaborateursModule } from './components/collaborateurs/collaborateurs.module';
import { AddCollaborateurModule } from './components/add-collaborateur/add-collaborateur.module';
import { NavigationModule } from './components/navigation/navigation.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ProjetsComponent } from './components/projets/projets.component';
import { Table, TableModule } from 'primeng/table';
import { ProjetsModule } from './components/projets/projets.module';
import { DragDropModule } from 'primeng/dragdrop';
import { AjouterProjetComponent } from './components/ajouter-projet/ajouter-projet.component';
import { AjouterProjetModule } from './components/ajouter-projet/ajouter-projet.module';
import { TrimestresComponent } from './components/trimestres/trimestres.component';
import { TrimestresModule } from './components/trimestres/trimestres.module';
import { ViewProjetComponent } from './components/view-projet/view-projet.component';
import { ViewProjetModule } from './components/view-projet/view-projet.module';
import { AffecterCollaborateurComponent } from './components/affecter-collaborateur/affecter-collaborateur.component';
import { AffecterCollaborateurModule } from './components/affecter-collaborateur/affecter-collaborateur.module';
import { EditProjetComponent } from './components/edit-projet/edit-projet.component';
import { EditProjetModule } from './components/edit-projet/edit-projet.module';
import { ViewCollaborateurComponent } from './components/view-collaborateur/view-collaborateur.component';
import { ViewCollaborateurModule } from './components/view-collaborateur/view-collaborateur.module';
import { EditCollaborateurComponent } from './components/edit-collaborateur/edit-collaborateur.component';
import { EditCollaborateurModule } from './components/edit-collaborateur/edit-collaborateur.module';
import { EditActionModule } from './components/edit-action/edit-action.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollaborateursModule,
    AddCollaborateurModule,
    NavigationModule,
    TableModule,
    ProjetsModule,
    DragDropModule,
    AjouterProjetModule,
    TrimestresModule,
    ViewProjetModule,
    AffecterCollaborateurModule,
    EditProjetModule,
    ViewCollaborateurModule,
    EditCollaborateurModule,
    EditActionModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule { }
