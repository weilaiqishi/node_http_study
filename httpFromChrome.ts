import { http } from './http'

const net = require("net")

const res = {
  version: "HTTP/1.1",
  status: "200",
  message: "OK",
  headers: {
    date: "Sat, 04 Dec 2021 14",
    connection: "keep-alive",
    "keep-alive": "timeout=5",
    // "content-length": "19",
  },
  body: "<h1> Hello HTTP<h1>"
}

const server = net.createServer(function (connection) {
  console.log("client connected")
  connection.on("data", (data) => {
    const str = data.toString()
    const ahttp = new http()
    ahttp.parse(str)
    console.log(ahttp)
  })
  connection.on("end", function () {
    console.log("客户端关闭连接")
  })
  connection.end(http.formatRes(res))
})
server.listen(3000, function () {
  console.log("server is listening")
})
