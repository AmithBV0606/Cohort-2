import { client } from ".";

async function insertUserData(
  username: string,
  email: string,
  password: string
) {
  const insertQuery =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
  const values = [username, email, password];
  const result = await client.query(insertQuery, values);
  if (result) {
    console.log("Insertion successful : ", result);
  }
}

insertUserData("Varun M B", "vmb1221@gmail.com", "vmb@123");