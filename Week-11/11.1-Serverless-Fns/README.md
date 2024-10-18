# Serverless Backends

    "Serverless" is a backend deployment in which the cloud provider dynamically manages the allocation and provisioning of servers. The term "serverless" doesn't mean there are no servers involved. Instead, it means that developers and operators do not have to worry about the servers.

### Easier defination
    What if you could just write your express routes and run a command. The app would automatically :

    1) Deploy
    2) Autoscale
    3) Charge you on a per request basis (rather than you paying for VMs)

### Problems with this approach

1) **More expensive at scale**
2) **Cold start problem** : when a serverless function takes longer than expected to start up and respond to a reques

### Famous serverless providers

1) AWS Lambda
2) Google Cloud Functions
3) Cloudflare Worker, etc

### The most impportant question : When should you use a serverless architecture ?

- When you have to get off the ground fast and don’t want to worry about deployments.

- When you can’t anticipate the traffic and don’t want to worry about autoscaling.

- If you have very low traffic and want to optimise for costs.

### Cloudflare workers setup :  

**Workers & Pages** are the serverless offerings from the cloudflare

**Workers** are the names given to the "serverles" service, because we're sort of starting a worker(Mini NodeJs process) in one of their data centers.

<!-- _______________________________________________ -->

# Initializing a worker

#### To create and deploy your application, you can take the following steps : 

**Step 1 :** Create a new Worker project
```bash
npm create cloudflare@latest -- my-first-worker
```
**NOTE :** For setup, select the following options:

- For What would you like to start with?, choose Hello World example.
- For Which template would you like to use?, choose Hello World Worker.
- For Which language do you want to use?, choose JavaScript.
- For Do you want to use git for version control?, choose Yes.
- For Do you want to deploy your application?, choose No (we will be making some changes before deploying).

Now, you have a new project set up. Move into that project folder :
```bash
cd my-first-worker
```

**Step 2 :** Explore package.json dependencies and other files created.
```javascript
"wrangler": "^3.0.0"
```
**NOTE :** Notice express is not a dependency there.

**Step 3 :** Start the worker locally
```bash
npm run dev
```

**Step 4 :** How to return JSON ?
```javascript
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return Response.json({
			message: "hi"
		});
	},
};
```

Official Documentation : [Click here](https://developers.cloudflare.com/workers/get-started/guide/)

**Step 4 :** Deploy your project

```bash
npx wrangler deploy
```