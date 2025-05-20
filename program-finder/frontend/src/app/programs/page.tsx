'use server'

import React, { Suspense } from 'react';
import ProgramsClient from './ProgramsContent';

export default async function ProgramsPage() {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <ProgramsClient />
    </Suspense>
  );
}
