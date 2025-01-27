SCRIPT_DIR=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)
ROOT=$(realpath "$SCRIPT_DIR/..")

cat ${ROOT}/sql/create_aram_pro_db.sql | sqlite3 local.db;
DATABASE_URL=local.db bunx kysely-codegen --out-file ${ROOT}/src/schema/db.d.ts;
rm local.db;