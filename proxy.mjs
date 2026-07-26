import http from "http"
import https from "https"
import { createGunzip } from "zlib"

const TARGET = "phenomenonstudio.com"
const PORT = 3000

function rewriteSetCookie(cookies) {
  if (!cookies) return cookies
  return cookies.map(c => c.replace(/domain=[^;]+/gi, "").trim())
}

function handleRequest(req, res, isRedirect) {
  const options = {
    hostname: isRedirect || TARGET,
    port: 443,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: isRedirect || TARGET,
      "accept-encoding": "gzip, deflate",
    },
  }

  const proxy = https.request(options, (targetRes) => {
    if ([301, 302, 303, 307, 308].includes(targetRes.statusCode) && targetRes.headers.location) {
      let loc = targetRes.headers.location
      if (loc.startsWith("/")) loc = `https://${TARGET}${loc}`
      const u = new URL(loc)
      if (u.hostname !== TARGET) {
        res.writeHead(targetRes.statusCode, targetRes.headers)
        return targetRes.pipe(res)
      }
      req.url = u.pathname + u.search
      return handleRequest(req, res, u.hostname)
    }

    const headers = { ...targetRes.headers }
    delete headers["content-security-policy"]
    delete headers["x-frame-options"]
    delete headers["strict-transport-security"]
    if (headers["set-cookie"]) headers["set-cookie"] = rewriteSetCookie(headers["set-cookie"])

    res.writeHead(targetRes.statusCode, headers)
    targetRes.pipe(res, { end: true })
  })

  proxy.on("error", (err) => {
    console.error("Proxy error:", err.message)
    res.writeHead(502, { "Content-Type": "text/plain" })
    res.end("Proxy error: " + err.message)
  })

  req.pipe(proxy, { end: true })
}

const server = http.createServer((req, res) => handleRequest(req, res, null))

server.listen(PORT, () => {
  console.log(`Proxying https://${TARGET} → http://localhost:${PORT}`)
})
