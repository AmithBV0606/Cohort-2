# ChatGPT answers :

### Question 1 : 

      Let's say I dockerise my code base and the build command i.e (docker build -t <image_tag> .), now I made some changes in my code base and again re-ran the build command, Now 2 images will be created or the previous image will be updated again? 

### Answer : 

**Docker Images** 

When you re-run the docker build command after making changes to your codebase, Docker will create a new image. The previous image will not be updated or overwritten. Here’s why:

**How Docker Handles Builds** :

1. Layered Architecture:

    - Docker images are built in layers based on the commands in the Dockerfile. Each command in the Dockerfile creates a new layer.

   - Docker caches these layers to speed up subsequent builds.

2. Rebuild Behavior:

   - When you re-run the docker build command, Docker compares each layer to see if it can reuse the cached version. If it detects a change in any step, it invalidates the cache for that step and any steps that come after it.

   - This results in a new image being created with a new unique identifier (SHA).

3. Image Tagging:

   - If you use the same `<image_tag>` in docker build -t `<image_tag>`, the new image will overwrite the tag, but the old image still exists in Docker's image history (unless explicitly deleted using docker rmi).

   - Example:
    a) Before rebuild: `my-image:latest` -> `ImageID1`
    b) After rebuild: `my-image:latest` -> `ImageID2`
    c) `ImageID1` will remain in your system until manually removed.

**Key Takeaways :**

- 2 Images Created: Yes, Docker creates a new image for the updated codebase, but only the new one will be tagged (if using the same tag).

- Old Image Exists: The previous image will still exist unless you clean it up using docker rmi.

### Question 2 : 

      When there is an update in the image i.e a codebase, do the existing container built on the same image will also be automatically updated or we have to create a new container using the newly created image?

### Answer : 

When you update an image (e.g., by rebuilding it after changes to the codebase), existing containers built from the original image will not be automatically updated. Containers are created from a specific version (snapshot) of an image, and they remain tied to that version.

To use the updated image, you will need to manually create a new container based on the new image.

**Key Points :**

1. Containers and Images:

   - Containers are like running instances of an image.

   - When you run a container, it is based on the image at the time of creation.

   - If the image changes (e.g., a new image is built), the running container won't reflect those changes.

2. Automatic Updates:

   - Docker does not automatically update running containers to use the new image.

   - This is because containers are isolated and designed to maintain a consistent state once started.

3. Steps to Use the Updated Image:

   - Stop and remove the existing container:
```bash
docker stop <container_id>
docker rm <container_id>
```

   - Start a new container using the updated image:
```bash
docker run <image_tag>
```

4. Rolling Updates with Docker Compose or Kubernetes:

   - For production environments, tools like Docker Compose or Kubernetes are often used to perform rolling updates seamlessly without downtime.

   - Example with Docker Compose:
```bash
docker-compose up --build -d
```
This will rebuild and recreate the containers using the updated image.

5. Benefits of This Design:

   - Keeps running containers stable and unaffected by image updates.

   - Allows developers and operators to control when updates are applied to running containers.

**Summary :**

You must manually create a new container to use the updated image. Existing containers will not automatically update when the image changes.