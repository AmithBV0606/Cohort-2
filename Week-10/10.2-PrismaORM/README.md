# ORMs

    ORM stands for Object-Relational Mapping, a programming technique used in software development to convert data between incompatible type systems in object-oriented programming languages. 
    
    This technique creates a "virtual object database" that can be used from within the programming language.

    ORMs are used to abstract the complexities of the underlying database into simpler, more easily managed objects within the code.

### Easier definition : 
    ORMs let you easily interact with your database without worrying too much about the underlying syntax (SQL language for eg)

## Benifits of ORM's

- Simpler syntax (converts objects to SQL queries under the hood).
<img src="./assets/Pic-1.webp" />

- Abstraction that lets you flip the database you are using. Unified API irrespective of the DB.
<img src="./assets/Pic-2.webp" />

- Type safety/Auto completion
<img src="./assets/Pic-3.webp" />

- **Automatic migrations** : In case of a simple Postgres app, it’s very hard to keep track of all the commands that were ran that led to the current schema of the table.
<img src='./assets/Pic-4.webp'/>

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL
);

ALTER TABLE users
ADD COLUMN phone_number VARCHAR(15);
```

**NOTE** : As your app grows, you will have a lot of these CREATE  and ALTER  commands.

ORMs (or more specifically Prisma) maintains all of these for you.

# Prisma

    Prisma acts as an ORM (Object-Relational Mapping) tool, simplifying the process of interacting with a database. 

    Instead of writing raw SQL queries, you can use Prisma's intuitive syntax to perform database operations, and Prisma will convert those into SQL queries behind the scenes.

    This "syntactical sugar" allows developers to work more efficiently with databases, avoiding the complexity of raw SQL while maintaining flexibility.

    Additionally, Prisma provides schema management, type safety, and other tools to help with database interactions.

    So, in simple terms, Prisma translates your high-level code into SQL, making the whole process easier and cleaner!

### Benifits of using Prisma : 

- **Data model :** In a single file, define your schema. What it looks like, what tables you have, what field each table has, how are rows related to each other.

- **Automated migrations :** Prisma generates and runs database migrations based on changes to the Prisma schema. 

- **Type Safety :** Prisma generates a type-safe database client based on the Prisma schema.

- **Auto-Complete**

## Installing prisma in a fresh app : 

**Step 1 :** create a project directory and navigate into it.
```bash
mkdir hello-prisma
cd hello-prisma
```

**Step 2 :** initialize a TypeScript project and add the Prisma CLI as a development dependency to it.
```bash
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
```

**Step 3 :** initialize TypeScript.
```bash
npx tsc --init
```

**Step 4 :** Next, set up your Prisma ORM project by creating your Prisma Schema file with the following command.
```bash
npx prisma init
```
**This command does two things:**

- creates a new directory called prisma that contains a file called schema.prisma, which contains the Prisma schema with your database connection variable and schema models

- creates the .env file in the root directory of the project, which is used for defining environment variables (such as your database connection)

**Step 5 :** Connect your database

- To connect your database, you need to set the url field of the datasource block in your Prisma schema to your database connection URL:

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- In this case, the url is set via an environment variable which is defined in .env:

```javascript
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
**NOTE :** You now need to adjust the connection URL to point to your own database.

- The format of the connection URL for your database depends on the database you use. For PostgreSQL, it looks as follows (the parts spelled all-uppercased are placeholders for your specific connection details):

```bash
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

    USER: The name of your database user.

    PASSWORD: The password for your database user.

    HOST: The name of your host name (for the local     environment, it is localhost).

    PORT: The port where your database server is running (typically 5432 for PostgreSQL).

    DATABASE: The name of the database.

    SCHEMA: The name of the schema inside the database.

**Step 6 :** Creating the database schema

- you'll use Prisma Migrate to create the tables in your database. Add the following data model to your Prisma schema in prisma/schema.prisma:

```typescript
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

**Step 7 :** To map your data model to the database schema, you need to use the prisma migrate CLI commands: 

Basically to convert from prisma schema to SQL query, use the following command :

```bash
npx prisma migrate dev --name init
```

- This command does two things:
    - It creates a new SQL migration file for this migration.

    - It runs the SQL migration file against the database.

**Step 8 :** Generating the prisma client

Client represents all the functions that convert : 
```javascript
User.create({email: "harkirat@gmail.com"})
```
Into : 
```sql
INSERT INTO users VALUES('harkirat@gmail.com');
```

**NOTE :** Once you’ve created the `prisma/schema.prisma` , you can generate these `clients`  that you can use in your Node.js app.

### How to generate the client?
```bash
npm install @prisma/client
```

To use prisma client without installing the prisma/client :
```bash
npx prisma generate
```