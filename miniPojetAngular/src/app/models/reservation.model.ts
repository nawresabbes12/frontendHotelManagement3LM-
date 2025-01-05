export interface Reservation {
  userId: string;
  roomType: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  roomId: string; // Identifiant unique de la chambre
  amount: number;
  id: string;
  paymentStatus?: string;
  paymentTime?: string;
}
