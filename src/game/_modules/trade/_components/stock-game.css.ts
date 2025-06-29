import { css } from '@emotion/react';
import * as colors from '@radix-ui/colors';

export const gameStyles = {
  container: css({
    height: '100vh',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    overflow: 'hidden',
    backgroundColor: colors.gray.gray1,
    position: 'relative',
  }),

  title: css({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.gray.gray12,
    margin: 0,
  }),

  // 메인 컨텐츠 (단일 컬럼)
  mainContent: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
    minHeight: 0,
  }),

  // 게임 헤더
  gameHeader: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '8px 16px',
    backgroundColor: colors.gray.gray3,
    borderRadius: '8px',
    flexShrink: 0,
  }),

  // 타이머 시스템
  timer: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
  }),

  timerLabel: css({
    fontSize: '0.625rem',
    color: colors.gray.gray11,
    fontWeight: '500',
  }),

  timerValue: css({
    fontSize: '1.125rem',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  }),

  timerNormal: css({
    color: colors.green.green11,
  }),

  timerWarning: css({
    color: colors.yellow.yellow11,
  }),

  timerDanger: css({
    color: colors.red.red11,
  }),

  drawerToggleButton: css({
    backgroundColor: colors.blue.blue9,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    fontSize: '0.875rem',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.blue.blue10,
    },
  }),

  gameOverText: css({
    fontSize: '1rem',
    fontWeight: '600',
    color: colors.violet.violet11,
    marginRight: 'auto',
  }),

  // 뉴스 시스템
  newsPreview: css({
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    backgroundColor: colors.orange.orange9,
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    animation: 'pulse 1s ease-in-out infinite alternate',
  }),

  newsPopup: css({
    position: 'fixed',
    top: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    maxWidth: '600px',
    width: '90%',
    animation: 'slideDown 0.3s ease-out',
  }),

  newsContent: css({
    padding: '16px 20px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    border: '2px solid',
  }),

  newsPositive: css({
    backgroundColor: colors.green.green3,
    borderColor: colors.green.green8,
    color: colors.green.green12,
  }),

  newsNegative: css({
    backgroundColor: colors.red.red3,
    borderColor: colors.red.red8,
    color: colors.red.red12,
  }),

  newsIcon: css({
    fontSize: '1.5rem',
    flexShrink: 0,
  }),

  newsTitle: css({
    flex: 1,
    lineHeight: '1.4',
  }),

  // 상태 카드 그리드 (4개)
  statusGrid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    flexShrink: 0,
  }),

  card: css({
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'white',
    border: '1px solid',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  }),

  cardBlue: css({
    backgroundColor: colors.blue.blue2,
    borderColor: colors.blue.blue6,
  }),

  cardGreen: css({
    backgroundColor: colors.green.green2,
    borderColor: colors.green.green6,
  }),

  cardPurple: css({
    backgroundColor: colors.violet.violet2,
    borderColor: colors.violet.violet6,
  }),

  cardYellow: css({
    backgroundColor: colors.yellow.yellow2,
    borderColor: colors.yellow.yellow6,
  }),

  iconRow: css({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '4px',
  }),

  cardValue: css({
    fontSize: '1rem',
    fontWeight: 'bold',
  }),

  blueText: css({
    color: colors.blue.blue11,
  }),

  greenText: css({
    color: colors.green.green11,
  }),

  purpleText: css({
    color: colors.violet.violet11,
  }),

  yellowText: css({
    color: colors.yellow.yellow11,
  }),

  redText: css({
    color: colors.red.red11,
  }),

  // 차트 컨테이너
  chartContainer: css({
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    border: `1px solid ${colors.gray.gray6}`,
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  }),

  chartTitle: css({
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: colors.gray.gray12,
  }),

  chartWrapper: css({
    flex: 1,
    minHeight: 0,
  }),

  // 거래 버튼 (6개)
  tradingButtons: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '8px',
    flexShrink: 0,
  }),

  button: css({
    padding: '12px 16px',
    borderRadius: '6px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
    '&:disabled': {
      backgroundColor: colors.gray.gray6,
      color: colors.gray.gray9,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  }),

  buyButton25: css({
    backgroundColor: colors.green.green7,
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.green.green8,
      transform: 'translateY(-1px)',
    },
  }),

  buyButton50: css({
    backgroundColor: colors.green.green8,
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.green.green9,
      transform: 'translateY(-1px)',
    },
  }),

  buyButton: css({
    backgroundColor: colors.green.green9,
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.green.green10,
      transform: 'translateY(-1px)',
    },
  }),

  sellButton25: css({
    backgroundColor: colors.red.red7,
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.red.red8,
      transform: 'translateY(-1px)',
    },
  }),

  sellButton50: css({
    backgroundColor: colors.red.red8,
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.red.red9,
      transform: 'translateY(-1px)',
    },
  }),

  sellButton: css({
    backgroundColor: colors.red.red9,
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.red.red10,
      transform: 'translateY(-1px)',
    },
  }),

  resetButton: css({
    backgroundColor: colors.violet.violet9,
    color: 'white',
    padding: '8px 16px',
    fontSize: '0.875rem',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.violet.violet10,
    },
  }),

  // 드로워 시스템
  drawerOverlay: css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 50,
  }),

  drawer: css({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '400px',
    backgroundColor: 'white',
    boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 51,
    display: 'flex',
    flexDirection: 'column',
  }),

  drawerOpen: css({
    transform: 'translateX(0)',
  }),

  drawerHeader: css({
    padding: '16px',
    borderBottom: `1px solid ${colors.gray.gray6}`,
    display: 'flex',
    justifyContent: 'flex-end',
    flexShrink: 0,
  }),

  drawerCloseButton: css({
    padding: '8px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: colors.gray.gray3,
    color: colors.gray.gray11,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: colors.gray.gray4,
    },
  }),

  // 탭 시스템
  tabButtons: css({
    display: 'flex',
    backgroundColor: colors.gray.gray3,
    borderRadius: '8px',
    padding: '4px',
    gap: '4px',
    flexShrink: 0,
    margin: '0 16px 16px 16px',
  }),

  tabButton: css({
    flex: 1,
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'transparent',
    color: colors.gray.gray11,
    '&:hover': {
      backgroundColor: colors.gray.gray4,
    },
  }),

  tabButtonActive: css({
    backgroundColor: 'white',
    color: colors.gray.gray12,
    fontWeight: '600',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  }),

  tabContent: css({
    flex: 1,
    minHeight: 0,
    margin: '0 16px 16px 16px',
    backgroundColor: colors.gray.gray1,
    borderRadius: '8px',
    border: `1px solid ${colors.gray.gray6}`,
    overflow: 'hidden',
  }),

  // 거래 내역
  transactionHistory: css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),

  transactionList: css({
    flex: 1,
    overflow: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }),

  transactionItem: css({
    display: 'grid',
    gridTemplateColumns: '50px 50px 80px 90px',
    gap: '8px',
    padding: '8px',
    backgroundColor: 'white',
    borderRadius: '4px',
    fontSize: '0.75rem',
    alignItems: 'center',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  }),

  buyText: css({
    color: colors.green.green11,
    fontWeight: '600',
  }),

  sellText: css({
    color: colors.red.red11,
    fontWeight: '600',
  }),

  emptyState: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: colors.gray.gray10,
    fontSize: '0.875rem',
  }),

  // 요약 탭
  summaryTab: css({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    height: '100%',
  }),

  summaryCard: css({
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  }),

  summaryTitle: css({
    fontSize: '0.75rem',
    color: colors.gray.gray11,
    marginBottom: '8px',
    fontWeight: '500',
    margin: '0 0 8px 0',
  }),

  summaryValue: css({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: colors.gray.gray12,
  }),

  // 뉴스 탭
  newsTab: css({
    padding: '16px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),

  newsList: css({
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }),

  newsHistoryItem: css({
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  }),

  newsHistoryTitle: css({
    flex: 1,
    fontSize: '0.875rem',
    fontWeight: '500',
    color: colors.gray.gray12,
    lineHeight: '1.4',
  }),

  newsTime: css({
    fontSize: '0.75rem',
    color: colors.gray.gray10,
    fontFamily: 'monospace',
    fontWeight: '600',
  }),

  profitPositive: css({
    color: colors.green.green11,
    fontWeight: '600',
  }),

  profitNegative: css({
    color: colors.red.red11,
    fontWeight: '600',
  }),

  loading: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.125rem',
    color: colors.gray.gray11,
  }),
};
