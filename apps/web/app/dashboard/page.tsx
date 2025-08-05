'use client'

import { Button } from '@repo/ui'
import { Card } from '@repo/ui'
import Link from 'next/link'
import { 
  Users, 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Plus,
  Activity,
  Target,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Coach Hub</span>
              </div>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="coach" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuovo Atleta
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">MR</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bentornato, Mario! 👋
          </h2>
          <p className="text-gray-600">
            Ecco un riepilogo della tua attività di oggi
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-gray-600 text-sm">Atleti Attivi</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-gray-600 text-sm">Allenamenti Oggi</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">15</p>
                <p className="text-gray-600 text-sm">Obiettivi Raggiunti</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">6h</p>
                <p className="text-gray-600 text-sm">Tempo Allenamento</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h3>
              <div className="space-y-3">
                <Link href="/athletes/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-3" />
                    Aggiungi Atleta
                  </Button>
                </Link>
                
                <Link href="/workouts/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Dumbbell className="h-4 w-4 mr-3" />
                    Crea Allenamento
                  </Button>
                </Link>
                
                <Link href="/programs/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-3" />
                    Nuovo Programma
                  </Button>
                </Link>
                
                <Link href="/exercises">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-3" />
                    Libreria Esercizi
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Attività Recente</h3>
                <Link href="/activity" className="text-blue-600 hover:text-blue-700 text-sm">
                  Vedi tutto
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Nuova anamnesi completata</p>
                    <p className="text-xs text-gray-500">Sara Bianchi - 2 ore fa</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Allenamento completato</p>
                    <p className="text-xs text-gray-500">Marco Verdi - Push Day - 3 ore fa</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Obiettivo raggiunto</p>
                    <p className="text-xs text-gray-500">Luca Neri - Perdita peso - 5 ore fa</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Programma aggiornato</p>
                    <p className="text-xs text-gray-500">Anna Rossi - Forza - 1 giorno fa</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link href="/athletes">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Atleti</h3>
                <p className="text-sm text-gray-600">Gestione atleti</p>
              </div>
            </Card>
          </Link>

          <Link href="/exercises">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <Dumbbell className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Esercizi</h3>
                <p className="text-sm text-gray-600">Libreria esercizi</p>
              </div>
            </Card>
          </Link>

          <Link href="/workouts">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <Activity className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Allenamenti</h3>
                <p className="text-sm text-gray-600">Crea schede</p>
              </div>
            </Card>
          </Link>

          <Link href="/programs">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Programmi</h3>
                <p className="text-sm text-gray-600">Pianificazione</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
