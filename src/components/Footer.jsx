import { Link } from "react-router-dom";
import { GiBalloonDog } from "react-icons/gi";

function Footer() {
  return (
    <footer className="bg-black text-white py-6 flex flex-col items-center">
      {/* Logo */}
      <div className="mb-4">
        <Link className="flex items-center px-2 py-0.5 " to="/">
          <GiBalloonDog size={30} />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="mb-2 text-sm">
        <Link to="/about" className="hover:underline">
          (Hi)Story
        </Link>
      </div>

      {/* Legal and tracking links */}
      <div className="flex space-x-4 mb-4 text-sm">
        <Link to="/legal-notice" className="hover:underline">
          Legal Notice
        </Link>
        <Link to="/data-privacy" className="hover:underline">
          Data Privacy
        </Link>
        <Link to="/tracking" className="hover:underline">
          Manage Tracking
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-sm italic">
        <p>© Sweet Spots by Simona</p>
      </div>
    </footer>
  );
}

export default Footer;
