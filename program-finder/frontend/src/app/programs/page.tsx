'use server';

import React, { Suspense } from 'react';
import ProgramsContent from './ProgramsContent';

export default function Programs() {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <ProgramsContent />
    </Suspense>
  );
}
