const http = require("http")
const https = require("https")

const TARGET = "phenomenonstudio.com"
const PORT = 3000

const server = http.createServer((req, res) => {
  const options = {
    hostname: TARGET,
    port: 443,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: TARGET },
  }

  const proxy = https.request(options, (targetRes) => {
    res.writeHead(targetRes.statusCode, targetRes.headers)
    targetRes.pipe(res, { end: true })
  })

  proxy.on("error", () => {
    res.writeHead(502)
    res.end("Proxy error")
  })

  req.pipe(proxy, { end: true })
})

server.listen(PORT, () => {
  console.log(`Proxying https://${TARGET} → http://localhost:${PORT}`)
})
