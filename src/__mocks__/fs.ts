import fs from "fs";
const mockFs: IMockFileSystem = jest.genMockFromModule("fs");

let readFileSyncFilename: string | null = null;
let readFileSyncFileContents: string | null = null;
let writeFileSyncFilename: string | null = null;
let writeFileSyncFileContents: string | null = null;

function mockReadFileSync(path: string, options: string): string {
  if (options !== "utf8") throw new Error('Expected options to be "utf8".');

  if (readFileSyncFilename === null || readFileSyncFileContents === null) {
    throw new Error("readFileSync mock not set");
  }

  if (path !== readFileSyncFilename) {
    throw new Error(
      `Filename did not match expected: ${readFileSyncFilename}.`,
    );
  }

  const fileContents = readFileSyncFileContents;
  readFileSyncFilename = null;
  readFileSyncFileContents = null;
  return fileContents;
}

function setMockReadFileSync(filename: string, fileContents: string) {
  readFileSyncFilename = filename;
  readFileSyncFileContents = fileContents;
}

function mockWriteFileSync(path: string, data: string, options: string) {
  if (options !== "utf8") {
    throw new Error("Expected encoding to be set to utf8");
  }

  writeFileSyncFilename = path;
  writeFileSyncFileContents = data;
}

function getMockWriteFileSync(): { filename: string; fileContents: string } {
  if (writeFileSyncFilename === null || writeFileSyncFileContents === null) {
    throw new Error("writeFileSync was not called");
  }

  const filename = writeFileSyncFilename;
  const fileContents = writeFileSyncFileContents;
  writeFileSyncFilename = null;
  writeFileSyncFileContents = null;
  return { filename, fileContents };
}

mockFs.readFileSync = mockReadFileSync as any;
mockFs.__setReadFileSync = setMockReadFileSync;
mockFs.writeFileSync = mockWriteFileSync as any;
mockFs.__getWriteFileSync = getMockWriteFileSync;

type FSModule = typeof fs;

export interface IMockFileSystem extends FSModule {
  __setReadFileSync: typeof setMockReadFileSync;
  __getWriteFileSync: typeof getMockWriteFileSync;
}

export default mockFs;
