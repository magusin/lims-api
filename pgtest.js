import pg from "pg"

const client = new pg.Client({
  host: "ep-proud-unit-ab9sr641.eu-west-2.aws.neon.tech",
  user: "neondb_owner",
  password: "Tnpg_Ofenma78JNPF",
  database: "neondb",
  port: 5432,
  ssl: { rejectUnauthorized: false }
})

async function run() {
  await client.connect()
  console.log("connected")
  const res = await client.query("SELECT NOW()")
  console.log(res.rows)
  await client.end()
}

run()