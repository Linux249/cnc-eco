import passport from 'passport';
import { Router } from 'express';
import layouts from './layouts';
import db from './db';
import player from './player';
import alliance from './alliance';
import ingameData from './ingameData';
import user from './user';
import layoutsRouter from './layouts/index';

const router = Router();

// unprotected Routes
router.get('/ingameData', ingameData);
router.post('/layouts', layouts);

// TODO that should be higher protected (Admin role)
router.use('/', db);

// AUTH Only for members area
router.use('/', passport.authenticate('jwt', { session: false }));
router.use('/', layoutsRouter);
router.use('/', player);
router.use('/', alliance);

// Protected through login
router.use('/', user);

export default router;
