import { Link } from "wouter";
import Logo from "@/components/ui/logo";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo textClassName="text-white" />
            <p className="text-gray-400 my-4">
              National Blood Donation Portal dedicated to connecting donors with those in need and raising awareness about blood donation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition duration-300">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/blood-availability">
                  <a className="text-gray-400 hover:text-white transition duration-300">Blood Availability</a>
                </Link>
              </li>
              <li>
                <Link href="/blood-banks">
                  <a className="text-gray-400 hover:text-white transition duration-300">Blood Bank Directory</a>
                </Link>
              </li>
              <li>
                <Link href="/donation-camps">
                  <a className="text-gray-400 hover:text-white transition duration-300">Donation Camps</a>
                </Link>
              </li>
              <li>
                <Link href="/register-camp">
                  <a className="text-gray-400 hover:text-white transition duration-300">Register Camp</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/education">
                  <a className="text-gray-400 hover:text-white transition duration-300">Donation Facts</a>
                </Link>
              </li>
              <li>
                <Link href="/education">
                  <a className="text-gray-400 hover:text-white transition duration-300">Eligibility Criteria</a>
                </Link>
              </li>
              <li>
                <Link href="/education">
                  <a className="text-gray-400 hover:text-white transition duration-300">FAQs</a>
                </Link>
              </li>
              <li>
                <Link href="/education">
                  <a className="text-gray-400 hover:text-white transition duration-300">Blood Donation Process</a>
                </Link>
              </li>
              <li>
                <Link href="/education">
                  <a className="text-gray-400 hover:text-white transition duration-300">Health Benefits</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p className="mb-2 flex items-center">
                <MapPin size={16} className="mr-2" /> Ministry of Health, New Delhi, India
              </p>
              <p className="mb-2 flex items-center">
                <Phone size={16} className="mr-2" /> +91 11 1234 5678
              </p>
              <p className="mb-2 flex items-center">
                <Mail size={16} className="mr-2" /> contact@lifelink.gov.in
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LifeLink - National Blood Donation Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
