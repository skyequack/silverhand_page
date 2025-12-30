import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | SilverHand',
  description: 'Get in touch regarding SilverHand research, collaboration opportunities, and project inquiries.',
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-24">
        <div className="max-w-4xl mx-auto">
          <SectionHeading className="text-center mb-8">
            Contact & <span className="gradient-text">Research Interest</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Personal Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              I built SilverHand because I understand firsthand what it means to live with a physical disability. 
              This project is driven by a fundamental belief: assistive technology should be affordable, accessible, 
              and empowering—not locked behind prohibitive costs or gatekeeping.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              SilverHand represents the intersection of biomechatronics, biosignal processing, and accessible 
              design—areas I am passionate about advancing through rigorous research and translational engineering.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              My vision is to contribute to research and innovation in:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Human-centered wearable robotics for individuals with motor impairments</li>
              <li>Real-time biosignal acquisition, processing, and intuitive control interfaces</li>
              <li>Making advanced assistive technology accessible and affordable through open-source design</li>
              <li>Interdisciplinary collaboration bridging engineering, neuroscience, and clinical practice</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              I am eager to collaborate with researchers, clinicians, and other individuals with disabilities 
              to advance the state of the art and ensure these technologies reach those who need them most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-secondary" />
                <h3 className="text-xl font-bold text-white">Email</h3>
              </div>
              <p className="text-gray-400 mb-4">
                For inquiries about collaboration, technical questions, or research opportunities:
              </p>
              <a 
                href="mailto:contact@silverhand.dev" 
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary transition-all"
              >
                contact@silverhand.dev
              </a>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Github className="h-6 w-6 text-secondary" />
                <h3 className="text-xl font-bold text-white">GitHub</h3>
              </div>
              <p className="text-gray-400 mb-4">
                View the complete source code, report issues, or contribute to the project:
              </p>
              <a 
                href="https://github.com/yourusername/silverhand" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-secondary/50 text-secondary rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
              >
                View Repository
              </a>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Linkedin className="h-6 w-6 text-secondary" />
                <h3 className="text-xl font-bold text-white">LinkedIn</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Connect professionally and stay updated on project developments:
              </p>
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-secondary/50 text-secondary rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
              >
                Connect on LinkedIn
              </a>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-secondary" />
                <h3 className="text-xl font-bold text-white">CV / Portfolio</h3>
              </div>
              <p className="text-gray-400 mb-4">
                View full CV, publications, and other research projects:
              </p>
              <a 
                href="/files/cv.pdf" 
                target="_blank"
                className="inline-block px-6 py-3 border border-secondary/50 text-secondary rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Collaboration Opportunities</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              I welcome collaboration from:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">•</span>
                <span><strong className="text-white">Research labs and universities:</strong> Clinical trials, 
                advanced control algorithms, user studies.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">•</span>
                <span><strong className="text-white">Clinicians and occupational therapists:</strong> Real-world 
                validation, design feedback, patient recruitment.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">•</span>
                <span><strong className="text-white">Makers and engineers:</strong> Design improvements, 
                component testing, replication and documentation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">•</span>
                <span><strong className="text-white">Individuals with arthritis or hand impairments:</strong> User 
                feedback, participatory design, beta testing.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}


