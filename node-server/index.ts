import * as http from "http";
import * as p from "path";
import * as fs from "fs";

const server = http.createServer();
const publicDir = p.resolve(__dirname, "public");

server.on("request", (request, response) => {
  const { url, method, headers } = request;
  switch (url) {
    case "/index.html":
      fs.readFile(p.resolve(publicDir, "index.html"), (error, data) => {
        if (error) {
          throw error;
        }
        response.end(data.toString());
      });
      break;
    case "/style.css":
      fs.readFile(p.resolve(publicDir, "style.css"), (error, data) => {
        if (error) {
          throw error;
        }
        response.end(data.toString());
      });
      break;
    case "/main.js":
      fs.readFile(p.resolve(publicDir, "main.js"), (error, data) => {
        if (error) {
          throw error;
        }
        response.end(data.toString());
      });
      break;
    default:
      response.end();
      break;
  }
});

server.listen(8888);
