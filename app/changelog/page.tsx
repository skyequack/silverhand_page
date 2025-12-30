import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';
import { GitCommit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Changelog | SilverHand',
  description: 'Version history and updates for the SilverHand project.',
};

export default function ChangelogPage() {
  const versions = [
    {
      version: '0.1.0',
      date: '2025-01-15',
      type: 'Initial Release',
      changes: [
        'Complete mechanical design with 3D-printable chassis and linkages',
        'EMG analog front-end circuit with INA128 and TL074',
        'Arduino Nano firmware for EMG signal acquisition',
        'Raspberry Pi Zero 2 W Python control script',
        'Raspberry Pi Pico MicroPython servo controller',
        'Power system with dual buck converters (6V/5V rails)',
        'Calibration routine and threshold-based control',
        'Functional demonstration with grasping tasks',
        'Complete documentation and build instructions',
        'Open-source release under MIT License',
      ],
    },
  ];

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-4xl mx-auto">
          <SectionHeading className="mb-8">
            Project <span className="gradient-text">Changelog</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <p className="text-gray-300 leading-relaxed">
              This page tracks major releases, updates, and improvements to the SilverHand project. 
              For detailed commit history, see the GitHub repository.
            </p>
          </div>

          <div className="space-y-8">
            {versions.map((v, idx) => (
              <div key={idx} className="glass-card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <GitCommit className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">v{v.version}</h3>
                      <span className="px-3 py-1 text-xs font-semibold bg-primary/10 border border-primary/30 text-secondary rounded-full">
                        {v.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">Released: {v.date}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">What&apos;s New</h4>
                  <ul className="space-y-2 text-gray-300">
                    {v.changes.map((change, cIdx) => (
                      <li key={cIdx} className="flex items-start">
                        <span className="text-secondary mr-3 mt-1">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Upcoming Features</h2>
            <p className="text-gray-300 mb-4">
              Planned for future releases (see <a href="/future" className="text-secondary hover:text-secondary/80">Future Work</a>):
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">→</span>
                <span>Multichannel EMG sensing (v0.2.0 target)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">→</span>
                <span>ML-based grasp classification (v0.3.0 target)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">→</span>
                <span>Improved enclosure and ergonomics (v0.2.0 target)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">→</span>
                <span>Clinical validation study results (TBD)</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}


