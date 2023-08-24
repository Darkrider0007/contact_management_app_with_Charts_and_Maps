import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  active: number;
  recovered: number;
  deaths: number;
}

const MapComponent: React.FC = () => {
  const [data, setData] = useState<CountryData[]>([]);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <MapContainer center={[20, 0] as [number, number]} zoom={2} style={{ height: '500px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map(country => (
        <Marker key={country.country} position={[country.countryInfo.lat, country.countryInfo.long]}>
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>Total Active: {country.active}</p>
              <p>Total Recovered: {country.recovered}</p>
              <p>Total Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
