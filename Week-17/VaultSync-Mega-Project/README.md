# VaultSync  

Building any project : 

<img src="./assets/Pic-4.webp" />

## Points : 

1. **Where to start** : Feature planning

2. **Design UI/UX** : 

    - `UX` - First principles/Copy the biggest website out there.
    - `UI` - Designer. Today there are tools but havent found any good one.

3. **High level Design** :

    - Auth provider
    - Database
    - Backend Stack
    - Frontend stack
    - Modules you’ll have (common/ui/backend)
    - Cloud to deploy to

4. **Low Level Design** :

    - Schema
    - Route signatures
    - Frontend Components - debatable

5. **ER Diagrams** :

    - We can build these today, but usually not needed unless you’re a very visual person.

6. **How to think about features** : 

    - Usually come from product
    - If you’re a founder, then just whatever you think is right.

7. **How much complexity is needed ?**

- Depends on the size of the company. For a startup, whatever helps you move fast w/o tech debt. For a company there are a lot of layers of review to go through.

        💡 If you want a voice speaker that says Paytm Received 100 rs from someone we need to add another ws service in here We’ll also be doing DB polling in the middle which should rather be done via a queue.

## Where to start ? Feature planning : 

1. **User login** :

    - Auth (In this case, probably email/phone)
    - On ramp from bank, off ramp to bank
    - Support transfers via phone number/name
    - Support scanning a QR code for transferring to merchants.

2. **Merchant login** :

    - Login with google
    - Generate a QR Code for acceptance
    - Merchants get an alert/notification on payment
    - Merchant gets money offramped to bank every 2 days

## Design UI/UX : 

- End User
<img src="./assets/Pic-6.webp" />
<img src="./assets/Pic-7.webp" />
<img src="./assets/Pic-8.webp" />
<img src="./assets/Pic-9.webp" />
<img src="./assets/Pic-10.webp" />
<img src="./assets/Pic-11.webp" />
<img src="./assets/Pic-12.webp" />

- Merchant
<img src="./assets/Pic-13.webp" />
<img src="./assets/Pic-14.webp" />
<img src="./assets/Pic-15.webp" />

## Architecture : 

<img src="./assets/Pic-5.webp" />

**Hot paths** :

1. Send money to someone
2. Withdraw balance of merchant
3. Withdraw balance of user back to bank
4. Webhooks from banks to transfer in money
 
**This is ~1 month job for a 2 engineer team.**
We can cut scope in either

1. UI
2. Number of features we support (remove merchant altogether)
3. Number of services we need (merge bank server, do withdrawals directly and not in a queue assuming banks are always up)

## Stack : 

1. Frontend and Backend - Next.js (or Backend)

2. Express - Auxilary backends

3. Turborepo

4. Postgres Database

5. Prisma ORM

6. Tailwind

NOTE : 
<span style="background-color: green" style="">
    Steps taken to bootstrap the app from now on will be project independent. Basically same steps can be used in bootstrapping multiple projects.
</span>

# Bootstrapping the app : 

## Getting started with Turborepo :

1. Initializing an empty Turborepo project :
```bash
 npx create-turbo@latest
```

2. Rename the two Next-apps to the following(This step is only for this project) :

    - user-app
    - merchant-app

## Adding TailwindCSS : [Imp]
```bash
cd apps/user-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

cd ../merchant-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

    💡You can also use https://github.com/vercel/turbo/tree/main/examples/with-tailwind

4. Updating the `tailwind.config.js` :
```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Extra added :  
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Updating the `global.css` : 
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

    💡Ensure tailwind is working as expected.

## Adding prisma : [Imp]

Ref - https://turbo.build/repo/docs/handbook/tools/prisma

1. Create a new `db` folder.

2. Initialise `package.json` and `tsconfig.json` :
```bash
npm init -y
npx tsc --init
```

3. Update `package.json` :
```json
{
    "name": "@repo/db",
    "version": "0.0.0",
    "dependencies": {
        "@prisma/client": "^5.11.0"
    },
    "devDependencies": {
        "prisma": "5.11.0"
    },
    "exports": {
        "./client": "./index.ts"
    }
}
```

4. Update `tsconfig.json` :
```json
{
    "extends": "@repo/typescript-config/react-library.json",
    "compilerOptions": {
      "outDir": "dist"
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

5. Install and Initialize prisma : 
```bash
npm install prisma
npx prisma init
```

6. Start DB locally/on neon.db/on aiven.

7. Update `.env` with the new database URL.

8. Add a basic schema : 
```ts
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

9. Migrate DB : 
```bash
npx prisma migrate dev --name init
```

10. Generate prisma client : 
```bash
npx prisma generate
```

11. Create a `src/index.ts` file and update it with the following : 
```ts
export * from '@prisma/client';
```

12. Try adding `api/user/route.ts` :
```ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adsads"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}
```

## Adding next-auth : [Imp] :

**Database** :

Update the database schema 
```ts
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          Int      @id @default(autoincrement())
  email       String?  @unique
  name        String? 
  number      String  @unique
  password    String
}

model Merchant {
  id          Int     @id @default(autoincrement())
  email       String  @unique
  name        String?
  auth_type   AuthType   
}

enum AuthType {
  Google
  Github
}
```

**User-app** :

- Go to `apps/user-app`. 

- Initialize next-auth
```bash
npm install next-auth
```

- Initialize a simple next auth config in `lib/auth.ts`:
```ts
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" }
        },
        // TODO: User credentials type from next-aut
        async authorize(credentials: any) {
        // Do zod validation, OTP validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
            where: {
                number: credentials.phone
            }
        });

        if (existingUser) {
            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if (passwordValidation) {
                return {
                    id: existingUser.id.toString(),
                    name: existingUser.name,
                    email: existingUser.number
                }
            }
            return null;
        }

        try {
            const user = await db.user.create({
                data: {
                    number: credentials.phone,
                    password: hashedPassword
                }
            });
        
            return {
                id: user.id.toString(),
                name: user.name,
                email: user.number
            }
        } catch(e) {
            console.error(e);
        }

        return null
        },
    })
],
secret: process.env.JWT_SECRET || "secret",
callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
        session.user.id = token.sub

        return session
    }
}
}
``` 

- Create a `/api/auth/[...nextauth]/route.ts` :
```ts
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

- Update `.env` : 
```ts
JWT_SECRET=test
NEXTAUTH_URL=http://localhost:3001
```

- Ensure u see a signin page at http://localhost:3000/api/auth/signin

**Merchant-app** :

- Create `lib/auth.ts` :
```ts
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
}
```

- Create a `/api/auth/[...nextauth]/route.ts` :
```ts
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

- Put your google client and secret in .env of the merchant app. 

- Ref https://next-auth.js.org/providers/google

```ts
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=kiratsecr3t
```

- Ensure u see a signin page at http://localhost:3001/api/auth/signin

- Try signing in and make sure it reaches the DB.

### Add auth :

**Client side** :

- Wrap the apps around `SessionProvider` context from the next-auth package.

- Go to `merchant-app/providers.tsx` :
```ts
"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <SessionProvider>
            {children}
        </SessionProvider>
    </RecoilRoot>
}
```

- Do the same for `user-app/providers.tsx`.
 
**Server side** : 

- Create `apps/user-app/app/api/user/route.ts` :
```ts
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}
```

**Note** : Ensure login works as exptected.

## On Ramping : 

**Creating a dummy bank server** : We need this because we don't have access to real banking API's, to test out features/products.

- Allows PayTM to generate a token for a payment for a user for some amount.
```ts
POST /api/transaction
{
	"user_identifier": "1",
	"amount": "59900", // Rs 599
	"webhookUrl": "http://localhost:3003/hdfcWebhook"
}
```

- PayTM should redirect the user to
```ts
https://bank-api-frontend.com/pay?token={token_from_step_1}
```

- If user made a successful payment, Bank should hit the webhookUrl for the company.

## Adding Express : [Imp] 

**NOTE :** Here, in this project we're using Express.js to create a WebHook(Which is also a Http server).

- Init node.js project + esbuild : 
```bash
cd apps
mkdir bank_webhook_handler
cd bank_webhook_handler
npm init -y
npx tsc --init
npm i esbuild express @types/express
```

- Update `tsconfig.ts` : 
```ts
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
      "outDir": "dist"
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```