import assert from "assert";
import { assertOptionsIsUTF8String } from "./assertOptionsIsUTF8String";
import { IWriteFileSync, IWriteFileSyncGet } from "./IMockFileSystem";

let writeFileSync__filename: string | null = null;
let writeFileSync__fileContents: string | null = null;

export const writeFileSync: IWriteFileSync = (path, data, options) => {
  assertOptionsIsUTF8String(options);

  writeFileSync__filename = path;
  writeFileSync__fileContents = data;
};

export const writeFileSync__get: IWriteFileSyncGet = () => {
  assert.ok(writeFileSync__filename, "writeFileSync was not called.");

  const response = {
    fileContents: writeFileSync__fileContents as string,
    filename: writeFileSync__filename as string,
  };

  writeFileSync__filename = null;
  writeFileSync__fileContents = null;

  return response;
};
