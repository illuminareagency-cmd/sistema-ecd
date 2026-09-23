'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, User, Bed, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ItemBusca {
  id: string
  tipo: 'encontrista' | 'servo' | 'pastor'
  nome: string
  codigo?: string
  quarto?: string
  telefone?: string | null
  link?: string
}

export function BuscaClient({ itensIniciais }: { itensIniciais: ItemBusca[] }) {
  const [termo, setTermo] = useState('')

  const resultados = termo.trim()
    ? itensIniciais.filter(
        (i) =>
          i.nome.toLowerCase().includes(termo.toLowerCase()) ||
          (i.codigo && i.codigo.includes(termo)) ||
          (i.quarto && i.quarto.toLowerCase().includes(termo.toLowerCase()))
      )
    : []

  return (
    <div className="space-y-6 font-figtree max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Busca Global</h1>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          Localize rapidamente encontristas, servos, pastores, camas e quartos
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-texto-3" />
        <Input
          type="text"
          autoFocus
          placeholder="Digite um nome, código (ex: 012) ou quarto..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          className="pl-12 h-14 bg-noite-2 text-base rounded-[16px] border-linha"
        />
      </div>

      {termo.trim() && (
        <div className="space-y-3">
          <div className="text-xs text-texto-3">
            {resultados.length} resultado(s) encontrado(s)
          </div>

          {resultados.length === 0 ? (
            <div className="p-8 bg-noite-2 rounded-[16px] border border-linha text-center text-texto-3">
              Nenhum registro encontrado para &ldquo;{termo}&rdquo;.
            </div>
          ) : (
            resultados.map((res) => (
              <Link
                key={res.id}
                href={res.link || '#'}
                className="block p-4 rounded-[14px] bg-noite-2 border border-linha hover:border-cobre/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-texto text-base">{res.nome}</span>
                      {res.codigo && (
                        <span className="font-mono text-xs text-cobre font-semibold">
                          #{res.codigo}
                        </span>
                      )}
                      <Badge
                        variant={
                          res.tipo === 'encontrista'
                            ? 'salvia'
                            : res.tipo === 'pastor'
                            ? 'ceu'
                            : 'outline'
                        }
                        className="text-[10px] capitalize"
                      >
                        {res.tipo}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-texto-3">
                      {res.quarto && (
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5" />
                          {res.quarto}
                        </span>
                      )}
                      {res.telefone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {res.telefone}
                        </span>
                      )}
                    </div>
                  </div>

                  {res.link && (
                    <ArrowRight className="w-4 h-4 text-texto-3 group-hover:text-cobre transition-colors" />
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
