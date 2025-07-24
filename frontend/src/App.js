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
import MainLayout from './components/MainLayout';
import PropertyDetails from './pages/PropertyDetails';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./pages/Home'));
const Listings = lazy(() => import('./pages/Listings'));
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
const ShreeGaneshParkPhaseII = lazy(() => import('./pages/ShreeGaneshParkPhaseII'));
const ShreeGaneshParkPhaseI = lazy(() => import('./pages/ShreeGaneshParkPhaseI'));
const ShreeGaneshHeights = lazy(() => import('./pages/ShreeGaneshHeights'));
const SaiShraddhaApartment = lazy(() => import('./pages/SaiShraddhaApartment'));
const VinayakApartment = lazy(() => import('./pages/VinayakApartment'));
const ShreeGaneshAvenue = lazy(() => import('./pages/ShreeGaneshAvenue'));
const ModakeshwarApartment = lazy(() => import('./pages/ModakeshwarApartment'));


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
                    <MainLayout>
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
                          <Route path="/ShreeGaneshParkPhaseII" element={<ShreeGaneshParkPhaseII />} />
                          <Route path="/ShreeGaneshParkPhaseI" element={<ShreeGaneshParkPhaseI />} />
                          <Route path="/ShreeGaneshHeights" element={<ShreeGaneshHeights />} />
                          <Route path="/SaiShraddhaApartment" element={<SaiShraddhaApartment />} />
                          <Route path="/VinayakApartment" element={<VinayakApartment />} />
                          <Route path="/ShreeGaneshAvenue" element={<ShreeGaneshAvenue />} />
                          <Route path="/ModakeshwarApartment" element={<ModakeshwarApartment />} />
                        </Routes>
                      </Suspense>
                    </MainLayout>
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
                  {/* Chatbot Button and Popup */}
                  <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
                    <button
                      onClick={() => setShowChatbot(v => !v)}
                      className="bg-primary-700 hover:bg-gold text-gold hover:text-primary-700 p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 border-2 border-gold focus:outline-none"
                      aria-label="Open Chatbot"
                    >
                      <FiMessageSquare className="w-6 h-6" />
                    </button>
                  </div>
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
