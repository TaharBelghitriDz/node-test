import { Request, Response } from "express";
import * as urlService from "../services/urlService";

type ControllerFunction = (req: Request, res: Response) => Promise<void>;

export const shortenUrl: ControllerFunction = async (req, res) => {
  const { originalUrl, alias, expiresAt } = req.body;
  const url = await urlService.createShortUrl(originalUrl, alias, expiresAt);
  if (!url) res.status(200).json({ error: "Alias already exist" });
  else res.status(200).json(url);
};

export const redirectUrl: ControllerFunction = async (req, res) => {
  const { shortUrl } = req.params;
  const url = await urlService.getUrl(shortUrl).catch((e) => undefined);
  if (!url) res.status(404).json({ error: "URL not found" });
  else res.redirect(url.originalUrl);
};

export const getUrlInfo: ControllerFunction = async (req, res) => {
  const { shortUrl } = req.params;
  const url = await urlService.getUrlInfo(shortUrl).catch((e) => undefined);
  if (!url) res.status(404).json({ error: "URL not found" });
  else res.status(200).json(url);
};

export const deleteUrl: ControllerFunction = async (req, res) => {
  const { shortUrl } = req.params;
  await urlService.deleteUrl(shortUrl);
  res.sendStatus(200);
};

export const getAnalytics: ControllerFunction = async (req, res) => {
  const { shortUrl } = req.params;
  const analytics = await urlService
    .getAnalytics(shortUrl)
    .catch(() => undefined);

  if (!analytics) res.status(404).json({ error: "URL not found" });
  else res.status(200).json(analytics);
};
