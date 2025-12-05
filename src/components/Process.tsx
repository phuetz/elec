import { MessageSquare, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Prise de contact',
      description: 'Vous nous expliquez votre projet par téléphone, email ou via notre formulaire de contact.',
      step: '01'
    },
    {
      icon: MapPin,
      title: 'Visite & devis gratuit',
      description: 'Déplacement sur place pour comprendre vos besoins et établir un devis détaillé et transparent.',
      step: '02'
    },
    {
      icon: Calendar,
      title: 'Travaux planifiés',
      description: 'Planning clair avec dates précises. Un interlocuteur unique pour un suivi optimal de votre projet.',
      step: '03'
    },
    {
      icon: CheckCircle2,
      title: 'Réception & suivi',
      description: 'Vérification minutieuse de chaque détail ensemble. Nous restons disponibles après les travaux.',
      step: '04'
    }
  ];

  return (
    <section id="methode" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Comment on travaille ?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une méthode éprouvée pour garantir votre satisfaction et la qualité de chaque projet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-slate-100">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-amber-500" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Un engagement qualité à chaque étape
          </h3>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Notre expérience de 25 ans nous permet de vous offrir un service professionnel,
            des délais respectés et un résultat conforme à vos attentes. Votre satisfaction
            est notre priorité absolue.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-amber-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Devis gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Certification RGE</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Garantie décennale</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Suivi personnalisé</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
