import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  port: Number(process.env.PORT ?? 3001),
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-in-production',
  databasePath:
    process.env.DATABASE_PATH ??
    path.resolve(__dirname, '../../../data/fpp.db'),
  hostVersion: '1.0.0',
};
