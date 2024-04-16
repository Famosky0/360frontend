export interface bookingSchema {
  phone: string;
  plan: string;
  shoot_type: string;
  location: string;
  amount: string;
  number_of_shoot: number;
  shooting_date: string;
  shooting_time: string;
}

export interface profileSchema {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface calculateSchema {
  number_of_shoot: number;
}

export interface photoDetails {  
  cover_image: string;
  delivery_date: string;  
  id:string;
  project_name: string;
  url:string
}

export interface fetchBookingSchema {
  id: string;
  created_at: string;
  delivery_status: string;
  location: string;
  number_of_shoot: number;
  payment_status: string;
  plan: string;
  price: string;
  shoot_type: string;
  shooting_date: string;
  shooting_time: string;
}

export interface bookingOverviewSchema {
  images_total: number;
  pending_bookings: number;
  recent_bookings: fetchBookingSchema;
  recently_viewed_images: any;
  total_bookings: number;
}

export interface adminBookingOverviewSchema {
  pending_bookings: number;
  completed_bookings: number;
  processing_bookings: number;
  recent_bookings: Array<[]>;
  recently_delivered: Array<[]>;
}

export interface bankDetailsSchema {
  account_name: string;
  account_number: string;
  bank_name: string;
}

export interface registerProps {
  first_name: string;
  last_name: string;
  email: string;
  password: any;
  terms_agreement: boolean;
}

export interface OTPDetails {
  email: string;
  otp: number | string;
}

export interface loginProps {
  email: string;
  password: any;
}

export interface planSchema {
  name: string;
  price: string;
  desc: string;
}
