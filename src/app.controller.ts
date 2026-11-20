import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { newReservationDto } from './reservation.js';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
  }

  @Post('/')
  @Render('index')
  async newReservation(@Body() reservation: newReservationDto){
    const formData = {
      name: reservation.name ?? '',
      email: reservation.email ?? '',
      startDate: reservation.startDate ?? '',
      guests: reservation.guests ?? ''
    }
    const emailRegex = /[a-zA-Z0-9.]+@[a-zA-Z0-9.]+/;
    if (!emailRegex.test(reservation.email.trim())){
      return {
        error: "Hibás vagy hiányzó email", formData
      }
    }
    if (new Date(reservation.startDate).getTime() < new Date().getTime()){
      return {
        error: "Hibás dátum", formData
      }
    }
    
    console.log(new Date(reservation.startDate))
    await this.appService.newReservation(reservation.name,reservation.email,new Date(reservation.startDate).toISOString().slice(0, 19).replace('T', ' '),parseInt(reservation.guests));
    return {error: "Sikeres feltöltés"}


  }
}
