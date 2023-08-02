const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const oauth2Client = new google.auth.OAuth2(
  
  'http://localhost:3000' // Replace with your redirect URI
);

// Generate the authentication URL for the consent screen
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'], // Access scope for Gmail API
});

console.log('Authorize this app by visiting this URL:', authUrl);
