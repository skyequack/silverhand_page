import { Metadata } from 'next';
import Image from 'next/image';
import Section, { SectionHeading } from '@/components/Section';
import { Download } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mechanical Design | SilverHand Deep Dive',
  description: 'CAD models, linkage design, materials, and 3D-printed components.',
};

export default function MechanicalPage() {
  const bomItems = [
    { part: 'MG996R Servo Motor', qty: 4, unitCost: '$8.00', notes: '180° rotation, 11kg·cm torque' },
    { part: '3D Printed Chassis (PLA)', qty: 1, unitCost: '$15.00', notes: 'Main body structure' },
    { part: '3D Printed Finger Linkages', qty: 4, unitCost: '$8.00', notes: 'Per-finger linkage sets' },
    { part: 'M3 Screws & Nuts (assorted)', qty: 50, unitCost: '$5.00', notes: 'Fasteners for assembly' },
    { part: 'Extension Springs (4mm)', qty: 4, unitCost: '$2.00', notes: 'Passive finger extension' },
    { part: 'Velcro Straps', qty: 3, unitCost: '$3.00', notes: 'Hand mounting' },
  ];

  return (
    <>
      <Section className="pt-24">
        <div className="max-w-5xl mx-auto">
          <Link href="/deep-dive" className="inline-flex items-center text-secondary hover:text-secondary/80 mb-6">
            ← Back to Deep Dive
          </Link>
          
          <SectionHeading className="mb-8">
            Mechanical <span className="gradient-text">Design</span>
          </SectionHeading>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The mechanical system consists of a dorsal-mounted exoskeleton frame, four independent servo-driven 
              finger linkages, and a forearm mounting platform. The design prioritizes lightweight construction, 
              adjustability, and ease of fabrication using consumer 3D printers.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The chassis is 3D-printed in PLA (polylactic acid) for its balance of strength, printability, and 
              low cost. Total printed mass is approximately 120g. Four MG996R servos provide actuation force, each 
              capable of 11 kg·cm torque at 6V, sufficient to assist finger flexion for grasping tasks.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Each finger has a dedicated four-bar linkage that translates servo rotation into finger flexion. 
              This mechanism maintains approximately constant moment arm throughout the range of motion, avoiding 
              singularities and ensuring smooth actuation. Extension springs provide passive return force when servos 
              release, reducing power consumption and heat buildup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4">CAD Snapshots</h3>
              <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Image src="/img/cad-snapshot-1.png" alt="CAD model snapshot" fill className="object-contain p-2" />
              </div>
              <p className="text-sm text-gray-400">Isometric view of assembled exoskeleton</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4">Servo Linkage Illustration</h3>
              <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Image src="/img/servo-linkage.png" alt="Servo linkage diagram" fill className="object-contain p-2" />
              </div>
              <p className="text-sm text-gray-400">Four-bar linkage kinematic diagram</p>
            </div>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Design Notes</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Material:</strong> PLA filament (1.75mm) printed at 210°C, 0.2mm layer height. Infill 30% for balance of strength and weight.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Linkage geometry:</strong> Optimized to avoid singularities; link lengths chosen to provide ~90° finger flexion from ~120° servo rotation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Mounting:</strong> Three velcro straps (wrist, mid-forearm, proximal forearm) distribute load and prevent slippage during use.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Modularity:</strong> Finger linkages are separate STL files, allowing individual replacement if damaged.</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                <span><strong className="text-white">Clearances:</strong> 0.3mm clearance for pin joints, 0.5mm for snap-fit features. Test prints recommended for dimensional calibration.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Bill of Materials (Mechanical)</h2>
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
                  <h4 className="font-semibold text-white">3D Print Files (All STLs)</h4>
                  <p className="text-sm text-gray-400">Chassis, linkages, and mounting components</p>
                </div>
                <a href="/files/3d/silverhand-stl-pack.zip" className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-secondary hover:bg-primary/30 transition-all">
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-white">CAD Source Files (STEP)</h4>
                  <p className="text-sm text-gray-400">Editable CAD models for customization</p>
                </div>
                <a href="/files/cad/silverhand-cad.zip" className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-secondary hover:bg-primary/30 transition-all">
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


