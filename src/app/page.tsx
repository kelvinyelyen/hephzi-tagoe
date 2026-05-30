import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="app-container">
      {/* Premium Top Navigation Bar */}
      <Header />

      {/* Main Column Biography Essay & Timeline */}
      <Hero />

      {/* Comprehensive Premium Footer Section */}
      <Footer />
    </main>
  );
}

