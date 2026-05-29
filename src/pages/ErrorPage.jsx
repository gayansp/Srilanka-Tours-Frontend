import React, { useState } from 'react';
import { WifiOff, RefreshCw, ArrowLeft, CircleCheck } from 'lucide-react';

const ErrorPage = ({
  title = "Something went wrong",
  subtitle = "We couldn't load the content. This is usually a temporary issue with the connection or server.",
  errorCode = "Failed to fetch",
  onRetry,
  onBack,
}) => {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    if (retrying) return;
    setRetrying(true);
    try {
     window.location.reload();
    } finally {
      setTimeout(() => setRetrying(false), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] px-4 py-24 text-center">

      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-6">
        <WifiOff className="w-9 h-9 text-red-500" />
      </div>

      {/* Error badge */}
      <span className="text-xs font-medium tracking-wide text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-1 mb-4 inline-block">
        {errorCode}
      </span>

      {/* Title & subtitle */}
      <h1 className="text-2xl font-medium text-gray-900 mb-2">{title}</h1>
      <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-8">{subtitle}</p>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={handleRetry}
          disabled={retrying}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:opacity-80 active:scale-95 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
          {retrying ? 'Retrying...' : 'Try again'}
        </button>

        <button
          onClick={onBack ?? (() => window.history.back())}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 active:scale-95 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      </div>

      {/* Hints */}
      <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-100 max-w-sm w-full text-left">
        <p className="text-xs font-medium text-gray-400 mb-3">Things to check</p>
        <ul className="space-y-2">
          {[
            'Your internet connection is active',
            'The server is reachable and running',
            'Your API endpoint URL is correct',
          ].map((hint) => (
            <li key={hint} className="flex items-center gap-2 text-sm text-gray-500">
              <CircleCheck className="w-4 h-4 text-green-500 shrink-0" />
              {hint}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default ErrorPage;