# Actionable Docker 

## Docker

Docker is a powerful platform that serves several purposes in the development, deployment, and running of applications. Below are the reasons why it is used:

- **Containerization of Applications**: Docker allows you to package your application and its dependencies into a container, which is a lightweight, standalone, and executable software package. This containerization ensures that the application runs consistently across different computing environments, from development to staging to production.

- **Running Other People's Code and Packages**: With Docker, you can easily run software and applications built by others without worrying about setting up the required environment or dependencies. This is because all the necessary components are included within the container.

- **Running Common Software Packages**: Docker provides the ability to run common software packages, such as databases (MongoDB, PostgreSQL, etc.), within containers. This means you can quickly deploy and manage these services without the need to install and configure them directly on your host machine.

**NOTE :** Docker lets you create containers, which are nothing but mini machines with their own networks and file system

### Container :
- A Docker container is a standalone, executable package of software that contains all the components needed to run an application.

- Container is nothing but an Image in execution.

### Images : 
- A Docker image is a file that contains the instructions and files needed to create a Docker container.

- A Docker image is a read-only template that contains the source code, libraries, dependencies, tools, and other files required for an application to run in a Docker container. 

### Official definition : 
- A container image is a standardized package that includes all of the files, binaries, libraries, and configurations to run a container.

- For a PostgreSQL image, that image will package the database binaries, config files, and other dependencies. For a Python web app, it'll include the Python runtime, your app code, and all of its dependencies

**There are two important principles of images:**

- Images are **immutable**. Once an image is created, it can't be modified. You can only make a new image or add changes on top of it.

- Container images are composed of layers. Each layer represented a set of file system changes that add, remove, or modify files.

**NOTE :** Think of `images` as a CD drive which you borrowed from your friend, through which you can install Windows OS on your machine.

### Docker Hub : 
- Docker registries are similar to version control repositories for code, such as GitHub or GitLab, but instead of code, they store Docker images. 
    
- Docker images are the blueprints for creating Docker containers, which include the application and all of its dependencies.

- Docker Hub is the default registry for Docker and is analogous to GitHub in the context of Docker images.
    
- It's a cloud-based repository where users can sign up for an account, push their custom images, pull images published by others, and work with automated build workflows.

### Common Docker Commands : 

The commands listed are part of the basic Docker `CLI` (Command Line Interface) operations that allow you to manage Docker containers.

1) `docker run <Image_Name>` : 
    - This command is used to create and start a Docker container from a specified image. 

    - It's like saying "start this application" in the Docker world. 

    - For example, docker run mongo starts a MongoDB container using the official MongoDB image from Docker Hub.

2) `docker ps` : 
    - This command lists all currently running containers, much like the ps command in Unix-based systems that shows running processes. 

    - It's like looking at a list of active applications on your computer.

3) `docker kill <container_id>` : 
    - This command stops a running container immediately.
 
    - It's similar to force-quitting an application on your computer.

### Running an image : 

1) Pulling a simple image : 

Let’s say you wan’t to run MongoDB locally https://hub.docker.com/_/mongo

```bash
docker pull mongo:latest
```

This will pull the mongo image using which you can create containers.

```bash
docker run mongo
```

<img src="./assets/Pic-1.webp" />

**NOTE :** You will notice you can’t open it in MongoDB Compass.

<img src="./assets/Pic-2.webp" />

**NOTE :** That's because, the container running inside your machine has it's own ports and operating systems, which operates independently of your machine. 

That's why we have to add `port mapping`.

2) Adding a port mapping : 

```bash
docker run -p 27017:27017 mongo
```

<img src="./assets/Pic-3.webp" />

**Starting in detached mode** : Adding -d will ensure it starts in the background.

```bash
docker run -d -p 27017:27017 mongo
```

3) Inspecting a container : 

```bash
docker ps
```

**NOTE :** This will show you all the containers you are running.

4) Stopping a container : 

```bash
docker kill <container_id>
```
**NOTE :** This Will stop the container that you are running.

#### In the end, this is the flow of commands : 
<img src="./assets/Pic-4.webp" />

### For starting a postgres container : 

1) **Pull PostgreSQL image** :

```bash
docker pull postgres:latest
```

**NOTE :** If downloading image in your machine is successfully completed then you can verify.

```bash
docker images -a
```

2) **Run Container** :

```bash 
docker run --name <container_name> -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

Where :
- `name` : Allows you to assign a container name
- `-e ` : This flag lets you specify an environment variable.

**NOTE :** By default postgres image has default `postgres` user and password `mysecretpassword`.
  
- `-p ` : Port mapping.
- `-d ` : This flag is used to detach the container from our terminal and run it in the background.

**NOTE :** There are two ways of running a container — in attached mode (in the foreground) or in detached mode (in the background).

By default, Docker runs the container in attached mode. Meaning it’s attached to the terminal session, where it displays output and messages.



3) **SSH'ing to the container through CLI** :
```bash
docker exec -it <container_id/container_name> /bin/bash
```

This will let us to connect to container throgh CLI

Then give the credentials as following : 
```bash
psql -h localhost -d postgres -U postgres
```

#### The connection string for this postgres would be :
```bash
postgresql://postgres:mysecretpassword@localhost:5432/postgres
```

#### Connection string syntax : 

```bash
postgresql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>
```

### Articles about pulling Postgre image and creating the postgres container :

Link 1 : [Click Here](https://medium.com/@basit26374/how-to-run-postgresql-in-docker-container-with-volume-bound-c141f94e4c5a)

Link 2 : [Clicke Here](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)