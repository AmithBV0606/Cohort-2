# Deploying Frontend on AWS

## Resources needed to deploy Frontends :

### S3 : Simple Storage Service(S3)

    Amazon S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance.

### CloudFront : Content Delivery Network(CDN's)

    A CDN stands for Content Delivery Network.

    As the name suggests, it’s an optimal way for you to deliver content (mp4 files, jpgs and even HTML/CSS/JS files) to your users.

    Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds.

### It is better than serving it from a VM/EC2 instances because of a few reasons -

1) EC2 machine apprach
<img src="./assets/Pic-1.webp" />

2) CDN approach : <br>
**POP** : Point Of Presence : Caches the frontend/static files
<img src="./assets/Pic-2.webp" />

### Conclusion : 
    1) For frontends, mp4 files, images, Object stores  + CDNs are a better approach.

    2) You can’t use the same for backends, since every request returns a different response. Caching doesn’t make any sense there. 

**NOTE :** 

    You can use edge networks for backends (deploy your backend on various servers on the internet) but data can’t be cached in there.

[Great video on how Hotstar scales their infrastructure during cricket matches (they use CDNs heavily)](https://youtu.be/9b7HNzBB3OQ)

### Steps to deploy Frontends on AWS

**STEP 1** : Signup and get an AWS account. 

**STEP 2** : Make sure you can access S3 and cloudfront (this will automatically happen if you are the root user of that account)

**NOTE :** The following approach will not work for frameworks that use Server side rendering (like Next.js)
This will work for basic React apps, HTML/CSS/JS apps.

### React part :
**STEP 3** : Go to your react project
```bash
cd /link/to/your/react/project
```

**STEP 4** : Build your project
```bash
npm run build
```

**STEP 5** : Try serving the HTML/CSS/JS locally
```bash
npm i -g serve
```
Navigate the dist folder,
```bash
cd .\dist\
```
then,
```bash
serve
```

### AWS S3 :

**STEP 6** : Creating an object store in AWS

    You can create a bucket in there. 
    
    A bucket represents a logical place where you store all the files of a certain project.

<img src="./assets/Pic-3.webp" />
<img src="./assets/Pic-4.webp" />
<img src="./assets/Pic-5.webp" />

**Step 7** : Upload the file bundle to S3
<img src="./assets/Pic-6.webp" />

**NOTE 1 :** Now, if you try to access the website 
<img src="./assets/Pic-7.webp" />

**NOTE 2 :** Your S3 bucket should be blocked by default, and you should allow cloudfront (CDN) to access it.

### AWS CloudFront

**STEP 8** : Connecting Cloudfront

- Go to cloudfront and create a new distribution. A distribution here means you’re creating a place from where content can be distributed.
<img src="./assets/Pic-8.webp" />

- Select your S3 bucket as the source
<img src="./assets/Pic-9.webp" />

**NOTE :** 
Origin Access Control (OAC) is a feature in Cloudfront, which allows you to restrict direct access to the content stored in your origin, such as an Amazon S3 bucket or a web server, ensuring that users can only access the content through the CDN distribution and not by directly accessing the origin URL.

- By the end of this, you should have a working cloudfront URL.
<img src="./assets/Pic-10.webp" />

### Custom Domain

**STEP 9** : Connect your own custom domain by following the given steps :

- Select edit on the root page
<img src="./assets/Pic-11.webp" />

- Attach a domain name to the distribution
<img src="./assets/Pic-12.webp" />

- Create a certificate : Since we want our website to be hosted on HTTPS, we should request a certificate for our domain
<img src="./assets/Pic-13.webp" />

- Follow steps to create the certificate in the certificate manager
<img src="./assets/Pic-14.webp" />
<img src="./assets/Pic-15.webp" />

- Add a CNAME record for the website to point to your cloudfront URL
<img src="./assets/Pic-16.webp" />

### Adding Error Pages

- You will notice a problem, whenever you try to access a route on your page that isn’t the index route (/user/1) , you reach an error page
<img src="./assets/Pic-17.webp" />

- This is because cloudfront is looking for a file /user/1in your S3, which doesn’t exist.

- To make sure that all requests reach index.html, add an error page that points to index.html
<img src="./assets/Pic-18.webp" />
<img src="./assets/Pic-19.webp" />

**NOTE :** You might have to invalidate cache to see this in action.