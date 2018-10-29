'use-strict';

import { Router } from 'express';
const router = Router();

import layouts from './layouts';
import db from './db';
import player from './player';
import alliance from './alliance';
import ingameData from './ingameData';
import user from './user';

router.use('/', layouts);
router.use('/', db);
router.use('/', player);
router.use('/', alliance);
router.use('/', ingameData);

// Protected through login
router.use('/', user);

export default router;
