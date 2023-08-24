"use client"
import LineGraph from '@/components/graph/LineGraph';
import React from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from 'next/dynamic'
import FastMap from '@/components/graph/FastMap';



//const MapComponent = dynamic(() => import('@/components/graph/Map'), { ssr: false }); // Dynamically import MapComponent

const page: React.FC = () => {
  return (
    <div className='text-white'>
      <h1 className='text-white'>COVID-19 Dashboard</h1>
      <div className="charts-container">
        <div className="chart">
          <h2 className='text-white'>Worldwide Cases Fluctuations</h2>
          <LineGraph />
        </div>
        <div className="chart">
          <h2>COVID-19 Map</h2>
          <FastMap/>
        
        </div>
      </div>
    </div>
  );
};

export default page;

