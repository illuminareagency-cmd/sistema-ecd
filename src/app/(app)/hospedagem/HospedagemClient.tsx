'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Bed, Users, AlertCircle, Shield } from 'lucide-react'

interface CamaData {
  id: string
  codigo: string
  indice_par: number | null
  posicao: string
  ocupante?: {
    nome: string
    papel: string
  } | null
}

interface QuartoData {
  id: string
  nome: string
  tipo: string
  numerado: boolean
  capacidade_livre: number | null
  camas: CamaData[]
  totalOcupados: number
  totalCapacidade: number
}

interface SemCamaData {
  id: string
  nome: string
  codigo: string
}

export function HospedagemClient({
  quartos,
  semCama,
}: {
  quartos: QuartoData[]
  semCama: SemCamaData[]
}) {
  const [quartoAtivoId, setQuartoAtivoId] = useState(quartos[0]?.id || '')

  const quartoAtivo = quartos.find((q) => q.id === quartoAtivoId) || quartos[0]

  // Agrupar camas do quarto ativo por pares contínuos (inferior e superior)
  const paresMap: Record<number, { inferior?: CamaData; superior?: CamaData }> = {}
  if (quartoAtivo?.numerado) {
    quartoAtivo.camas.forEach((c) => {
      const pNum = c.indice_par || 1
      if (!paresMap[pNum]) paresMap[pNum] = {}
      if (c.posicao === 'inferior') {
        paresMap[pNum].inferior = c
      } else {
        paresMap[pNum].superior = c
      }
    })
  }

  const paresOrdenados = Object.entries(paresMap).sort(([a], [b]) => Number(a) - Number(b))

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Mapa de Hospedagem</h1>
          <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
            Distribuição de camas e ocupação por quarto com numeração contínua
          </p>
        </div>
        <div className="flex items-center gap-2">
          {semCama.length > 0 ? (
            <Badge variant="terracota" className="px-3 py-1">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              {semCama.length} encontrista(s) sem cama
            </Badge>
          ) : (
            <Badge variant="salvia" className="px-3 py-1">
              Todos os encontristas com cama reservada
            </Badge>
          )}
        </div>
      </div>

      {/* Seletor de Quartos */}
      <div className="flex bg-noite-2 p-1.5 rounded-[16px] border border-linha gap-1 overflow-x-auto">
        {quartos.map((q) => {
          const isAtivo = q.id === quartoAtivoId
          return (
            <button
              key={q.id}
              onClick={() => setQuartoAtivoId(q.id)}
              className={`px-4 py-2.5 rounded-[12px] text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                isAtivo
                  ? 'bg-cobre text-noite font-semibold shadow-sm'
                  : 'text-texto-2 hover:text-texto hover:bg-noite-3'
              }`}
            >
              <span>{q.nome}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isAtivo ? 'bg-noite/20 text-noite' : 'bg-noite-3 text-texto-3'
                }`}
              >
                {q.totalOcupados}/{q.totalCapacidade}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Painel Principal do Quarto */}
        <div className="lg:col-span-3 space-y-4">
          {quartoAtivo && (
            <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-linha">
                <div>
                  <h2 className="text-xl font-jost font-semibold text-texto">{quartoAtivo.nome}</h2>
                  <p className="text-xs text-texto-3 mt-0.5">
                    {quartoAtivo.numerado ? 'Camas numeradas sequenciais' : 'Vagas coletivas livres'}
                  </p>
                </div>
                <div className="text-sm font-jost text-cobre font-semibold">
                  {quartoAtivo.totalOcupados} ocupadas / {quartoAtivo.totalCapacidade} camas
                </div>
              </div>

              {quartoAtivo.numerado ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {paresOrdenados.map(([num, p]) => {
                    const sup = p.superior
                    const inf = p.inferior

                    return (
                      <div
                        key={num}
                        className="bg-noite-3/80 rounded-[14px] border border-linha p-3.5 space-y-2.5"
                      >
                        <div className="flex items-center justify-between text-xs text-texto-3 pb-1 border-b border-linha/60">
                          <span className="font-semibold text-texto-2">
                            {inf?.codigo} &bull; {sup?.codigo}
                          </span>
                          <Bed className="w-3.5 h-3.5 text-cobre" />
                        </div>

                        {/* Cama Superior */}
                        <div
                          className={`p-2.5 rounded-[10px] border text-xs transition-colors ${
                            sup?.ocupante
                              ? sup.ocupante.papel === 'anjo'
                                ? 'bg-cobre/15 border-cobre/40 text-cobre'
                                : 'bg-noite-2 border-linha text-texto'
                              : 'border-dashed border-linha/80 text-texto-3/60 bg-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-[10px] font-semibold">
                              {sup?.codigo} (Superior)
                            </span>
                            {sup?.ocupante?.papel === 'anjo' && (
                              <Badge variant="default" className="text-[9px] px-1.5 py-0 flex items-center gap-1">
                                <Shield className="w-2.5 h-2.5" />
                                Anjo
                              </Badge>
                            )}
                          </div>
                          <div className="font-medium truncate">
                            {sup?.ocupante?.nome || 'Livre'}
                          </div>
                        </div>

                        {/* Cama Inferior */}
                        <div
                          className={`p-2.5 rounded-[10px] border text-xs transition-colors ${
                            inf?.ocupante
                              ? inf.ocupante.papel === 'anjo'
                                ? 'bg-cobre/15 border-cobre/40 text-cobre'
                                : 'bg-noite-2 border-linha text-texto'
                              : 'border-dashed border-linha/80 text-texto-3/60 bg-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-[10px] font-semibold">
                              {inf?.codigo} (Inferior)
                            </span>
                            {inf?.ocupante?.papel === 'anjo' && (
                              <Badge variant="default" className="text-[9px] px-1.5 py-0 flex items-center gap-1">
                                <Shield className="w-2.5 h-2.5" />
                                Anjo
                              </Badge>
                            )}
                          </div>
                          <div className="font-medium truncate">
                            {inf?.ocupante?.nome || 'Livre'}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-texto-2 space-y-2">
                  <Users className="w-12 h-12 text-cobre mx-auto opacity-75" />
                  <p className="font-medium">Espaço coletivo sem camas numeradas</p>
                  <p className="text-xs text-texto-3">
                    Capacidade total: {quartoAtivo.capacidade_livre} camas livres
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Barra Lateral: Sem Cama */}
        <div className="space-y-4">
          <div className="bg-noite-2 rounded-[20px] p-5 border border-linha shadow-sm">
            <h3 className="font-jost text-base font-semibold text-texto mb-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-cobre" />
              Sem Cama Atribuída ({semCama.length})
            </h3>
            <p className="text-xs text-texto-3 mb-4">Encontristas confirmados que precisam de cama</p>

            {semCama.length === 0 ? (
              <p className="text-xs text-salvia">Todos os encontristas possuem cama reservada.</p>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {semCama.map((enc) => (
                  <div
                    key={enc.id}
                    className="p-2.5 rounded-[10px] bg-noite-3 border border-linha text-xs flex justify-between items-center"
                  >
                    <span className="font-medium text-texto truncate">{enc.nome}</span>
                    <span className="font-mono text-cobre shrink-0 text-[11px]">#{enc.codigo}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
