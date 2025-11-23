import { Link } from 'react-router-dom';

const mobileMenuIcons = [
  { path: '/', icon: '🏠' }, // Home
  { path: '/slides', icon: '📄' }, // Brief
  { path: '/timeline', icon: '⏳' }, // Timeline
  { path: '/assets', icon: '📦' }, // Assets
  { path: '/contact', icon: '📞' } // Contact
];

function HudMenu() {
  return (
    <nav className="hudMenu">
      {mobileMenuIcons.map(({ path, icon }) => (
        <Link key={path} to={path} className="menuIcon">
          {icon}
        </Link>
      ))}
    </nav>
  );
}

export default HudMenu;
