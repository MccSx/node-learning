const db = require("../db");
const fs = require("fs");
jest.mock("fs");

describe("db", () => {
  it("can read", async () => {
    fs.setMock(
      "/aaa",
      null,
      JSON.stringify([{ title: "taskName", done: false }])
    );
    const data = await db.read("/aaa");
    expect(data).toStrictEqual([{ title: "taskName", done: false }]);
  });
});
