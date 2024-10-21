import React from 'react';
import './Card.css'; // Optional: If you want custom CSS

const Card = ({ zone, promo, street, neighborhood, centerType, appointmentTypeId, timetable = {} }) => {
  let time = '';

  if (timetable.weekdays?.length) {
    time += `L-V ${timetable.weekdays[0]} `;
  }

  if (timetable.saturday?.length) {
    time += `S ${timetable.saturday[0]} `;
  }

  if (timetable.sunday?.length) {
    time += `D ${timetable.sunday[0]}`;
  }

  return (
    <div className="card my-2">
      <div className="card-body">
        <h5 className="card-title">{zone || 'No Zone Info'}</h5>
        <p className="card-promo">{promo || 'No Promo Available'}</p>
        <p className="card-text">
          {street || 'Unknown Street'} {neighborhood || 'Unknown Neighborhood'}
        </p>
        <p className="card-text">{time || 'No Timetable Available'}</p>
        <p className="card-appointment-id">Appointment Id: {appointmentTypeId || 'Unknown'}</p>
        <p className="card-center-type">{centerType || 'Unknown Center Type'}</p>
      </div>
    </div>
  );
};

export default Card;