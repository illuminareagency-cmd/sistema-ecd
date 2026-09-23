'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { VineIcon } from '@/components/ui/vine-icon'
import { Play, CheckCircle2, Clock, MapPin, User, AlertCircle } from 'lucide-react'
import { formatarHora } from '@/lib/utils'
import { toast } from 'sonner'

interface Atividade {
  id: string
  dia: number
  ordem: number
  titulo: string
  tipo: string
  inicio_planejado: string
  duracao_planejada_min: number
  inicio_real: string | null
  fim_real: string | null
  status: string
  local: string | null
  ministrador_nome?: string | null
  avisa_cozinha?: boolean
  toca_chofar?: boolean
}

export function CronogramaClient({
  atividadesIniciais,
  encontroNome,
}: {
  atividadesIniciais: Atividade[]
  encontroNome: string
}) {
  const [atividades, setAtividades] = useState(atividadesIniciais)
  const [diaSelecionado, setDiaSelecionado] = useState(1) // 0=Sexta, 1=Sábado, 2=Domingo
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const dias = [
    { id: 0, label: 'Sexta-feira' },
    { id: 1, label: 'Sábado' },
    { id: 2, label: 'Domingo' },
  ]

  const atividadesDia = atividades
    .filter((a) => a.dia === diaSelecionado)
    .sort((a, b) => a.ordem - b.ordem)

  const atividadeAtual = atividades.find((a) => a.status === 'em_andamento')

  async function handleIniciar(id: string) {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/cronograma/${id}/iniciar`, { method: 'POST' })
      if (!res.ok) throw new Error()
      setAtividades((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, status: 'em_andamento', inicio_real: new Date().toISOString() }
            : a.status === 'em_andamento'
            ? { ...a, status: 'concluida', fim_real: new Date().toISOString() }
            : a
        )
      )
      toast.success('Atividade iniciada!')
    } catch {
      toast.error('Não foi possível iniciar a atividade')
    } finally {
      setLoadingId(null)
    }
  }

  async function handleEncerrar(id: string) {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/cronograma/${id}/encerrar`, { method: 'POST' })
      if (!res.ok) throw new Error()
      setAtividades((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'concluida', fim_real: new Date().toISOString() } : a))
      )
      toast.success('Atividade encerrada!')
    } catch {
      toast.error('Não foi possível encerrar a atividade')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <VineIcon size={24} className="text-cobre" animated />
            <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Cronograma ao Vivo</h1>
          </div>
          <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">{encontroNome}</p>
        </div>

        {atividadeAtual && (
          <div className="bg-cobre/15 border border-cobre/30 px-4 py-2 rounded-[14px] flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cobre animate-ping" />
            <div>
              <span className="text-xs text-cobre font-semibold uppercase tracking-wider block">
                Em Andamento
              </span>
              <span className="text-texto text-sm font-medium">{atividadeAtual.titulo}</span>
            </div>
          </div>
        )}
      </div>

      {/* Abas por Dia */}
      <div className="flex bg-noite-2 p-1.5 rounded-[16px] border border-linha gap-1 w-fit">
        {dias.map((d) => (
          <button
            key={d.id}
            onClick={() => setDiaSelecionado(d.id)}
            className={`px-5 py-2.5 rounded-[12px] text-sm font-medium transition-all ${
              diaSelecionado === d.id
                ? 'bg-cobre text-noite font-semibold shadow-sm'
                : 'text-texto-2 hover:text-texto hover:bg-noite-3'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Linha do tempo estilizada como Videira */}
      <div className="relative pl-6 sm:pl-10 space-y-4">
        {/* Tronco da videira */}
        <div className="absolute left-3 sm:left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cobre via-cobre/40 to-linha rounded-full" />

        {atividadesDia.map((ativ) => {
          const isConcluida = ativ.status === 'concluida'
          const isAtual = ativ.status === 'em_andamento'
          const isPlanejada = ativ.status === 'planejada'

          return (
            <div key={ativ.id} className="relative group">
              {/* Marcador na Videira */}
              <div
                className={`absolute -left-6 sm:-left-10 top-5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                  isConcluida
                    ? 'bg-cobre border-cobre text-noite shadow-cobre-sm'
                    : isAtual
                    ? 'bg-noite border-cobre text-cobre animate-pulse ring-4 ring-cobre/20'
                    : 'bg-noite-3 border-linha text-texto-3'
                }`}
              >
                {isConcluida ? (
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                ) : isAtual ? (
                  <span className="w-2 h-2 rounded-full bg-cobre" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-linha" />
                )}
              </div>

              {/* Card da Atividade */}
              <div
                className={`rounded-[16px] p-5 border transition-all ${
                  isAtual
                    ? 'bg-noite-2 border-cobre shadow-cobre-sm'
                    : isConcluida
                    ? 'bg-noite-2/70 border-linha opacity-85'
                    : 'bg-noite-2 border-linha/80 hover:border-linha'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-mono font-semibold text-cobre">
                        {formatarHora(ativ.inicio_planejado)}
                      </span>
                      <h3 className="font-jost text-lg font-medium text-texto">{ativ.titulo}</h3>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {ativ.tipo}
                      </Badge>
                      {ativ.avisa_cozinha && (
                        <Badge variant="ambar" className="text-[10px]">
                          Cozinha
                        </Badge>
                      )}
                      {ativ.toca_chofar && (
                        <Badge variant="ceu" className="text-[10px]">
                          Chofar
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-texto-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {ativ.duracao_planejada_min} min
                      </span>
                      {ativ.local && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {ativ.local}
                        </span>
                      )}
                      {ativ.ministrador_nome && (
                        <span className="flex items-center gap-1 text-texto-2">
                          <User className="w-3.5 h-3.5" />
                          {ativ.ministrador_nome}
                        </span>
                      )}
                      {ativ.inicio_real && (
                        <span className="text-salvia font-medium">
                          Iniciado: {formatarHora(ativ.inicio_real)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Ações de Controle */}
                  <div className="shrink-0 flex items-center gap-2">
                    {isPlanejada && (
                      <Button
                        size="sm"
                        onClick={() => handleIniciar(ativ.id)}
                        disabled={loadingId === ativ.id}
                        className="bg-cobre hover:bg-cobre-claro text-noite font-medium text-xs h-9 px-4 rounded-[10px]"
                      >
                        <Play className="w-3 h-3 mr-1 fill-current" />
                        Iniciar
                      </Button>
                    )}
                    {isAtual && (
                      <Button
                        size="sm"
                        onClick={() => handleEncerrar(ativ.id)}
                        disabled={loadingId === ativ.id}
                        className="bg-salvia hover:bg-salvia/90 text-noite font-medium text-xs h-9 px-4 rounded-[10px]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Encerrar
                      </Button>
                    )}
                    {isConcluida && (
                      <span className="text-xs text-salvia font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Concluído
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
