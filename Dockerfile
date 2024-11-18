# 1. Base Image to start docker app
FROM node:20

# 2. Working Directory
WORKDIR /app

# 3. Copy over files
COPY . .

# 4. Run Commands to build the code
RUN npm install
RUN npm run build
RUN npx prisma generate

# 5. Expose certain Ports
EXPOSE 3000

# Above Commands is for Creating an Image and the below one is for running the Container
CMD [ "node", "dist/index.js" ]

# docker build -t smnthjm-backend-app
