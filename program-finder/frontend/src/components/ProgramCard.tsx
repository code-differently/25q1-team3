'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProgramData } from '../interfaces/ProgramData';
import BookmarkButton from './BookmarkButton';

interface ProgramCardProps {
  data: ProgramData;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ data }) => {
  const router = useRouter();

  // Determine which image to use based on category or default to generic
  const getImageForProgram = () => {
    if (data.type?.toLowerCase().includes('education')) return '/images/pic02.jpg';
    if (data.type?.toLowerCase().includes('sports')) return '/images/pic03.jpg';
    if (data.type?.toLowerCase().includes('art')) return '/images/pic01.jpg';
    return '/images/pic02.jpg'; // Default image
  };

  return (
    <section className="box special">
      <span className="image featured">
        <img src={getImageForProgram()} alt={data.organization} />
      </span>
      <div className="program-card-header">
        <h3>{data.organization}</h3>
        <BookmarkButton programId={data.id} />
      </div>
      <p>{data.services}</p>
      <p><strong>Ages:</strong> {data.ages || 'All ages'}</p>
      {data.zip_code && <p><strong>Location:</strong> {data.zip_code}</p>}
      <ul className="actions special">
        <li>
          <Link 
            href={`/programs/${data.id}`}
            className="button alt"
          >
            Learn More
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ProgramCard;
