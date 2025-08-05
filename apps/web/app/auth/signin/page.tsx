'use client'

import { useState } from 'react'
import { Button } from '@repo/ui'
import { Card } from '@repo/ui'
import Link from 'next/link'
import { ArrowLeft, Dumbbell, Eye, EyeOff } from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // TODO: Implementare login con GraphQL
    setTimeout(() => {
      setLoading(false)
      // Redirect to dashboard
      window.location.href = '/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-white hover:text-blue-300 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Torna alla Home
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Dumbbell className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">Coach Hub</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Bentornato</h1>
          <p className="text-gray-300">Accedi al tuo account per continuare</p>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="coach@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-200">Ricordami</span>
              </label>
              
              <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                Password dimenticata?
              </Link>
            </div>

            <Button
              type="submit"
              variant="coach"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Accesso...' : 'Accedi'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Non hai un account?{' '}
              <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                Registrati
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
