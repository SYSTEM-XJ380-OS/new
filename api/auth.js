const CLIENT_ID = '你的GitHub Client ID';
const CLIENT_SECRET = '你的GitHub Client Secret';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '方法不允许' });
    }

    const { code } = req.body;

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: '服务器错误' });
    }
}