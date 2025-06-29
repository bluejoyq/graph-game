/** @jsxImportSource @emotion/react */

import { BarChart3, Bell, DollarSign, Menu, TrendingDown, TrendingUp, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { GameState, News, StockData, Transaction } from '../models/game';
import {
  formatCurrency,
  formatDate,
  generateGameNews,
  getCurrentNews,
  getNewsPreview,
  parseCSV,
} from '../utils/csv-parser';
import { gameStyles as styles } from './stock-game.css';

const INITIAL_CASH = 10000;
const GAME_SPEED = 500;
const GAME_DURATION = 300; // 5분

export const StockGame = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [gameNews, setGameNews] = useState<News[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    cash: INITIAL_CASH,
    shares: 0,
    currentPrice: 0,
    gameTime: 0,
    gameOver: false,
    gameDuration: GAME_DURATION,
    transactions: [],
    currentNews: null,
    newsHistory: [],
    showNewsPreview: false,
  });
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed] = useState(GAME_SPEED);
  const [activeTab, setActiveTab] = useState('transactions');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 게임 초기화
  useEffect(() => {
    const initGame = async () => {
      try {
        const data = await parseCSV('/TSLA_24h.csv');
        const news = generateGameNews();
        setStockData(data);
        setGameNews(news);
        setGameState((prev) => ({
          ...prev,
          currentPrice: data[0]?.open || 0,
        }));
        setLoading(false);
        // 게임 자동 시작
        setIsPlaying(true);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setLoading(false);
      }
    };

    initGame();
  }, []);

  // 실시간 게임 진행
  useEffect(() => {
    if (!isPlaying || gameState.gameOver || loading) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        const nextTime = prev.gameTime + gameSpeed / 1000;
        const isGameOver = nextTime >= GAME_DURATION;

        // 주가 데이터 인덱스 계산 (5분을 전체 데이터에 매핑)
        const dataIndex = Math.floor((nextTime / GAME_DURATION) * (stockData.length - 1));
        const currentPrice = stockData[dataIndex]?.close || prev.currentPrice;

        // 뉴스 시스템
        const currentNews = getCurrentNews(nextTime, gameNews);
        const newsPreview = getNewsPreview(nextTime, gameNews);

        // 뉴스가 끝났을 때 히스토리에 추가
        if (prev.currentNews && !currentNews && prev.currentNews !== null) {
          return {
            ...prev,
            gameTime: nextTime,
            currentPrice,
            currentNews,
            showNewsPreview: !!newsPreview,
            newsHistory: [...prev.newsHistory, prev.currentNews],
            gameOver: isGameOver,
          };
        }

        return {
          ...prev,
          gameTime: nextTime,
          currentPrice,
          currentNews,
          showNewsPreview: !!newsPreview,
          gameOver: isGameOver,
        };
      });
    }, gameSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, gameState.gameOver, loading, stockData, gameNews, gameSpeed]);

  // 차트용 데이터
  const chartData = useMemo(() => {
    const currentDataCount = Math.floor((gameState.gameTime / GAME_DURATION) * stockData.length);
    return stockData.slice(0, currentDataCount + 1).map((data, index) => ({
      day: index + 1,
      price: data.close,
      date: formatDate(data.date),
    }));
  }, [stockData, gameState.gameTime]);

  // 시간 포맷 (MM:SS)
  const formatTime = (seconds: number): string => {
    const remainingTime = Math.max(0, GAME_DURATION - seconds);
    const minutes = Math.floor(remainingTime / 60);
    const secs = Math.floor(remainingTime % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 드로워 토글
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // 매수 (percentage: 0.5 = 50%, 1.0 = 100%)
  const buyStock = (percentage: number = 1.0) => {
    const availableCash = gameState.cash * percentage;
    const maxShares = Math.floor(availableCash / gameState.currentPrice);

    if (maxShares > 0) {
      const cost = maxShares * gameState.currentPrice;

      const transaction: Transaction = {
        type: 'buy',
        price: gameState.currentPrice,
        shares: maxShares,
        date:
          stockData[Math.floor((gameState.gameTime / GAME_DURATION) * (stockData.length - 1))]
            ?.date || '',
      };

      setGameState((prev) => ({
        ...prev,
        cash: prev.cash - cost,
        shares: prev.shares + maxShares,
        transactions: [...prev.transactions, transaction],
      }));
    }
  };

  // 매도 (percentage: 0.5 = 50%, 1.0 = 100%)
  const sellStock = (percentage: number = 1.0) => {
    const sharesToSell = Math.floor(gameState.shares * percentage);

    if (sharesToSell > 0) {
      const revenue = sharesToSell * gameState.currentPrice;
      const avgBuyPrice =
        gameState.transactions
          .filter((t: Transaction) => t.type === 'buy')
          .reduce((total: number, t: Transaction) => total + t.price * t.shares, 0) /
        gameState.shares;

      const profit = revenue - avgBuyPrice * sharesToSell;

      const transaction: Transaction = {
        type: 'sell',
        price: gameState.currentPrice,
        shares: sharesToSell,
        date:
          stockData[Math.floor((gameState.gameTime / GAME_DURATION) * (stockData.length - 1))]
            ?.date || '',
        profit,
      };

      setGameState((prev) => ({
        ...prev,
        cash: prev.cash + revenue,
        shares: prev.shares - sharesToSell,
        transactions: [...prev.transactions, transaction],
      }));
    }
  };

  // 총 자산
  const totalValue = gameState.cash + gameState.shares * gameState.currentPrice;
  const profit = totalValue - INITIAL_CASH;
  const profitPercentage = (profit / INITIAL_CASH) * 100;

  // 평단가 계산
  const averagePrice = useMemo(() => {
    if (gameState.shares === 0) return 0;

    const buyTransactions = gameState.transactions.filter((t: Transaction) => t.type === 'buy');
    if (buyTransactions.length === 0) return 0;

    const totalCost = buyTransactions.reduce(
      (total: number, t: Transaction) => total + t.price * t.shares,
      0,
    );
    const totalShares = buyTransactions.reduce(
      (total: number, t: Transaction) => total + t.shares,
      0,
    );

    return totalCost / totalShares;
  }, [gameState.transactions, gameState.shares]);

  if (loading) {
    return (
      <div css={styles.loading}>
        <div>데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div css={styles.container}>
      {/* 뉴스 예고 팝업 */}
      {gameState.showNewsPreview && (
        <div css={styles.newsPreview}>
          <Bell size={16} />
          <span>속보 예고</span>
        </div>
      )}

      {/* 뉴스 팝업 */}
      {gameState.currentNews && (
        <div css={styles.newsPopup}>
          <div
            css={[
              styles.newsContent,
              gameState.currentNews.impact === 'positive'
                ? styles.newsPositive
                : styles.newsNegative,
            ]}
          >
            <span css={styles.newsIcon}>
              {gameState.currentNews.impact === 'positive' ? '📈' : '📉'}
            </span>
            <span css={styles.newsTitle}>{gameState.currentNews.title}</span>
          </div>
        </div>
      )}

      {/* 게임 헤더 */}
      <div css={styles.gameHeader}>
        {/* 타이머 */}
        <div css={styles.timer}>
          <span css={styles.timerLabel}>남은 시간</span>
          <span
            css={[
              styles.timerValue,
              gameState.gameTime > GAME_DURATION * 0.8
                ? styles.timerDanger
                : gameState.gameTime > GAME_DURATION * 0.6
                  ? styles.timerWarning
                  : styles.timerNormal,
            ]}
          >
            {formatTime(gameState.gameTime)}
          </span>
        </div>

        {gameState.gameOver && <div css={styles.gameOverText}>🎉 게임 종료!</div>}

        {/* 드로워 토글 버튼 */}
        <button
          type="button"
          css={[styles.button, styles.drawerToggleButton]}
          onClick={toggleDrawer}
        >
          <Menu size={16} />
          정보
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div css={styles.mainContent}>
        {/* 게임 상태 카드 */}
        <div css={styles.statusGrid}>
          <div css={[styles.card, styles.cardBlue]}>
            <div css={styles.iconRow}>
              <DollarSign size={16} css={styles.blueText} />
              <span style={{ fontWeight: '600', fontSize: '0.75rem' }}>현금</span>
            </div>
            <div css={[styles.cardValue, styles.blueText]}>{formatCurrency(gameState.cash)}</div>
          </div>

          <div css={[styles.card, styles.cardGreen]}>
            <div css={styles.iconRow}>
              <TrendingUp size={16} css={styles.greenText} />
              <span style={{ fontWeight: '600', fontSize: '0.75rem' }}>보유 주식</span>
            </div>
            <div css={[styles.cardValue, styles.greenText]}>{gameState.shares}주</div>
          </div>

          <div css={[styles.card, styles.cardPurple]}>
            <div css={styles.iconRow}>
              <TrendingDown size={16} css={styles.purpleText} />
              <span style={{ fontWeight: '600', fontSize: '0.75rem' }}>현재가</span>
            </div>
            <div css={[styles.cardValue, styles.purpleText]}>
              {formatCurrency(gameState.currentPrice)}
            </div>
          </div>

          <div css={[styles.card, styles.cardYellow]}>
            <div css={styles.iconRow}>
              <BarChart3 size={16} css={styles.yellowText} />
              <span style={{ fontWeight: '600', fontSize: '0.75rem' }}>평단가</span>
            </div>
            <div css={[styles.cardValue, styles.yellowText]}>
              {gameState.shares > 0 ? formatCurrency(averagePrice) : '-'}
            </div>
          </div>
        </div>

        {/* 차트 */}
        <div css={styles.chartContainer}>
          <h3 css={styles.chartTitle}>TSLA 주가 변화</h3>
          <div css={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
                <YAxis
                  stroke="#9CA3AF"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  labelFormatter={(value) => `Day ${value}`}
                  formatter={(value: number) => [formatCurrency(value), 'Price']}
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3, fill: '#3B82F6' }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 거래 버튼 */}
        <div css={styles.tradingButtons}>
          <button
            type="button"
            css={[styles.button, styles.buyButton25]}
            onClick={() => buyStock(0.25)}
            disabled={gameState.gameOver || gameState.cash < gameState.currentPrice}
          >
            25% 사기
          </button>
          <button
            type="button"
            css={[styles.button, styles.buyButton50]}
            onClick={() => buyStock(0.5)}
            disabled={gameState.gameOver || gameState.cash < gameState.currentPrice}
          >
            50% 사기
          </button>
          <button
            type="button"
            css={[styles.button, styles.buyButton]}
            onClick={() => buyStock(1.0)}
            disabled={gameState.gameOver || gameState.cash < gameState.currentPrice}
          >
            100% 사기
          </button>
          <button
            type="button"
            css={[styles.button, styles.sellButton25]}
            onClick={() => sellStock(0.25)}
            disabled={gameState.gameOver || gameState.shares === 0}
          >
            25% 팔기
          </button>
          <button
            type="button"
            css={[styles.button, styles.sellButton50]}
            onClick={() => sellStock(0.5)}
            disabled={gameState.gameOver || gameState.shares === 0}
          >
            50% 팔기
          </button>
          <button
            type="button"
            css={[styles.button, styles.sellButton]}
            onClick={() => sellStock(1.0)}
            disabled={gameState.gameOver || gameState.shares === 0}
          >
            100% 팔기
          </button>
        </div>
      </div>

      {/* 드로워 오버레이 */}
      {isDrawerOpen && (
        <div
          css={styles.drawerOverlay}
          onClick={toggleDrawer}
          onKeyDown={(e) => e.key === 'Escape' && toggleDrawer()}
          role="button"
          tabIndex={0}
          aria-label="드로워 닫기"
        />
      )}

      {/* 드로워 */}
      <div css={[styles.drawer, isDrawerOpen && styles.drawerOpen]}>
        <div css={styles.drawerHeader}>
          <button type="button" css={styles.drawerCloseButton} onClick={toggleDrawer}>
            <X size={20} />
          </button>
        </div>

        {/* 탭 버튼 */}
        <div css={styles.tabButtons}>
          <button
            type="button"
            css={[styles.tabButton, activeTab === 'transactions' && styles.tabButtonActive]}
            onClick={() => setActiveTab('transactions')}
          >
            거래 내역
          </button>
          <button
            type="button"
            css={[styles.tabButton, activeTab === 'summary' && styles.tabButtonActive]}
            onClick={() => setActiveTab('summary')}
          >
            요약
          </button>
          <button
            type="button"
            css={[styles.tabButton, activeTab === 'news' && styles.tabButtonActive]}
            onClick={() => setActiveTab('news')}
          >
            뉴스
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div css={styles.tabContent}>
          {activeTab === 'transactions' && (
            <div css={styles.transactionHistory}>
              <div css={styles.transactionList}>
                {gameState.transactions.length > 0 ? (
                  gameState.transactions
                    .slice(-20)
                    .reverse()
                    .map((transaction, index) => (
                      <div
                        key={`${transaction.date}-${transaction.type}-${index}`}
                        css={styles.transactionItem}
                      >
                        <span css={transaction.type === 'buy' ? styles.buyText : styles.sellText}>
                          {transaction.type === 'buy' ? '매수' : '매도'}
                        </span>
                        <span>{transaction.shares}주</span>
                        <span>{formatCurrency(transaction.price)}</span>
                        {transaction.profit !== undefined && (
                          <span
                            css={
                              transaction.profit >= 0
                                ? styles.profitPositive
                                : styles.profitNegative
                            }
                          >
                            {transaction.profit >= 0 ? '+' : ''}
                            {formatCurrency(transaction.profit)}
                          </span>
                        )}
                      </div>
                    ))
                ) : (
                  <div css={styles.emptyState}>아직 거래 내역이 없습니다.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div css={styles.summaryTab}>
              <div css={styles.summaryCard}>
                <h4 css={styles.summaryTitle}>총 자산</h4>
                <div css={styles.summaryValue}>{formatCurrency(totalValue)}</div>
              </div>
              <div css={styles.summaryCard}>
                <h4 css={styles.summaryTitle}>손익</h4>
                <div
                  css={[
                    styles.summaryValue,
                    profit >= 0 ? styles.profitPositive : styles.profitNegative,
                  ]}
                >
                  {profit >= 0 ? '+' : ''}
                  {formatCurrency(profit)}
                </div>
              </div>
              <div css={styles.summaryCard}>
                <h4 css={styles.summaryTitle}>수익률</h4>
                <div
                  css={[
                    styles.summaryValue,
                    profit >= 0 ? styles.profitPositive : styles.profitNegative,
                  ]}
                >
                  {profitPercentage.toFixed(2)}%
                </div>
              </div>
              <div css={styles.summaryCard}>
                <h4 css={styles.summaryTitle}>거래 횟수</h4>
                <div css={styles.summaryValue}>{gameState.transactions.length}회</div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div css={styles.newsTab}>
              <div css={styles.newsList}>
                {gameState.newsHistory.length > 0 ? (
                  gameState.newsHistory.map((news) => (
                    <div key={news.id} css={styles.newsHistoryItem}>
                      <span css={styles.newsIcon}>{news.impact === 'positive' ? '📈' : '📉'}</span>
                      <span css={styles.newsHistoryTitle}>{news.title}</span>
                      <span css={styles.newsTime}>
                        {Math.floor(news.triggerTime / 60)}:
                        {(news.triggerTime % 60).toFixed(0).padStart(2, '0')}
                      </span>
                    </div>
                  ))
                ) : (
                  <div css={styles.emptyState}>아직 뉴스가 없습니다.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
