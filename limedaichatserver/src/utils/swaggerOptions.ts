import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LiMedAi API Documentation",
      version: "1.0.1",
      description: "API documentation for LiMedAi server for refrence",
    },
    host: `http://localhost:xxxx`,
    basePath: "/",
    servers: [
      {
        url: `http://localhost:xxxx`,
        description: "Development server example",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"],
};

const specs = swaggerJsDoc(swaggerOptions);

console.log("Swagger Options:", swaggerOptions);

const jsonOutputPath = path.join(__dirname, "../docs/openapi.json");
fs.writeFileSync(jsonOutputPath, JSON.stringify(specs, null, 2));

console.log(
  "OpenAPI specification generated in JSON format at:",
  jsonOutputPath
);

export default specs;
