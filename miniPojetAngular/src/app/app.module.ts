// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Assurez-vous que RouterModule est importé
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReservationComponent } from './reservation/reservation.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RoomDetailsComponent } from './room-details/room-details.component'; // Import your component
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact/contact.component'; // Import your component
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileComponent } from './user-profile/user-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import this
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { AdminSideComponent } from './admin-side/admin-side.component';
import { RoomsComponent } from './rooms/rooms.component';



@NgModule({
  declarations: [
    AccueilComponent,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ReservationComponent,
    AccueilComponent,
    RoomDetailsComponent,
    ContactFormComponent,
    ProfileComponent,
    UpdateProfileComponent,
    PaymentConfirmationComponent,
    AdminSideComponent,
    RoomsComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'reservations', component: ReservationComponent },
    ]), // Ajoutez RouterModule ici avec vos routes
    AppRoutingModule, // Ajout du module de routage
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,    
    
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    AuthGuard,
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
