import { Component } from '@angular/core';

interface Feedback {
  title: string;
  work: string;
  profileImage: string;
  largeText: string;
}

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss'
})
export class CarrouselComponent {
  currentIndex = 0;

  feedback: Feedback[] = [
    {
      title: 'GINTAMA',
      work: 'Travail pour garder sa place de numéro 1\n 12',
      profileImage: 'assets/image (1).gif',
      largeText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially '
    },
    {
      title: 'Dokuzu',
      work: 'Colloration',
      profileImage: 'assets/image (2).png',
      largeText: 'lOREM IPSUM is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially '
    },
    {
      title: 'Remplissage',
      work: "J'aime genshin",
      profileImage: 'assets/image (1).png',
      largeText: 'lOREM IPSUM is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially '
    },
  ];

  currentFeedback = this.feedback[this.currentIndex];

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.feedback.length;
    this.currentFeedback = this.feedback[this.currentIndex];
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.feedback.length) % this.feedback.length;
    this.currentFeedback = this.feedback[this.currentIndex];
  }
}
