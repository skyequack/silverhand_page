import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';
import { Download, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Build Instructions | SilverHand',
  description: 'Step-by-step assembly guide for building your own SilverHand exoskeleton.',
};

export default function BuildInstructionsPage() {
  const steps = [
    {
      number: 1,
      title: '3D Print All Components',
      description: 'Print chassis, finger linkages, and mounting brackets using the provided STL files.',
      details: [
        'Material: PLA filament, 1.75mm diameter',
        'Layer height: 0.2mm, infill: 30%',
        'Nozzle temp: 210°C, bed temp: 60°C',
        'Total print time: ~12 hours',
        'Post-processing: Remove supports, light sanding of joint surfaces',
      ],
      files: ['/files/3d/silverhand-stl-pack.zip'],
    },
    {
      number: 2,
      title: 'Assemble Mechanical Structure',
      description: 'Attach servos to chassis and install finger linkages using M3 screws.',
      details: [
        'Insert four MG996R servos into chassis mounting slots',
        'Secure with M3×8mm screws (4 per servo)',
        'Attach linkages to servo horns using provided horn screws',
        'Install extension springs between linkages and chassis anchor points',
        'Apply threadlocker to critical fasteners to prevent loosening',
      ],
      files: [],
    },
    {
      number: 3,
      title: 'Build EMG Analog Front-End',
      description: 'Solder analog circuitry on perfboard or use custom PCB.',
      details: [
        'Follow schematic to place INA128, TL074, and passive components',
        'Use star grounding: single ground point to minimize noise',
        'Test circuit with function generator before connecting electrodes',
        'Verify gain: input 1mV sine wave (50 Hz), expect ~1V output',
        'Mount completed board in chassis electronics bay',
      ],
      files: ['/files/schematics/emg-schematic.pdf', '/files/pcb/silverhand-pcb-gerbers.zip'],
    },
    {
      number: 4,
      title: 'Assemble Power System',
      description: 'Wire battery, buck converters, and power distribution.',
      details: [
        'Connect LiPo battery to XT60 connector with inline power switch',
        'Wire LM2596 input to battery; set output to 6.0V for servos',
        'Wire MP1584 input to battery; set output to 5.0V for Pi/Arduino',
        'Add fuse (3A) on servo power rail for protection',
        'Test voltage rails with multimeter before connecting load',
      ],
      files: [],
    },
    {
      number: 5,
      title: 'Upload Firmware',
      description: 'Flash firmware to Arduino Nano and Raspberry Pi Pico.',
      details: [
        'Arduino: Open silverhand_emg.ino in Arduino IDE, select board, upload',
        'Pico: Flash MicroPython UF2, copy pico_servo_controller.py as main.py',
        'Test Arduino by reading serial output (should show ADC values)',
        'Test Pico by sending I²C commands from Pi Zero (use i2cdetect)',
      ],
      files: ['/files/firmware/silverhand-firmware-v0.1.zip'],
    },
    {
      number: 6,
      title: 'Configure Raspberry Pi Zero 2 W',
      description: 'Set up Pi Zero with Python control script and dependencies.',
      details: [
        'Install Raspberry Pi OS Lite (headless recommended)',
        'Enable I²C and UART via raspi-config',
        'Install Python dependencies: pip install pyserial smbus2',
        'Copy silverhand_control.py to /home/pi/',
        'Set up autostart: add script to /etc/rc.local or systemd service',
      ],
      files: [],
    },
    {
      number: 7,
      title: 'Wiring and Integration',
      description: 'Connect all subsystems according to wiring diagram.',
      details: [
        'Connect Arduino to Pi Zero via USB (serial communication)',
        'Connect Pico to Pi Zero I²C pins: SDA (GPIO 2), SCL (GPIO 3)',
        'Connect servos to Pico PWM pins (GP0-GP3)',
        'Connect EMG electrodes to analog front-end input via shielded cable',
        'Route all wiring through chassis channels; use zip ties to secure',
      ],
      files: ['/img/wiring-diagram.png'],
    },
    {
      number: 8,
      title: 'Calibration and Testing',
      description: 'Perform user calibration and validate operation.',
      details: [
        'Place EMG electrodes on flexor digitorum superficialis (forearm)',
        'Run calibration: python silverhand_control.py --calibrate',
        'Follow prompts: relax hand, then flex at maximum effort',
        'Test actuation: flex forearm muscles, observe servo motion',
        'Adjust threshold in config file if false activations occur',
        'Perform grasping tests with objects of varying sizes',
      ],
      files: [],
    },
  ];

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading className="mb-8">
            Build <span className="gradient-text">Instructions</span>
          </SectionHeading>

          <div className="glass-card p-6 mb-12 bg-primary/5 border-primary/30">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-secondary shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Important Safety Notice</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This is an experimental device intended for research and educational purposes. It is NOT a 
                  medical device and has not been evaluated for safety or efficacy by regulatory agencies. 
                  Use at your own risk. Consult with a physician before use if you have medical conditions. 
                  Improper assembly or use may result in injury.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="glass-card p-8">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <ul className="space-y-2 text-gray-300 text-sm mb-4">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-secondary mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    {step.files.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-white mb-2">Required Files:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.files.map((file, idx) => (
                            <a
                              key={idx}
                              href={file}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded text-secondary text-sm hover:bg-primary/30 transition-all"
                            >
                              <Download className="h-3 w-3" />
                              {file.split('/').pop()}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Complete Bill of Materials</h2>
            <p className="text-gray-300 mb-4">
              Download the complete BOM with part numbers, suppliers, and estimated costs:
            </p>
            <a
              href="/files/bom.csv"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary transition-all shadow-lg shadow-primary-500/40"
            >
              <Download className="h-5 w-5" />
              Download BOM (CSV)
            </a>
          </div>

          <div className="glass-card p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-gray-300 mb-4">
              If you encounter issues during assembly or have questions about the build process:
            </p>
            <div className="flex gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-secondary/50 text-secondary rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
              >
                Contact Us
              </Link>
              <a
                href="https://github.com/yourusername/silverhand/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-secondary/50 text-secondary rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
              >
                Report Issue on GitHub
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


