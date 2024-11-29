# Docker Images 

When you re-run the docker build command after making changes to your codebase, Docker will create a new image. The previous image will not be updated or overwritten. Here’s why:

### How Docker Handles Builds:

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