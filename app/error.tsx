'use client';

import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <p className="error-text">Something went wrong!</p>
      <p className="error-link">
        <Link href="/"> &#8592; Go back home</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
