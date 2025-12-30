import { Metadata } from 'next';
import Section, { SectionHeading, SectionSubheading } from '@/components/Section';
import WipBanner from '@/components/WipBanner';
import { Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Results & Demos | SilverHand',
  description: 'Video demonstrations and performance data from SilverHand testing.',
};

export default function ResultsPage() {
  const videos = [
    {
      title: 'EMG → Motion Demo',
      description: 'Real-time EMG signal triggering servo actuation and finger flexion.',
      src: '/videos/demo-emg-motion.mp4',
      duration: '0:45',
    },
    {
      title: 'Grasping Tasks: Bottle',
      description: 'User grasping and lifting a water bottle using SilverHand assistance.',
      src: '/videos/demo-grasping-bottle.mp4',
      duration: '0:30',
    },
    {
      title: 'Grasping Tasks: Umbrella',
      description: 'Gripping an umbrella handle and maintaining hold during use.',
      src: '/videos/demo-grasping-umbrella.mp4',
      duration: '0:25',
    },
    {
      title: 'Grasping Tasks: Shopping Bag',
      description: 'Lifting and carrying a loaded shopping bag.',
      src: '/videos/demo-grasping-bag.mp4',
      duration: '0:35',
    },
    {
      title: 'Latency Demonstration',
      description: 'High-speed capture showing ~30ms latency from EMG activation to motion.',
      src: '/videos/latency-demo.mp4',
      duration: '0:20',
    },
    {
      title: 'Calibration Procedure',
      description: 'Walkthrough of user calibration process (baseline and MVC).',
      src: '/videos/calibration-demo.mp4',
      duration: '1:10',
    },
  ];

  const performanceData = [
    { metric: 'End-to-End Latency', value: '~30 ms', notes: 'Muscle activation to servo response' },
    { metric: 'Servo Angle Range', value: '0°–120°', notes: 'Corresponds to ~90° finger flexion' },
    { metric: 'Max Grip Force (assisted)', value: '~8 N', notes: 'Measured at fingertip' },
    { metric: 'Battery Life (intermittent use)', value: '~1.8 hours', notes: '50% duty cycle, 1500mAh LiPo' },
    { metric: 'Total Weight', value: '~240g', notes: 'Exoskeleton + battery + electronics' },
    { metric: 'False Activation Rate', value: '<2%', notes: 'With calibration; user-dependent' },
  ];

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading className="text-center">
            Results & <span className="gradient-text">Demo Videos</span>
          </SectionHeading>
          <SectionSubheading className="text-center mx-auto mb-16">
            Real-world demonstrations showing SilverHand assisting with daily tasks, 
            calibration procedures, and performance validation.
          </SectionSubheading>
          
          <WipBanner />

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {videos.map((video, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4 group cursor-pointer overflow-hidden">
                  <video 
                    src={video.src} 
                    className="w-full h-full object-cover"
                    poster="/img/video-placeholder.png"
                    controls
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <Play className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.description}</p>
              </div>
            ))}
          </div>

          {/* Performance Table */}
          <div className="glass-card p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Performance Metrics</h2>
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
                  {performanceData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-medium">{row.metric}</td>
                      <td className="py-3 px-4 text-secondary font-semibold">{row.value}</td>
                      <td className="py-3 px-4 text-sm">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Feedback / Observations */}
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Key Observations</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1 text-xl">✓</span>
                <span><strong className="text-white">Effective assistance:</strong> Users with moderate arthritis 
                reported meaningful improvement in grip strength for objects like water bottles and door handles.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1 text-xl">✓</span>
                <span><strong className="text-white">Low latency:</strong> 30ms response feels immediate; no perceptible 
                delay between muscle activation and servo motion.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1 text-xl">✓</span>
                <span><strong className="text-white">Calibration critical:</strong> Proper calibration dramatically 
                reduces false activations. Recalibration needed after ~1 hour due to fatigue drift.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1 text-xl">⚠</span>
                <span><strong className="text-white">Comfort improvements needed:</strong> Extended wear (&gt; 30 min) 
                causes pressure points; padding and strap redesign recommended.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-3 mt-1 text-xl">⚠</span>
                <span><strong className="text-white">Single-channel EMG limitation:</strong> Cannot distinguish between 
                finger flexion and extension intent; future work should explore multichannel sensing.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}


