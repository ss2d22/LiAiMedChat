# Layer 1: Base Stage
FROM node:21 AS base

# Layer 2: Set working directory
WORKDIR /app

# Layer 3: Install common dependencies
COPY package*.json ./
RUN npm install

# Layer 4: Development Stage
FROM base AS development

# Layer 5: Install devDependencies
RUN npm install --only=development

# Layer 6: Install nodemon globally for development
RUN npm install -g nodemon

# Layer 7: Copy the rest of the application code
COPY . .

# Layer 8: Expose the development port
EXPOSE 3117

# Layer 9: Command to run the application in development mode
CMD ["npm", "run", "dev"]

# Layer 10: Builder Stage (for Production)
FROM base AS builder

# Layer 11: Copy the application code
COPY . .

# Layer 12: Build the TypeScript code
RUN npm run build

# Layer 13: Production Stage
FROM node:21 AS production

# Layer 14: Set working directory
WORKDIR /app

# Layer 15: Copy package.json and package-lock.json
COPY package*.json ./

# Layer 16: Install only production dependencies
RUN npm install --only=production

# Layer 17: Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Layer 18: Expose the production port
EXPOSE 3117

# Layer 19: Command to run the application in production mode
CMD ["npm", "run", "start"]