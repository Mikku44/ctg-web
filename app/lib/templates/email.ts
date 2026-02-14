import type { BookingModel } from "~/models/booking";

/**
 * Formal, Minimalist User Confirmation
 * Focus on structured hierarchy and utility
 */
export function createUserConfirmBooking(booking: BookingModel) {
  const brandColor = "#FF5733";
  const textDark = "#1A1A1B";
  const textMuted = "#666666";
  const borderColor = "#EEEEEE";

  return `
<div style="background-color: #FFFFFF; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${textDark}; line-height: 1.5;">
  <div style="max-width: 560px; margin: 0 auto; border: 1px solid ${borderColor}; border-radius: 8px; overflow: hidden;">
      <img src="https://www.creativetourguruthailand.com/logo/logo.png" style="width:120px;margin:auto;padding:20px;"></img>
    <div style="padding: 40px 40px 20px;">
      <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 11px; font-weight: 700; color: ${brandColor}; margin: 0 0 12px 0;">Booking Confirmed</p>
      <h1 style="font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">Reservation for ${booking.tourName}</h1>
    </div>

    <div style="padding: 0 40px 40px;">
      <p style="font-size: 15px; color: ${textMuted}; margin-bottom: 32px;">
        Dear <span style="font-weight:700;">${booking.firstName} ${booking.lastName}</span>, your booking is confirmed. Please find your reservation details and check-in instructions below.
      </p>

      <div style="margin-bottom: 32px;">
        <div style=" padding: 12px 0; border-bottom: 1px solid ${borderColor};">
          <span style="font-size: 13px; color: ${textMuted};">Reference ID</span>
          <div style="font-size: 13px; font-weight: 500;">#${booking.id}</div>
        </div>
        <div style=" padding: 12px 0; border-bottom: 1px solid ${borderColor};">
          <span style="font-size: 13px; color: ${textMuted};">Date</span>
          <div style="font-size: 13px; font-weight: 500;">${booking.date}</div>
        </div>
        <div style=" padding: 12px 0; border-bottom: 1px solid ${borderColor};">
          <span style="font-size: 13px; color: ${textMuted};">Travelers</span>
          <div style="font-size: 13px; font-weight: 500;">${booking.people} ${booking.people === 1 ? 'Person' : 'People'}</div>
        </div>
        <div style=" padding: 20px 0; border-bottom: 1px solid ${textDark};">
          <span style="font-size: 14px; font-weight: 600;">Total Paid</span>
          <div style="font-size: 18px; font-weight: 700;">${booking.currency || 'THB'} ${booking.totalPrice.toLocaleString()}</div>
        </div>
      </div>

      <a href="https://www.creativetourguruthailand.com/check-your-booking" 
         style="background-color: ${textDark}; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; display: block; text-align: center; font-size: 14px; margin-bottom: 40px;">
       Browse your booking
      </a>

      <div style="background-color: #F9F9F9; padding: 24px; border-radius: 4px;">
        <h4 style="margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Support & Contact</h4>
        <p style="font-size: 13px; color: ${textMuted}; margin: 0 0 16px;">Need to make changes or have questions? Contact our team via:</p>
        
        <table width="100%">
          <tr>
            <td>
              <a href="https://line.me/ti/p/Z-jqyT7THX" style="color: #06C755; font-size: 13px; font-weight: 600; text-decoration: none;">LINE Official</a>
            </td>
            <td style="text-align: right;">
              <a href="tel:+66615097533" style="color: ${textDark}; font-size: 13px; font-weight: 600; text-decoration: none;">+66 61 509 7533</a>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div style="padding: 24px 40px; border-top: 1px solid ${borderColor}; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #999;">Creative Tour Guru Thailand &copy; 2026</p>
    </div>
  </div>
</div>
`;
}

/**
 * Formal Admin Notification
 * Optimized for quick scanning and data density
 */
export function createAdminNotificationBooking(booking: BookingModel) {
  const adminBlue = "#0055FF";

  return `
<div style="background-color: #F4F4F5; padding: 40px 20px; font-family: -apple-system, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: #FFF; border: 1px solid #E4E4E7; border-radius: 12px;">
    <div style="padding: 24px; border-bottom: 1px solid #F4F4F5;">
      <div style="font-size: 10px; font-weight: 800; color: ${adminBlue}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Operations</div>
      <h2 style="margin: 0; font-size: 18px; font-weight: 600;">New Booking Received</h2>
    </div>

    <div style="padding: 24px;">
      <table width="100%" style="border-collapse: collapse;">
        <tr>
          <td style="padding-bottom: 16px;">
            <div style="font-size: 12px; color: #71717A;">Customer</div>
            <div style="font-size: 14px; font-weight: 500;">${booking.firstName} ${booking.lastName || ''}</div>
          </td>
          <td style="padding-bottom: 16px; text-align: right;">
            <div style="font-size: 12px; color: #71717A;">Revenue</div>
            <div style="font-size: 14px; font-weight: 600; color: #10B981;">${booking.currency || 'THB'} ${booking.totalPrice.toLocaleString()}</div>
          </td>
        </tr>
      </table>

      <div style="background: #F8FAFC; border-radius: 6px; padding: 16px; margin: 8px 0 24px;">
        <div style="margin-bottom: 8px;">
          <span style="font-size: 12px; color: #71717A;">Tour:</span>
          <span style="font-size: 12px; font-weight: 600; margin-left: 8px;">${booking.tourName}</span>
        </div>
        <div>
          <span style="font-size: 12px; color: #71717A;">Date:</span>
          <span style="font-size: 12px; font-weight: 600; margin-left: 8px;">${booking.date}</span>
        </div>
      </div>

      <a href="https://creativetourguruthailand.com/admin/bookings?id=${booking.id}" 
         style="display: block; background: ${adminBlue}; color: #FFF; text-align: center; padding: 12px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
         View Order Details
      </a>
    </div>
  </div>
</div>
`;
}

export function createBookingEmail(booking: BookingModel) {
  const accentColor = "#4F46E5"; // Modern Indigo for "In Progress"
  const textMain = "#1A1A1A";
  const textSub = "#666666";
  const borderColor = "#EEEEEE";

  return `
<div style="background-color: #FFFFFF; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${textMain}; line-height: 1.6;">
  <div style="max-width: 540px; margin: 0 auto; border: 1px solid ${borderColor}; border-radius: 12px; overflow: hidden;">
    
    <div style="padding: 40px 40px 20px;">
      <div style="display: inline-block; background-color: #EEF2FF; color: ${accentColor}; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
        Request Received
      </div>
      <h1 style="font-size: 26px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">Your Booking Request</h1>
      <p style="color: ${textSub}; font-size: 15px; margin-top: 12px;">
        Hi ${booking.firstName}, we have received your request for <strong>${booking.tourName}</strong>. 
        Our team is currently reviewing the availability and will get back to you shortly.
      </p>
    </div>

    <div style="padding: 0 40px 30px;">
      <div style="border-top: 1px solid ${borderColor}; margin-bottom: 30px;">
        <table width="100%" style="border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #FAFAFA;">
              <span style="font-size: 11px; color: ${textSub}; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Reference ID</span>
              <div style="font-size: 14px; font-weight: 500;">#${booking.id}</div>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #FAFAFA; text-align: right;">
              <span style="font-size: 11px; color: ${textSub}; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Status</span>
              <div style="font-size: 14px; font-weight: 600; color: ${accentColor};">Pending Review</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #FAFAFA;">
              <span style="font-size: 11px; color: ${textSub}; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Tour Date</span>
              <div style="font-size: 14px; font-weight: 500;">${booking.date}</div>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #FAFAFA; text-align: right;">
              <span style="font-size: 11px; color: ${textSub}; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Travelers</span>
              <div style="font-size: 14px; font-weight: 500;">${booking.people} Guest(s)</div>
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #F9FAFB; border-radius: 8px; padding: 24px; text-align: center;">
        <p style="margin: 0 0 16px 0; font-size: 13px; color: ${textSub};">For immediate assistance or group inquiries:</p>
        <div style="display: block;">
          <a href="https://line.me/ti/p/Z-jqyT7THX" style="text-decoration: none; color: #00B900; font-size: 14px; font-weight: 600; margin-right: 15px;">
            LINE Official
          </a>
          <span style="color: #DDD;">|</span>
          <a href="tel:+66615097533" style="text-decoration: none; color: ${textMain}; font-size: 14px; font-weight: 600; margin-left: 15px;">
            +66 61 509 7533
          </a>
        </div>
      </div>
    </div>

    <div style="background-color: #FAFAFA; padding: 24px 40px; text-align: center; border-top: 1px solid ${borderColor};">
      <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">
        Creative Tour Guru Thailand
      </p>
    </div>
  </div>
</div>
`;
}