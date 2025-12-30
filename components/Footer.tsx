import Link from 'next/link';
import { Github, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 mt-24 border-t border-gray-800/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">SilverHand Project</h3>
            <p className="text-sm text-gray-400">
              An open-source EMG-controlled hand exoskeleton designed to assist individuals with arthritis and neuromuscular impairments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/downloads" className="text-gray-400 hover:text-secondary transition-colors">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-gray-400 hover:text-secondary transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/license" className="text-gray-400 hover:text-secondary transition-colors">
                  License
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-gray-400 hover:text-secondary transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/skyequack/Silverhand"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="mailto:omer.mohammd.m@gmail.com"
                className="text-gray-400 hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/omermohammed-"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Open-source assistive technology research
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800/50">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} SilverHand Project. Licensed under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


