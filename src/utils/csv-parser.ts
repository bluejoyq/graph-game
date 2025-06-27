import type { StockData } from '../models/game';

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
