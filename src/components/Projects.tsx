import { useState, useEffect, useCallback } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { projects } from '../data/projects';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    });
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setGalleryIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setGalleryIndex(0);
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
                {project.before_image_url && project.after_image_url ? (
                  <BeforeAfterSlider
                    beforeImage={project.before_image_url}
                    afterImage={project.after_image_url}
                    className="w-full h-full"
                  />
                ) : (
                  <>
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </>
                )}
                <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold z-20">
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
            {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
              <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4">
                {/* Miniatures à gauche - 2 colonnes */}
                <div className="hidden md:grid grid-cols-2 gap-2 overflow-y-auto max-h-[65vh] pr-2 scrollbar-thin">
                  {selectedProject.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryIndex(idx);
                      }}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === galleryIndex
                          ? 'border-amber-500 scale-105'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                {/* Image principale */}
                <div className="relative flex-1">
                  <img
                    src={selectedProject.gallery[galleryIndex].url}
                    alt={selectedProject.gallery[galleryIndex].label}
                    className="w-full h-[50vh] md:h-[65vh] object-contain rounded-lg"
                  />
                  {/* Label de l'image */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {selectedProject.gallery[galleryIndex].label}
                  </div>
                  {/* Compteur */}
                  <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                    {galleryIndex + 1} / {selectedProject.gallery.length}
                  </div>
                  {/* Flèches de navigation galerie */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryIndex(galleryIndex === 0 ? selectedProject.gallery!.length - 1 : galleryIndex - 1);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-amber-500 rounded-full text-white hover:text-slate-900 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryIndex(galleryIndex === selectedProject.gallery!.length - 1 ? 0 : galleryIndex + 1);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-amber-500 rounded-full text-white hover:text-slate-900 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                {/* Miniatures en bas sur mobile */}
                <div className="flex md:hidden gap-2 overflow-x-auto max-w-full px-2 py-2">
                  {selectedProject.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryIndex(idx);
                      }}
                      className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === galleryIndex
                          ? 'border-amber-500 scale-110'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : selectedProject.before_image_url && selectedProject.after_image_url ? (
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl">
                <div className="flex-1 relative">
                  <div className="absolute top-4 left-4 bg-slate-900/80 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Avant
                  </div>
                  <img
                    src={selectedProject.before_image_url}
                    alt="Avant"
                    className="w-full h-[35vh] md:h-[60vh] object-cover rounded-lg shadow-2xl"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Après
                  </div>
                  <img
                    src={selectedProject.after_image_url}
                    alt="Après"
                    className="w-full h-[35vh] md:h-[60vh] object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            ) : (
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            )}

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
