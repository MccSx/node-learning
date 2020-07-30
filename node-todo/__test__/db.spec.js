const db = require("../db");
const fs = require("fs");
jest.mock("fs");

describe("db", () => {
  it("can read", async () => {
    fs.setReadMock(
      "/aaa",
      null,
      JSON.stringify([{ title: "taskName", done: false }])
    );
    const data = await db.read("/aaa");
    expect(data).toStrictEqual([{ title: "taskName", done: false }]);
  });
  it("can write", async () => {
    let fakeFile;
    fs.setWriteMock("/bbb", (path, data, option, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [{ title: "taskName2", done: false }];
    await db.write(list, "/bbb");
    expect(fakeFile).toBe(JSON.stringify(list));
  });
});
