import assert from "assert";
import { assertOptionsIsUTF8String } from "./assertOptionsIsUTF8String";
import { IReadFileSync, IReadFileSyncSet } from "./IMockFileSystem";

let readFileSync__filename: string | null = null;
let readFileSync__fileContents: string | null = null;

export const readFileSync: IReadFileSync = (path, options) => {
  assertOptionsIsUTF8String(options);

  assert.ok(
    readFileSync__filename && readFileSync__fileContents,
    "readFileSync mock not set.",
  );
  assert.strictEqual(
    path,
    readFileSync__filename,
    `"path" did not match expected: "${readFileSync__filename}", got: "${path}".`,
  );

  const fileContents = readFileSync__fileContents as string;
  readFileSync__filename = null;
  readFileSync__fileContents = null;
  return fileContents;
};

export const readFileSync__set: IReadFileSyncSet = (filename, fileContents) => {
  readFileSync__filename = filename;
  readFileSync__fileContents = fileContents;
};
