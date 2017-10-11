'use-strict'

import { Router } from "express"
const router = Router()

import layouts from "./layouts"
import db from "./db"


router.use("/", layouts)
router.use("/", db)

export default router;
