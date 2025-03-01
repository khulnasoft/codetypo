const { execSync } = require("child_process");
const fs = require("fs");

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const dependencies = packageJson.dependencies || {};

const fallbackPackages = {
  "codetypo": "workspace:*"
};

Object.keys(fallbackPackages).forEach((pkg) => {
  try {
    console.log(`Installing ${pkg} from npm...`);
    execSync(`pnpm add ${pkg}`, { stdio: "inherit" });
  } catch (error) {
    if (error.message.includes("404")) {
      console.log(`Package ${pkg} not found on npm, using Git...`);
      execSync(`pnpm add ${fallbackPackages[pkg]}`, { stdio: "inherit" });
    } else {
      console.error(`Error installing ${pkg}:`, error.message);
    }
  }
});
