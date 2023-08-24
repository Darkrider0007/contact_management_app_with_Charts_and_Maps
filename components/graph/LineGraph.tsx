import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const LineGraph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(response => {
        const historicalData = response.data.cases;
        const dates = Object.keys(historicalData);
        const cases = Object.values(historicalData);

        const ctx = canvasRef.current.getContext('2d');
        drawLineGraph(ctx, dates, cases);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const drawLineGraph = (ctx, dates, cases) => {
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const maxCases = Math.max(...cases);

    ctx.beginPath();
    ctx.moveTo(50, canvasHeight - 30);

    for (let i = 0; i < dates.length; i++) {
      // Display every 7th date label
      if (i % 7 === 0) {
        const x = 50 + (i / (dates.length - 1)) * (canvasWidth - 50);
        const y = canvasHeight - 30 - (cases[i] / maxCases) * (canvasHeight - 30);
        ctx.lineTo(x, y);
        ctx.fillText(dates[i], x, canvasHeight - 10);
      }
    }

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(50, canvasHeight - 30);
    ctx.lineTo(canvasWidth, canvasHeight - 30);
    ctx.stroke();

    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, canvasHeight - 30);
    ctx.stroke();

    // Add labels
    ctx.fillStyle = 'black';
    ctx.fillText('Date', canvasWidth / 2, canvasHeight - 5);
    ctx.fillText('Cases', 10, canvasHeight / 2);
  };

  return (
    <div className='bg-white'>
      <h2>COVID-19 Cases Fluctuations</h2>
      <canvas ref={canvasRef} width={600} height={300}></canvas>
    </div>
  );
};

export default LineGraph;
