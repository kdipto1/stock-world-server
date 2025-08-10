import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoose: {
    url: string;
    dbName: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  firebase: {
    projectId: string;
    privateKey: string;
    clientEmail: string;
  };
  pingUrl: string;
  corsOrigin: string[];
}

// Normalize a single origin by trimming and removing trailing slashes and wildcard suffixes
const normalizeOrigin = (origin: string): string => {
  if (!origin) return origin;
  let trimmed = origin.trim();
  if (trimmed.endsWith("/*")) {
    trimmed = trimmed.slice(0, -2);
  }
  while (trimmed.length > 0 && trimmed.endsWith("/")) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed;
};

// Parse allowed origins from env. Supports comma-separated list in CORS_ORIGINS.
const parseAllowedOriginsFromEnv = (): string[] => {
  const envList = process.env.CORS_ORIGINS || process.env.PORTFOLIO_DOMAIN || "";
  if (!envList) return [];
  return envList
    .split(",")
    .map((item) => normalizeOrigin(item))
    .filter((item) => Boolean(item));
};

const defaultAllowedOrigins: string[] = [
  process.env.PORTFOLIO_DOMAIN || "http://localhost:10000",
  "https://stock-world-1.web.app",
];

const allowedOrigins = (() => {
  const fromEnv = parseAllowedOriginsFromEnv();
  const list = fromEnv.length > 0 ? fromEnv : defaultAllowedOrigins;
  // Ensure uniqueness and normalized values
  const unique = Array.from(new Set(list.map((o) => normalizeOrigin(o))));
  return unique;
})();

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoose: {
    url: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017",
    dbName: process.env.MONGODB_DB_NAME || "stockWorld",
  },
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET as string,
    expiresIn: "7d",
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ) as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
  },
  pingUrl: process.env.PING_URL || "http://localhost:5000",
  corsOrigin: allowedOrigins,
};

export default config;
