import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VoyageService } from '../voyage-s-e-r-v-i-c-e.service';
import { DESTINATIONS, DESCRIPTIONS, PRIX } from '../data';
import { Voyage } from '../voyage-s-e-r-v-i-c-e.service';

@Component({
  selector: 'app-generate-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generate-page.component.html',
})
export class GeneratePageComponent {
  generatedVoyage: Voyage | null = null;

  constructor(
    private readonly voyagesService: VoyageService,
    private readonly router: Router
  ) {}

  generateVoyage(): void {
    const destination = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
    const price = PRIX[Math.floor(Math.random() * PRIX.length)];

    this.generatedVoyage = {
      id: this.voyagesService.generateId(),
      destination,
      description,
      price,
      date: new Date().toISOString().split('T')[0],
    };
  }

  validateVoyage(): void {
    if (this.generatedVoyage) {
      this.voyagesService.addVoyage(this.generatedVoyage);
      this.router.navigate([`/`]);
    }
  }
}
