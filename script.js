// Алхам 2: Анхны (baseline) тест.
// Тогтмол тооны виртуал хэрэглэгч (VU) test.k6.io руу хүсэлт илгээж,
// хариу 200 байгаа эсэхийг шалгана. VU бүр хүсэлт хооронд 1 секунд "бодно".
//
// VU ба хугацааг командын мөрөөс өөрчилж болно (Алхам 3):
//   k6 run --vus 30 --duration 1m script.js
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = { vus: 5, duration: '30s' };

export default function () {
  // Тайлбар: test.k6.io нь одоо k6-ийн шинэ дадлагын сайт
  // quickpizza.grafana.com руу 302 redirect хийдэг. k6 redirect-ийг автоматаар
  // дагадаг тул нэг итерацид 2 HTTP хүсэлт (302 + 200) тоологдоно.
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
