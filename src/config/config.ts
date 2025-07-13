import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoose: {
    url: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  pingUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoose: {
    url: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/stockworld",
  },
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET as string,
    expiresIn: "7d",
  },
  pingUrl: process.env.PING_URL || "http://localhost:5000",
};

export default config;
