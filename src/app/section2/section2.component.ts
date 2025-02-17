import { Component } from '@angular/core';

@Component({
  selector: 'app-section2',
  standalone: true,
  imports: [],
  templateUrl: './section2.component.html',
  styleUrl: './section2.component.scss'
})
export class Section2Component {
  services = [
    {
      image: 'assets/repr1.png',
      title: 'Find an Expert',
      description: 'Choose your doctor from thousands of specialist, general, and trusted hospitals'
    },
    {
      image: 'assets/repr2.png',
      title: 'Online Pharmacy',
      description: 'Buy your medicines with our mobile application with a simple delivery system'
    },
    {
      image: 'assets/repr3.png',
      title: 'Consultation',
      description: 'Free consultation with our trusted doctors and get the best recomendations'
    },
    {
      image: 'assets/repr4.png',
      title: 'Details Info',
      description: 'Free consultation with our trusted doctors and get the best recomendations'
    },
    {
      image: 'assets/repr5.png',
      title: 'Emergency care',
      description: 'You can get 24/7 urgent care for yourself or your children and your lovely family'
    },
    {
      image: 'assets/repr6.png',
      title: 'Tracking',
      description: 'Track and save your medical history and health data'
    }
  ];
}
