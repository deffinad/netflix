export default async function handler(req, res) {
    const dropboxAccessToken = process.env.NEXT_PUBLIC_DROPBOX_TOKEN; // Store in .env.local
    const dropboxPath = '/netflix.mp4';

    try {
        const response = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${dropboxAccessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ path: dropboxPath })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Dropbox API Error:', errorText);
            return res.status(response.status).json({ error: errorText });
        }

        const data = await response.json();
        return res.json({ url: data.link });
    } catch (error) {
        console.error('Fetch Error:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
