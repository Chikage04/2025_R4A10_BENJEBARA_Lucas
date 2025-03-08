import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voyage, VoyageService } from '../voyage-s-e-r-v-i-c-e.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit, AfterViewInit {
  id!: number;
  voyage: Voyage | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly voyagesService: VoyageService,
    private readonly router: Router,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.voyage = this.voyagesService.findOne(idParam);
    }

    if (!this.voyage) {
      this.router.navigate(['/404']);
    }
  }

  ngAfterViewInit() {
    const confirmButton = document.getElementById('confirmDeleteButton');
    const cancelButton = document.getElementById('cancelDeleteButton');

    if (confirmButton && cancelButton) {
      this.renderer.listen(confirmButton, 'click', () => this.confirmDeleteVoyage());
      this.renderer.listen(cancelButton, 'click', () => this.hideDeleteConfirmation());
    }
  }

  showDeleteConfirmation(): void {
    const dialog = document.getElementById('confirmationDialog');
    if (dialog) {
      this.renderer.setStyle(dialog, 'display', 'flex');
    }
  }

  hideDeleteConfirmation(): void {
    const dialog = document.getElementById('confirmationDialog');
    if (dialog) {
      this.renderer.setStyle(dialog, 'display', 'none');
    }
  }

  confirmDeleteVoyage(): void {
    if (this.voyage) {
      this.voyagesService.deleteVoyage(this.voyage.id);
      this.router.navigate(['/']); // Redirige vers la page d'accueil après la suppression
    }
    this.hideDeleteConfirmation();
  }
}
