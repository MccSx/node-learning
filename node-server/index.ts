import * as http from "http";
import * as p from "path";
import * as fs from "fs";
import * as url from "url";

const server = http.createServer();
const publicDir = p.resolve(__dirname, "public");

server.on("request", (request, response) => {
  const { url: path, method, headers } = request;
  const { pathname } = url.parse(path);
  const dirPath = pathname.subStr(1);
  // response.setHeader("Content-Type", "text/html; charset-utf-8");
  fs.readFile(p.resolve(publicDir, dirPath), (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end();
    } else {
      response.end(data.toString());
    }
  });
});

server.listen(8888);
