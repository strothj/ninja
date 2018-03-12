import assert from "assert";

export const assertOptionsIsUTF8String = (options: any) =>
  assert.strictEqual(
    options,
    "utf8",
    `Expected options to be "utf8", got "${JSON.stringify(options, null, 2)}".`,
  );
