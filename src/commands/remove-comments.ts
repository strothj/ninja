import fs from "fs";

export default function(filename: string) {
  const fileContents = fs
    .readFileSync(filename, "utf8")
    .replace(/\/\*.*\*\//g, "")
    .split("\n")
    .map(line => (line.trim().startsWith("//") ? "" : line))
    .filter(line => line.trim() !== "")
    .concat("")
    .join("\n");

  fs.writeFileSync(filename, fileContents, "utf8");
}
