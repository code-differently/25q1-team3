'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    jQuery: any;
  }
}

export default function ScriptInitializer() {
  return (
    <>
      <Script 
        src="/assets/js/jquery.min.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="/assets/js/jquery.dropotron.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.jQuery) {
            window.jQuery('#nav > ul').dropotron({
              mode: 'fade',
              noOpenerFade: true,
              alignment: 'right',
              detach: false,
              offsetY: -15,
              offsetX: 0,
              speed: 300,
              baseZIndex: 1000,
              expandMode: 'hover'
            });
          }
        }}
      />
      <Script 
        src="/assets/js/jquery.scrollex.min.js"
        strategy="afterInteractive"
      />
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
