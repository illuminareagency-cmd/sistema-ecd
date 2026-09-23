'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { FileText, Search, AlertTriangle, Pill, HeartPulse, Phone, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface FichaItem {
  id: string
  codigo: string
  nome_completo: string
  nome_preferido: string | null
  status: string
  alergias?: string | null
  medicamentos?: string | null
  restricoes?: string | null
  contato_emergencia?: {
    nome: string
    telefone: string | null
    parentesco: string | null
  } | null
  anjo_nome?: string | null
}

export function FichasClient({ fichas }: { fichas: FichaItem[] }) {
  const [search, setSearch] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'restricoes' | 'medicacao' | 'pendente'>('todos')

  const total = fichas.length
  const concluidas = fichas.filter((f) => f.status === 'concluida').length
  const pendentes = total - concluidas
  const comRestricoes = fichas.filter((f) => f.alergias || f.restricoes).length
  const comMedicacao = fichas.filter((f) => f.medicamentos).length

  const filtered = fichas.filter((f) => {
    const matchSearch =
      f.nome_completo.toLowerCase().includes(search.toLowerCase()) ||
      f.codigo.includes(search) ||
      (f.alergias && f.alergias.toLowerCase().includes(search.toLowerCase())) ||
      (f.restricoes && f.restricoes.toLowerCase().includes(search.toLowerCase()))

    if (!matchSearch) return false

    if (filtro === 'restricoes') return !!(f.alergias || f.restricoes)
    if (filtro === 'medicacao') return !!f.medicamentos
    if (filtro === 'pendente') return f.status !== 'concluida'
    return true
  })

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-7 h-7 text-cobre" />
            <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Fichas de Saúde</h1>
          </div>
          <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
            Controle de restrições alimentares, medicações de uso contínuo e contatos de emergência
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="salvia" className="px-3 py-1">
            {concluidas} preenchidas
          </Badge>
          {pendentes > 0 && (
            <Badge variant="terracota" className="px-3 py-1">
              {pendentes} pendentes
            </Badge>
          )}
          <Badge variant="ambar" className="px-3 py-1">
            {comRestricoes} com restrições alimentares
          </Badge>
        </div>
      </div>

      {/* Alerta Importante sobre o papel dos Anjos */}
      <div className="p-4 bg-terracota/10 border border-terracota/30 rounded-[16px] flex items-start gap-3 text-xs leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-terracota shrink-0 mt-0.5" />
        <div>
          <strong className="text-terracota block font-semibold text-sm mb-0.5">
            Atenção para toda a equipe e Anjos:
          </strong>
          <span className="text-texto-2">
            Não imprimimos lista de restrições para a cozinha. <strong>O Anjo é o responsável direto</strong> por
            servir a alimentação do seu encontrista e acompanhar rigorosamente qualquer alergia ou restrição indicada abaixo.
          </span>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-texto-3" />
          <Input
            type="text"
            placeholder="Buscar por nome, código ou tipo de restrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-noite-2 border-linha rounded-[12px] text-sm"
          />
        </div>

        <div className="flex bg-noite-2 p-1 rounded-[12px] border border-linha gap-1 overflow-x-auto">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all ${
              filtro === 'todos' ? 'bg-cobre text-noite font-semibold' : 'text-texto-2 hover:text-texto'
            }`}
          >
            Todos ({total})
          </button>
          <button
            onClick={() => setFiltro('restricoes')}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all ${
              filtro === 'restricoes' ? 'bg-terracota text-white font-semibold' : 'text-texto-2 hover:text-texto'
            }`}
          >
            Restrições ({comRestricoes})
          </button>
          <button
            onClick={() => setFiltro('medicacao')}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all ${
              filtro === 'medicacao' ? 'bg-ambar text-noite font-semibold' : 'text-texto-2 hover:text-texto'
            }`}
          >
            Medicação ({comMedicacao})
          </button>
          <button
            onClick={() => setFiltro('pendente')}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all ${
              filtro === 'pendente' ? 'bg-noite-3 text-texto font-semibold' : 'text-texto-2 hover:text-texto'
            }`}
          >
            Pendentes ({pendentes})
          </button>
        </div>
      </div>

      {/* Lista de Fichas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((f) => {
          const temAlerta = !!(f.alergias || f.restricoes)

          return (
            <div
              key={f.id}
              className={`p-5 rounded-[16px] border transition-all flex flex-col justify-between space-y-4 ${
                temAlerta
                  ? 'bg-noite-2 border-terracota/50 shadow-[0_0_15px_rgba(209,106,82,0.1)]'
                  : 'bg-noite-2 border-linha'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs text-cobre font-semibold">#{f.codigo}</span>
                    <h3 className="font-jost text-lg font-semibold text-texto leading-tight">
                      {f.nome_completo}
                    </h3>
                    {f.anjo_nome && (
                      <span className="text-xs text-texto-3 block mt-0.5">
                        Anjo: <strong className="text-texto-2">{f.anjo_nome}</strong>
                      </span>
                    )}
                  </div>
                  <Badge
                    variant={f.status === 'concluida' ? 'salvia' : 'terracota'}
                    className="text-[10px] shrink-0"
                  >
                    {f.status === 'concluida' ? 'Preenchida' : 'Pendente'}
                  </Badge>
                </div>

                {/* Restrições e Alergias */}
                {temAlerta ? (
                  <div className="p-3 rounded-[10px] bg-terracota/15 border border-terracota/30 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-terracota">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Alerta de Restrição Alimentar / Alergia:</span>
                    </div>
                    {f.alergias && (
                      <p className="text-texto font-medium">Alergias: {f.alergias}</p>
                    )}
                    {f.restricoes && (
                      <p className="text-texto font-medium">Dieta: {f.restricoes}</p>
                    )}
                  </div>
                ) : (
                  <div className="p-2.5 rounded-[10px] bg-noite-3 border border-linha/60 text-xs text-texto-3">
                    Nenhuma restrição alimentar declarada.
                  </div>
                )}

                {/* Medicações */}
                {f.medicamentos && (
                  <div className="p-2.5 rounded-[10px] bg-ambar/10 border border-ambar/30 text-xs space-y-0.5">
                    <div className="flex items-center gap-1.5 font-semibold text-ambar">
                      <Pill className="w-3.5 h-3.5 shrink-0" />
                      <span>Medicação contínua:</span>
                    </div>
                    <p className="text-texto-2">{f.medicamentos}</p>
                  </div>
                )}

                {/* Contato de emergência */}
                {f.contato_emergencia && (
                  <div className="text-xs text-texto-3 pt-1 border-t border-linha/60 flex items-center justify-between">
                    <span>
                      Emergência: <strong className="text-texto-2">{f.contato_emergencia.nome}</strong>{' '}
                      ({f.contato_emergencia.parentesco || 'Familiar'})
                    </span>
                    {f.contato_emergencia.telefone && (
                      <span className="font-mono text-cobre">{f.contato_emergencia.telefone}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-linha/60 flex justify-end">
                <Link
                  href={`/inscricoes/${f.id}`}
                  className="inline-flex items-center gap-1 text-xs text-cobre hover:text-cobre-claro font-medium"
                >
                  <span>Ver ficha completa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
