import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';
import WipBanner from '@/components/WipBanner';
import { Download, FileText, Box, Code, Film } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Downloads | SilverHand',
  description: 'Download all project files: 3D models, schematics, firmware, BOMs, and videos.',
};

export default function DownloadsPage() {
  const downloads = [
    {
      category: '3D Print Files',
      icon: Box,
      items: [
        { name: 'Complete STL Pack', size: '8.2 MB', file: '/files/3d/silverhand-stl-pack.zip', description: 'All chassis and linkage STLs' },
        { name: 'CAD Source (STEP)', size: '12.4 MB', file: '/files/cad/silverhand-cad.zip', description: 'Editable CAD models' },
        { name: 'Individual Finger Linkage', size: '420 KB', file: '/files/3d/part-finger-1.stl', description: 'Single finger linkage (example)' },
      ],
    },
    {
      category: 'Electronics & Schematics',
      icon: FileText,
      items: [
        { name: 'EMG Schematic (PDF)', size: '1.1 MB', file: '/files/schematics/emg-schematic.pdf', description: 'Analog front-end circuit diagram' },
        { name: 'PCB Gerber Files', size: '3.4 MB', file: '/files/pcb/silverhand-pcb-gerbers.zip', description: 'For PCB manufacturing' },
        { name: 'Wiring Diagram (PNG)', size: '2.8 MB', file: '/img/wiring-diagram.png', description: 'System integration wiring' },
      ],
    },
    {
      category: 'Firmware & Software',
      icon: Code,
      items: [
        { name: 'Complete Firmware Package', size: '156 KB', file: '/files/firmware/silverhand-firmware-v0.1.zip', description: 'Arduino, Pico, and Pi Zero code' },
        { name: 'Arduino Sketch (.ino)', size: '12 KB', file: '/files/firmware/silverhand_emg.ino', description: 'EMG acquisition firmware' },
        { name: 'Pico MicroPython', size: '8 KB', file: '/files/firmware/pico_servo_controller.py', description: 'Servo PWM controller' },
        { name: 'Pi Zero Control Script', size: '18 KB', file: '/files/firmware/silverhand_control.py', description: 'Main control loop (Python)' },
      ],
    },
    {
      category: 'Documentation',
      icon: FileText,
      items: [
        { name: 'Bill of Materials (CSV)', size: '24 KB', file: '/files/bom.csv', description: 'Complete parts list with suppliers' },
        { name: 'Assembly Manual (PDF)', size: '4.2 MB', file: '/files/docs/assembly-manual.pdf', description: 'Detailed build guide' },
        { name: 'Comprehensive Summary (MD)', size: '32 KB', file: '/content/comprehensive-summary.md', description: 'Full project documentation' },
      ],
    },
    {
      category: 'Demo Videos',
      icon: Film,
      items: [
        { name: 'EMG Motion Demo', size: '18.4 MB', file: '/videos/demo-emg-motion.mp4', description: '0:45 - Real-time control' },
        { name: 'Grasping: Bottle', size: '12.1 MB', file: '/videos/demo-grasping-bottle.mp4', description: '0:30 - Functional demonstration' },
        { name: 'Latency Demo', size: '8.3 MB', file: '/videos/latency-demo.mp4', description: '0:20 - High-speed capture' },
        { name: 'Calibration Procedure', size: '28.6 MB', file: '/videos/calibration-demo.mp4', description: '1:10 - Setup walkthrough' },
      ],
    },
  ];

  const getIconColor = (category: string) => {
    const colors: Record<string, string> = {
      '3D Print Files': 'text-secondary bg-primary/10 border-primary/30',
      'Electronics & Schematics': 'text-primary bg-primary/10 border-primary/30',
      'Firmware & Software': 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      'Documentation': 'text-green-400 bg-green-500/10 border-green-500/30',
      'Demo Videos': 'text-secondary bg-primary/10 border-primary/30',
    };
    return colors[category] || 'text-gray-400 bg-gray-500/10 border-gray-500/30';
  };

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading className="text-center mb-4">
            Downloads & <span className="gradient-text">Resources</span>
          </SectionHeading>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            All project files are open-source and freely available. Download CAD models, schematics, 
            firmware, and documentation to build your own SilverHand.
          </p>

          <WipBanner />

          <div className="space-y-12">
            {downloads.map((category, catIdx) => {
              const Icon = category.icon;
              return (
                <div key={catIdx}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getIconColor(category.category)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="glass-card p-6 hover:border-primary/50 transition-all group">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white group-hover:text-secondary transition-colors mb-1">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                            <p className="text-xs text-gray-500">Size: {item.size}</p>
                          </div>
                          <a
                            href={item.file}
                            download
                            className="shrink-0 ml-4 w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-secondary hover:bg-primary/30 hover:scale-110 transition-all"
                          >
                            <Download className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-card p-8 mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">License & Attribution</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              All SilverHand project files are released under the <strong className="text-white">MIT License</strong>. 
              You are free to use, modify, and distribute these files for any purpose, including commercial use, 
              provided you include the original copyright notice and license text.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              If you build upon this work, please consider citing the project and sharing your improvements 
              with the community.
            </p>
            <a
              href="/license"
              className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors"
            >
              View Full License →
            </a>
          </div>

          <div className="glass-card p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Download All</h2>
            <p className="text-gray-300 mb-4">
              Get everything in one archive (all files, ~80 MB):
            </p>
              <a
                href="/files/silverhand-complete-v0.1.zip"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary transition-all shadow-lg shadow-primary-500/40"
            >
              <Download className="h-5 w-5" />
              Download Complete Package
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}


