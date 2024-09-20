import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollaborateursModule } from './components/collaborateurs/collaborateurs.module';
import { AddCollaborateurModule } from './components/add-collaborateur/add-collaborateur.module';
import { NavigationModule } from './components/navigation/navigation.module';
import {
  HTTP_INTERCEPTORS,
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
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { AuthentificationModule } from './components/authentification/authentification.module';
import { AuthInterceptor } from '../services/auth-interceptor.service';
import { HomecomponentComponent } from './components/homecomponent/homecomponent.component';
import { HomecomponentModule } from './components/homecomponent/homecomponent.module';
import { CompleterProfilComponent } from './components/completer-profil/completer-profil.component';

@NgModule({
  declarations: [AppComponent, CompleterProfilComponent],
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
    EditActionModule,
    AuthentificationModule,
    HomecomponentModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, [provideHttpClient(withInterceptorsFromDi())
    ],],
  bootstrap: [AppComponent],
})
export class AppModule { }
