import { http } from './http'

const net = require("net")

const req = {
  method: "GET",
  url: "/",
  version: "HTTP/1.1",
  headers: { "user-agent": "curl/7.71.1", accept: "*/*" },
  body: ""
}

console.log(http.format(req))

const client = net.connect(80, "www.baidu.com", () => {
  console.log("连接到服务器！")
  client.write(http.format(req))
})
client.on("data", function (data) {
  console.log(data.toString())
  client.end()
});
client.on("end", function () {
  console.log("断开与服务器的连接")
})