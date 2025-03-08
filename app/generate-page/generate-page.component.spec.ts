import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratePageComponent } from './generate-page.component';
import { VoyageService } from '../voyage-s-e-r-v-i-c-e.service';
import { of } from 'rxjs';

describe('GeneratePageComponent', () => {
  let component: GeneratePageComponent;
  let fixture: ComponentFixture<GeneratePageComponent>;

  beforeEach(async () => {
    const voyagesServiceMock = {
      addVoyage: jasmine.createSpy('addVoyage'),
      voyage$: of([])
    };

    await TestBed.configureTestingModule({
      imports: [GeneratePageComponent],
      providers: [{ provide: VoyageService, useValue: voyagesServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
