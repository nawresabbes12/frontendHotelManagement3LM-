import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';

interface RoomType {
  id: number;
  name: string;
}

interface Room {
  id: number;
  type: string;
  // Add other room properties as needed
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  roomTypes: RoomType[] = [];
  selectedType: string = '';
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRoomTypes();
  }

  // Load room types
  loadRoomTypes(): void {
    this.roomService.getRoomTypes().subscribe({
      next: (types: RoomType[]) => {
        this.roomTypes = types;
        
        // If you want to automatically load rooms of the first type
        if (types.length > 0) {
          this.selectedType = types[0].name;
          this.loadRoomsByType();
        }
      },
      error: (err) => {
        console.error('Error loading room types', err);
        // Optional: Add user-friendly error handling
        // For example, show a toast or alert
      }
    });
  }

  // Load rooms by selected type
  loadRoomsByType(): void {
    if (this.selectedType) {
      this.roomService.getRoomsByType(this.selectedType).subscribe({
        next: (rooms: Room[]) => {
          this.rooms = rooms;
        },
        error: (err) => {
          console.error('Error loading rooms', err);
          // Optional: Add user-friendly error handling
          this.rooms = []; // Clear rooms on error
        }
      });
    }
  }
}