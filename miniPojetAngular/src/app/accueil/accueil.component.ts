import { Component, OnInit } from '@angular/core';

interface Slide {
  image: string;
  title: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Feedback {
  name: string;
  avatar: string;
  review: string;
  rating: number;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  slides: Slide[] = [
    { 
      image: 'https://www.alppasa.com/upload/tr/sayfa/44/img/big/sikca-sorulan-sorular-9350f.webp', 
      title: 'Luxury Awaits' 
    },
    { 
      image: 'https://media.architecturaldigest.com/photos/659d9fbfe6cba71cbe6077f6/16:9/w_2560%2Cc_limit/atr.royalmansion-bar-mr.jpg', 
      title: 'Elegant Spaces' 
    },
    { 
      image: 'https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg', 
      title: 'Comfort Redefined' 
    }
  ];

  services: Service[] = [
    {
      icon: 'fa-bed',
      title: 'Luxurious Rooms',
      description: 'Indulge in our meticulously designed rooms with stunning views and premium amenities.'
    },
    {
      icon: 'fa-coffee',
      title: 'Gourmet Dining',
      description: 'Experience culinary excellence with our world-class restaurants and personalized dining.'
    },
    {
      icon: 'fa-spa',
      title: 'Wellness & Spa',
      description: 'Rejuvenate your senses with our state-of-the-art spa and wellness center.'
    }
  ];

  feedbacks: Feedback[] = [
    {
      name: 'Emma Thompson',
      avatar: 'https://static.vecteezy.com/ti/vecteur-libre/p1/25869560-monochrome-femme-avatar-silhouette-utilisateur-icone-vecteur-dans-branche-plat-conception-vectoriel.jpg',
      review: 'An extraordinary experience of luxury and comfort. Every moment was perfect!',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      avatar: 'https://static.vecteezy.com/ti/vecteur-libre/p1/24183502-masculin-avatar-portrait-de-une-jeune-homme-avec-une-barbe-vecteur-illustration-de-masculin-personnage-dans-moderne-couleur-style-vectoriel.jpg',
      review: 'Exceptional service and attention to detail. Truly a world-class hotel.',
      rating: 5
    }
  ];

  currentSlide = 0;
  currentFeedback = 0;

  ngOnInit() {
    this.startSlideshow();
    this.startFeedbackRotation();
  }

  startSlideshow() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000);
  }

  startFeedbackRotation() {
    setInterval(() => {
      this.currentFeedback = (this.currentFeedback + 1) % this.feedbacks.length;
    }, 7000);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}