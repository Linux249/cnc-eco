import { authMiddleware } from '../../../lib/api/middleware';

const user = (req, res) => {
    if (req.method === 'POST') {
        // Process a POST request
        res.setHeader('Content-Type', 'application/json');
        // Handle any other HTTP method
        res.json({ message: 'user updated' });
    }
};

export default authMiddleware(user);
