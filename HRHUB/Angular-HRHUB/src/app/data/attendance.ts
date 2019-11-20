import { Time } from '@angular/common';

export interface Attendance{
    ID: number;
    Date: Date; 
    CheckIn: Time; 
    CheckOut: Time;
    Status: string;
}