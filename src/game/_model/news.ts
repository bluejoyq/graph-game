export interface News {
  id: string;
  title: string;
  impact: 'positive' | 'negative';
  triggerTime: number; // 게임 시작 후 몇 초에 등장할지
  duration: number; // 뉴스 표시 지속 시간 (초)
  priceImpact: number; // 주가에 미치는 영향 (%)
}
