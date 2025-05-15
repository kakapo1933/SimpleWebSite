import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { DonationPage } from './pages/DonationPage.tsx';
import BeveragePage from './pages/BeveragePage';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import { useTranslation } from 'react-i18next';

function App(): JSX.Element {
  const { t } = useTranslation(); // i18n hook

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-100">
        <div className="flex-grow pb-14">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/donations" element={<DonationPage />} />
            <Route path="/beverages" element={<BeveragePage />} />
            <Route path="/todos" element={<TodoPage />} />
          </Routes>
        </div>

        {/* Mobile Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 shadow-lg z-30 w-full overflow-hidden">
          <div className="grid grid-cols-4 text-center">
            <Link
              to="/"
              className="text-white hover:text-teal-400 py-3 text-[10px] sm:text-xs font-medium truncate px-1"
            >
              Home
            </Link>
            <Link
              to="/donations"
              className="text-white hover:text-teal-400 py-3 text-[10px] sm:text-xs font-medium truncate px-1"
            >
              {t('donationPage')}
            </Link>
            <Link
              to="/beverages"
              className="text-white hover:text-teal-400 py-3 text-[10px] sm:text-xs font-medium truncate px-1"
            >
              Beverages
            </Link>
            <Link
              to="/todos"
              className="text-white hover:text-teal-400 py-3 text-[10px] sm:text-xs font-medium truncate px-1"
            >
              Todos
            </Link>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;
