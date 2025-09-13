import app from "./src/app.js";
import dotenv from "dotenv";
import { runAlerts } from "./src/services/alertScheduler.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Run alerts every 24h + once at startup
setInterval(runAlerts, 24 * 60 * 60 * 1000);
runAlerts();