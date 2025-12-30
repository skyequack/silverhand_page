import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Motivation | SilverHand',
  description: 'Why we built SilverHand: addressing arthritis disability and making assistive technology accessible.',
};

export default function MotivationPage() {
  return (
    <>
      <Section className="pt-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeading className="mb-12">
            Motivation: Why <span className="gradient-text">SilverHand</span>?
          </SectionHeading>
          
          <div className="space-y-10 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Personal Connection</h2>
              <p className="mb-4">
                This project was born from personal experience with autoimmune arthritis and the challenges 
                it presents. Living with a condition that progressively limits hand function provides unique 
                insight into the daily frustrations and unmet needs of those with neuromuscular impairments.
              </p>
              <p>
                The motivation is simple: disabilities should be 
                mild inconveniences, like wearing glasses. Just as corrective lenses allow millions 
                to see clearly without stigma or limitation, assistive devices should be 
                affordable, effective, and normalized.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">The Problem Space</h2>
              <p className="mb-4">
                Arthritis affects over 58 million adults in the United States alone, with hand involvement 
                being one of the most debilitating manifestations. Simple tasks like opening jars, gripping 
                utensils, or carrying bags become painful or impossible.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                <li>Existing assistive devices are often passive (splints, jar openers) and limited in scope</li>
                <li>Powered exoskeletons and prosthetics are prohibitively expensive ($10,000–$100,000+)</li>
                <li>Most research focuses on complete paralysis or amputation, leaving arthritis underserved</li>
                <li>Commercial solutions prioritize rehabilitation over daily functional assistance</li>
              </ul>
              <p>
                There is a clear gap: <strong className="text-white">affordable, powered assistive devices 
                for partial hand impairment</strong> that users can wear and operate in everyday life.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">The SilverHand Approach</h2>
              <p className="mb-4">
                SilverHand is designed to be:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                <li><strong className="text-white">Low-cost:</strong> Target bill of materials under $200 using off-the-shelf components</li>
                <li><strong className="text-white">Open-source:</strong> Full documentation, CAD files, and firmware publicly available</li>
                <li><strong className="text-white">Intuitive:</strong> EMG control leverages the user&apos;s existing neural pathways</li>
                <li><strong className="text-white">Modular:</strong> Design allows customization for different hand sizes and impairment levels</li>
                <li><strong className="text-white">Functional:</strong> Provides meaningful assistance with real-world tasks, not just lab demonstrations</li>
              </ul>
              <p>
                By making the design open and affordable, SilverHand aims to democratize access to powered 
                assistive technology and inspire further innovation in this underserved space.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


