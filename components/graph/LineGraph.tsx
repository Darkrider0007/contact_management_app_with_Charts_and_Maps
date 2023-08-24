import React, { useEffect, useRef } from 'react';
import axios from 'axios';

interface HistoricalData {
  cases: Record<string, number>;
}

const LineGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    axios.get<HistoricalData>('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(response => {
        const historicalData = response.data.cases;
        const dates = Object.keys(historicalData);
        const cases = Object.values(historicalData);

        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
          drawLineGraph(ctx, dates, cases);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const drawLineGraph = (ctx: CanvasRenderingContext2D, dates: string[], cases: number[]) => {
    const canvasWidth = canvasRef.current?.width;
    const canvasHeight = canvasRef.current?.height;

    if (!canvasWidth || !canvasHeight) {
      return;
    }

    const maxValue = Math.max(...cases);
    const xAxisInterval = canvasWidth / (dates.length - 1);
    const yAxisInterval = canvasHeight / maxValue;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.moveTo(0, canvasHeight - cases[0] * yAxisInterval);

    for (let i = 1; i < dates.length; i++) {
      const x = i * xAxisInterval;
      const y = canvasHeight - cases[i] * yAxisInterval;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw x and y axis
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvasHeight);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Add labels
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    for (let i = 0; i < dates.length; i += Math.floor(dates.length / 5)) {
      ctx.fillText(dates[i], i * xAxisInterval, canvasHeight + 15);
      ctx.fillText(cases[i].toString(), -20, canvasHeight - cases[i] * yAxisInterval);
    }
  };

  return (
    <div className='bg-white'>
      <h2>COVID-19 Cases Fluctuations</h2>
      <canvas ref={canvasRef} width={600} height={300}></canvas>
    </div>
  );
};

export default LineGraph;
