import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservations13e',
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async newReservation(name:string,email:string,startDate:string,guests:number){
    const upload = await mysqlConnection.execute(
      'INSERT INTO `reservations`(`name`,`email`,`startDate`,`guests`) VALUES (?,?,?,?);',
      [name,email,startDate,guests]
    )
  }
}
