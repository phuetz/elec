import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Marie Dubois',
      location: 'Paris 18ème',
      project: 'Rénovation électrique complète',
      rating: 5,
      text: 'Travail impeccable et très professionnel. Gheorghii a refait toute l\'installation électrique de mon appartement. Il est ponctuel, soigneux et de très bon conseil. Je recommande vivement ses services.',
      date: 'Novembre 2024'
    },
    {
      name: 'Jean-Pierre Martin',
      location: 'Epinay-sur-Seine',
      project: 'Installation cuisine et électricité',
      rating: 5,
      text: 'Excellent artisan ! Il a installé ma cuisine et refait l\'électricité. Le travail est parfait, les finitions sont soignées. Il respecte les délais et reste très à l\'écoute. Un grand merci !',
      date: 'Octobre 2024'
    },
    {
      name: 'Sophie Lefevre',
      location: 'Saint-Denis',
      project: 'Pose de parquet et travaux électriques',
      rating: 5,
      text: 'Je suis ravie du résultat ! Gheorghii est un professionnel sérieux et compétent. Il a posé du parquet dans tout mon appartement et refait plusieurs prises électriques. Travail de qualité à prix honnête.',
      date: 'Septembre 2024'
    },
    {
      name: 'Ahmed Benali',
      location: 'Villetaneuse',
      project: 'Rénovation salle de bain',
      rating: 5,
      text: 'Très satisfait de la rénovation complète de ma salle de bain. Gheorghii maîtrise parfaitement son métier : électricité, plomberie, carrelage... Un vrai professionnel polyvalent. Je le recommande sans hésitation.',
      date: 'Août 2024'
    },
    {
      name: 'Isabelle Petit',
      location: 'Stains',
      project: 'Installation interphone et caméras',
      rating: 5,
      text: 'Intervention rapide et efficace pour l\'installation de notre système d\'interphone et de caméras de surveillance. Gheorghii explique bien ce qu\'il fait et donne de bons conseils. Très professionnel.',
      date: 'Juillet 2024'
    },
    {
      name: 'Thomas Bernard',
      location: 'Pierrefitte-sur-Seine',
      project: 'Changement de compteur et tableau électrique',
      rating: 5,
      text: 'Prestation de qualité pour le changement de mon compteur et la mise aux normes de mon tableau électrique. Travail propre, rapide et conforme aux normes. Je recommande vivement !',
      date: 'Juin 2024'
    }
  ];

  return (
    <section id="avis" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Avis de nos clients
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            La satisfaction de nos clients est notre meilleure récompense
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 relative"
            >
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>

              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="border-t border-slate-200 pt-4">
                <p className="font-bold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-600">{testimonial.location}</p>
                <p className="text-xs text-amber-600 font-semibold mt-1">
                  {testimonial.project}
                </p>
                <p className="text-xs text-slate-500 mt-2">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-center shadow-xl">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              100% de clients satisfaits
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Plus de 25 ans d'expérience et des centaines de projets réussis en Île-de-France.
              Votre satisfaction est notre priorité et la garantie de notre savoir-faire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
