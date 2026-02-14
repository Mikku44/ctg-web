import React from 'react'
import { createAdminNotificationBooking, createBookingEmail, createUserConfirmBooking } from '~/lib/templates/email';
import type { BookingModel } from "~/models/booking";


export default function Test() {
  // Mock data to see how the email looks
  const mockBooking: BookingModel = {
    id: "BK-789234",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    tourName: "Phi Phi Islands Full Day Tour",
    date: "February 25, 2026",
    people: 2,
    totalPrice: 4500,
    currency: "THB",
    hotel: "Marriott Phuket",
    status: "paid"
  };

  const emailHtml = createUserConfirmBooking(mockBooking);
  const emailAdminHtml = createBookingEmail(mockBooking);

  return (
    <>
     <div 
           
           dangerouslySetInnerHTML={{ __html: emailHtml }} 
        />

         <div 
           
           dangerouslySetInnerHTML={{ __html: emailAdminHtml }} 
        />
    </>
  )
}