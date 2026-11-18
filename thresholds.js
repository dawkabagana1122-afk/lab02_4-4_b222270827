// Алхам 4: SLO-г k6 threshold болгон кодоор шалгуулах.
//
// SLO-г өөрийн baseline-аас гаргасан:
//   baseline p95 = 237ms (results/run-05vu.txt, 5 VU, 1 минут)
//   SLO p95      = 237 × 1.5 ≈ 356ms  — сүлжээний хэвийн хэлбэлзэлд 50% зай үлдээв.
//   SLO error    = 1%-иас бага
//
// Threshold зөрчигдвөл k6 "thresholds on metrics ... have been crossed" гэж бичээд
// 0-ээс ялгаатай exit code (99) буцаана — CI pipeline яг үүгээр quality gate хийдэг.
//
// Орчны хувьсагчаар өөрчилж болно:
//   VUS=5 k6 run thresholds.js             → бага ачаалал
//   P95_MS=50 k6 run thresholds.js         → санаатайгаар хатуу SLO (FAIL харах)
//   TARGET=http://localhost:3000 k6 run thresholds.js → локал сервер
import http from 'k6/http';
import { sleep, check } from 'k6';

const TARGET = __ENV.TARGET || 'https://test.k6.io';
const P95_MS = Number(__ENV.P95_MS || 356);

export const options = {
  vus: Number(__ENV.VUS || 30),
  duration: '1m',
  thresholds: {
    http_req_duration: [`p(95)<${P95_MS}`], // SLO: p95 latency
    http_req_failed: ['rate<0.01'],          // SLO: error rate < 1%
  },
};

export default function () {
  const res = http.get(TARGET);
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
