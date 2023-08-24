import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';





const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    ssr: false, // Disable server-side rendering
  });
  
  const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
    ssr: false, // Disable server-side rendering
  });
  
  const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
    ssr: false, // Disable server-side rendering
  });
  
  const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
    ssr: false, // Disable server-side rendering
  });
  
  const FastMap: React.FC = () => {
    const [countriesData, setCountriesData] = useState<any[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('https://disease.sh/v3/covid-19/countries');
          setCountriesData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, []);
  
    return (
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {countriesData.map((country) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <img src={country.countryInfo.flag} alt={`${country.country} Flag`} />
                <h2 className='text-xl font-bold'>{country.country}</h2>
                <p>Total Cases: {country.cases}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };
  
  export default FastMap;



// const FastMap: React.FC = () => {
//   const [countriesData, setCountriesData] = useState<any[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('https://disease.sh/v3/covid-19/countries');
//         setCountriesData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {countriesData.map((country) => (
//         <Marker
//           key={country.country}
//           position={[country.countryInfo.lat, country.countryInfo.long]}
//         >
//           <Popup>
//             <div>
//               <h2>{country.country}</h2>
//               <img src={country.countryInfo.flag} alt={`${country.country} Flag`} />
//               <p>Total Cases: {country.cases}</p>
//               <p>Recovered: {country.recovered}</p>
//               <p>Deaths: {country.deaths}</p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default FastMap;
