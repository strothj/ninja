import fs from "fs";

type IFileSystemModuleType = typeof fs;

type FileSystemModuleOverrides = "readFileSync" | "writeFileSync";

export interface IMockFileSystem
  extends Omit<IFileSystemModuleType, FileSystemModuleOverrides> {
  readFileSync: (path: string, options: string) => string;
  readFileSync__set: (filename: string, fileContents: string) => void;
  writeFileSync: (path: string, data: string, options: string) => void;
  writeFileSync__get: () => { filename: string; fileContents: string };
}

export type IReadFileSync = IMockFileSystem["readFileSync"];
export type IReadFileSyncSet = IMockFileSystem["readFileSync__set"];

export type IWriteFileSync = IMockFileSystem["writeFileSync"];
export type IWriteFileSyncGet = IMockFileSystem["writeFileSync__get"];
