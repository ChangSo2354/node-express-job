import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

const connection = createClient(
    process.env.SUPERBASE_URL,
    process.env.SUPERBASE_KEY
)

// const testConnection = async () => {
//     try {
//         console.log("Connected is success")
//     } catch (err) {
//         console.error('error', err.message);
//     }
// }

// testConnection();

export default connection;