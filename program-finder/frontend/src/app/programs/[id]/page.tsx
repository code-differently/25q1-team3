'use client';

import React, { useEffect, useState } from 'react';
import { ProgramData } from '../../../interfaces/ProgramData';
import BookmarkButton from '../../../components/BookmarkButton';
import PageLayout from '../../../components/PageLayout';

export default function ProgramDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [program, setProgram] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/programs/${id}`)
      .then(r => r.json())
      .then(data => setProgram(data))
      .catch(() => setProgram(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Determine which image to use based on category or default to generic
  const getImageForProgram = (program: ProgramData) => {
    if (program.type?.toLowerCase().includes('education')) return '/images/pic02.jpg';
    if (program.type?.toLowerCase().includes('sports')) return '/images/pic03.jpg';
    if (program.type?.toLowerCase().includes('art')) return '/images/pic01.jpg';
    return '/images/pic02.jpg'; // Default image
  };

  if (loading) return (
    <PageLayout>
      <section id="main" className="container">
        <div className="box">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading program details...</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
  
  if (!program) return (
    <PageLayout>
      <section id="main" className="container">
        <div className="box">
          <h3>Program not found</h3>
          <p>The program you're looking for could not be found.</p>
          <ul className="actions">
            <li><a href="/" className="button">Back to Programs</a></li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );

  return (
    <PageLayout>
      <section id="main" className="container">
        <header>
          <h2>{program.organization}</h2>
          <p>Program Details</p>
        </header>
        
        <div className="box">
          <span className="image featured">
            <img src={getImageForProgram(program)} alt={program.organization} />
          </span>
          
          <div className="program-header">
            <h3>{program.organization}</h3>
            <BookmarkButton programId={program.id} />
          </div>
          
          <div className="row">
            <div className="col-6 col-12-mobilep">
              <h4>Program Information</h4>
              <ul className="alt">
                <li><strong>Services:</strong> {program.services}</li>
                <li><strong>Type:</strong> {program.type}</li>
                <li><strong>Ages:</strong> {program.ages}</li>
                <li><strong>ZIP Code:</strong> {program.zip_code}</li>
              </ul>
            </div>
            <div className="col-6 col-12-mobilep">
              <h4>Contact Information</h4>
              <p>To learn more about this program or to register, please contact the program administrator.</p>
              <ul className="actions">
                <li><a href="/" className="button alt">Back to Programs</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 