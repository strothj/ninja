import tsconfigWithComments from "./__fixtures__/tsconfig-with-comments";
import removeComments from "./remove-comments";

jest.mock("fs");

beforeEach(() => {
  setReadFileSyncMock();
});

it("removes comments", () => {
  removeComments("tsconfig.json");
  const result = getWriteFileSyncMock();
  expect(result.filename).toEqual("tsconfig.json");
  expect(result.fileContents).toMatchSnapshot();
});

function setReadFileSyncMock() {
  require("fs").default.readFileSync__set(
    "tsconfig.json",
    tsconfigWithComments,
  );
}

function getWriteFileSyncMock(): { filename: string; fileContents: string } {
  return require("fs").default.writeFileSync__get();
}
