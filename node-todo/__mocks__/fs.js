const fs = jest.genMockFromModule("fs");
const _fs = jest.requireActual("fs");

Object.assign(fs, _fs);

const mocks = {};

fs.setMock = (path, error, data) => {
  mocks[path] = [error, data];
};

fs.readFile = (path, option, callback) => {
  if (callback === undefined) {
    callback = option;
  }
  if (path in mocks) {
    callback(...mocks[path]);
  } else {
    _fs.readFile(path, option, callback);
  }
};

module.exports = fs;
