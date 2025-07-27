import { ComparisonProvider } from './context/ComparisonContext';
import { FavoritesProvider } from './components/FavoritesManager';
import { NotificationProvider } from './components/NotificationSystem';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { FiMessageSquare } from 'react-icons/fi';
import Chatbot from './components/Chatbot';
import AboutPage from './pages/AboutPage';
import MainLayout from './components/MainLayout';
import PropertyDetails from './pages/PropertyDetails';
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
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));


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
                    <Routes>
                      <Route element={<MainLayout />}>
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
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
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
                      </Route>
                    </Routes>
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
                  {/* Floating Action Buttons are handled by MainLayout */}
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
