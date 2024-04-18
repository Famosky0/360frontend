export interface bookingSchema {
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
  password: any;  // 'any' type could be replaced with 'string' for better type safety.
  terms_agreement: boolean;
}

export interface OTPDetails {
  email: string;
  otp: number | string;
}

export interface loginProps {
  email: string;
  password: any;  // As with registerProps, consider specifying 'string' instead of 'any'.
}

// Removed planSchema.
