import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { DonationPage } from './pages/DonationPage.tsx';
import BeveragePage from './pages/BeveragePage';
import HomePage from './pages/HomePage';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation(); // i18n hook

  return (<Router>
    <div className="flex flex-col w-full h-full items-center bg-zinc-200">
      {/*<LanguageSwitcher/>*/}
      <nav className="flex flex-col justify-center max-w-md w-full h-15 bg-red-600 p-4 rounded-t-4xl">
        <ul className="flex justify-center gap-4 text-white">
          {/* Navigation tabs moved to footer */}
        </ul>
      </nav>

      <Routes>
        {/*<Route path="/" element={*/}
        {/*  <div className="flex flex-col gap-8">*/}
        {/*    <h1 className="text-4xl font-bold">React + Express + Prisma + PostgreSQL Monorepo</h1>*/}
        {/*    <div className="p-8 rounded-lg shadow-md bg-gray-50 w-full max-w-3xl mx-auto">*/}
        {/*    </div>*/}
        {/*    {health?.status === 'ok' && (<div className="p-8 rounded-lg shadow-md bg-gray-50 w-full max-w-3xl mx-auto">*/}
        {/*    </div>)}*/}
        {/*  </div>}/>*/}
        {/**/}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/donations" element={<DonationPage/>}/>
        <Route path="/beverages" element={<BeveragePage/>}/>
      </Routes>

      <footer className="flex flex-col justify-center max-w-md w-full bg-gray-800 p-4 rounded-b-4xl">
        <ul className="flex justify-center gap-4 text-white mb-2">
          <li>
            <Link to="/" className="hover:text-red-300">Home</Link>
          </li>
          <li>
            <Link to="/donations" className="hover:text-red-300">{t('donationPage')}</Link>
          </li>
          <li>
            <Link to="/beverages" className="hover:text-red-300">Beverages</Link>
          </li>
        </ul>
        <p className="text-gray-400 text-center">Kaipo Chen</p>
      </footer>
    </div>
  </Router>);
}

export default App;