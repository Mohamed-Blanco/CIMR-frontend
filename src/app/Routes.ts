import { Routes } from '@angular/router';
import { CollaborateursComponent } from './components/collaborateurs/collaborateurs.component';
import { ProjetsComponent } from './components/projets/projets.component';
import { TrimestresComponent } from './components/trimestres/trimestres.component';
import { get } from 'http';
import { ViewProjetComponent } from './components/view-projet/view-projet.component';
import { ViewCollaborateurComponent } from './components/view-collaborateur/view-collaborateur.component';

const routes: Routes = [
  {
    path: 'collaborateurs',
    component: CollaborateursComponent,
    children: [
      { path: 'viewcollaborateur', component: ViewCollaborateurComponent },
    ],
  },
  {
    path: 'projets',
    component: ProjetsComponent
  },
  {
    path: 'Planification',
    component: TrimestresComponent,
    children: [{
      path: 'Trimestre/:idTrimestre', component: ProjetsComponent,
    }],
  },
  {
    path: 'projets/viewprojet/:id',
    component: ViewProjetComponent
  },
  {
    path: 'Planification/:id',
    component: ProjetsComponent,
  }
];

export default routes;
