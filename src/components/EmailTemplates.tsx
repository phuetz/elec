import { useState, useEffect } from 'react';
import { Copy, Check, Mail, ArrowLeft } from 'lucide-react';

interface EmailTemplate {
  id: string;
  title: string;
  content: string;
}

const templates: EmailTemplate[] = [
  {
    id: 'premier-contact',
    title: 'Réponse au premier contact client',
    content: `Bonjour,

Je vous remercie de m'avoir contacté pour votre projet.

Je suis disponible pour échanger avec vous et vous proposer une solution adaptée à vos besoins.

Pourriez-vous me préciser :
- L'adresse du chantier
- La nature des travaux souhaités
- Vos disponibilités pour une visite sur place

Je reste à votre disposition pour toute question.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'demande-infos',
    title: 'Demande d\'informations complémentaires',
    content: `Bonjour,

Je fais suite à notre échange concernant votre projet.

Afin de vous établir un devis précis, j'aurais besoin de quelques informations complémentaires :
- [Préciser les informations manquantes]

N'hésitez pas à m'envoyer des photos si cela peut m'aider à mieux comprendre votre besoin.

Je reste à votre disposition.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'confirmation-rdv',
    title: 'Confirmation de rendez-vous',
    content: `Bonjour,

Je vous confirme notre rendez-vous :

📅 Date : [DATE]
🕐 Heure : [HEURE]
📍 Adresse : [ADRESSE]

Je serai ponctuel. Si vous avez un empêchement, merci de me prévenir au plus tôt.

À bientôt,

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'apres-visite',
    title: 'Message après visite sur place',
    content: `Bonjour,

Je vous remercie de m'avoir accueilli pour la visite de votre bien.

J'ai bien pris note de vos besoins concernant [DESCRIPTION DES TRAVAUX].

Je prépare votre devis et vous l'enverrai dans les plus brefs délais.

N'hésitez pas à me contacter si vous avez des questions.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'envoi-devis',
    title: 'Envoi du devis',
    content: `Bonjour,

Veuillez trouver ci-joint le devis pour les travaux dont nous avons discuté.

Ce devis comprend :
- [LISTE DES PRESTATIONS]

Le montant total s'élève à [MONTANT] € TTC.

Ce devis est valable 30 jours. Pour toute question ou modification, n'hésitez pas à me contacter.

Pour accepter ce devis, merci de me le retourner signé avec la mention "Bon pour accord".

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'relance',
    title: 'Relance client sans réponse',
    content: `Bonjour,

Je me permets de revenir vers vous concernant le devis que je vous ai envoyé le [DATE].

Avez-vous eu le temps de l'étudier ? Je reste disponible pour en discuter ou apporter des modifications si nécessaire.

N'hésitez pas à me contacter si vous avez des questions.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'acceptation-devis',
    title: 'Confirmation d\'acceptation du devis',
    content: `Bonjour,

Je vous remercie pour votre confiance et la validation de mon devis.

Je vous propose de démarrer les travaux le [DATE].

Avant le début du chantier, je vous recontacterai pour confirmer les détails pratiques.

Je reste à votre disposition pour toute question.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'refus-devis',
    title: 'Réponse au refus du devis',
    content: `Bonjour,

Je vous remercie de m'avoir informé de votre décision.

Je comprends tout à fait et reste à votre disposition si vous avez un autre projet à l'avenir.

N'hésitez pas à me recontacter, je serai toujours disponible pour vous accompagner.

Je vous souhaite une bonne continuation.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'report-rdv',
    title: 'Report de rendez-vous',
    content: `Bonjour,

Je suis désolé, mais je dois reporter notre rendez-vous initialement prévu le [DATE INITIALE].

Je vous propose les nouvelles dates suivantes :
- [PROPOSITION 1]
- [PROPOSITION 2]

Merci de me confirmer la date qui vous convient le mieux.

Je vous prie de m'excuser pour ce désagrément.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'fin-chantier',
    title: 'Fin de chantier / Remerciement',
    content: `Bonjour,

Les travaux sont maintenant terminés.

Je vous remercie pour votre confiance et votre accueil durant ce chantier.

N'hésitez pas à me contacter si vous avez la moindre question ou si vous constatez un problème.

Si vous êtes satisfait de mon travail, un avis Google serait grandement apprécié : [LIEN GOOGLE]

Je reste à votre disposition pour vos futurs projets.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'demande-acompte',
    title: 'Demande d\'acompte',
    content: `Bonjour,

Suite à la validation de votre devis, je vous informe qu'un acompte de [MONTANT] € est nécessaire avant le début des travaux.

Cet acompte permet de couvrir l'achat des matériaux.

Vous pouvez effectuer le règlement par :
- Virement bancaire (RIB en pièce jointe)
- Chèque à l'ordre de E.S.C BELITEI

Dès réception, je vous confirmerai la date de début des travaux.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'envoi-facture',
    title: 'Envoi de la facture',
    content: `Bonjour,

Veuillez trouver ci-joint la facture correspondant aux travaux réalisés.

Montant total : [MONTANT] € TTC
Reste à payer : [RESTE] €

Le règlement est à effectuer sous 30 jours par :
- Virement bancaire (RIB en pièce jointe)
- Chèque à l'ordre de E.S.C BELITEI

Je vous remercie pour votre confiance.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'rappel-paiement',
    title: 'Rappel de paiement',
    content: `Bonjour,

Je me permets de vous rappeler que la facture n° [NUMÉRO] d'un montant de [MONTANT] € reste en attente de règlement.

La date d'échéance était le [DATE].

Si vous avez déjà effectué le paiement, je vous prie de ne pas tenir compte de ce message.

Dans le cas contraire, je vous remercie de bien vouloir procéder au règlement dans les meilleurs délais.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  },
  {
    id: 'indisponibilite',
    title: 'Message d\'indisponibilité',
    content: `Bonjour,

Je vous remercie de votre message.

Je suis actuellement en intervention et ne suis pas disponible immédiatement.

Je vous recontacterai dès que possible, au plus tard [DATE/HEURE].

Pour toute urgence, vous pouvez me joindre au 07 61 61 54 00.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI`
  },
  {
    id: 'debut-travaux',
    title: 'Confirmation de début des travaux',
    content: `Bonjour,

Je vous confirme le début des travaux à votre domicile :

📅 Date de début : [DATE]
🕐 Heure d'arrivée : [HEURE]
⏱️ Durée estimée : [DURÉE]

Merci de vous assurer que l'accès au chantier soit possible.

N'hésitez pas à me contacter si vous avez des questions avant mon arrivée.

À bientôt,

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`
  }
];

export default function EmailTemplates() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Ajouter noindex pour cette page cachée
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    document.title = 'Messages Types - E.S.C BELITEI (Interne)';

    return () => {
      document.head.removeChild(metaRobots);
      document.title = 'E.S.C BELITEI - Électricien et Rénovation à Épinay-sur-Seine';
    };
  }, []);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const handleBackToSite = () => {
    window.location.hash = '#accueil';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-amber-500" />
            <h1 className="text-lg font-bold">Messages Types</h1>
          </div>
          <button
            onClick={handleBackToSite}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-slate-600 mb-6 text-sm">
          Cliquez sur "Copier" puis collez le message dans votre application de messagerie.
          Remplacez les éléments entre [CROCHETS] par vos informations.
        </p>

        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Template Header */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <h2 className="font-semibold text-slate-800 text-sm md:text-base">
                  {template.title}
                </h2>
                <button
                  onClick={() => copyToClipboard(template.content, template.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    copiedId === template.id
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-slate-900'
                  }`}
                >
                  {copiedId === template.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copier
                    </>
                  )}
                </button>
              </div>

              {/* Template Content */}
              <div className="p-4">
                <pre className="whitespace-pre-wrap font-sans text-slate-700 text-sm leading-relaxed">
                  {template.content}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-8 mb-4">
          Page réservée à l'usage interne — E.S.C BELITEI
        </p>
      </main>
    </div>
  );
}
