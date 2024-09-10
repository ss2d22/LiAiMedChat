import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// Defne file paths
const jsonFilePath = path.join(__dirname, "../docs/openapi.json");
const yamlFilePath = path.join(__dirname, "../docs/openapi.yml");

const jsonSpec = fs.readFileSync(jsonFilePath, "utf-8");

const jsonObject = JSON.parse(jsonSpec);

const yamlSpec = yaml.dump(jsonObject);

fs.writeFileSync(yamlFilePath, yamlSpec);

console.log("OpenAPI specification converted to YAML format at:", yamlFilePath);
