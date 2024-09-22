# Layer 1: Use the official Node.js image as the base image
FROM node:21

# Layer 2:  Telling Docker to create a directory called `app` in the container and set it as the working directory.
WORKDIR /app

# Layer 3: Copying the package.json file from the root of the project to the `app` directory in the container.
COPY package*.json ./

# Layer 4: Installing the dependencies listed in the package.json file.
RUN npm install

# Layer 5: Copying all the files from the root of the project to the `app` directory in the container.
COPY . .

# Layer 6: Telling Docker that the container will listen on port 3117.
EXPOSE 3117
#change above to using env and use diff ports before deploying this is just for testing

# Layer 7: Telling Docker to run the `npm run dev` command when the container is started.
CMD ["npm", "run", "dev"]