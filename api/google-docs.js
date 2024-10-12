const { google } = require('googleapis');
const { OAuth2 } = google.auth;

export default async function handler(req, res) {
    // Initialize OAuth client with credentials
    const oAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    // Set the refresh token for the OAuth client
    oAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const docs = google.docs({ version: 'v1', auth: oAuth2Client });

    try {
        const documentId = '169ilbE9yeAPou4RBwemDf7vR4YZS4s8PefxLQzWmTQw';
        const response = await docs.documents.get({ documentId });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error accessing Google Docs:', error);
        res.status(500).json({ error: 'Failed to access Google Docs' });
    }
}
