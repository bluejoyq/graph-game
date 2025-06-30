import type { News } from '../game/_model/news';
import type { StockData } from '../game/_model/stock';

export const parseCSV = async (csvPath: string): Promise<StockData[]> => {
  const response = await fetch(csvPath);
  const text = await response.text();
  const lines = text.split('\n');
  const data: StockData[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;

    const columns = line.split(',');
    if (
      columns.length >= 6 &&
      columns[0] &&
      columns[1] &&
      columns[2] &&
      columns[3] &&
      columns[4] &&
      columns[5]
    ) {
      data.push({
        date: columns[0],
        open: parseFloat(columns[1]),
        high: parseFloat(columns[2]),
        low: parseFloat(columns[3]),
        close: parseFloat(columns[4]),
        volume: parseInt(columns[5]),
      });
    }
  }

  return data;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// 뉴스 시스템 추가
export const newsVariations = {
  positive: [
    '🚀 테슬라 신모델 사전예약 돌풍',
    '💰 테슬라 분기 매출 신기록 달성',
    '🔋 혁신적인 배터리 기술 특허 획득',
    '🌟 자율주행 기술 상용화 앞당겨져',
    '📊 애널리스트 목표주가 상향 조정',
    '⚡ 슈퍼차저 네트워크 확장 가속화',
    '🏆 올해의 전기차 브랜드 선정',
    '🌍 글로벌 친환경 정책 수혜 기대',
  ],
  negative: [
    '⚠️ 테슬라 리콜 사태 확산 우려',
    '📉 중국 시장 판매량 급감',
    '🔧 생산라인 가동중단 장기화',
    '⛽ 원자재 가격 급등으로 수익성 악화',
    '🏭 경쟁사 전기차 점유율 확대',
    '❄️ 겨울철 배터리 성능 이슈 부각',
    '💸 FSD 기능 개발비용 급증',
    '🚗 자율주행 사고 논란 재점화',
  ],
};

// 게임용 뉴스 생성 (랜덤한 개수와 타이밍)
export function generateGameNews(): News[] {
  const news: News[] = [];
  const newsCount = 2 + Math.floor(Math.random() * 4); // 2-5개 랜덤
  const gameDuration = 300; // 5분

  // 랜덤한 타이밍 생성 (30초 후부터 게임 끝 30초 전까지)
  const timings: number[] = [];
  for (let i = 0; i < newsCount; i++) {
    const randomTime = 30 + Math.random() * (gameDuration - 60); // 30초~270초
    timings.push(randomTime);
  }
  timings.sort((a, b) => a - b); // 시간순 정렬

  for (let i = 0; i < newsCount; i++) {
    const isPositive = Math.random() > 0.4; // 60% 확률로 긍정 뉴스
    const impact = isPositive ? 'positive' : 'negative';
    const messages = newsVariations[impact];
    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)] || '📰 테슬라 관련 소식';

    news.push({
      id: `news_${i + 1}`,
      title: randomMessage,
      impact,
      triggerTime: Math.floor(timings[i] || 60 + i * 60), // 기본값 제공
      duration: 6 + Math.floor(Math.random() * 6), // 6-11초
      priceImpact: isPositive
        ? 3 + Math.random() * 8 // +3% ~ +11%
        : -(2 + Math.random() * 6), // -2% ~ -8%
    });
  }

  return news;
}

// 현재 시간에 표시될 뉴스 확인
export function getCurrentNews(currentTime: number, news: News[]): News | null {
  for (const newsItem of news) {
    if (
      currentTime >= newsItem.triggerTime &&
      currentTime <= newsItem.triggerTime + newsItem.duration
    ) {
      return newsItem;
    }
  }
  return null;
}

// 뉴스 예고 확인 (뉴스 시작 1초 전 = 4틱 전)
// 게임 속도가 0.25초마다 틱이므로 1초 = 4틱
export function getNewsPreview(currentTime: number, news: News[]): News | null {
  const PREVIEW_TIME = 1.0; // 1초 전(4틱 전)부터 예고 시작

  for (const newsItem of news) {
    if (currentTime >= newsItem.triggerTime - PREVIEW_TIME && currentTime < newsItem.triggerTime) {
      return newsItem;
    }
  }
  return null;
}
