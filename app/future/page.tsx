import { Metadata } from 'next';
import Section, { SectionHeading } from '@/components/Section';
import { Brain, Target, Package, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Future Work | SilverHand',
  description: 'Planned improvements, research directions, and roadmap for SilverHand development.',
};

export default function FuturePage() {
  const futureItems = [
    {
      title: 'Multichannel EMG',
      icon: Brain,
      priority: 'High',
      risk: 'Medium',
      description: 'Expand from single-channel to 4–8 channel EMG sensing to enable independent finger control and grasp pattern recognition.',
      details: [
        'Additional INA128 channels with multiplexed ADC',
        'Higher-resolution ADC (12–16 bit) for improved SNR',
        'Feature extraction (RMS, mean frequency) for classification',
      ],
    },
    {
      title: 'ML-Based Intent Classification',
      icon: Target,
      priority: 'High',
      risk: 'High',
      description: 'Replace threshold-based control with machine learning model trained on user-specific EMG patterns for grasp types (power grip, pinch, etc.).',
      details: [
        'Dataset collection: record EMG for common grasp intents',
        'Lightweight classifier (e.g., LDA, SVM) running on Pi Zero',
        'Real-time inference latency target: <20ms',
      ],
    },
    {
      title: 'Product-Level Enclosure',
      icon: Package,
      priority: 'Medium',
      risk: 'Low',
      description: 'Design injection-molded or thermoformed enclosure for improved aesthetics, durability, and comfort.',
      details: [
        'Ergonomic strap system with padding',
        'IP54 rating for moisture/dust resistance',
        'Integrated battery compartment with charging port',
      ],
    },
    {
      title: 'Clinical Testing & Validation',
      icon: Users,
      priority: 'High',
      risk: 'High',
      description: 'Conduct user studies with arthritis patients to validate functional benefit, safety, and usability.',
      details: [
        'IRB approval for human subjects research',
        'Standardized grip strength and ADL (activities of daily living) assessments',
        'Longitudinal study (4–8 weeks) to assess real-world adoption',
      ],
    },
  ];

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'Medium': return 'text-secondary border-secondary/30 bg-secondary/10';
      case 'Low': return 'text-green-400 border-green-400/30 bg-green-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const riskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-secondary';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading className="text-center mb-4">
            Future <span className="gradient-text">Work</span>
          </SectionHeading>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Planned enhancements and research directions to evolve SilverHand from proof-of-concept 
            to validated assistive device.
          </p>

          <div className="space-y-8 mb-16">
            {futureItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-card p-8">
                  <div className="flex items-start gap-6">
                    <div className="shrink-0 w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${priorityColor(item.priority)}`}>
                            {item.priority} Priority
                          </span>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border border-gray-700 ${riskColor(item.risk)}`}>
                            {item.risk} Risk
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Implementation Details:</h4>
                        <ul className="space-y-1 text-gray-400 text-sm">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start">
                              <span className="text-secondary mr-2">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Additional Considerations</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">•</span>
                <span><strong className="text-white">Haptic feedback:</strong> Integrate vibration motor to provide 
                tactile confirmation of grasp state (open/closed).</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">•</span>
                <span><strong className="text-white">Wireless connectivity:</strong> Bluetooth Low Energy for 
                mobile app integration (calibration, battery monitoring, usage analytics).</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">•</span>
                <span><strong className="text-white">Customization service:</strong> Online configurator for 
                hand size, finger lengths, and material preferences (3D printing on demand).</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1">•</span>
                <span><strong className="text-white">Cost reduction:</strong> Target bill of materials below $150 
                through volume purchasing and design-for-manufacturing optimization.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Research Alignment</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Future development of SilverHand aligns with global research in biomechatronics and assistive 
              robotics. Key research themes that guide our work include:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>User-centered design for wearable robotics and accessibility</li>
              <li>Real-time biosignal processing and intent decoding</li>
              <li>Accessible, low-cost assistive technology through open-source design</li>
              <li>Human-robot interaction and transparent, intuitive control</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Collaboration opportunities are welcomed for clinical trials, advanced control algorithms, 
              and translational research toward broader accessibility and impact.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}


