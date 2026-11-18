// Алхам 3: Ачааллыг шатлан өсгөх (ramping) туршилт.
// VU-ийн тоо 5 → 30 → 100 → 0 болж өөрчлөгдөнө. Энэ нэг ажиллуулалт нь
// төгсгөлд НЭГТГЭСЭН ганц summary өгдөг тул түвшин тус бүрийн p95-ыг
// салгаж харуулахгүй — хүснэгтийн тоог run-05vu/30vu/100vu.txt-ээс авсан.
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // халаалт
    { duration: '1m', target: 30 },   // өсгөлт
    { duration: '30s', target: 100 }, // оргил
    { duration: '30s', target: 0 },   // буулт
  ],
};

export default function () {
  const res = http.get('https://test.k6.io'); // → quickpizza.grafana.com руу redirect
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
