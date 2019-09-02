import { Router } from 'express';
import Feedback from '../../model/Feedback';

const router = Router();

/**
 * POST GET /api/v1/feedback/new
 */
router.post('/new', async (req, res, next) => {
    console.log('add new feedback');
    const { text, title } = req.body;
    console.log({text, title, body: req.body})

    const feedback = new Feedback({ text, title, from: req.user._id });
    console.log(feedback)

    try {
        await feedback.save();
        res.json({ success: 'Thanks for your feedback' });
    } catch (e) {
        return next(e);
    }
});

/**
 *  GET /api/v1/feedback/all
 */
router.get('/all', async (req, res, next) => {
    try {
        const all = await Feedback.find().populate('from');
        res.json(all);
    } catch (e) {
        return next(e);
    }
});

export default router;
