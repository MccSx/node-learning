import * as http from "http";

const server = http.createServer();

server.on("request", (request, response) => {
  console.log("有请求了");
  response.end("hello");
});

server.listen(8888);
