import express from "express";
import * as urlController from "../controllers/urlController";

const router = express.Router();

router.post("/shorten", urlController.shortenUrl);
router.get("/:shortUrl", urlController.redirectUrl);
router.get("/info/:shortUrl", urlController.getUrlInfo);
router.delete("/delete/:shortUrl", urlController.deleteUrl);
router.get("/analytics/:shortUrl", urlController.getAnalytics);

export default router;
