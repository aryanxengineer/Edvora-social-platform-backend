import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "./env.js";
// CONFIGURATION (MONOLITH SAFE)
const MAX_RETRIES = 5;
const BASE_RETRY_DELAY_MS = 2000;
// INTERNAL STATE (SINGLETON)
let isConnected = false;
let retryCount = 0;
// CORE CONNECTION FUNCTION
const connectMongo = async () => {
    if (!MONGO_URI) {
        console.error("[DB] MONGO_URI missing. Application cannot start.");
        process.exit(1);
    }
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: `${NODE_ENV === "production" ? "Databse_Edvora" : "development_db"}`,
            // Pooling (Monolith tuned)
            maxPoolSize: 20, // concurrent requests
            minPoolSize: 5, // warm pool
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            // Stability
            retryWrites: true,
            writeConcern: { w: "majority" },
        });
        isConnected = true;
        retryCount = 0;
        console.log("[DB] MongoDB connected");
    }
    catch (error) {
        retryCount++;
        console.error(`[DB] Connection failed (attempt ${retryCount}/${MAX_RETRIES})`, error);
        if (retryCount >= MAX_RETRIES) {
            console.error("[DB] Max retries exceeded. Shutting down.");
            process.exit(1);
        }
        const delay = BASE_RETRY_DELAY_MS * Math.pow(2, retryCount);
        await new Promise((res) => setTimeout(res, delay));
        await connectMongo();
    }
};
// CONNECTION EVENT HANDLERS
mongoose.connection.on("connected", () => {
    console.log("[DB] Event: connected");
});
mongoose.connection.on("reconnected", () => {
    console.warn("[DB] Event: reconnected");
});
mongoose.connection.on("disconnected", () => {
    isConnected = false;
    console.warn("[DB] Event: disconnected");
});
mongoose.connection.on("error", (err) => {
    console.error("[DB] Event: error", err);
});
// GRACEFUL SHUTDOWN (MONOLITH)
const shutdownMongo = async () => {
    if (!isConnected)
        return;
    console.log("[DB] Closing MongoDB connection...");
    await mongoose.connection.close(false);
    process.exit(0);
};
process.on("SIGINT", shutdownMongo);
process.on("SIGTERM", shutdownMongo);
process.on("SIGUSR2", shutdownMongo);
export default connectMongo;
//# sourceMappingURL=mongodb.js.map