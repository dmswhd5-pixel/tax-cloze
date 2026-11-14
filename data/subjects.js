// 과목 목록. 새 과목을 열려면: data/<id>.js 파일을 만들고 아래 항목의 ready를 true로, file을 채운다.
window.TAX_SUBJECTS = [
  { id: "gukgi",   name: "국세기본법",   desc: "모든 세목에 공통으로 적용되는 규칙", file: "data/gukgi.js", ready: true },
  { id: "gukjing", name: "국세징수법",   desc: "고지 · 독촉 · 압류 · 매각 · 배분", file: "data/gukjing.js", ready: true },
  { id: "sodeuk",  name: "소득세법",     desc: "개인의 종합 · 퇴직 · 양도소득", file: "", ready: false },
  { id: "beobin",  name: "법인세법",     desc: "익금 · 손금 · 세무조정", file: "", ready: false },
  { id: "bugase",  name: "부가가치세법", desc: "과세거래 · 영세율 · 세금계산서", file: "", ready: false }
];
