import { Pool } from "pg"

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "livemeet",
    user: "postgres",
    password: "Blaziken-12345",
})

export default pool