import { Metadata } from 'next';
import Image from 'next/image';
import Section, { SectionHeading } from '@/components/Section';
import { Download } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Electronics | SilverHand Deep Dive',
  description: 'EMG analog front-end, PCB design, and signal conditioning circuitry.',
};

export default function ElectronicsPage() {
  const bomItems = [
    { part: 'Arduino Nano (ATmega328P)', qty: 1, unitCost: '$12.00', notes: 'EMG signal acquisition' },
    { part: 'INA128 Instrumentation Amplifier', qty: 1, unitCost: '$8.00', notes: 'Differential amplification' },
    { part: 'Op-Amp TL074 (Quad)', qty: 1, unitCost: '$1.50', notes: 'Filtering and rectification' },
    { part: 'EMG Electrodes (Disposable, Ag/AgCl)', qty: 10, unitCost: '$0.50', notes: 'Surface electrode pads' },
    { part: 'Resistors (assorted 1% metal film)', qty: 20, unitCost: '$0.10', notes: 'Filter/gain networks' },
    { part: 'Capacitors (ceramic & electrolytic)', qty: 15, unitCost: '$0.20', notes: 'Filtering' },
    { part: 'Perfboard or Custom PCB', qty: 1, unitCost: '$8.00', notes: 'Analog front-end assembly' },
  ];

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-5xl mx-auto">
          <Link href="/deep-dive" className="inline-flex items-center text-secondary hover:text-secondary/80 mb-6">
            ← Back to Deep Dive
          </Link>
          
          <SectionHeading className="mb-8">
            Electronics & <span className="gradient-text">EMG Front-End</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The electronics subsystem captures, amplifies, and conditions electromyographic (EMG) signals from 
              surface electrodes placed on the forearm. The analog front-end includes differential amplification, 
              bandpass filtering, rectification, and envelope extraction—all optimized for low noise and minimal 
              component count.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The INA128 instrumentation amplifier provides high common-mode rejection (%gt 100 dB) to reject 60 Hz 
              line noise and motion artifacts. A two-stage active bandpass filter (10–500 Hz) isolates the EMG 
              spectral content. Full-wave rectification followed by a low-pass envelope filter (~5 Hz cutoff) 
              extracts the amplitude envelope, which the Arduino Nano samples at 500 Hz.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Power for the analog circuitry comes from the Arduino&apos;s 5V rail, with local decoupling capacitors 
              to minimize digital switching noise. Total current draw for the analog front-end is ~15 mA.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">EMG Analog Front-End Schematic</h3>
            <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
              <Image src="/img/emg-front-end-schematic.png" alt="EMG schematic" fill className="object-contain p-4" />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Schematic showing INA128 differential amplifier, bandpass filter stages, rectifier, and envelope detector.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Design Notes</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Gain:</strong> INA128 configured for ~1000× gain (60 dB). Adjustable via single resistor (R_G).</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Bandpass filter:</strong> 2nd-order Sallen-Key topology. fc_low = 10 Hz, fc_high = 500 Hz.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Rectification:</strong> Precision full-wave rectifier using TL074 op-amp.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Envelope:</strong> 1st-order RC low-pass with 5 Hz cutoff for amplitude extraction.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Electrode placement:</strong> Two active electrodes on flexor digitorum superficialis, one reference on bony prominence (ulna).</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Noise mitigation:</strong> Shielded cables for electrode leads, star grounding to minimize ground loops.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Bill of Materials (Electronics)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-white">Part</th>
                    <th className="py-3 px-4 font-semibold text-white">Qty</th>
                    <th className="py-3 px-4 font-semibold text-white">Unit Cost</th>
                    <th className="py-3 px-4 font-semibold text-white">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {bomItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="py-3 px-4">{item.part}</td>
                      <td className="py-3 px-4">{item.qty}</td>
                      <td className="py-3 px-4 text-secondary">{item.unitCost}</td>
                      <td className="py-3 px-4 text-sm">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Downloadable Files</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-white">Schematic (PDF)</h4>
                  <p className="text-sm text-gray-400">Full EMG analog front-end circuit diagram</p>
                </div>
                <a href="/files/schematics/emg-schematic.pdf" className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-secondary hover:bg-primary/30 transition-all">
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-white">PCB Gerber Files</h4>
                  <p className="text-sm text-gray-400">Custom PCB layout for manufacturing</p>
                </div>
                <a href="/files/pcb/silverhand-pcb-gerbers.zip" className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-secondary hover:bg-primary/30 transition-all">
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


