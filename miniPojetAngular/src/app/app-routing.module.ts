// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomDetailsComponent } from './room-details/room-details.component'; // Adjust path as needed
import { AccueilComponent } from './accueil/accueil.component';
import { ContactFormComponent } from './contact/contact.component';
import { ProfileComponent } from './user-profile/user-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Redirige vers login par défaut
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home/:userId', component: HomeComponent ,canActivate: [AuthGuard] },// Espace unique basé sur l'ID utilisateur
  { path: 'reservation/:userId', component: ReservationComponent ,canActivate: [AuthGuard]},
  { path: 'room-details/:id', component: RoomDetailsComponent }, // Route avec ID
  { path: 'accueil', component: AccueilComponent },
  { path: 'rooms/:roomId', component: RoomDetailsComponent }, // Define the route
  { path: 'contact', component: ContactFormComponent },
  { path: 'profile/:id', component: ProfileComponent ,canActivate: [AuthGuard]},
  { path: 'update-profile/:id', component: UpdateProfileComponent ,canActivate: [AuthGuard]}, // new route
  { path: 'payment-confirmation/:id', component: PaymentConfirmationComponent ,canActivate: [AuthGuard]},
  


];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

