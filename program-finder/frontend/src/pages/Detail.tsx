import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProgramData } from '../interfaces/ProgramData';
import BookmarkButton from '../components/BookmarkButton';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  if (loading) return <p>Loading...</p>;
  if (!program) return <p>Program not found.</p>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>{program.organization}</h2>
      <BookmarkButton programId={program.id} />
      <p><strong>Services:</strong> {program.services}</p>
      <p><strong>Type:</strong> {program.type}</p>
      <p><strong>Ages:</strong> {program.ages}</p>
      <p><strong>ZIP Code:</strong> {program.zip_code}</p>
    </div>
  );
};

export default Detail;
