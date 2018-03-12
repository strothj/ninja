import { IMockFileSystem } from "./IMockFileSystem";
import { readFileSync, readFileSync__set } from "./readFileSync";
import { writeFileSync, writeFileSync__get } from "./writeFileSync";

const mockFs: IMockFileSystem = jest.genMockFromModule("fs");
mockFs.readFileSync = readFileSync;
mockFs.readFileSync__set = readFileSync__set;
mockFs.writeFileSync = writeFileSync;
mockFs.writeFileSync__get = writeFileSync__get;

export default mockFs;
