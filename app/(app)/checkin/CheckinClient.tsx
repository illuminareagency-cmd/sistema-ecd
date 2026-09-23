'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Search, AlertCircle, Bed, UserCheck } from 'lucide-react'
import { toast } from 'sonner'

interface InscricaoItem {
  id: string
  codigo: string
  nome_completo: string
  nome_preferido: string | null
  ficha_status: string
  checkin_em: string | null
  quarto: string
  cama: string
  anjo: string
}

export function CheckinClient({ initialInscricoes }: { initialInscricoes: InscricaoItem[] }) {
  const [inscricoes, setInscricoes] = useState(initialInscricoes)
  const [search, setSearch] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const checkinsFeitos = inscricoes.filter((i) => i.checkin_em !== null).length
  const total = inscricoes.length
  const porcentagem = total > 0 ? Math.round((checkinsFeitos / total) * 100) : 0

  const filtered = inscricoes.filter(
    (i) =>
      i.nome_completo.toLowerCase().includes(search.toLowerCase()) ||
      i.codigo.includes(search) ||
      i.quarto.toLowerCase().includes(search.toLowerCase())
  )

  async function handleCheckin(id: string) {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/inscricoes/${id}/checkin`, { method: 'POST' })
      if (!res.ok) throw new Error('Erro ao registrar check-in')
      const data = await res.json()
      setInscricoes((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checkin_em: new Date().toISOString() } : item))
      )
      toast.success('Check-in realizado com sucesso!')
    } catch {
      toast.error('Não foi possível realizar o check-in')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Check-in</h1>
          <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">Recepção e confirmação de chegada dos encontristas</p>
        </div>
        <div className="bg-noite-2 border border-linha px-4 py-3 rounded-[16px] min-w-[200px]">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-texto-2">Progresso</span>
            <span className="text-cobre font-semibold font-jost">
              {checkinsFeitos} / {total} ({porcentagem}%)
            </span>
          </div>
          <Progress value={porcentagem} className="h-2" />
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-texto-3" />
        <Input
          type="text"
          placeholder="Buscar por nome, código (ex: 015) ou quarto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 h-14 bg-noite-2 text-base rounded-[16px] border-linha"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((insc) => {
          const isCheckin = !!insc.checkin_em
          return (
            <div
              key={insc.id}
              className={`rounded-[16px] p-4 sm:p-5 border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isCheckin ? 'bg-noite-2/60 border-linha' : 'bg-noite-2 border-linha/80 hover:border-cobre/40'
              }`}
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-noite-3 border border-linha flex items-center justify-center text-sm font-mono font-semibold text-cobre shrink-0">
                  #{insc.codigo}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-texto font-medium text-base sm:text-lg">
                      {insc.nome_completo}
                    </span>
                    {insc.ficha_status !== 'concluida' && (
                      <Badge variant="terracota" className="text-[10px]">
                        Ficha {insc.ficha_status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-texto-3 mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" />
                      {insc.quarto} {insc.cama ? `(${insc.cama})` : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      Anjo: {insc.anjo}
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
                {isCheckin ? (
                  <div className="flex items-center gap-2 text-salvia text-sm font-medium bg-salvia/10 px-3 py-1.5 rounded-[10px] border border-salvia/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Feito</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleCheckin(insc.id)}
                    disabled={loadingId === insc.id}
                    className="bg-cobre hover:bg-cobre-claro text-noite font-semibold h-11 px-6 rounded-[12px]"
                  >
                    {loadingId === insc.id ? 'Confirmando...' : 'Confirmar Check-in'}
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
