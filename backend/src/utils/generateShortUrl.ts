import { uid } from "uid";

const generateShortUrl = (): string => {
  const shortUrl = uid(6);
  return shortUrl;
};

export default generateShortUrl;
