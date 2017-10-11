'use-strict'

import { Router } from "express"
const router = Router()

import layouts from "./layouts"
import db from "./db"
import player from "./player"


router.use("/", layouts)
router.use("/", db)
router.use("/", player)

export default router;
