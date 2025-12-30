import Hero from '@/components/Hero';
import Section, { SectionHeading, SectionSubheading } from '@/components/Section';
import { ArrowRight, Zap, Activity, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero
        title="Low-cost EMG-controlled Hand Exoskeleton"
        description="Assistive technology for individuals with arthritis and neuromuscular impairments. Combining biomechatronics, signal processing, and accessible design to augment hand function."
        primaryCTA={{ text: 'View Demo', href: '/results' }}
        secondaryCTA={{ text: 'Engineering Deep Dive', href: '/deep-dive' }}
        imageSrc="/img/hero-render-1.png"
      />

      {/* Quick Overview */}
      <Section>
        <div className="text-center mb-12">
          <SectionHeading>
            Making Disabilities <span className="gradient-text">Mild Inconveniences</span>
          </SectionHeading>
          <SectionSubheading className="mx-auto">
            Just as glasses correct vision without stigma, SilverHand aims to make hand impairments 
            a manageable part of life through affordable, accessible assistive technology.
          </SectionSubheading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card glass-card-hover p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Activity className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">EMG Sensing</h3>
            <p className="text-gray-400">
              Non-invasive muscle signal detection enables natural, intuitive control through the user&apos;s own neural activity.
            </p>
            <Link href="/how-it-works#emg" className="inline-flex items-center mt-4 text-secondary hover:text-secondary/80 text-sm font-medium">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="glass-card glass-card-hover p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Powered Mechanism</h3>
            <p className="text-gray-400">
              Servo-driven linkage amplifies finger flexion force, enabling users to grasp objects they couldn&apos;t otherwise hold.
            </p>
            <Link href="/how-it-works#biomechanics" className="inline-flex items-center mt-4 text-secondary hover:text-secondary/80 text-sm font-medium">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="glass-card glass-card-hover p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
              <Cpu className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-Time Control</h3>
            <p className="text-gray-400">
              Raspberry Pi Zero 2 W and Pico microcontroller process signals and actuate servos with minimal latency for responsive assistance.
            </p>
            <Link href="/how-it-works#control" className="inline-flex items-center mt-4 text-secondary hover:text-secondary/80 text-sm font-medium">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="glass-card p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Explore the Full Project
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Dive into detailed documentation covering motivation, technical design, build instructions, 
            and future development roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/motivation"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary transition-all shadow-lg shadow-primary-500/40"
            >
              Read the Story
            </Link>
            <Link
              href="/build-instructions"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-secondary border border-secondary/50 rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
            >
              Build Your Own
            </Link>
            <Link
              href="/downloads"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-secondary border border-secondary/50 rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
            >
              Download Files
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}


