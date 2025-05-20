'use client';

import React from 'react';
import Link from 'next/link';
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

  return (
    <div className="program-card" onClick={() => router.push(`/programs/${program.id}`)}>
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
            <span className="program-distance">{program.location}</span>
          )}
        </div>

        <div className="program-location">
          <p>
            <span className="location-icon">📍</span>
            <span className="zip-code">ZIP Code: {program.zip_code}</span>
          </p>
        </div>

        {program.contact && (
          <div className="program-contact">
            {program.contact.website && (
              <a href={program.contact.website} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>🌐</span> Website
              </a>
            )}
            {program.contact.email && (
              <a href={`mailto:${program.contact.email}`} className="contact-link">
                <span>✉️</span> Email
              </a>
            )}
            {program.contact.phone && (
              <a href={`tel:${program.contact.phone}`} className="contact-link">
                <span>📞</span> Phone
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
