// Алхам 5: Локал сервер (server/server.js) руу хийх load тест.
// Гадаад сүлжээ оролцохгүй тул үр дүн тогтвортой.
//   ENDPOINT=/slow k6 run --vus 30 --duration 30s local.js
import http from 'k6/http';
import { sleep, check } from 'k6';

const URL = `http://localhost:3000${__ENV.ENDPOINT || '/'}`;

export const options = { vus: 5, duration: '30s' };

export default function () {
  const res = http.get(URL);
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
