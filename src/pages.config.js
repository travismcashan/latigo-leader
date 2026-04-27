import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Results from './pages/Results';
import ThankYou from './pages/ThankYou';
import __Layout from './Layout.jsx';

export const PAGES = {
    "Home": Home,
    "About": About,
    "Services": Services,
    "Team": Team,
    "Contact": Contact,
    "Results": Results,
    "ThankYou": ThankYou,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
