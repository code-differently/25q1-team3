'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProgramData } from '../interfaces/ProgramData';
import BookmarkButton from './BookmarkButton';
import './ProgramCard.css';

interface ProgramCardProps {
  data: ProgramData;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ data }) => {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if bookmark button is clicked
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    router.push(`/programs/${data.id}`);
  };

  return (
    <div className="program-card" onClick={handleCardClick}>
      <div className="program-header">
        <h3>{data.organization}</h3>
        <BookmarkButton programId={data.id} />
      </div>
      
      <div className="program-content">
        <p className="program-description">{data.services}</p>
        
        <div className="program-details">
          <div className="detail-item">
            <span className="program-category">{data.type}</span>
          </div>
          <div className="detail-item">
            <span className="program-age-range">{data.ages}</span>
          </div>
          <div className="detail-item">
            <span className="program-location">ZIP: {data.zip_code}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
