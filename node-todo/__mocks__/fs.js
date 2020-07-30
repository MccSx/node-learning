const fs = jest.genMockFromModule("fs");
const _fs = jest.requireActual("fs");

Object.assign(fs, _fs);

let readMocks = {};
let writeMocks = {};

fs.setReadMock = (path, error, data) => {
  readMocks[path] = [error, data];
};

fs.setWriteMock = (path, fn) => {
  writeMocks[path] = fn;
};

fs.readFile = (path, option, callback) => {
  if (callback === undefined) {
    callback = option;
  }
  if (path in readMocks) {
    callback(...readMocks[path]);
  } else {
    _fs.readFile(path, option, callback);
  }
};

fs.writeFile = (path, data, option, callback) => {
  if (callback === undefined) {
    callback = option;
  }
  if (path in writeMocks) {
    writeMocks[path](path, data, option, callback);
  } else {
    _fs.writeFile(path, data, option, callback);
  }
};

fs.clearMocks = () => {
  readMocks = {};
  writeMocks = {};
};

module.exports = fs;
