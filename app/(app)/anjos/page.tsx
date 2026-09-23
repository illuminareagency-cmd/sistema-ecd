import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Heart, AlertTriangle, CheckCircle2, Bed, Phone, Users, Utensils } from 'lucide-react'
import Link from 'next/link'

export default async function AnjosPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  // Buscar todos os servos que são anjos
  const anjos = await prisma.participacaoServo.findMany({
    where: {
      ...(encontroAtual ? { encontro_id: encontroAtual.id } : {}),
      eh_anjo: true,
    },
    include: {
      pessoa: {
        include: {
          alocacoes_cama: {
            where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
            include: { cama: { include: { quarto: true } } },
          },
          vinculos_anjo_como_anjo: {
            where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
            include: {
              encontrista: {
                include: {
                  alocacoes_cama: {
                    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
                    include: { cama: { include: { quarto: true } } },
                  },
                  inscricoes: {
                    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
                    include: {
                      ficha_respostas: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: { pessoa: { nome_completo: 'asc' } },
  })

  // Total de encontristas
  const totalEncontristas = await prisma.inscricao.count({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
  })

  // Encontristas vinculados
  const totalVinculados = await prisma.vinculoAnjo.count({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
  })

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-7 h-7 text-cobre fill-cobre/20" />
            <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Quadro de Anjos</h1>
          </div>
          <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
            Acompanhamento e cuidado direto de cada encontrista pelo seu anjo dedicado
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="salvia" className="px-3 py-1 text-sm">
            {anjos.length} anjos escalados
          </Badge>
          <Badge variant="default" className="px-3 py-1 text-sm">
            {totalVinculados} de {totalEncontristas} encontristas cuidados
          </Badge>
        </div>
      </div>

      {/* Alerta Geral da Função de Servir a Comida */}
      <div className="p-4 bg-terracota/10 border border-terracota/30 rounded-[16px] flex items-center gap-3 text-xs">
        <Utensils className="w-5 h-5 text-terracota shrink-0" />
        <span className="text-texto-2">
          <strong>Regra de Cuidado Alimentar:</strong> O Anjo é quem serve o prato e acompanha a alimentação do seu encontrista em todas as refeições, garantindo a proteção contra qualquer alimento restrito ou alérgico.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {anjos.map((anjo) => {
          const camaAnjo = anjo.pessoa.alocacoes_cama[0]?.cama
          const quartoAnjoId = camaAnjo?.quarto_id
          const vinculos = anjo.pessoa.vinculos_anjo_como_anjo
          const capacidade = anjo.capacidade_anjo || 2
          const ocupacao = vinculos.length

          // Verificar se algum encontrista está em quarto diferente do anjo
          const conflitoQuarto = vinculos.some((v) => {
            const camaEnc = v.encontrista.alocacoes_cama[0]?.cama
            return camaEnc && quartoAnjoId && camaEnc.quarto_id !== quartoAnjoId
          })

          return (
            <div
              key={anjo.id}
              className={`rounded-[16px] p-5 border transition-all ${
                conflitoQuarto
                  ? 'bg-noite-2 border-terracota/60 shadow-[0_0_15px_rgba(209,106,82,0.15)]'
                  : 'bg-noite-2 border-linha hover:border-cobre/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <h3 className="font-jost text-lg font-semibold text-texto truncate">
                    {anjo.pessoa.nome_completo}
                  </h3>
                  <div className="text-xs text-texto-3 flex items-center gap-2 mt-0.5">
                    {anjo.pessoa.telefone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {anjo.pessoa.telefone}
                      </span>
                    )}
                  </div>
                </div>

                <Badge
                  variant={ocupacao >= capacidade ? 'salvia' : 'ambar'}
                  className="text-xs shrink-0"
                >
                  {ocupacao}/{capacidade} vagas
                </Badge>
              </div>

              {/* Cama do Anjo */}
              <div className="bg-noite-3/80 p-2.5 rounded-[10px] border border-linha/60 text-xs text-texto-2 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-texto-3">
                  <Bed className="w-3.5 h-3.5 text-cobre" />
                  Cama do Anjo:
                </span>
                <span className="font-medium text-texto">
                  {camaAnjo?.quarto.nome || 'Sem quarto definido'}{' '}
                  {camaAnjo ? `(Cama ${camaAnjo.codigo})` : ''}
                </span>
              </div>

              {/* Alerta de conflito de quarto */}
              {conflitoQuarto && (
                <div className="bg-terracota/10 border border-terracota/30 p-2.5 rounded-[10px] text-xs text-terracota mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Atenção: Anjo e encontrista em quartos diferentes!</span>
                </div>
              )}

              {/* Encontristas Vinculados */}
              <div className="space-y-2">
                <div className="text-xs text-texto-3 font-semibold uppercase tracking-wider">
                  Encontristas sob cuidado:
                </div>
                {vinculos.length === 0 ? (
                  <p className="text-xs text-texto-3/60 italic">Nenhum encontrista vinculado ainda.</p>
                ) : (
                  vinculos.map((v) => {
                    const camaEnc = v.encontrista.alocacoes_cama[0]?.cama
                    const insc = v.encontrista.inscricoes[0]
                    const emQuartoDiferente =
                      camaEnc && quartoAnjoId && camaEnc.quarto_id !== quartoAnjoId

                    let restricaoTexto: string | null = null
                    if (insc?.ficha_respostas?.respostas) {
                      try {
                        const parsed = JSON.parse(insc.ficha_respostas.respostas)
                        if (parsed.alergia || parsed.restricao_alimentar) {
                          restricaoTexto = [parsed.alergia, parsed.restricao_alimentar].filter(Boolean).join(' • ')
                        }
                      } catch {}
                    }

                    return (
                      <Link
                        key={v.id}
                        href={insc ? `/inscricoes/${insc.id}` : '#'}
                        className={`block p-3 rounded-[12px] border text-xs transition-colors space-y-1.5 ${
                          restricaoTexto
                            ? 'bg-terracota/10 border-terracota/40 text-texto hover:border-terracota'
                            : emQuartoDiferente
                            ? 'bg-terracota/5 border-terracota/40 text-terracota hover:bg-terracota/10'
                            : 'bg-noite-3 border-linha text-texto hover:border-cobre/40'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm truncate">{v.encontrista.nome_completo}</span>
                          {insc && (
                            <span className="font-mono text-xs text-cobre shrink-0 ml-2">
                              #{insc.codigo}
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-texto-3 flex justify-between">
                          <span>
                            {camaEnc?.quarto.nome || 'Sem quarto'}{' '}
                            {camaEnc ? `(Cama ${camaEnc.codigo})` : ''}
                          </span>
                          {emQuartoDiferente && (
                            <span className="text-terracota font-semibold">Quarto divergente!</span>
                          )}
                        </div>

                        {/* Alerta Vermelho de Restrição Alimentar para o Anjo */}
                        {restricaoTexto && (
                          <div className="p-2 rounded-[8px] bg-terracota/20 border border-terracota/40 text-terracota font-medium text-[11px] flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>
                              <strong>Cuidado ao servir:</strong> {restricaoTexto}
                            </span>
                          </div>
                        )}
                      </Link>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
