import { Award, Briefcase, Languages, GraduationCap, Heart, Shield, Eye, Users } from 'lucide-react';
import { company } from '../data/company';

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Qualité': Heart,
  'Fiabilité': Shield,
  'Transparence': Eye,
  'Proximité': Users
};

export default function About() {
  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            À propos
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {company.bio.subtitle}
          </p>
        </div>

        {/* Bio Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{company.bio.title}</h3>
            <div className="prose prose-slate max-w-none">
              {company.bio.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {company.bio.values.map((value) => {
                const Icon = valueIcons[value.title] || Heart;
                return (
                  <div key={value.title} className="bg-white rounded-lg p-4 border border-slate-200 text-center">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-semibold text-slate-900">{value.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{value.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-amber-500">{company.bio.stats.experience}</p>
                <p className="text-sm text-slate-300">d'expérience</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-amber-500">{company.bio.stats.projectsCompleted}</p>
                <p className="text-sm text-slate-300">projets réalisés</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-amber-500">{company.bio.stats.satisfactionRate}</p>
                <p className="text-sm text-slate-300">satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Expérience professionnelle</h3>
              </div>
              <div className="space-y-4 ml-15 pl-6 border-l-2 border-amber-500">
                {company.experience.map((exp, index) => (
                  <div key={index}>
                    <p className="font-semibold text-slate-900">{exp.period}</p>
                    <p className="text-slate-700">{exp.title}</p>
                    <p className="text-sm text-slate-600">{exp.company}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Formation</h3>
              </div>
              <div className="space-y-3 ml-15">
                {company.formations.map((formation, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900">{formation.year}</p>
                    <p className="text-slate-700">{formation.title}</p>
                    <p className="text-sm text-slate-600">{formation.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Compétences</h3>
              </div>
              <div className="space-y-3">
                {company.skills.map((skill, index) => (
                  <div key={index} className="bg-gradient-to-r from-amber-50 to-white rounded-lg p-5 border border-amber-200">
                    <h4 className="font-semibold text-slate-900 mb-2">{skill.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Langues</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {company.languages.map((lang, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                    <p className="font-semibold text-slate-900">{lang.name}</p>
                    <p className="text-xs text-slate-600">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>

            {company.certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Certification {cert.name}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
