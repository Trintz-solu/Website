# EmailJS Integration Guide

This document explains the EmailJS integration for the TRINTZ website contact form and auto-reply functionality.

## Configuration

### EmailJS Credentials
- **Service ID**: `service_n25wl0p`
- **Template ID**: `template_xeahw8u` (Contact form)
- **Auto-Reply Template ID**: `template_xeahw8u` (Same template for auto-reply)
- **Public Key**: `Qy7kySp-clZirkuIt`

### Files Created/Modified

1. **`src/config/emailjs.ts`** - EmailJS configuration and type definitions
2. **`src/services/emailjsService.ts`** - EmailJS service class with methods for sending emails
3. **`src/components/sections/contact-section.tsx`** - Updated contact form to use EmailJS
4. **`src/components/EmailJSTest.tsx`** - Test component for EmailJS functionality
5. **`src/pages/emailjs-test.tsx`** - Test page for EmailJS

## How It Works

### Contact Form Flow
1. User fills out the contact form
2. Form data is validated using Zod schema
3. EmailJS service sends the contact form email to your configured email
4. EmailJS service sends an auto-reply email to the user
5. User receives success/error feedback via toast notifications

### Email Templates

#### Contact Form Template
The contact form sends an email to your configured email address with:
- `{{name}}` - User's name
- `{{email}}` - User's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{time}}` - Timestamp

#### Auto-Reply Template
The auto-reply sends an email to the user with:
- `{{name}}` - User's name
- `{{title}}` - Message subject
- `{{email}}` - User's email

## Usage

### Basic Contact Form
The contact form is already integrated and working. Users can:
1. Fill out the form on the contact page
2. Submit the form
3. Receive confirmation via toast notification
4. Get an auto-reply email

### Testing
To test the EmailJS integration:
1. Navigate to `/emailjs-test` (if you add this route)
2. Use the test component to send test emails
3. Check your email for the contact form message
4. Check the test email address for the auto-reply

### Service Methods

```typescript
// Send contact form only
EmailJSService.sendContactForm(data)

// Send auto-reply only
EmailJSService.sendAutoReply(data)

// Send both contact form and auto-reply
EmailJSService.sendContactWithAutoReply(data)
```

## EmailJS Template Setup

### Contact Form Template
In your EmailJS dashboard, set up the contact form template with these variables:
- `{{name}}` - Sender's name
- `{{email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{time}}` - Timestamp

### Auto-Reply Template
Set up the auto-reply template with these variables:
- `{{name}}` - Recipient's name
- `{{title}}` - Original message subject
- `{{email}}` - Recipient's email

## Troubleshooting

### Common Issues

1. **"Email service not configured" error**
   - Check that all EmailJS credentials are correct
   - Verify the service ID, template ID, and public key

2. **Template variables not working**
   - Ensure template variables in EmailJS dashboard match the code
   - Check for typos in variable names

3. **Auto-reply not sending**
   - Verify the auto-reply template is set up correctly
   - Check that the template ID is correct

4. **CORS errors**
   - EmailJS handles CORS automatically
   - If you see CORS errors, check your EmailJS configuration

### Debug Mode
The integration includes extensive logging. Check the browser console for:
- `📧` - Email sending logs
- `✅` - Success logs
- `❌` - Error logs
- `🔍` - Debug information

## Security Notes

- The public key is safe to expose in frontend code
- EmailJS handles rate limiting and spam protection
- No sensitive data is stored in the frontend

## Next Steps

1. Test the integration thoroughly
2. Customize the email templates in EmailJS dashboard
3. Remove the test component when ready for production
4. Consider adding email validation and spam protection
5. Monitor email delivery rates in EmailJS dashboard

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify EmailJS configuration in the dashboard
3. Test with the provided test component
4. Check EmailJS documentation for template setup
