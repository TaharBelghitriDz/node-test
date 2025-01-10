import React from "react";
import { Button, Input, Card, Spacer, Link } from "@nextui-org/react";
import useFetch from "../hooks/useFetch";

type ShortenUrlResponse = {
  originalUrl: string;
  shortUrl: string;
  alias?: string;
  createdAt: string;
  error?: string;
};

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = React.useState("");
  const [alias, setAlias] = React.useState<string>();
  const [aliasError, setAliasError] = React.useState<string | null>(null);
  const [shortUrl, setShortUrl] = React.useState("");
  const { loading, error, fetchData } = useFetch<ShortenUrlResponse>();

  const handleShortenUrl = async () => {
    if (alias && (alias.length < 6 || alias.length > 20)) {
      setAliasError("Alias must be between 6 and 20 characters.");
      return;
    }
    setAliasError(null);
    try {
      const response = await fetchData("http://localhost:3000/api/shorten", {
        method: "POST",
        body: JSON.stringify({ originalUrl, alias }),
      });
      if (response.error) setAliasError(response.error);
      else setShortUrl(response.shortUrl);
    } catch (err) {
      console.error("Error shortening URL:", err);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 bg-zinc-900 shadow-lg rounded-3xl">
      <span className="text-center mb-4 text-white">URL Shortener</span>
      <Spacer y={1} />
      <Input
        fullWidth
        placeholder="Enter original URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="mb-4"
        color="default"
        variant="flat"
      />
      <Spacer y={1} />
      <Input
        fullWidth
        placeholder="Enter custom alias (optional)"
        value={alias}
        onChange={(e) => {
          setAlias(e.target.value);
          if (
            e.target.value &&
            (e.target.value.length < 6 || e.target.value.length > 20)
          ) {
            setAliasError("Alias must be between 6 and 20 characters.");
          } else {
            setAliasError(null);
          }
        }}
        className="mb-4"
        color="default"
        variant="flat"
      />
      <Spacer y={1} />
      {aliasError && (
        <span color="error" className="text-sm text-red-400 mb-2">
          {aliasError}
        </span>
      )}
      <Button
        onClick={handleShortenUrl}
        disabled={loading}
        className="w-full"
        color="primary"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </Button>
      <Spacer y={3} />

      {shortUrl && (
        <Card className="p-4 bg-zinc-700 rounded-2xl">
          <span className="text-center text-white">
            Short URL:{" "}
            <Link
              href={`http://localhost:3000/api/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              .../{shortUrl}
            </Link>
          </span>
        </Card>
      )}

      {error && (
        <span color="error" className="text-center mt-4 text-red-400">
          {error}
        </span>
      )}
    </Card>
  );
};

export default UrlShortener;
