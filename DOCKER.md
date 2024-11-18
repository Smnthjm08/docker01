
# Docker Setup for Backend Application

This section covers how to containerize your backend application using Docker.

## 1. **Create Dockerfile**

In the root of your project, create a `Dockerfile` with the following content:

```Dockerfile
# 1. Base Image to start Docker app
FROM node:20

# 2. Working Directory
WORKDIR /app

# 3. Copy over files
COPY . .

# 4. Run Commands to build the code
RUN npm install
RUN npm run build
RUN npx prisma generate

# 5. Expose the port for the application
EXPOSE 3000

# Command to start the app
CMD [ "node", "dist/index.js" ]
```

### Explanation of Dockerfile

- **FROM node:20**: Uses the official Node.js version 20 image.
- **WORKDIR /app**: Sets `/app` as the working directory inside the container.
- **COPY . .**: Copies all the files from your local directory to the `/app` directory inside the container.
- **RUN npm install**: Installs the NPM dependencies inside the container.
- **RUN npm run build**: Builds the TypeScript code.
- **RUN npx prisma generate**: Generates the Prisma client.
- **EXPOSE 3000**: Exposes port `3000` to be used by the container.
- **CMD ["node", "dist/index.js"]**: Runs the compiled code when the container starts.

---

## 2. **Create .dockerignore**

Create a `.dockerignore` file to exclude unnecessary files and directories from the Docker image:

```txt
node_modules
dist
prisma/migrations
```

This will ensure that Docker doesn't include these files in the image, keeping it clean and smaller.

---

## 3. **Build Docker Image**

After creating the `Dockerfile` and `.dockerignore`, build the Docker image with the following command:

```bash
docker build -t backend .
```

### Explanation

- `docker build`: Builds the Docker image.
- `-t backend`: Tags the image as `backend`.
- `.`: Specifies the current directory as the build context.

---

## 4. **Run Docker Container**

Once the Docker image is built, run the container using the following command:

```bash
docker run -p 3000:3000 backend
```

### Explanation

- `docker run`: Runs the Docker container.
- `-p 3000:3000`: Maps port `3000` on your local machine to port `3000` in the container.
- `backend`: Specifies the image name (the one you tagged earlier).

This command will start the backend application inside the container, making it accessible on `http://localhost:3000`.

---

## 5. **Stopping the Container**

To stop the running Docker container, use the following command:

```bash
docker stop <container_id>
```

You can find your container ID by running:

```bash
docker ps
```

---

## 6. **Troubleshooting Port Conflicts**

If you encounter a port conflict (e.g., `port 3000 is already allocated`), you can run the container on a different port. For example:

```bash
docker run -p 3001:3000 backend
```

This will map port `3001` on your local machine to port `3000` inside the container.

To check if a port is already in use on your system, you can run:

```bash
lsof -i :3000   # macOS/Linux
netstat -ano | findstr :3000  # Windows (PowerShell)
```

If a process is using the port, you can stop it using:

```bash
kill <PID>   # macOS/Linux
taskkill /PID <PID> /F   # Windows
```

---

That's it! You've successfully set up Docker for your backend application.
