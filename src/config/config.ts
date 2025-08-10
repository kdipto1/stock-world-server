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
  corsOrigin: string | string[];
}

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
  corsOrigin: [
    process.env.PORTFOLIO_DOMAIN || "http://localhost:3000",
    "https://stock-world-1.web.app",
  ],
};

export default config;
