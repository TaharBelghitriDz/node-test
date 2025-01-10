import Url, { IUrl } from "../models/urlModel";
import generateShortUrl from "../utils/generateShortUrl";

export const createShortUrl = async (
  originalUrl: string,
  alias?: string,
  expiresAt?: Date
): Promise<IUrl | undefined> => {
  const shortUrl = alias || generateShortUrl();

  return await Url.findOne({ alias: shortUrl }).then(async (url) => {
    if (url) return;

    const newUrl = new Url({ originalUrl, shortUrl, alias, expiresAt });
    return await newUrl.save();
  });
};

export const getUrl = async (shortUrl: string): Promise<IUrl | null> => {
  const url = await Url.findOne({ shortUrl });
  if (url) {
    url.clickCount += 1;
    await url.save();
  }
  return url;
};

export const getUrlInfo = async (shortUrl: string): Promise<IUrl | null> => {
  return await Url.findOne({ shortUrl });
};

export const deleteUrl = async (shortUrl: string): Promise<void> => {
  await Url.deleteOne({ shortUrl });
};

export const getAnalytics = async (
  shortUrl: string
): Promise<{ clickCount: number; recentIps: string[] } | undefined> => {
  const url = await Url.findOne({ shortUrl });
  if (!url) return;
  const recentIps = url.clicks.slice(-5).map((click) => click.ip);
  return { clickCount: url.clickCount, recentIps };
};
