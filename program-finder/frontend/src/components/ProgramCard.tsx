import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgramData } from '../interfaces/ProgramData';
import BookmarkButton from './BookmarkButton';

interface ProgramCardProps {
  data: ProgramData;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if bookmark button is clicked
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    navigate(`/detail/${data.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 12, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <div>
        <h3 style={{ margin: 0 }}>{data.organization}</h3>
        <p style={{ margin: '4px 0' }}>{data.services}</p>
        <small>Ages: {data.ages}</small>
      </div>
      <BookmarkButton programId={data.id} />
    </div>
  );
};

export default ProgramCard;
