import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';

export const metadata: Metadata = {
  title: 'License | SilverHand',
  description: 'CERN Open Hardware Licence v2 - Strongly Reciprocal license information for SilverHand project.',
};

export default function LicensePage() {
  return (
    <>
      <Section className="pt-24">
        <div className="max-w-4xl mx-auto">
          <SectionHeading className="mb-8">
            CERN Open Hardware Licence <span className="gradient-text">Version 2 - Strongly Reciprocal</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <pre className="bg-gray-800/50 p-6 rounded-lg overflow-x-auto text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
{`CERN Open Hardware Licence Version 2 - Strongly Reciprocal

Copyright © 2025

This Source describes Open Hardware and is licensed under the CERN Open
Hardware Licence Version 2 - Strongly Reciprocal (CERN-OHL-S).

You may redistribute and modify this Source and make products using it
under the terms of the CERN-OHL-S v2 (https://cern.ch/cern-ohl).

This Source is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
PARTICULAR PURPOSE. Please see the CERN-OHL-S v2 for applicable conditions.
`}
              </pre>
              <div className="mt-4">
                <a 
                  href="https://cern.ch/cern-ohl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors underline"
                >
                  View full licence text at cern.ch/cern-ohl →
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">What This Means</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              The CERN Open Hardware Licence v2 - Strongly Reciprocal is a copyleft license for open hardware that requires:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">✓</span>
                <span><strong className="text-white">Use & Modify</strong> the hardware designs freely for any purpose</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">✓</span>
                <span><strong className="text-white">Make Products</strong> based on these designs, including for commercial purposes</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">✓</span>
                <span><strong className="text-white">Share-Alike</strong> - any modifications or products must be shared under the same license</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">✓</span>
                <span><strong className="text-white">Distribute</strong> with source availability - you must provide access to all design files</span>
              </li>
            </ul>
            
          </div>

          <div className="glass-card p-8 bg-primary/5 border-primary/30">
            <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              SilverHand is provided &quot;as is&quot; without any warranty. This is an experimental research 
              project and NOT a medical device. It has not been evaluated for safety or efficacy by regulatory 
              agencies. Use at your own risk. The authors are not liable for any damages or injuries resulting 
              from the use of this software or hardware.
            </p>
          </div>

          <div className="glass-card p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Attribution</h2>
            <p className="text-gray-300 mb-4">
              If you use SilverHand in your research, build, or derivative work, please consider citing the project:
            </p>
            <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm text-gray-300">
              <pre>{`SilverHand: An Open-Source EMG-Controlled Hand Exoskeleton
https://github.com/skyequack/silverhand
Accessed: ${new Date().toISOString().split('T')[0]}`}</pre>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


