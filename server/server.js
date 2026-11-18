// Алхам 5: Load тест хийх энгийн локал сервер (Node.js-ийн built-in http модуль,
// нэмэлт сан шаардлагагүй).
//
//   GET /      → шууд хариу өгнө (хурдан endpoint)
//   GET /slow  → 100ms хүлээгээд хариу өгнө (удаан endpoint, жишээ нь DB query)
//   GET /cpu   → ~20ms CPU ачаалалтай тооцоолол хийнэ. Node.js нэг thread-тэй
//                тул энэ endpoint зэрэг хүсэлтүүдийг дараалалд оруулж,
//                ачаалал өсөхөд latency огцом нэмэгдэхийг харуулна.
//
// Ажиллуулах: node server/server.js   (порт 3000)
const http = require('http');

const PORT = process.env.PORT || 3000;

function busyWait(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) { /* CPU-г санаатайгаар эзэлнэ */ }
}

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('ok\n');
  } else if (req.url === '/slow') {
    setTimeout(() => res.end('slow ok\n'), 100);
  } else if (req.url === '/cpu') {
    busyWait(20);
    res.end('cpu ok\n');
  } else {
    res.statusCode = 404;
    res.end('not found\n');
  }
});

server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
