'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProgramData } from '../interfaces/ProgramData';
import './ProgramCard.css';

interface ProgramCardProps {
  data: ProgramData;
}

export function ProgramCard({ data: program }: ProgramCardProps) {
  const router = useRouter();

  // Determine which image to use based on type or default to generic
  const getImageForProgram = () => {
    if (program.type?.toLowerCase().includes('education')) return '/images/pic02.jpg';
    if (program.type?.toLowerCase().includes('sports')) return '/images/pic03.jpg';
    if (program.type?.toLowerCase().includes('art')) return '/images/pic01.jpg';
    return '/images/pic02.jpg'; // Default image
  };

  const handleCardClick = () => {
    router.push(`/programs/${program.id}`);
  };

  return (
    <div className="program-card" onClick={handleCardClick}>
      <div className="program-image">
        <img src={getImageForProgram()} alt={program.organization} />
      </div>
      <div className="program-content">
        <div className="program-header">
          <h3 className="program-name">{program.organization}</h3>
          <span className="program-organization">{program.type}</span>
        </div>
        
        <p className="program-services">{program.services}</p>

        <div className="program-details">
          <span className="program-category">{program.type}</span>
          <span className="program-age-group">{program.ages}</span>
          {program.location && (
            <span className="program-location">{program.location}</span>
          )}
        </div>

        {program.hours && (
          <div className="program-hours">
            <p>
              <span className="hours-icon">🕒</span>
              <span>{program.hours}</span>
            </p>
          </div>
        )}

        {program.cost && (
          <div className="program-cost">
            <p>
              <span className="cost-icon">💰</span>
              <span>{program.cost}</span>
            </p>
          </div>
        )}

        <div className="program-contact">
          {program.contact_website && (
            <a href={program.contact_website} target="_blank" rel="noopener noreferrer" className="contact-link">
              <span>🌐</span> Website
            </a>
          )}
          {program.contact_email && (
            <a href={`mailto:${program.contact_email}`} className="contact-link">
              <span>✉️</span> Email
            </a>
          )}
          {program.contact_phone && (
            <a href={`tel:${program.contact_phone}`} className="contact-link">
              <span>📞</span> Phone
            </a>
          )}
        </div>

        {program.registration_info && (
          <div className="program-registration">
            <p>
              <span className="registration-icon">📝</span>
              <span>{program.registration_info}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
