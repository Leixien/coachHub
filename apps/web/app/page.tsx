import { Button } from '@repo/ui'
import { Card } from '@repo/ui'
import Link from 'next/link'
import { ArrowRight, Dumbbell, Users, BarChart3, MessageCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">Coach Hub</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-white">
                Accedi
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="coach">
                Inizia Gratis
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            La Piattaforma
            <br />
            <span className="text-gradient">per Personal Trainer</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Gestisci anamnesi, crea schede personalizzate, monitora i progressi 
            e comunica con i tuoi atleti. Tutto in un'unica soluzione professionale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="coach" className="group">
                Inizia la Prova Gratuita
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Guarda la Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Gestione Atleti</h3>
              <p className="text-gray-300">
                Anamnesi completa, profili dettagliati e storico medico in un click.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Builder Schede</h3>
              <p className="text-gray-300">
                Crea programmi con drag & drop, progressioni automatiche e template riutilizzabili.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Analytics Avanzate</h3>
              <p className="text-gray-300">
                Grafici di progresso, volume di allenamento e statistiche dettagliate.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Chat Realtime</h3>
              <p className="text-gray-300">
                Comunicazione istantanea con gli atleti e condivisione rapida delle schede.
              </p>
            </div>
          </Card>
        </div>

        {/* Steps Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Il tuo flusso di lavoro in 5 step
          </h2>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: 1, title: "Anamnesi", desc: "Raccolta dati e profilo" },
              { step: 2, title: "Esercizi", desc: "Libreria personalizzabile" },
              { step: 3, title: "Schede", desc: "Builder drag & drop" },
              { step: 4, title: "Programmi", desc: "Template e versioning" },
              { step: 5, title: "Monitoraggio", desc: "Dashboard e analytics" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/10">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Coach Hub. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  )
}
