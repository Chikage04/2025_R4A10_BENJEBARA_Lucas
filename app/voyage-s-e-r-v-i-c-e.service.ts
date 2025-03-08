import { Injectable } from '@angular/core';
import { DESTINATIONS, DESCRIPTIONS, PRIX } from './data';

export type Voyage = {
  id: string;
  destination: string;
  description: string;
  date: string;
  price: number;
};

@Injectable({
  providedIn: 'root',
})
export class VoyageService {
  private voyages: Voyage[] = [];

  constructor() {
    this.loadVoyages();
  }

  public generateId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  private saveVoyages(): void {
    localStorage.setItem('voyages', JSON.stringify(this.voyages));
  }

  private loadVoyages(): void {
    const storedVoyages = localStorage.getItem('voyages');
    this.voyages = storedVoyages ? JSON.parse(storedVoyages) : this.getDefaultVoyages();
  }

  private getDefaultVoyages(): Voyage[] {
    return [];
  }

  findAll(): Voyage[] {
    return this.voyages;
  }

  findOne(id: string): Voyage | null {
    return this.voyages.find((voyage) => voyage.id === id) ?? null;
  }

  addVoyage(voyage: Omit<Voyage, 'id'>): void {
    const newVoyage: Voyage = { ...voyage, id: this.generateId() };
    this.voyages.push(newVoyage);
    this.saveVoyages();
  }

  deleteVoyage(id: string): void {
    this.voyages = this.voyages.filter((voyage) => voyage.id !== id);
    this.saveVoyages();
  }

  generateRandomVoyage(): Voyage {
    return {
      id: this.generateId(),
      destination: DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)],
      description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
      date: new Date().toISOString().split('T')[0],
      price: PRIX[Math.floor(Math.random() * PRIX.length)],
    };
  }
}
