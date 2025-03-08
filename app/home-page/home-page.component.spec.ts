import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { VoyageService } from '../voyage-s-e-r-v-i-c-e.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    const voyagesServiceMock = {
      findAll: jasmine.createSpy('findAll').and.returnValue([]),
      voyage$: of([])
    };

    await TestBed.configureTestingModule({
      imports: [HomePageComponent, CommonModule],
      providers: [{ provide: VoyageService, useValue: voyagesServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
