import { Hammer } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('/images/20221217_154854.jpg')] bg-cover bg-center opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Hammer className="w-12 h-12 text-amber-500" />
            <h1 className="text-4xl lg:text-6xl font-bold">
              BELITEI
            </h1>
          </div>

          <p className="text-xl lg:text-2xl text-slate-300 mb-8">
            Électricien polyvalent avec 25 ans d'expérience
          </p>

          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            Spécialisés dans la rénovation d'appartements et de maisons, nous intervenons pour tous vos projets :
            électricité, pose de parquet, installation de cuisine, changement de compteurs et bien plus encore.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Demander un devis
            </a>
            <a
              href="#realisations"
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 border border-slate-600"
            >
              Voir nos réalisations
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
