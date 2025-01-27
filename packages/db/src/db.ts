import { D1Dialect } from "kysely-d1";
import type { DB } from "./schema/db";
import { Kysely } from "kysely";
import { D1Database } from "@cloudflare/workers-types";

export function createKyselyDb(d1Db: D1Database) {
  return new Kysely<DB>({
    dialect: new D1Dialect({ database: d1Db }),
  });
}
