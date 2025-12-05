import { Hammer, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Hammer className="w-8 h-8 text-amber-500" />
              <span className="text-xl font-bold text-white">BELITEI</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Votre partenaire de confiance pour tous vos travaux de rénovation d'appartements et de maisons.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-slate-400">
              <li>Électricité</li>
              <li>Pose de parquet</li>
              <li>Installation de cuisine</li>
              <li>Changement de compteurs</li>
              <li>Rénovation complète</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                07 61 61 54 00
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                delitei.georghii@orange.fr
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Epinay-sur-Seine
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} BELITEI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
