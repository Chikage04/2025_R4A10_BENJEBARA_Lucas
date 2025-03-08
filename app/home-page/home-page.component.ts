import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voyage, VoyageService } from '../voyage-s-e-r-v-i-c-e.service';
import { VoyagesListComponent } from '../voyages-list/voyages-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [VoyagesListComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  voyages: Voyage[] = [];
  selectedID: string | null = null;

  constructor(
    private readonly voyagesService: VoyageService,
    private readonly router: Router,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit() {
    this.voyages = this.voyagesService.findAll();
  }

  ngAfterViewInit() {
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    if (confirmButton && cancelButton) {
      this.renderer.listen(confirmButton, 'click', () => this.onNavigation());
      this.renderer.listen(cancelButton, 'click', () => this.hideDialog());
    }
  }

  onPageButtonClick(id: string) {
    this.selectedID = id;
    this.showDialog();
  }

  showDialog(): void {
    const dialog = document.getElementById('dialogOverlay');
    if (dialog) {
      this.renderer.setStyle(dialog, 'display', 'flex');
      this.renderer.setProperty(document.getElementById('selectedID'), 'textContent', this.selectedID);
    }
  }

  hideDialog(): void {
    const dialog = document.getElementById('dialogOverlay');
    if (dialog) {
      this.renderer.setStyle(dialog, 'display', 'none');
    }
    this.selectedID = null;
  }

  onNavigation(): void {
    if (this.selectedID) {
      this.router.navigate([`/detail/${this.selectedID}`]);
      this.hideDialog();
    }
  }

  trackByFn(index: number, item: Voyage): string {
    return item.id;
  }
}
