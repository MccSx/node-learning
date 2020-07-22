const db = require("./db.js");

module.exports.add = async name => {
  const list = await db.read();
  list.push({ title: name, done: false });
  await db.write(list);
};

module.exports.clear = async () => {
  await db.write([]);
};
