import { Router } from 'express';
import { easyLvLUp, getBest5Buildings } from '../../../performance';

const router = Router();

// GET // api/v1/player?name=22&w=123
router.post('/performance/base', async (req, res, next) => {
    const { base } = req.body;
    console.log(base)
    // TODO auth require - check alliance, thats means every one can see every member

    // res.json(getBest5Buildings(base));
    res.json(easyLvLUp(base));
});

export default router;
