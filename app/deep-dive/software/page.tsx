import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';
import { Download } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Software & Firmware | SilverHand Deep Dive',
  description: 'Python control code, Pico firmware, communication protocols, and system integration.',
};

export default function SoftwarePage() {
  return (
    <>
      <Section className="pt-24">
        <div className="max-w-5xl mx-auto">
          <Link href="/deep-dive" className="inline-flex items-center text-secondary hover:text-secondary/80 mb-6">
            ← Back to Deep Dive
          </Link>
          
          <SectionHeading className="mb-8">
            Software & <span className="gradient-text">Firmware</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The software stack consists of three components: Arduino Nano firmware (C++) for EMG acquisition, 
              Raspberry Pi Zero Python control script, and Raspberry Pi Pico firmware (MicroPython) for servo PWM generation.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Communication between components uses UART (Arduino ↔ Pi Zero) and I²C (Pi Zero ↔ Pico). All code 
              is open-source and available on GitHub.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Architecture</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-bold text-white mb-2">Arduino Nano Firmware</h3>
                <p className="text-gray-300 mb-2">
                  Written in C++ using Arduino framework. Samples EMG envelope from analog pin A0 at 500 Hz, 
                  applies simple moving average filter, and transmits values via serial at 115200 baud.
                </p>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                  <li>ADC resolution: 10-bit (0–1023)</li>
                  <li>Transmission format: ASCII decimal, newline-terminated</li>
                  <li>Flash usage: ~8 KB / 30 KB available</li>
                </ul>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-bold text-white mb-2">Raspberry Pi Zero 2 W Control Script</h3>
                <p className="text-gray-300 mb-2">
                  Python 3.9+ script handles calibration, threshold detection, proportional control, and I²C 
                  communication to Pico. Uses <code className="text-secondary bg-gray-800 px-1 rounded">pyserial</code> 
                  for UART and <code className="text-secondary bg-gray-800 px-1 rounded">smbus2</code> for I²C.
                </p>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                  <li>Dependencies: pyserial, smbus2, numpy (optional for advanced filtering)</li>
                  <li>Config file: JSON format storing calibration parameters</li>
                  <li>Main loop: 100 Hz using asyncio for non-blocking I/O</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-bold text-white mb-2">Raspberry Pi Pico Firmware</h3>
                <p className="text-gray-300 mb-2">
                  MicroPython firmware acts as I²C slave, receiving servo position commands and generating 
                  50 Hz PWM signals for four MG996R servos. Uses hardware PWM channels for precise timing.
                </p>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                  <li>I²C address: 0x42 (configurable)</li>
                  <li>Command format: 4-byte array, one byte per servo (0–180 degrees)</li>
                  <li>PWM frequency: 50 Hz, pulse width 1000–2000 µs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Communication Protocol</h2>
            <div className="bg-gray-800/30 p-4 rounded-lg font-mono text-sm text-gray-300 mb-4 overflow-x-auto">
              <pre>{`# Arduino → Pi Zero (UART, 115200 baud)
# Format: "<ADC_VALUE>\\n"
# Example: "512\\n"

# Pi Zero → Pico (I²C, address 0x42)
# Write 4 bytes: [servo0_angle, servo1_angle, servo2_angle, servo3_angle]
# Each byte: 0–180 (servo angle in degrees)
# Example: [90, 90, 90, 90]  # All servos to 90°
`}</pre>
            </div>
            <p className="text-gray-300 text-sm">
              Serial protocol is human-readable for debugging. I²C uses compact binary format for minimal latency.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Installation & Usage</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Arduino Nano</h4>
                <div className="bg-gray-800/30 p-3 rounded-lg font-mono text-sm text-gray-300">
                  <pre>{`1. Open silverhand_emg.ino in Arduino IDE
2. Select Board: Arduino Nano, Processor: ATmega328P
3. Upload to Arduino Nano`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Raspberry Pi Pico</h4>
                <div className="bg-gray-800/30 p-3 rounded-lg font-mono text-sm text-gray-300">
                  <pre>{`1. Flash MicroPython to Pico (uf2 file)
2. Copy pico_servo_controller.py to Pico as main.py
3. Reset Pico (will auto-start on boot)`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Raspberry Pi Zero 2 W</h4>
                <div className="bg-gray-800/30 p-3 rounded-lg font-mono text-sm text-gray-300">
                  <pre>{`pip install pyserial smbus2
python silverhand_control.py --calibrate  # Run calibration
python silverhand_control.py              # Normal operation`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Downloadable Files</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-white">Complete Firmware Package</h4>
                  <p className="text-sm text-gray-400">Arduino, Pico, and Pi Zero source code</p>
                </div>
                <a href="/files/firmware/silverhand-firmware-v0.1.zip" className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-secondary hover:bg-primary/30 transition-all">
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-white">GitHub Repository</h4>
                  <p className="text-sm text-gray-400">Full source with git history and issues</p>
                </div>
                <a href="https://github.com/yourusername/silverhand" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-secondary hover:bg-primary/30 transition-all">
                  View on GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


