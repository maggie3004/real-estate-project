import { ComparisonProvider } from './context/ComparisonContext';
import { FavoritesProvider } from './components/FavoritesManager';
import { NotificationProvider } from './components/NotificationSystem';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { FiPhone, FiDownload } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Chatbot from './components/Chatbot';
import { FiMessageSquare } from 'react-icons/fi';
import AboutPage from './pages/AboutPage';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./pages/Home'));
const Listings = lazy(() => import('./pages/Listings'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const AddProperty = lazy(() => import('./pages/AddProperty'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const Favorites = lazy(() => import('./pages/Favorites'));
const MapView = lazy(() => import('./pages/MapView'));
const MortgageCalculator = lazy(() => import('./components/MortgageCalculator'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const NewsletterSignup = lazy(() => import('./components/NewsletterSignup'));
const ComparisonModal = lazy(() => import('./components/ComparisonModal'));
const Awards = lazy(() => import('./pages/Awards'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const Milestones = lazy(() => import('./pages/Milestones'));


// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're working on fixing the problem.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [showChatbot, setShowChatbot] = React.useState(false);
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <NotificationProvider>
            <FavoritesProvider>
    <ComparisonProvider>
      <Router>
                  <Suspense fallback={<LoadingSpinner />}>
        <Navbar />
                  </Suspense>
                  
        <main>
                    <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <Testimonials />
                            <div className="container mx-auto my-8">
                              <NewsletterSignup />
                            </div>
              </>
            } />
            <Route path="/listings" element={<Listings />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/blog" element={<Blog />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/map" element={<MapView />} />
            <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/milestones" element={<Milestones />} />
          </Routes>
                    </Suspense>
        </main>
                  
                  <Suspense fallback={<LoadingSpinner />}>
        <Footer />
                  </Suspense>
                  
                  <ToastContainer 
                    position="top-right" 
                    autoClose={3000} 
                    hideProgressBar={false} 
                    newestOnTop 
                    closeOnClick 
                    pauseOnFocusLoss 
                    draggable 
                    pauseOnHover 
                    theme="light"
                  />
                  
                  {/* Floating Action Buttons */}
                  <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/919999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
                      aria-label="Chat on WhatsApp"
                    >
                      <FaWhatsapp className="w-6 h-6" />
                    </a>
                    {/* Call */}
                    <a
                      href="tel:+919999999999"
                      className="bg-gold hover:bg-primary-500 text-primary-700 hover:text-gold p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 border-2 border-gold"
                      aria-label="Call Now"
                    >
                      <FiPhone className="w-6 h-6" />
                    </a>
                    {/* Download Brochure */}
                    <a
                      href="/Shri Ganesh Heights.pdf"
                      download
                      className="bg-gradient-to-r from-gold to-primary-500 hover:from-primary-500 hover:to-gold text-primary-700 hover:text-gold p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 border-2 border-gold"
                      aria-label="Download Brochure"
                    >
                      <FiDownload className="w-6 h-6" />
                    </a>
                    {/* Chatbot Button */}
                    <button
                      onClick={() => setShowChatbot(v => !v)}
                      className="bg-primary-700 hover:bg-gold text-gold hover:text-primary-700 p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 border-2 border-gold focus:outline-none"
                      aria-label="Open Chatbot"
                    >
                      <FiMessageSquare className="w-6 h-6" />
                    </button>
                  </div>
                  {/* Chatbot Popup with Animation */}
                  <div
                    style={{
                      position: 'fixed',
                      bottom: 110,
                      right: 32,
                      zIndex: 1050,
                      pointerEvents: showChatbot ? 'auto' : 'none',
                      transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), opacity 0.3s',
                      transform: showChatbot ? 'scale(1)' : 'scale(0.7)',
                      opacity: showChatbot ? 1 : 0,
                    }}
                  >
                    {showChatbot && (
                      <div style={{ position: 'relative' }}>
                        {/* Close Button */}
                        <button
                          onClick={() => setShowChatbot(false)}
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            background: 'transparent',
                            border: 'none',
                            color: '#FFD700',
                            fontSize: 22,
                            cursor: 'pointer',
                            zIndex: 1100,
                          }}
                          aria-label="Close Chatbot"
                        >
                          ×
                        </button>
                        <Chatbot />
                      </div>
                    )}
                  </div>
                  
                  {/* Floating WhatsApp Button (legacy, remove if not needed) */}
                  {/* <a
          href="https://wa.me/91XXXXXXXXXX"
                    className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-600 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48zm-8.52 17.52a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm4.29-7.71c-.13-.07-1.3-.64-1.5-.71s-.35-.11-.5.11-.57.71-.7.86-.26.16-.48.05a8.13 8.13 0 0 1-2.39-1.47 9.06 9.06 0 0 1-1.67-2.07c-.17-.29 0-.44.13-.6.13-.13.29-.34.43-.51a.52.52 0 0 0 .07-.54c-.07-.13-.5-1.2-.68-1.65s-.36-.36-.5-.37h-.43a.87.87 0 0 0-.63.29 2.62 2.62 0 0 0-.82 2c0 1.18.85 2.33 2.44 3.19a9.13 9.13 0 0 0 4.36 1.19 2.62 2.62 0 0 0 1.7-.56 2.13 2.13 0 0 0 .67-1.6c0-.23-.09-.34-.19-.39z"/>
                    </svg>
                  </a> */}
                  
                  <Suspense fallback={<LoadingSpinner />}>
        <ComparisonModal />
                  </Suspense>
      </Router>
    </ComparisonProvider>
            </FavoritesProvider>
          </NotificationProvider>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
