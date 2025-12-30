import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';
import { FileText, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Publications | SilverHand',
  description: 'Academic publications, conference presentations, and related research.',
};

export default function PublicationsPage() {
  const publications = [
    {
      title: 'SilverHand: An Open-Source EMG-Controlled Hand Exoskeleton for Accessible Assistive Technology',
      authors: 'Omer Mohammed, Ramya S. Moorthy',
      venue: 'Manuscript in preparation',
      year: '2025',
      type: 'Journal Article',
      link: '#',
      status: 'In Preparation',
    },
  ];

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-4xl mx-auto">
          <SectionHeading className="mb-8">
            Publications & <span className="gradient-text">Research</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Academic Output</h2>
            <p className="text-gray-300 leading-relaxed">
              This page will be updated with publications, conference presentations, and related research 
              as they become available. The project is currently in active development and documentation phase.
            </p>
          </div>

          <div className="space-y-6">
            {publications.map((pub, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white pr-4">{pub.title}</h3>
                      <span className="shrink-0 px-3 py-1 text-xs font-semibold bg-primary/10 border border-primary/30 text-secondary rounded-full">
                        {pub.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{pub.authors}</p>
                    <p className="text-sm text-gray-500 mb-3">
                      {pub.venue} • {pub.year} • {pub.type}
                    </p>
                    {pub.link !== '#' && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 text-sm"
                      >
                        View Publication <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Related Literature</h2>
            <p className="text-gray-300 mb-4">
              SilverHand builds upon foundational work in biomechatronics, EMG control, and assistive robotics. 
              Key references include:
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Surface EMG signal processing and control strategies for prosthetics and exoskeletons</li>
              <li>• Low-cost assistive device design and fabrication methodologies</li>
              <li>• User-centered design for wearable robotics</li>
              <li>• Clinical outcomes in arthritis rehabilitation and assistive technology adoption</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}


