import { client } from ".";

async function queryUsersTable(email: string) {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
        console.log("USER FOUND : ", result.rows[0]);
        return result.rows[0];
    } else {
        console.log('No user found with the given email.');
        return null;
    }
  } catch (error) {
    console.log("ERROR : ", error);
  }
}

queryUsersTable("amirao0606@gmail.com");