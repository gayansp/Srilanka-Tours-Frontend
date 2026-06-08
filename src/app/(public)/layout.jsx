"use client";

import Header from '../../components/Home/Header';
import Footer from '../../components/Home/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
