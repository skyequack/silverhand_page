import { Metadata } from 'next';
import Image from 'next/image';
import Section, { SectionHeading } from '@/components/Section';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Power System | SilverHand Deep Dive',
  description: 'Battery, power distribution, voltage regulation, and runtime analysis.',
};

export default function PowerPage() {
  const bomItems = [
    { part: 'LiPo Battery 7.4V 1500mAh (2S)', qty: 1, unitCost: '$15.00', notes: 'Main power source' },
    { part: 'LM2596 Buck Converter (7.4V → 6V)', qty: 1, unitCost: '$2.00', notes: 'Servo power rail' },
    { part: 'MP1584 Buck Converter (7.4V → 5V)', qty: 1, unitCost: '$1.50', notes: 'Raspberry Pi / Arduino power' },
    { part: 'ICL7660 Charge Pump (-5V)', qty: 1, unitCost: '$1.00', notes: 'Negative rail for op-amps (optional)' },
    { part: 'XT60 Connector', qty: 1, unitCost: '$1.00', notes: 'Battery connector' },
    { part: 'Power Switch (SPST)', qty: 1, unitCost: '$0.50', notes: 'Main power on/off' },
  ];

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-5xl mx-auto">
          <Link href="/deep-dive" className="inline-flex items-center text-secondary hover:text-secondary/80 mb-6">
            ← Back to Deep Dive
          </Link>
          
          <SectionHeading className="mb-8">
            Power <span className="gradient-text">System</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The power system is designed for portability and sufficient runtime for daily use. A 7.4V 1500mAh 
              2S LiPo battery provides the primary power source, with two DC-DC buck converters stepping down to 
              6V (servos) and 5V (Raspberry Pi, Arduino, analog front-end). Total current draw varies with activity:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li><strong className="text-white">Idle (no actuation):</strong> ~400 mA (Pi Zero: 150 mA, Pico: 50 mA, Arduino: 30 mA, servos idle: 4 × 40 mA)</li>
              <li><strong className="text-white">Active grasping:</strong> ~1500 mA (servos under load: 4 × 250 mA, plus control electronics)</li>
              <li><strong className="text-white">Peak (all servos stalled):</strong> ~2500 mA (brief, thermal limits apply)</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              Assuming 50% duty cycle (intermittent grasping), average current is ~800 mA, yielding approximately 
              <strong className="text-white"> 1.8 hours runtime</strong>. For extended use, a higher-capacity battery 
              (e.g., 2200mAh) can be substituted without design changes.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Power Distribution Diagram</h3>
            <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
              <Image src="/img/power-distribution.png" alt="Power distribution diagram" fill className="object-contain p-4" />
            </div>
            <p className="text-sm text-gray-400">
              Block diagram showing battery, regulators, and distribution to subsystems.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Design Notes</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Voltage selection:</strong> 6V for servos balances torque and heat; 5V for logic ensures Arduino/Pi compatibility.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Regulators:</strong> LM2596 handles servo current spikes (3A max); MP1584 provides stable 5V for sensitive electronics.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Battery protection:</strong> LiPo includes built-in protection circuit module (PCM) to prevent over-discharge below 3.0V/cell.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Charging:</strong> External LiPo balance charger (not integrated). Charge at 1C (1.5A) for ~1 hour from empty.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Thermal management:</strong> Buck converters mounted on aluminum heat spreader; servos include built-in thermal cutoff.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Bill of Materials (Power)</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Runtime Analysis</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-white">Load Scenario</th>
                    <th className="py-3 px-4 font-semibold text-white">Avg Current</th>
                    <th className="py-3 px-4 font-semibold text-white">Estimated Runtime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 px-4">Idle / Standby</td>
                    <td className="py-3 px-4 text-secondary">400 mA</td>
                    <td className="py-3 px-4">~3.7 hours</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 px-4">Intermittent Use (50% duty)</td>
                    <td className="py-3 px-4 text-secondary">800 mA</td>
                    <td className="py-3 px-4">~1.8 hours</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 px-4">Continuous Grasping</td>
                    <td className="py-3 px-4 text-secondary">1500 mA</td>
                    <td className="py-3 px-4">~1.0 hour</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Assumptions: 1500mAh usable capacity (assumes 80% depth of discharge for LiPo longevity), 
              ambient temperature 20°C, efficiency losses ~15%.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}


