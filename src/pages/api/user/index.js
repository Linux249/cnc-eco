import { connectDB } from '../../../lib/api/db';
import { authMiddleware } from '../../../lib/api/middleware';


const user = async (req, res) => {
    const { user, query = {} } = req;
    console.log('Req: /api/user', user);
    if (!user) throw Error('fatal auth error, the middleware should protect this');

    if (req.method === 'GET') {
        const { email, name } = query;
        console.log({ email, name });
        if (!email || !name) return new Error('query missing: email | name');
        // only cic's can add a player name to a members acount
        // check if user is CiC

        // check if player is member of CiCs ally and has request the player name

        // update user

        // user with admin role cann update everything
        const client = await connectDB();
        const db = client.db();
        const users = await db.collection('users');
        const { role } = await users.findOne({ email: user.email });
        // todo add test that creates admin and a non admin user and chek if this works correctly
        const isAdmin = role && role === 'admin';
        console.log('is admin?', isAdmin);

        if (isAdmin) {
            const { result } = await users.updateOne({ email: email }, { $set: { name: name } });
            console.log(result)
        }


        // Process a POST request
        res.setHeader('Content-Type', 'application/json');
        // Handle any other HTTP method

        return res.json({ message: 'user updated' });
    }
    res.status(404);
    return res.end();
};

export default authMiddleware(user);
