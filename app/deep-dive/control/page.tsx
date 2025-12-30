import { Metadata } from 'next';
import Image from 'next/image';
import Section, { SectionHeading } from '@/components/Section';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Control Model | SilverHand Deep Dive',
  description: 'Control loop architecture, calibration, threshold detection, and latency analysis.',
};

export default function ControlPage() {
  return (
    <>
      <Section className="pt-24">
        <div className="max-w-5xl mx-auto">
          <Link href="/deep-dive" className="inline-flex items-center text-secondary hover:text-secondary/80 mb-6">
            ← Back to Deep Dive
          </Link>
          
          <SectionHeading className="mb-8">
            Control <span className="gradient-text">Model</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The control system maps EMG signal amplitude to servo position commands using a threshold-based 
              proportional control strategy. The Raspberry Pi Zero 2 W runs a Python control loop at 100 Hz, 
              reading EMG envelope data from the Arduino Nano and sending servo commands to the Raspberry Pi Pico.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This architecture achieves end-to-end latency of ~30 ms from muscle activation to servo motion, 
              providing responsive feedback for natural interaction. The control model includes calibration, 
              noise rejection, and safety limits to ensure reliable operation.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Control Loop Flowchart</h3>
            <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
              <Image src="/img/control-flowchart.png" alt="Control loop flowchart" fill className="object-contain p-4" />
            </div>
            <p className="text-sm text-gray-400">
              State machine and control flow from EMG input to servo actuation.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Calibration Routine</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-secondary mr-2 mt-1">1.</span>
                <span><strong className="text-white">Baseline measurement:</strong> User relaxes hand completely for 5 seconds. 
                System records minimum EMG envelope value (noise floor).</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2 mt-1">2.</span>
                <span><strong className="text-white">Maximum voluntary contraction (MVC):</strong> User flexes forearm muscles 
                at maximum effort for 3 seconds. System records peak EMG envelope value.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2 mt-1">3.</span>
                <span><strong className="text-white">Threshold calculation:</strong> Activation threshold set to baseline + 
                20% of (MVC - baseline). This provides comfortable activation without false triggers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2 mt-1">4.</span>
                <span><strong className="text-white">Proportional gain:</strong> Servo range (0°–120°) mapped linearly to EMG 
                range (threshold to MVC).</span>
              </li>
            </ol>
            <p className="text-gray-300 mt-4">
              Calibration values are saved to a config file and persist across sessions. Recalibration is recommended 
              when electrode placement changes or after ~1 hour of use to compensate for muscle fatigue.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Design Notes</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Noise rejection:</strong> Moving average filter (window size 5 samples) 
                smooths EMG envelope and reduces jitter.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Hysteresis:</strong> Activation threshold and deactivation threshold differ 
                by 10% to prevent oscillation near threshold.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Safety limits:</strong> Servos limited to 120° maximum rotation to prevent 
                over-flexion and mechanical damage.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Latency breakdown:</strong> EMG sampling (2ms) + serial transfer (5ms) + 
                Python processing (8ms) + I²C to Pico (3ms) + servo response (12ms) ≈ 30ms total.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Performance Metrics</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-white">Metric</th>
                    <th className="py-3 px-4 font-semibold text-white">Value</th>
                    <th className="py-3 px-4 font-semibold text-white">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 px-4">Control Loop Rate</td>
                    <td className="py-3 px-4 text-secondary">100 Hz</td>
                    <td className="py-3 px-4 text-sm">10ms update interval</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 px-4">End-to-End Latency</td>
                    <td className="py-3 px-4 text-secondary">~30 ms</td>
                    <td className="py-3 px-4 text-sm">Muscle activation to servo motion</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 px-4">Servo Range</td>
                    <td className="py-3 px-4 text-secondary">0°–120°</td>
                    <td className="py-3 px-4 text-sm">Maps to ~90° finger flexion</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 px-4">False Activation Rate</td>
                    <td className="py-3 px-4 text-secondary">&lt;2%</td>
                    <td className="py-3 px-4 text-sm">With proper calibration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


