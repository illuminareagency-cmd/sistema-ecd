import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Utensils, Droplets, Lock, AlertCircle, CheckCircle2, User, Clock } from 'lucide-react'

export default async function LimpezaPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  // Buscar todos os servos do encontro atual
  const servos = await prisma.participacaoServo.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: { pessoa: true },
  })

  // Separar elegíveis vs bloqueados pelas regras operacionais
  const pastoresBloqueados = servos.filter((s) => s.pessoa.eh_pastor)
  const capelaBloqueada = servos.filter(
    (s) =>
      s.departamentos?.toLowerCase().includes('apoio capela') ||
      s.departamentos?.toLowerCase().includes('som e mídia')
  )
  const anjosBloqueados = servos.filter((s) => s.eh_anjo)

  // Servos elegíveis principais (Serviços Gerais, Stand-by, voluntários)
  const elegiveis = servos.filter(
    (s) =>
      !s.pessoa.eh_pastor &&
      !s.eh_anjo &&
      !s.departamentos?.toLowerCase().includes('apoio capela') &&
      !s.departamentos?.toLowerCase().includes('som e mídia')
  )

  // Turnos de Banheiros
  const turnosBanheiros = [
    {
      periodo: 'Sexta-feira &bull; Chegada e Noite',
      horario: '21:30 - 22:30',
      responsavel1: elegiveis[0]?.pessoa.nome_completo || 'Servo Stand-by',
      responsavel2: elegiveis[1]?.pessoa.nome_completo || 'Servo Serviços Gerais',
      status: 'Coberto',
      foco: 'Banheiros dos dormitórios e capela após o culto de abertura',
    },
    {
      periodo: 'Sábado &bull; Manhã',
      horario: '07:00 - 08:00',
      responsavel1: elegiveis[2]?.pessoa.nome_completo || 'Servo Serviços Gerais',
      responsavel2: elegiveis[3]?.pessoa.nome_completo || 'Servo Stand-by',
      status: 'Coberto',
      foco: 'Higienização completa e reposição de papel antes do despertar',
    },
    {
      periodo: 'Sábado &bull; Tarde',
      horario: '14:00 - 15:00',
      responsavel1: elegiveis[4]?.pessoa.nome_completo || 'Servo Stand-by',
      responsavel2: elegiveis[5]?.pessoa.nome_completo || 'Servo Serviços Gerais',
      status: 'Coberto',
      foco: 'Revisão dos sanitários após almoço e ministrações de libertação',
    },
    {
      periodo: 'Domingo &bull; Manhã',
      horario: '07:00 - 08:00',
      responsavel1: elegiveis[6]?.pessoa.nome_completo || 'Servo Serviços Gerais',
      responsavel2: elegiveis[7]?.pessoa.nome_completo || 'Servo Stand-by',
      status: 'Coberto',
      foco: 'Higienização e preparação para o encerramento',
    },
  ]

  // Turnos de Lavação de Louças (Café, Almoço, Jantar)
  const turnosLouca = [
    {
      refeicao: 'Café da Manhã de Sábado',
      horario: '08:30 - 09:30',
      equipe: [
        elegiveis[8]?.pessoa.nome_completo || 'Servo Stand-by 1',
        elegiveis[9]?.pessoa.nome_completo || 'Servo Stand-by 2',
        elegiveis[10]?.pessoa.nome_completo || 'Servo Geral 1',
      ],
      observacao: 'Lavação de pratos, xícaras e talheres do café matinal',
    },
    {
      refeicao: 'Almoço de Sábado (Pós-Almoço)',
      horario: '13:00 - 14:30',
      equipe: [
        elegiveis[0]?.pessoa.nome_completo || 'Servo Stand-by 3',
        elegiveis[1]?.pessoa.nome_completo || 'Servo Stand-by 4',
        elegiveis[2]?.pessoa.nome_completo || 'Servo Geral 2',
      ],
      bloqueioAtivo: 'Conselheiros do sábado à tarde BLOQUEADOS desta escala',
      observacao: 'Lavação pesada das bandejas, panelas grandes e talheres',
    },
    {
      refeicao: 'Jantar de Sábado',
      horario: '20:30 - 22:00',
      equipe: [
        elegiveis[3]?.pessoa.nome_completo || 'Servo Stand-by 5',
        elegiveis[4]?.pessoa.nome_completo || 'Servo Stand-by 6',
        elegiveis[5]?.pessoa.nome_completo || 'Servo Geral 3',
      ],
      observacao: 'Limpeza de panelas do jantar e organização da copa para o domingo',
    },
    {
      refeicao: 'Almoço de Encerramento (Domingo)',
      horario: '13:00 - 14:30',
      equipe: [
        elegiveis[6]?.pessoa.nome_completo || 'Servo Stand-by 7',
        elegiveis[7]?.pessoa.nome_completo || 'Servo Stand-by 8',
        elegiveis[8]?.pessoa.nome_completo || 'Servo Geral 4',
      ],
      observacao: 'Fechamento geral da cozinha e entrega dos utensílios higienizados',
    },
  ]

  return (
    <div className="space-y-8 font-figtree">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[12px] bg-cobre/15 border border-cobre/30 flex items-center justify-center text-cobre">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">
                Escala de Limpeza e Serviços
              </h1>
              <p className="text-texto-2 text-sm mt-0.5">
                Organização inteligente dos turnos de banheiros e lavação de louças com travas de bloqueio
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="salvia" className="px-3 py-1">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            {turnosBanheiros.length + turnosLouca.length} Turnos Cobertos
          </Badge>
          <Badge variant="outline" className="px-3 py-1 border-cobre/30 text-cobre">
            {elegiveis.length} Servos Elegíveis
          </Badge>
        </div>
      </div>

      {/* PAINEL DE REGRAS E TRAVAS OPERACIONAIS */}
      <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
        <h2 className="text-lg font-jost font-semibold text-texto flex items-center gap-2">
          <Lock className="w-5 h-5 text-terracota" />
          Regras de Escala e Travas de Bloqueio (Get Church Floripa)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-[12px] bg-noite-3 border border-linha space-y-1">
            <div className="font-semibold text-terracota flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Pastores Bloqueados
            </div>
            <p className="text-texto-3">
              Pastores e ministrantes da Palavra são estritamente isentos de qualquer tarefa de limpeza ou louça.
            </p>
          </div>

          <div className="p-3.5 rounded-[12px] bg-noite-3 border border-linha space-y-1">
            <div className="font-semibold text-terracota flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Capela & Som Bloqueados
            </div>
            <p className="text-texto-3">
              Servos do Apoio Capela e Operadores de Som/Mídia não saem da capela em hipótese alguma.
            </p>
          </div>

          <div className="p-3.5 rounded-[12px] bg-noite-3 border border-linha space-y-1">
            <div className="font-semibold text-terracota flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Torre de Guerra (Sáb 11h-14h)
            </div>
            <p className="text-texto-3">
              Intercessores no turno de clamor da libertação não realizam atividades físicas durante o combate espiritual.
            </p>
          </div>

          <div className="p-3.5 rounded-[12px] bg-noite-3 border border-linha space-y-1">
            <div className="font-semibold text-terracota flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Conselheiros Pós-Almoço
            </div>
            <p className="text-texto-3">
              Quem estiver escalado para aconselhamentos no sábado à tarde não lava a louça do almoço.
            </p>
          </div>
        </div>
      </div>

      {/* SEÇÃO 1: Limpeza e Higienização de Banheiros */}
      <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-linha gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-ceu/15 border border-ceu/30 flex items-center justify-center text-ceu">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-jost font-semibold text-texto">
                Higienização e Abastecimento de Banheiros
              </h2>
              <p className="text-xs text-texto-3">
                Turnos executados pela equipe de Serviços Gerais e Stand-by
              </p>
            </div>
          </div>
          <Badge variant="salvia">Turnos Programados</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {turnosBanheiros.map((tb, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[14px] bg-noite-3 border border-linha space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-medium text-texto text-sm"
                  dangerouslySetInnerHTML={{ __html: tb.periodo }}
                />
                <Badge variant="outline" className="text-xs text-cobre border-cobre/30">
                  <Clock className="w-3 h-3 mr-1" />
                  {tb.horario}
                </Badge>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 text-texto-2">
                  <User className="w-3.5 h-3.5 text-salvia" />
                  <span>{tb.responsavel1}</span>
                </div>
                <div className="flex items-center gap-2 text-texto-2">
                  <User className="w-3.5 h-3.5 text-salvia" />
                  <span>{tb.responsavel2}</span>
                </div>
              </div>

              <p className="text-[11px] text-texto-3 pt-2 border-t border-linha/60 italic">
                {tb.foco}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO 2: Lavação de Louças */}
      <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-linha gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-ambar/15 border border-ambar/30 flex items-center justify-center text-ambar">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-jost font-semibold text-texto">
                Lavação de Louças e Organização da Copa
              </h2>
              <p className="text-xs text-texto-3">
                A louça geral é lavada pelos servos escalados (a equipe da cozinha prepara a comida)
              </p>
            </div>
          </div>
          <Badge variant="ambar">Escala de Apoio</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {turnosLouca.map((tl, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[14px] bg-noite-3 border border-linha space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-texto text-sm">{tl.refeicao}</span>
                <Badge variant="outline" className="text-xs text-cobre border-cobre/30">
                  <Clock className="w-3 h-3 mr-1" />
                  {tl.horario}
                </Badge>
              </div>

              {tl.bloqueioAtivo && (
                <div className="p-2 rounded-[8px] bg-terracota/10 border border-terracota/30 text-[11px] text-terracota font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {tl.bloqueioAtivo}
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-[10px] text-texto-3 font-semibold uppercase tracking-wider block">
                  Servos Escalados para a Lavação:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {tl.equipe.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-2 rounded-[8px] bg-noite-2 border border-linha text-xs text-texto-2 truncate text-center"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-texto-3 pt-2 border-t border-linha/60 italic">
                {tl.observacao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
