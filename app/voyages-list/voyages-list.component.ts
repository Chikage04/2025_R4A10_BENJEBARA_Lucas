import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VoyageService, Voyage } from '../voyage-s-e-r-v-i-c-e.service';

@Component({
  selector: 'app-voyages-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voyages-list.component.html',
  styleUrls: ['./voyages-list.component.css'],
})
export class VoyagesListComponent implements OnInit, AfterViewInit {
  voyages: Voyage[] = [];
  selectedID: string | null = null;
  currentPage = 1;
  itemsPerPage = 20;

  constructor(
    private readonly voyagesService: VoyageService,
    private readonly router: Router,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.voyages = this.voyagesService.findAll();
    this.updatePaginationButtons();
    this.generateVoyageElements();
  }

  ngAfterViewInit() {
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

    if (confirmDeleteButton && cancelDeleteButton) {
      this.renderer.listen(confirmDeleteButton, 'click', () => this.confirmDeleteVoyage());
      this.renderer.listen(cancelDeleteButton, 'click', () => this.hideDialog());
    }
  }

  generateVoyageElements(): void {
    const ulElement = document.querySelector('.grid');
    if (ulElement) {
      ulElement.innerHTML = '';
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.voyages.slice(start, end).forEach((voyage) => {
        const liElement = this.renderer.createElement('li');

        const destination = this.renderer.createElement('p');
        destination.textContent = `Destination: ${voyage.destination}`;

        const description = this.renderer.createElement('p');
        description.textContent = `Description: ${voyage.description.slice(0, 20)}`;

        const price = this.renderer.createElement('p');
        price.textContent = `Prix: ${voyage.price.toFixed(2)} EUR`;

        const link = this.renderer.createElement('a');
        link.setAttribute('href', `/detail/${voyage.id}`);
        link.textContent = 'Voir plus';
        link.addEventListener('click', (event: MouseEvent) => {
          event.preventDefault();
          this.router.navigate([`/detail/${voyage.id}`]);
        });

        const button = this.renderer.createElement('button');
        button.textContent = 'Supprimer ce voyage';
        button.addEventListener('click', () => this.showDeleteConfirmation(voyage.id));

        this.renderer.appendChild(liElement, destination);
        this.renderer.appendChild(liElement, description);
        this.renderer.appendChild(liElement, price);
        this.renderer.appendChild(liElement, link);
        this.renderer.appendChild(liElement, button);

        this.renderer.appendChild(ulElement, liElement);
      });
    }
    this.updatePaginationButtons();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.generateVoyageElements();
    }
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.voyages.length) {
      this.currentPage++;
      this.generateVoyageElements();
    }
  }

  updatePaginationButtons(): void {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    if (prevButton && nextButton) {
      this.renderer.setStyle(prevButton, 'display', this.currentPage > 1 ? 'inline' : 'none');
      this.renderer.setStyle(nextButton, 'display', (this.currentPage * this.itemsPerPage) < this.voyages.length ? 'inline' : 'none');
    }
  }

  showDeleteConfirmation(id: string): void {
    this.selectedID = id;
    const dialog = document.getElementById('confirmationDialog');
    if (dialog) {
      this.renderer.setStyle(dialog, 'display', 'flex');
    }
  }

  hideDialog(): void {
    const dialog = document.getElementById('confirmationDialog');
    if (dialog) {
      this.renderer.setStyle(dialog, 'display', 'none');
    }
    this.selectedID = null;
  }

  confirmDeleteVoyage(): void {
    if (this.selectedID) {
      this.voyagesService.deleteVoyage(this.selectedID);
      this.voyages = this.voyagesService.findAll();

      if (this.voyages.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage).length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }

      this.generateVoyageElements();
      this.hideDialog();
    }
  }

  trackByFn(index: number, item: Voyage): string {
    return item.id;
  }
}
