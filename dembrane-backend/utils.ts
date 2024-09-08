const db = require("./db.ts");
const crypto = require("crypto");
export async function getUserInfo(userId: string) {
  try {
    const result = await db.query("SELECT * FROM users WHERE uid = $1", [
      userId,
    ]);
    if (result.rows.length !== 0) return result.rows[0];
    else return {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

export function generateUniqueString() {
  return crypto.randomBytes(5).toString("hex"); // 5 bytes = 10 hex characters
}
