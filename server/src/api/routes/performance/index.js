import { Router } from 'express';
import { getBest5Buildings } from '../../../performance';

const router = Router();

// GET // api/v1/player?name=22&w=123
router.get('/base', async (req, res, next) => {
    const { base } = req.body;
    // TODO auth require - check alliance, thats means every one can see every member

    res.json(getBest5Buildings(base));
});

export default router;
