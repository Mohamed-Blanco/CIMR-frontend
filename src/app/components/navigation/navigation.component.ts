import { Component, OnInit } from '@angular/core';
import { SlideMenu } from 'primeng/slidemenu';
import { MenuItem } from 'primeng/api';
import { authentificationservice } from '../../../services/authentification.service';
import { Router } from '@angular/router';
import { Collaborateur } from '../../../models/collaborateur';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  items: MenuItem[] = [];
  collaborateurInformation!: Collaborateur;


  constructor(private authentificationService: authentificationservice, private router: Router) { }

  suprimer: boolean = false;
  logout() {
    this.authentificationService.logout();
    this.router.navigateByUrl('/login');

  }


  getCollaborateurId() {
    this.authentificationService.me().subscribe(
      (response: Collaborateur) => {
        this.collaborateurInformation = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  ngOnInit(): void {

    this.getCollaborateurId();
    this.items = [
      {
        label: 'Files',
        icon: 'pi pi-file',
        items: [
          {
            label: 'Documents',
            icon: 'pi pi-file',
            items: [
              {
                label: 'Invoices',
                icon: 'pi pi-file-pdf',
                items: [
                  {
                    label: 'Pending',
                    icon: 'pi pi-stop',
                  },
                  {
                    label: 'Paid',
                    icon: 'pi pi-check-circle',
                  },
                ],
              },
              {
                label: 'Clients',
                icon: 'pi pi-users',
              },
            ],
          },
          {
            label: 'Images',
            icon: 'pi pi-image',
            items: [
              {
                label: 'Logos',
                icon: 'pi pi-image',
              },
            ],
          },
        ],
      },
    ];
  }
}
