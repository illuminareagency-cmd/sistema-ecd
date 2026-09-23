import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Shield, Clock, AlertTriangle, User, Users, Flame, Lock } from 'lucide-react'
import { formatarData, formatarHora } from '@/lib/utils'

export default async function TorrePage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  // Buscar torre de guerra
  const torre = await prisma.torre.findFirst({
    where: {
      ...(encontroAtual ? { encontro_id: encontroAtual.id } : {}),
    },
    include: {
      torre_turnos: {
        include: {
          alocacoes: {
            include: { pessoa: true },
          },
        },
        orderBy: { inicio: 'asc' },
      },
    },
  })

  // Buscar pastores e servos para compor as Equipes de Libertação (Duplas)
  const pastores = await prisma.pessoa.findMany({
    where: { eh_pastor: true },
    take: 6,
  })

  const intercessores = await prisma.participacaoServo.findMany({
    where: {
      ...(encontroAtual ? { encontro_id: encontroAtual.id } : {}),
      departamentos: { contains: 'Torre' },
    },
    include: { pessoa: true },
    take: 6,
  })

  // Montar duplas de libertação: 1 Ministro Experiente + 1 Intercessor Auxiliar
  const duplasLibertacao = pastores.slice(0, 4).map((p, idx) => ({
    id: idx + 1,
    sala: `Sala de Libertação ${String(idx + 1).padStart(2, '0')}`,
    ministro: p.nome_completo,
    auxiliar: intercessores[idx]?.pessoa.nome_completo || 'Intercessor em Escala',
    status: 'Homologada',
    turnoFoco: 'Sábado &bull; 11:00 às 14:00 (Perdão e Libertação)',
  }))

  const turnos = torre?.torre_turnos || []
  const totalTurnos = turnos.length
  const cobertos = turnos.filter((t) => t.alocacoes.length > 0).length
  const descobertos = totalTurnos - cobertos
  const porcentagem = totalTurnos > 0 ? Math.round((cobertos / totalTurnos) * 100) : 0

  // Agrupar turnos por dia (dd/MM)
  const turnosPorDia: Record<string, typeof turnos> = {}
  turnos.forEach((t) => {
    const diaKey = formatarData(t.inicio, 'EEEE, dd/MM')
    if (!turnosPorDia[diaKey]) turnosPorDia[diaKey] = []
    turnosPorDia[diaKey].push(t)
  })

  return (
    <div className="space-y-8 font-figtree">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[12px] bg-cobre/15 border border-cobre/30 flex items-center justify-center text-cobre">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Torre de Guerra</h1>
              <p className="text-texto-2 text-sm mt-0.5">
                Vigília ininterrupta de intercessão profética e retaguarda espiritual 24/7
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="salvia" className="px-3 py-1 text-sm">
            {cobertos} cobertos ({porcentagem}%)
          </Badge>
          {descobertos > 0 && (
            <Badge variant="terracota" className="px-3 py-1 text-sm">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              {descobertos} turnos sem intercessor
            </Badge>
          )}
        </div>
      </div>

      {/* SEÇÃO: Equipes de Libertação (Duplas de Ministério) */}
      <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-linha gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-terracota/15 border border-terracota/30 flex items-center justify-center text-terracota">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-jost font-semibold text-texto">
                Equipes de Libertação (Duplas Oficiais)
              </h2>
              <p className="text-xs text-texto-3">
                Regra bíblica da Get Church Floripa: sempre 1 Ministro Experiente + 1 Intercessor em Treinamento
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs border-cobre/30 text-cobre self-start sm:self-auto">
            4 Duplas Escaladas
          </Badge>
        </div>

        <div className="bg-noite-3/50 rounded-[14px] p-4 border border-linha/80 text-xs text-texto-2 flex items-start gap-3">
          <Lock className="w-4 h-4 text-cobre shrink-0 mt-0.5" />
          <p>
            <strong className="text-texto">Diretriz Pastoral:</strong> Durante as orações de libertação, o ministro experiente conduz o comando verbal e quebra de cadeias, enquanto o intercessor auxiliar sustenta continuamente em oração e cuida do amparo físico com discrição e respeito absoluto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {duplasLibertacao.map((d) => (
            <div
              key={d.id}
              className="bg-noite-3 rounded-[14px] p-4 border border-linha hover:border-cobre/40 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-jost text-sm font-semibold text-cobre">
                  {d.sala}
                </span>
                <Badge variant="salvia" className="text-[10px] px-2 py-0">
                  {d.status}
                </Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-[8px] bg-noite-2 border border-linha">
                  <div className="w-6 h-6 rounded-full bg-cobre/20 text-cobre flex items-center justify-center font-bold text-[10px] shrink-0">
                    M
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-texto-3 uppercase font-semibold block">
                      Ministro Experiente:
                    </span>
                    <span className="font-medium text-texto truncate block">
                      {d.ministro}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-[8px] bg-noite-2 border border-linha">
                  <div className="w-6 h-6 rounded-full bg-salvia/20 text-salvia flex items-center justify-center font-bold text-[10px] shrink-0">
                    A
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-texto-3 uppercase font-semibold block">
                      Intercessor Auxiliar / Treinamento:
                    </span>
                    <span className="font-medium text-texto truncate block">
                      {d.auxiliar}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-texto-3 pt-1 border-t border-linha/60 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-cobre" />
                <span dangerouslySetInnerHTML={{ __html: d.turnoFoco }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO: Escala de Turnos 24h da Torre de Guerra */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-jost font-semibold text-texto">
            Vigília Horária Contínua
          </h2>
          <p className="text-xs text-texto-3">
            Turnos de 1 hora ininterruptos de clamor no pavilhão de oração
          </p>
        </div>

        {Object.entries(turnosPorDia).map(([dia, turnosDoDia]) => (
          <div
            key={dia}
            className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-linha">
              <h3 className="text-lg font-jost font-semibold text-texto capitalize">{dia}</h3>
              <span className="text-xs text-texto-3">
                {turnosDoDia.filter((t) => t.alocacoes.length > 0).length} de {turnosDoDia.length} horas cobertas
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
              {turnosDoDia.map((t) => {
                const intercessor = t.alocacoes[0]?.pessoa
                const temAlguem = !!intercessor

                return (
                  <div
                    key={t.id}
                    className={`p-3 rounded-[12px] border text-center transition-colors ${
                      temAlguem
                        ? 'bg-salvia/10 border-salvia/30 text-texto'
                        : 'bg-terracota/10 border-terracota/30 text-terracota'
                    }`}
                  >
                    <div className="font-mono text-xs font-semibold mb-1">
                      {formatarHora(t.inicio)} - {formatarHora(t.fim)}
                    </div>
                    {temAlguem ? (
                      <div
                        className="text-xs text-salvia truncate font-medium flex items-center justify-center gap-1"
                        title={intercessor.nome_completo}
                      >
                        <User className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {intercessor.nome_preferido || intercessor.nome_completo}
                        </span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-terracota font-medium">
                        Descoberto
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
