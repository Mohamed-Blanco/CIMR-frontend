import { Component } from '@angular/core';

@Component({
  selector: 'app-view-collaborateur',
  templateUrl: './view-collaborateur.component.html',
  styleUrl: './view-collaborateur.component.css',
})
export class ViewCollaborateurComponent {
  Isopen: boolean = true;
  items: string[] = ['T-1-2024', 'T-2-2024', 'T-3-2024'];
  filteredItems: string[] = [...this.items];
  searchTerm: string = '';
  dropdownstate2: boolean[] = [];
  projets: String[] = ['labiad', 'mohamed'];

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();

    this.filteredItems = this.items.filter((item) =>
      item.toLowerCase().includes(searchTerm),
    );
  }

  Droptablelistmenu(i: number): void {
    if (this.dropdownstate2[i] === true) {
      this.dropdownstate2[i] = false;
      return;
    }

    setTimeout(() => {
      document.getElementById('droplist' + i)?.classList.remove('opacity-0');
    }, 1);

    this.dropdownstate2.fill(false);
    this.dropdownstate2[i] = !this.dropdownstate2[i];
  }

  dropdownbutton(): void {
    this.Isopen = !this.Isopen;

    if (this.Isopen) {
      setTimeout(() => {
        document.getElementById('dropdown-menu')?.classList.remove('opacity-0');
        document.getElementById('dropdown-menu')?.classList.add('opacity-100');
      }, 2);
      return;
    }
    console.log('hey');
    if (!this.Isopen) {
      setTimeout(() => {
        document
          .getElementById('dropdown-menu')
          ?.classList.remove('opacity-100');
        document.getElementById('dropdown-menu')?.classList.add('opacity-0');
      }, 2);
      return;
    }
  }
}
