import React, { useState } from 'react';

interface BookmarkButtonProps {
  programId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ programId }) => {
  const [saved, setSaved] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(s => !s);
  };

  return (
    <button onClick={toggle} aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}>
      {saved ? '★' : '☆'}
    </button>
  );
};

export default BookmarkButton;
