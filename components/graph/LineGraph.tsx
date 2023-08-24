import React, { useEffect, useRef } from 'react';
import axios from 'axios';

interface HistoricalData {
  cases: Record<string, number>; // Assuming cases data is an object with string keys and number values
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
    // Rest of the drawing code
  };

  return (
    <div className='bg-white'>
      <h2>COVID-19 Cases Fluctuations</h2>
      <canvas ref={canvasRef} width={900} height={600}></canvas>
    </div>
  );
};

export default LineGraph;
