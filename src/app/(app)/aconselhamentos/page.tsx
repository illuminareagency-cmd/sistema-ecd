import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { HeartHandshake, FileText, UserCheck, Calendar, Lock } from 'lucide-react'
import { formatarData } from '@/lib/utils'

export default async function AconselhamentosPage() {
  const session = await auth()
  const user = session?.user as any

  // Verificar se o usuário tem permissão de atendimento/aconselhamento ou é admin
  const isAuthorized =
    user?.perfis?.includes('admin') ||
    user?.permissoes?.includes('atendimento') ||
    user?.permissoes?.includes('aconselhamento')

  if (!isAuthorized) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-4 font-figtree">
        <div className="w-16 h-16 rounded-full bg-terracota/10 border border-terracota/30 text-terracota flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-jost font-semibold text-texto">Área de Acesso Restrito</h1>
        <p className="text-texto-2 text-sm">
          As Fichas de Aconselhamento são confidenciais e exigem credenciais autorizadas pela equipe de aconselhamento.
        </p>
      </div>
    )
  }

  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const fichas = await prisma.fichaAconselhamento.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: {
      inscricao: {
        include: { pessoa: true },
      },
      atribuida_a: true,
      enviada_por: true,
    },
    orderBy: { criado_em: 'desc' },
  })

  return (
    <div className="space-y-6 font-figtree">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[12px] bg-cobre/15 border border-cobre/30 flex items-center justify-center text-cobre">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Aconselhamentos</h1>
              <p className="text-texto-2 text-sm mt-0.5">
                Gestão confidencial de Fichas de Aconselhamento e escuta durante o retiro
              </p>
            </div>
          </div>
        </div>

        <Badge variant="terracota" className="px-3 py-1">
          Sigilo Pastoral Ativo
        </Badge>
      </div>

      <div className="bg-noite-2 rounded-[20px] overflow-hidden border border-linha shadow-sm">
        <div className="p-6 border-b border-linha flex justify-between items-center">
          <div>
            <h2 className="text-lg font-jost font-semibold text-texto">
              Fichas de Aconselhamento ({fichas.length})
            </h2>
            <p className="text-xs text-texto-3">Acesso restrito com registro de visualização confidencial</p>
          </div>
        </div>

        <div className="divide-y divide-linha/40">
          {fichas.map((f) => (
            <div
              key={f.id}
              className="p-5 hover:bg-noite-3/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-texto text-base">
                    {f.inscricao.pessoa.nome_completo}
                  </span>
                  <span className="font-mono text-xs text-cobre">#{f.inscricao.codigo}</span>
                  <Badge
                    variant={
                      f.status === 'concluida'
                        ? 'salvia'
                        : f.status === 'em_aconselhamento'
                        ? 'ambar'
                        : 'outline'
                    }
                    className="capitalize text-xs"
                  >
                    {f.status.replace('_', ' ')}
                  </Badge>
                  {f.precisa_acompanhamento && (
                    <Badge variant="terracota" className="text-[10px]">
                      Acompanhamento pós-encontro
                    </Badge>
                  )}
                </div>

                <div className="text-xs text-texto-3 flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    Conselheiro: {f.atribuida_a?.nome_completo || 'Não atribuído'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Registrado em: {formatarData(f.criado_em)}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <button className="text-cobre hover:text-cobre-claro text-xs font-semibold px-4 py-2 rounded-[10px] bg-cobre/10 hover:bg-cobre/20 transition-colors">
                  Visualizar com Sigilo &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
