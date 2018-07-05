'use-strict'

import { Router } from "express"
const router = Router()

import layouts from "./layouts"
import db from "./db"
import player from "./player"
import alliance from "./alliance"
import ingameData from "./ingameData"


router.use("/", layouts)
router.use("/", db)
router.use("/", player)
router.use("/", alliance)
router.use("/", ingameData)

export default router;
