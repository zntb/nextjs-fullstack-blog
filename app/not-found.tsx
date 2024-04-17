import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">
        We couldn&apos;t find the page you were looking for
      </p>
      <p className="error-link">
        <Link href="/">&#8592; Go back home</Link>
      </p>
    </div>
  );
};

export default NotFound;
