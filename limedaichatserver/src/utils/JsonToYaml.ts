import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// Defne file paths
/**
 * Path to the JSON file containing the OpenAPI specification.
 * @author Sriram Sundar
 *
 * @type {String}
 */
const jsonFilePath: string = path.join(__dirname, "../docs/openapi.json");

/**
 * Path to the YAML file where the converted OpenAPI specification will be saved.
 * @author Sriram Sundar
 *
 * @type {String}
 */
const yamlFilePath: string = path.join(__dirname, "../docs/openapi.yml");

/**
 * The content of the JSON file as a string.
 * @author Sriram Sundar
 *
 * @type {String}
 */
const jsonSpec: string = fs.readFileSync(jsonFilePath, "utf-8");

/**
 * The JSON object parsed from the JSON file content.
 * @author Sriram Sundar
 *
 * @type {object}
 */
const jsonObject: object = JSON.parse(jsonSpec);

/**
 * The YAML string generated from the JSON object.
 * @author Sriram Sundar
 *
 * @type {string}
 */
const yamlSpec: string = yaml.dump(jsonObject);

fs.writeFileSync(yamlFilePath, yamlSpec);

console.log("OpenAPI specification converted to YAML format at:", yamlFilePath);
