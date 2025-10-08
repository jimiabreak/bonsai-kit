import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="text-center">
        <h1 className="text-brand-blue text-[120px] font-serif mb-4">404</h1>
        <h2 className="text-brand-blue text-4xl mb-6">Page Not Found</h2>
        <p className="text-brand-blue text-xl mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-brand-blue text-cream px-8 py-4 text-xl hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
