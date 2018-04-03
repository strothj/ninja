import fs from "fs";
import path from "path";

const logFilenames = ["yarn-error.log", "lerna-debug.log"];
const ignoredDirectories = [".git", "node_modules"];

function removeLogs(currentPath: string = process.cwd()) {
  // tslint:disable-next-line:no-parameter-reassignment
  currentPath = path.resolve(currentPath);

  const items = fs
    .readdirSync(currentPath)
    .map(i => path.resolve(currentPath, i));

  const files = items
    .filter(f => fs.lstatSync(f).isFile())
    .filter(f => logFilenames.includes(path.basename(f)));
  const directories = items
    .filter(d => fs.lstatSync(d).isDirectory())
    .filter(d => !ignoredDirectories.includes(path.basename(d)));

  files.forEach(f => {
    fs.unlinkSync(f);
    console.log(`Removed file: ${f}`);
  });

  directories.forEach(d => removeLogs(d));
}

export default removeLogs;
