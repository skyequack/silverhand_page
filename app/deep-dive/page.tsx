import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';
import Link from 'next/link';
import { Wrench, Zap, Battery, Cpu, Code, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Deep Dive | SilverHand',
  description: 'Detailed technical documentation covering mechanical design, electronics, power systems, control, and software.',
};

export default function DeepDivePage() {
  const sections = [
    {
      title: 'Mechanical Design',
      href: '/deep-dive/mechanical',
      icon: Wrench,
      description: 'CAD models, servo linkage design, 3D-printed components, and materials selection.',
      color: 'cyan',
    },
    {
      title: 'Electronics',
      href: '/deep-dive/electronics',
      icon: Zap,
      description: 'EMG analog front-end, PCB design, component selection, and signal conditioning.',
      color: 'blue',
    },
    {
      title: 'Power System',
      href: '/deep-dive/power',
      icon: Battery,
      description: 'Battery selection, power distribution, voltage regulation, and runtime analysis.',
      color: 'purple',
    },
    {
      title: 'Control Model',
      href: '/deep-dive/control',
      icon: Cpu,
      description: 'Control loop architecture, calibration procedure, threshold detection, and latency optimization.',
      color: 'cyan',
    },
    {
      title: 'Software & Firmware',
      href: '/deep-dive/software',
      icon: Code,
      description: 'Python control code, Pico firmware, communication protocols, and system integration.',
      color: 'blue',
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: 'border-primary/30 bg-primary/10 text-secondary',
    blue: 'border-primary/30 bg-primary/10 text-primary',
    purple: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  };

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading className="text-center mb-4">
            Engineering <span className="gradient-text">Deep Dive</span>
          </SectionHeading>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Comprehensive technical documentation for each subsystem. Click any section to explore detailed 
            design notes, schematics, BOMs, and downloadable files.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link 
                  key={section.href}
                  href={section.href}
                  className="group glass-card glass-card-hover p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-14 h-14 rounded-lg flex items-center justify-center border ${colorMap[section.color]}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {section.description}
                      </p>
                      <div className="inline-flex items-center text-secondary text-sm font-medium group-hover:text-secondary/80">
                        Explore <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              SilverHand integrates multiple engineering disciplines into a cohesive assistive device. The mechanical 
              structure provides the physical interface and force transmission. The electronics capture and process 
              biological signals. The power system enables portable operation. The control model translates user intent 
              into actuator commands. And the software orchestrates all subsystems in real time.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Each subsection below provides detailed technical information sufficient to replicate, modify, or extend 
              the design. All CAD files, schematics, and source code are available in the Downloads section.
            </p>
            <div className="flex gap-4 mt-6">
              <Link 
                href="/downloads" 
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary transition-all shadow-lg shadow-primary-500/40"
              >
                View All Downloads
              </Link>
              <Link 
                href="/build-instructions" 
                className="inline-flex items-center px-6 py-3 text-base font-medium text-secondary border border-secondary/50 rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
              >
                Build Instructions
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


