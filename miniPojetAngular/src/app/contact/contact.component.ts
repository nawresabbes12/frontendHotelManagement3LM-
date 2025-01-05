import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact.component.html',
  styleUrl :'./contact.component.css'
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmitContactForm() {
    if (this.contactForm.valid) {
      this.http.post('http://localhost:8080/api/contact', this.contactForm.value).subscribe({
        next: () => alert('Message envoyé avec succès !'),
        error: (err) => alert('Une erreur s\'est produite.'),
      });
    } else {
      alert('Veuillez remplir correctement le formulaire.');
    }
  }


}
