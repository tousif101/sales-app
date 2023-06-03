import nextConnect from 'next-connect';
import axios from 'axios';

const handler = nextConnect();

handler.get(async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[2];

        // Fetch transcripts and recordings from Zoom API here
        const response = await axios.get('https://api.zoom.us/v2/users/me/recordings', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log(response.data);
            res.status(200).json(response.data.meetings);
        } else {
            res.status(500).json({ error: 'Unable to fetch data from Zoom API' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

export default handler;
