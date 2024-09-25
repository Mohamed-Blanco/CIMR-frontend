import { Routes } from '@angular/router';
import { CollaborateursComponent } from './components/collaborateurs/collaborateurs.component';
import { ProjetsComponent } from './components/projets/projets.component';
import { TrimestresComponent } from './components/trimestres/trimestres.component';
import { get } from 'http';
import { ViewProjetComponent } from './components/view-projet/view-projet.component';
import { ViewCollaborateurComponent } from './components/view-collaborateur/view-collaborateur.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { AuthGuard } from '../guards/auth.guard';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomecomponentComponent } from './components/homecomponent/homecomponent.component';
import { CompleterProfilComponent } from './components/completer-profil/completer-profil.component';
import { CapacitiesComponent } from './components/capacities/capacities.component';

const routes: Routes = [
  {
    path: 'Home',
    component: HomecomponentComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'collaborateurs',
        component: CollaborateursComponent,
        children: [
          {
            path: 'viewcollaborateur/:id',
            component: ViewCollaborateurComponent
          },
        ],
      },
      {
        path: 'Planification',
        component: TrimestresComponent,
        children: [{
          path: 'Trimestre/:idTrimestre', component: ProjetsComponent, children: [{
            path: 'viewprojet/:id', component: ViewProjetComponent
          }],
        }],
      },
      {
        path: 'Capacities',
        component: CapacitiesComponent,

      },
      {
        path: 'projets',
        component: ProjetsComponent, children: [{
          path: 'viewprojet/:id', component: ViewProjetComponent
        }],
      },

    ],
  },
  {
    path: 'login',
    component: AuthentificationComponent,

  },

];

export default routes;
