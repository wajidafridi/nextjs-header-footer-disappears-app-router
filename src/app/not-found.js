'use client';
// @ import dependencies
import Error from 'next/error';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang='az'>
      <body>
        <Error statusCode={404} />;
      </body>
    </html>
  );
}
