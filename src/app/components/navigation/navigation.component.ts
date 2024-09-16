import { Component, OnInit } from '@angular/core';
import { SlideMenu } from 'primeng/slidemenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): void {
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
