import React from 'react';

export function FadeIn({ children, className = "" }) {
  return (
    <div className={`animate-fade-in transition-all duration-700 ${className}`}>
      {children}
    </div>
  );
}