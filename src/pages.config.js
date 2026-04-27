import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Results from './pages/Results';
import ThankYou from './pages/ThankYou';
import __Layout from './Layout.jsx';

export const PAGES = {
    "home": Home,
    "about": About,
    "services": Services,
    "lifeplan": Team,
    "contact": Contact,
    "results": Results,
    "thankyou": ThankYou,
}

export const pagesConfig = {
    mainPage: "home",
    Pages: PAGES,
    Layout: __Layout,
};
