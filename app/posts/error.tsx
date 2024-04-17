'use client';

import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">An error occurred!</h1>
      <p className="error-text">Failed to fetch post data. Please try again.</p>
      <p className="error-link">
        <Link href="/"> &#8592; Go back home</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
