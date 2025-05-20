'use client';

import React, { Suspense } from 'react';
import ProgramsContent from './ProgramsContent';

export default function ProgramsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProgramsContent />
    </Suspense>
  );
}
