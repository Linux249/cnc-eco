'use-strict'

import { Router } from "express"
const router = Router()

import layouts from "./layouts"


router.use("/", layouts)

export default router;
