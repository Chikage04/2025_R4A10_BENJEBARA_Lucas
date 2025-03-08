import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoyagesListComponent } from './voyages-list.component';
import { CommonModule } from '@angular/common';
import { VoyageService } from '../voyage-s-e-r-v-i-c-e.service';
import { of } from 'rxjs';

describe('VoyagesListComponent', () => {
  let component: VoyagesListComponent;
  let fixture: ComponentFixture<VoyagesListComponent>;

  beforeEach(async () => {
    const voyagesServiceMock = {
      findAll: jasmine.createSpy('findAll').and.returnValue([]),
      deleteVoyage: jasmine.createSpy('deleteVoyage'),
      voyage$: of([])
    };

    await TestBed.configureTestingModule({
      imports: [VoyagesListComponent, CommonModule],
      providers: [{ provide: VoyageService, useValue: voyagesServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoyagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
