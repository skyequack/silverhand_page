'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

export interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  tags?: string[];
  link?: string;
  featured?: boolean;
  details?: {
    longDescription: string;
    technologies: string[];
    achievements?: string[];
    media?: { type: 'image' | 'video'; src: string; caption?: string }[];
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageSrc,
  tags = [],
  link,
  featured = false,
  details,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        className={`glass-card glass-card-hover p-6 cursor-pointer ${
          featured ? 'md:col-span-2 lg:col-span-2' : ''
        }`}
        onClick={() => details && setIsModalOpen(true)}
      >
        {imageSrc ? (
          <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-gray-900">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-gray-900 flex items-center justify-center">
            <p className="text-gray-600 text-sm">Image placeholder</p>
          </div>
        )}

        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium text-secondary bg-secondary/10 border border-secondary/30 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {featured && (
          <div className="mt-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/30 rounded-full">
              Featured Project
            </span>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      {isModalOpen && details && (
        <ProjectModal
          title={title}
          details={details}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

interface ProjectModalProps {
  title: string;
  details: NonNullable<ProjectCardProps['details']>;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ title, details, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="glass-card max-w-4xl max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{details.longDescription}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {details.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm text-secondary bg-secondary/10 border border-secondary/30 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {details.achievements && details.achievements.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Key Achievements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {details.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {details.media && details.media.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.media.map((item, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden">
                    {item.type === 'image' ? (
                      <Image src={item.src} alt={item.caption || ''} width={800} height={600} className="w-full h-auto" />
                    ) : (
                      <video src={item.src} controls className="w-full h-auto" />
                    )}
                    {item.caption && (
                      <p className="text-sm text-gray-400 mt-2">{item.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;


