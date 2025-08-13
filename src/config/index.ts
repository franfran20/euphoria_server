import dotenv from "dotenv";
import { Hex } from "viem";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET as string,
  mongoURI: process.env.MONGO_URI as string,
  relayerKey: process.env.RELAYER_KEY as Hex,
};

export default config;
