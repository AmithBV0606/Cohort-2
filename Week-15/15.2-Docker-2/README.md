# Introduction to Docker Continuation 

## Layers in Docker : 

- In Docker, layers are a fundamental part of the image architecture that allows Docker to be efficient, fast, and portable. 

- A Docker image is essentially built up from a series of layers, each representing a set of differences from the previous layer.

<img src="./assets/Pic-1.webp" />

#### How layers are made -

1. **Base Layer :** 
The starting point of an image, typically an operating system (OS) like Ubuntu, Alpine, or any other base image specified in a Dockerfile.

2. **Instruction Layers :** 
Each command in a Dockerfile creates a new layer in the image. These include instructions like RUN, COPY, which modify the filesystem by installing packages, copying files from the host to the container, or making other changes. Each of these modifications creates a new layer on top of the base layer.

3. **Reusable & Shareable :** 
Layers are cached and reusable across different images, which makes building and sharing images more efficient. If multiple images are built from the same base image or share common instructions, they can reuse the same layers, reducing storage space and speeding up image downloads and builds.

4. **Immutable :** 
Once a layer is created, it cannot be changed. If a change is made, Docker creates a new layer that captures the difference. This immutability is key to Docker's reliability and performance, as unchanged layers can be shared across images and containers.

## Layers practically : 

For a simple Node.js app - https://github.com/100xdevs-cohort-2/week-15-live-2

**Dockerfile**

<img src="./assets/Pic-2.webp" />

**Logs** 

<img src="./assets/Pic-3.webp" />

**Observations -**

1. Base image creates the first layer.

2. Each `RUN`, `COPY` , `WORKDIR`  command creates a new layer.

3. Layers can get re-used across docker builds (notice CACHED in 1/6).

**Note :** Any layer cached while running, the previous layers will also be cached.

Any layer after an uncached layer, those layers will also not be cached.

## Why layers?

If you change your Dockerfile, layers can get re-used based on where the change was made.

    💡 If a layer changes, all subsequent layers also change.

**Case 1 - You change your source code**
<img src="./assets/Pic-4.webp" />

**Logs**
<img src="./assets/Pic-5.webp" />

**Case 2 - You change the package.json file (added a dependency)**
<img src="./assets/Pic-6.webp" />

**Logs**
<img src="./assets/Pic-7.webp" />

**Thought experiment**

1. How often in a project do you think dependencies change ?

2. How often does the npm install layer need to change?

3. Wouldn’t it be nice if we could cache the npm install step considering dependencies don’t change often?

## Optimising Dockerfile : 

What if we change the Dockerfile a bit - 

<img src="./assets/Pic-8.webp" />

**Note :** The files that gets changed very often is the one which should run in the end and before the final build.

**Reason behind the changes :**

1. We first copy over only the things that npm install and npx prisma generate need.

2. Then we run these scripts.

3. Then we copy over the rest of the source code.

**Case 1 - You change your source code (but nothing in package.json/prisma)**
<img src="./assets/Pic-9.webp" />

**Case 2 - You change the package.json file (added a dependency)**
<img src="./assets/Pic-10.webp" />

## Volumes and Networks : 

**Volumes and Networks** are concepts that become important when you have multiple containers running in which you

1. Need to persist data across docker restarts.

2. Need to allow containers to talk to each other.

<img src="./assets/Pic-11.webp" />

    💡 We didn’t need networks until now because when we started the mongo container, it was being accessed by a Node.js process running directly on the machine.

<img src="./assets/Pic-12.webp" />

## Volumes : 

If you restart a mongo docker container, you will notice that your data goes away. 

This is because docker containers are transitory (they don’t retain data across restarts)

**Without volumes** : 

1. Start a mongo container locally.

```bash
docker run -p 27017:27017 -d mongo
```

2. Open it in MongoDB Compass and add some data to it.

3. Kill the container

```bash
docker kill <container_id>
```

4. Restart the container.

```bash
docker run -p 27017:27017 -d mongo
```

**Note :** Try to explore the database in Compass and check if the data has persisted (it wouldn’t)

**With volumes** : 

1. Create a volume

```bash
docker volume create volume_database
```

2. Mount the folder in mongo which actually stores the data to this volume

```bash
docker run -v volume_database:/data/db -p 27017:27017 mongo
```

3. Open it in MongoDB Compass and add some data to it

4. Kill the container

```bash
docker kill <container_id>
```

5. Restart the container

```bash
docker run -v volume_database:/data/db -p 27017:27017 mongo
```

**Note :** Try to explore the database in Compass and check if the data has persisted (it will!)

<img src="./assets/Pic-13.webp" />

## Network : 

In Docker, a network is a powerful feature that allows containers to communicate with each other and with the outside world.

- Docker containers can’t talk to each other by default.

- localhost on a docker container means it's own network and not the network of the host machine.

<img src="./assets/Pic-14.webp" />

### How to make containers talk to each other?

Attach them to the same network :

1. Clone the repo - https://github.com/100xdevs-cohort-2/week-15-live-2.2

2. Then open the command prompt 

3. Create a network
```bash
docker network create <Network_name>
```

4. Start mongo conatiner and attach it to the network created in the 3rd step 
```bash
docker run -d -v volume_database:/data/db --name <Container name> --network <Network_name> -p 27017:27017 mongo
```

5. Then open the Vs Code's terminal.

6. Go the place where the url to the database is present in the source code and replace the `localhost` and `port` number with the container name and the respective `port` of the mongo container.

7. Build the image
```bash
docker build -t image_tag .
```

8. Start the backend process with the network attached to it
```bash
docker run -d -p 3000:3000 --name <Container_name> --network <Network_name> image_tag
```

9. Check the logs to ensure the db connection is successful
```bash
docker logs <container_id>
```

#### Things to do after connecting both the containers to the same network : 

- Try to visit an endpoint and ensure you are able to talk to the database.

- If you want, you can remove the port mapping for mongo since you don’t necessarily need it exposed on your machine

<img src="./assets/Pic-15.webp" />

### Types of networks

- **Bridge** : The default network driver for containers. When you run a container without specifying a network, it's attached to a bridge network. It provides a private internal network on the host machine, and containers on the same bridge network can communicate with each other.

- **Host** : Removes network isolation between the container and the Docker host, and uses the host's networking directly. This is useful for services that need to handle lots of traffic or need to expose many ports.