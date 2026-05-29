import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type DevUnityDb = NeonHttpDatabase<typeof schema>;

let dbInstance: DevUnityDb | null = null;

function getDb(): DevUnityDb {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not defined");
    }

    const sql = neon(databaseUrl);
    dbInstance = drizzle({ client: sql, schema });
  }

  return dbInstance;
}

export const db = new Proxy({} as DevUnityDb, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});

export type Database = DevUnityDb;
