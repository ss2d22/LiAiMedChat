# Layer 1: Use the official Node.js image as the base image
FROM node:21

# Layer 2: Set the working directory to /app
WORKDIR /app

# Layer 3: Copy package.json and package-lock.json (for npm ci, if using package-lock)
COPY package*.json ./

# Layer 4: Install dependencies
# If NODE_ENV is production, install only production dependencies
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "production" ]; then npm install --production; else npm install; fi

# Layer 5: Copy the rest of the application files
COPY . .

# Layer 6: Build the TypeScript files to JavaScript (only for production)
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Layer 7: Expose the app's port (default 3117)
EXPOSE 3117

# Layer 8: Default command to run depending on environment
CMD if [ "$NODE_ENV" = "production" ]; then npm run start; else npm run dev; fi