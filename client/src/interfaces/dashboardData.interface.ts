import type { IUserBookingData } from "./userBookingData.interface";

export interface IDashboardData {
  totalBookings: number;
  totalRevenue: number;
  bookings: IUserBookingData[];
}
