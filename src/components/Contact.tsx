import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  project_type: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    project_type: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/mwvvlzqq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_type: formData.project_type,
          message: formData.message,
          _subject: `Demande de devis - ${formData.project_type}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          project_type: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une question ? Un projet ? N'hésitez pas à nous contacter pour un devis gratuit
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Informations de contact
            </h3>

            <div className="space-y-6">
              <a href="tel:+33761615400" className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Téléphone</h4>
                  <p className="text-slate-600 group-hover:text-amber-600 transition-colors">07 61 61 54 00</p>
                  <p className="text-slate-500 text-sm">Lun - Ven : 8h - 18h</p>
                </div>
              </a>

              <a href="mailto:delitei.georghii@orange.fr" className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                  <p className="text-slate-600 group-hover:text-amber-600 transition-colors">delitei.georghii@orange.fr</p>
                  <p className="text-slate-500 text-sm">Réponse sous 24h</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Adresse</h4>
                  <p className="text-slate-600">14 rue de Boussois, Bât. B, Esc. 4</p>
                  <p className="text-slate-600">93800 Épinay-sur-Seine</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-3">Zones d'intervention</h4>
              <p className="text-slate-600 leading-relaxed">
                Intervention dans toute l'Île-de-France : Paris, Seine-Saint-Denis (93), Val-d'Oise (95), Hauts-de-Seine (92), Seine-et-Marne (77), Essonne (91), Yvelines (78), Val-de-Marne (94) et l'Oise (60).
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="jean.dupont@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label htmlFor="project_type" className="block text-sm font-semibold text-slate-900 mb-2">
                  Type de projet *
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  required
                  value={formData.project_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="Électricité">Électricité</option>
                  <option value="Rénovation complète">Rénovation complète</option>
                  <option value="Salle de bain">Salle de bain</option>
                  <option value="Cuisine">Cuisine</option>
                  <option value="VMC / Ventilation">VMC / Ventilation</option>
                  <option value="Plomberie">Plomberie</option>
                  <option value="Carrelage">Carrelage</option>
                  <option value="Extérieur / Pavés">Extérieur / Pavés</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                  placeholder="Décrivez votre projet, la surface, vos besoins..."
                />
              </div>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Message envoyé avec succès ! Nous vous répondrons sous 24h.
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Erreur lors de l'envoi. Veuillez appeler le 07 61 61 54 00.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer la demande
                  </>
                )}
              </button>

              <p className="text-sm text-slate-500 text-center">
                Devis gratuit et sans engagement
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
