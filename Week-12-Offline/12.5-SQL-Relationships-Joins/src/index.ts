// write a function to create a users table in your database.
import { Client } from 'pg'
 
const client = new Client({
  connectionString: "postgresql://postgres:Amith@123@localhost:5432/postgres"
})

async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
}

// createUsersTable();

async function insertData(username: string, email: string, password: string) {
    try {
        await client.connect(); // Ensure client connection is established
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);";
        const VALUES = [username, email, password];
        const res = await client.query(insertQuery, VALUES);
        console.log('Insertion success:', res); // Output insertion result
      } catch (err) {
        console.error('Error during the insertion:', err);
      } finally {
        await client.end(); // Close the client connection
      }
}

insertData(
    'arjun',
    'arjun0303@gmail.com',
    'arjun@123'
);