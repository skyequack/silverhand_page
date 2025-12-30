import { Metadata } from 'next';
import Section, { SectionHeading, SectionSubheading } from '@/components/Section';
import { Cog, Zap, Cpu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How It Works | SilverHand',
  description: 'Technical overview of the EMG sensing, biomechanics, and control architecture behind SilverHand.',
};

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading className="text-center">
            How <span className="gradient-text">SilverHand</span> Works
          </SectionHeading>
          <SectionSubheading className="text-center mx-auto mb-16">
            Three integrated systems work together to amplify hand function: biomechanical mechanism, 
            EMG signal processing, and real-time control.
          </SectionSubheading>

          {/* Biomechanics */}
          <div id="biomechanics" className="glass-card p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Cog className="h-8 w-8 text-secondary" />
                  <h2 className="text-3xl font-bold text-white">Biomechanics & Mechanism</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The exoskeleton uses a servo-driven linkage system mounted on the dorsal (back) side of the 
                  hand. MG996R servos provide actuation force, transmitted through a four-bar linkage to finger 
                  segments. This design amplifies the user&apos;s residual grip strength while maintaining natural 
                  finger kinematics.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The mechanism is designed for flexion assistance: when activated, servos rotate to pull linkages 
                  that guide fingers into a closed (grasping) position. Springs provide passive extension, allowing 
                  the hand to open when the servos release. This approach minimizes power consumption and heat buildup.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Custom 3D-printed parts ensure a lightweight structure (~150g total) that can be worn for extended 
                  periods without fatigue. Adjustable straps accommodate different hand sizes.
                </p>
                <Link href="/deep-dive/mechanical" className="inline-flex items-center mt-4 text-secondary hover:text-secondary/80">
                  Mechanical deep dive →
                </Link>
              </div>
              <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <Image 
                  src="/img/diagram-mechanism.svg" 
                  alt="Biomechanics mechanism diagram" 
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-gray-400 text-center">
                    Diagram: Servo linkage and finger actuation mechanism
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* EMG Sensing */}
          <div id="emg" className="glass-card p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <Image 
                  src="/img/diagram-emg-chain.svg" 
                  alt="EMG signal processing chain" 
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-gray-400 text-center">
                    Diagram: EMG analog front-end and signal path
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold text-white">EMG Sensing & Signal Path</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Surface electromyography (EMG) electrodes placed on the forearm detect electrical activity from 
                  muscles controlling finger flexion. The signal chain includes:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong className="text-white">Instrumentation amplifier (INA128):</strong> Differential 
                  amplification with high common-mode rejection to isolate muscle signals from noise</li>
                  <li><strong className="text-white">Bandpass filter (10–500 Hz):</strong> Removes DC offset 
                  and high-frequency interference, preserving EMG spectral content</li>
                  <li><strong className="text-white">Rectification and envelope detection:</strong> Full-wave 
                  rectification followed by low-pass filtering to extract signal amplitude</li>
                  <li><strong className="text-white">ADC sampling (Arduino Nano):</strong> 10-bit resolution 
                  at 500 Hz captures envelope for threshold detection</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  This analog front-end converts microvolt-level EMG signals (~50–500 µV) into a clean amplitude 
                  envelope suitable for real-time control decisions.
                </p>
                <Link href="/deep-dive/electronics" className="inline-flex items-center mt-4 text-secondary hover:text-secondary/80">
                  Electronics deep dive →
                </Link>
              </div>
            </div>
          </div>

          {/* Control Architecture */}
          <div id="control" className="glass-card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="h-8 w-8 text-purple-400" />
                  <h2 className="text-3xl font-bold text-white">Control Architecture</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The control system uses a threshold-based classifier to map EMG amplitude to servo position. 
                  The Raspberry Pi Zero 2 W runs a Python control loop that:
                </p>
                <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
                  <li>Reads EMG envelope from Arduino Nano via serial (USB)</li>
                  <li>Applies user-specific calibration threshold (set during initialization)</li>
                  <li>Generates servo position commands based on EMG level (proportional control)</li>
                  <li>Sends PWM signals to MG996R servos via Raspberry Pi Pico (I²C bridge)</li>
                </ol>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The Raspberry Pi Pico handles low-level servo timing with microsecond precision, offloading 
                  real-time PWM generation from the Pi Zero. This architecture achieves ~30ms end-to-end latency 
                  from muscle activation to servo motion.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Calibration involves the user flexing their forearm muscles at maximum voluntary contraction 
                  (MVC) and rest, establishing baseline and activation thresholds. A simple state machine prevents 
                  unintended activations from noise or fatigue-induced drift.
                </p>
                <Link href="/deep-dive/control" className="inline-flex items-center mt-4 text-secondary hover:text-secondary/80">
                  Control model deep dive →
                </Link>
              </div>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <Image 
                  src="/img/diagram-control-arch.jpg" 
                  alt="Control architecture block diagram" 
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-gray-400 text-center">
                    Diagram: System block diagram and control loop
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


