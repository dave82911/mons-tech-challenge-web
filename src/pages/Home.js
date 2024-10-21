import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const appId = process.env.REACT_APP_APP_ID;
const apiKey = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [cards, setCards] = useState([]);  // State for fetched card data
  const [zones, setZones] = useState([]);  // State for fetched card data
  const [selectedZone, setSelectedZone] = useState(''); // Selected zone
  const [centerTypes, setCenterTypes] = useState([]); // State for center types
  const [selectedCenterType, setSelectedCenterType] = useState(''); // Selected type
  const [services, setServices] = useState([]); // State for center types
  const [selectedService, setSelectedService] = useState(''); // Selected type

  // Function to fetch cards based on selected zone and center type
  const fetchCards = () => {
    // Construct query parameters
    const queryParams = new URLSearchParams();

    if (selectedZone) queryParams.append('zone', selectedZone);
    if (selectedCenterType) queryParams.append('center_type', selectedCenterType);
    if (selectedService) queryParams.append('service_type', selectedService);

    // Build the complete URL with query parameters
    const url = `${apiUrl}/listSmileCenters?${queryParams.toString()}`;

    axios.post(
      url,
      {}, // Body can remain empty for this request
      {
        headers: {
          'X-Parse-Application-Id': appId,
          'X-Parse-REST-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        console.log('Cards API Response:', response.data.result.smileCenters);
        setCards(response.data.result.smileCenters || []);
      })
      .catch((error) => console.error('Error fetching card data:', error));
  };

  // Fetch zones on component mount
  useEffect(() => {
    axios.post(
      `${apiUrl}/zones`,
      {},
      {
        headers: {
          'X-Parse-Application-Id': appId,
          'X-Parse-REST-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        console.log('Zones API Response:', response.data.result);
        setZones(response.data.result || []);
      })
      .catch((error) => console.error('Error fetching zone data:', error));
  }, []);

  // Fetch center types on component mount
  useEffect(() => {
    axios.post(
      `${apiUrl}/centerTypes`,
      {},
      {
        headers: {
          'X-Parse-Application-Id': appId,
          'X-Parse-REST-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        console.log('Center Types API Response:', response.data.result);
        setCenterTypes(response.data.result || []);
      })
      .catch((error) => console.error('Error fetching center types data:', error));
  }, []);

  // Fetch center types on component mount
  useEffect(() => {
    axios.post(
      `${apiUrl}/services`,
      {},
      {
        headers: {
          'X-Parse-Application-Id': appId,
          'X-Parse-REST-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        console.log('Services API Response:', response.data.result);
        setServices(response.data.result || []);
      })
      .catch((error) => console.error('Error fetching center types data:', error));
  }, []);

  // Fetch cards when zone or center type changes
  useEffect(() => {
    fetchCards();
  }, [selectedZone, selectedCenterType, selectedService]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Smile Centers</h1>

      {/* Zone Selector Dropdown */}
      <div className="mb-4">
        <label htmlFor="zoneSelect" className="form-label">Select Zone:</label>
        <select
          id="zoneSelect"
          className="form-select"
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          <option value="">All Zones</option>
          {zones.map((zone, index) => (
            <option key={index} value={zone}>{zone}</option>
          ))}
        </select>
      </div>

      {/* Center Type Selector Dropdown */}
      <div className="mb-4">
        <label htmlFor="centerTypeSelect" className="form-label">Select Center Type:</label>
        <select
          id="centerTypeSelect"
          className="form-select"
          value={selectedCenterType}
          onChange={(e) => setSelectedCenterType(e.target.value)}
        >
          <option value="">All Center Types</option>
          {centerTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Services Selector Dropdown */}
      <div className="mb-4">
        <label htmlFor="servicesSelect" className="form-label">Select Service:</label>
        <select
          id="serviceSelect"
          className="form-select"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">All Services</option>
          {services.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Responsive Card Grid */}
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-3">
            <Card
              zone={card.zone}
              promo={card.promo}
              street={card.street}
              neighborhood={card.neighborhood}
              centerType={card.centerType}
              appointmentTypeId={card.appointmentTypeId}
              timetable={card.timetable}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;