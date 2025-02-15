export interface Reservation {
  id: string;
  car_id: string;
  user_email: string;
  start_date: Date;
  end_date: Date;
  total: number;
}
