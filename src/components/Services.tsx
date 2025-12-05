import { Zap, Home, ChefHat, Hammer, Gauge, Wrench } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Électricité',
    description: 'Installation électrique complète, mise aux normes, dépannage et rénovation de circuits électriques.',
  },
  {
    icon: Home,
    title: 'Pose de parquet',
    description: 'Installation de parquet massif, flottant ou stratifié avec finition professionnelle et plinthes.',
  },
  {
    icon: ChefHat,
    title: 'Installation de cuisine',
    description: 'Pose de cuisine équipée, raccordements électriques et plomberie, installation d\'électroménagers.',
  },
  {
    icon: Gauge,
    title: 'Changement de compteurs',
    description: 'Remplacement de compteurs électriques, mise en conformité et installation de compteurs Linky.',
  },
  {
    icon: Hammer,
    title: 'Rénovation complète',
    description: 'Rénovation totale d\'appartements et maisons : démolition, reconstruction, finitions.',
  },
  {
    icon: Wrench,
    title: 'Travaux sur mesure',
    description: 'Tout autre travail de rénovation selon vos besoins : peinture, carrelage, plomberie, etc.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Des prestations complètes pour tous vos projets de rénovation, réalisées par des artisans qualifiés
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-500 group"
              >
                <div className="w-16 h-16 bg-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
