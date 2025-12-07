import { useState, useEffect, useCallback } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { projects } from '../data/projects';

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    });
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? projects.length - 1 : selectedIndex - 1);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === projects.length - 1 ? 0 : selectedIndex + 1);
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, goToPrevious, goToNext]);

  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;

  return (
    <section id="realisations" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Nos Réalisations
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez nos derniers projets de rénovation réalisés avec soin et expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center text-slate-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(project.completed_date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2 text-white hover:text-amber-500 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white text-lg">
            {selectedIndex! + 1} / {projects.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-amber-500 hover:text-slate-900 rounded-full text-white transition-all z-50 group"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="hidden sm:inline font-semibold">Précédent</span>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-amber-500 hover:text-slate-900 rounded-full text-white transition-all z-50 group"
            aria-label="Suivant"
          >
            <span className="hidden sm:inline font-semibold">Suivant</span>
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image and details */}
          <div
            className="max-w-6xl max-h-[90vh] mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProject.image_url}
              alt={selectedProject.title}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            <div className="mt-6 text-center max-w-2xl">
              <div className="inline-block bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                {selectedProject.category}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-slate-300">
                {selectedProject.description}
              </p>
              <p className="text-slate-400 text-sm mt-3">
                {formatDate(selectedProject.completed_date)}
              </p>
            </div>
          </div>

          {/* Thumbnails navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4 py-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(index);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === selectedIndex
                    ? 'border-amber-500 scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
