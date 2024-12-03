# NextAuth

## What is next auth?

1. NextAuth is a library that lets you do authentication in Next.js

2. Can you do it w/o next-auth - Yes

3. Should you - Probably not!

**Popoular choices while doing auth include -**

- External provider 
    - https://auth0.com/
    - https://clerk.com/
    - Firebase auth

- In house using cookies

- NextAuth

## Why not use JWT + localstorage?

Next.js is slightly different from React + Express apps

**Express app :**
<img src="./assets/Pic-1.png" />

**NOTE :** In subsiquent requests, the token is sent to the backend server by using localStorage.getItem("token")

**NextJS app :** 
<img src="./assets/Pic-2.webp" />

## NextAuth : 

- NextAuth library lets you add authentication to your Next.js app. It supports various providers -

    - Login with email
    - Login with google
    - Login with facebook
    - etc

<img src="./assets/Pic-3.webp" />

## Catch all routes : 

If you want to add a single route handler for 

1. `/api/auth/user`

2. `/api/auth/random`

3. `/api/auth/123`

4. `/api/auth/...`

### You can create a catch all route : 

1. Create a simple next.js app : 
```bash
npx create-next-app@latest
```

2. Create `app/api/auth/[...nextauth]/route.ts` :
```ts
import { NextRequest, NextResponse } from "next/server"

export function GET(req: NextRequest) {
    return NextResponse.json({
        message: "Handler"
    })
}
```

3. Try going to a few endpoints : 

    - http://localhost:3000/api/auth/signin
    - http://localhost:3000/api/auth/123
    - http://localhost:3000/api/auth/random/random2

4. Try logging the sub-route you’re at :
```ts
import { NextRequest, NextResponse } from "next/server"

export function GET(req: NextRequest, { params }: { params: { nextauth: string[] } }) {
    console.log(params.nextauth[0])
    return NextResponse.json({
        message: "Handler"
    })
}
```

## Give NextAuth access to a catch-all : 

Ref https://next-auth.js.org/configuration/initialization#route-handlers-app

1. Create `/api/auth/[…nextauth]/route.ts`.

2. Install next-auth
```bash
npm install next-auth
```

3. Updated handler : 
```ts
import NextAuth from "next-auth"

const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }
```

4. Adding providers - There are three broad types of providers

    - OAuth (Login with google)
    - Email (Passwordless Email login via email OTP)
    - Credentials (your own strategy)