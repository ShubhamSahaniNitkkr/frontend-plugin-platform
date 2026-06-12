import 'dotenv/config';
import { createApp } from './app.js';
import { config } from './config.js';
import { getDb } from './db/database.js';

getDb();

const app = createApp();

app.listen(config.port, () => {
  console.log(`[API] Server running on http://localhost:${config.port}`);
});
