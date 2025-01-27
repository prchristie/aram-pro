import { D1Dialect } from "kysely-d1";
import type { DB } from "./schema/db";
import { Kysely } from "kysely";
import { BunSqliteDialect } from "kysely-bun-sqlite";
import { Database } from "bun:sqlite";

export function createKyselyDb(dbUrl: string) {
  return new Kysely<DB>({
    dialect: new BunSqliteDialect({ database: new Database(dbUrl) }),
  });
}
