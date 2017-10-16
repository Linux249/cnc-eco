'use-strict'

import { Router } from "express"
const router = Router()

import layouts from "./layouts"
import db from "./db"
import player from "./player"
import ingameData from "./ingameData"


router.use("/", layouts)
router.use("/", db)
router.use("/", player)
router.use("/", ingameData)

export default router;
