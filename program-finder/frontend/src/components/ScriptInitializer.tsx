'use client';

import Script from 'next/script';

export default function ScriptInitializer() {
  return (
    <>
      <Script 
        src="/assets/js/browser.min.js"
        strategy="afterInteractive"
      />
      <Script 
        src="/assets/js/breakpoints.min.js"
        strategy="afterInteractive"
      />
      <Script 
        src="/assets/js/util.js"
        strategy="afterInteractive"
      />
      <Script 
        src="/assets/js/main.js"
        strategy="afterInteractive"
      />
    </>
  );
}
