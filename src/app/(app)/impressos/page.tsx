import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Printer, Tag, DoorOpen, Heart, Shield, FileText, AlertCircle, Users } from 'lucide-react'

export default async function ImpressosPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  // Buscar dados para as listas de impressão
  const quartos = await prisma.quarto.findMany({
    orderBy: { nome: 'asc' },
    include: {
      camas: {
        include: {
          alocacoes: {
            where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
            include: { pessoa: true },
          },
        },
        orderBy: { codigo: 'asc' },
      },
    },
  })

  // Fichas com restrições alimentares
  const fichas = await prisma.fichaResposta.findMany({
    where: {
      inscricao: {
        encontro_id: encontroAtual ? encontroAtual.id : undefined,
      },
    },
    include: {
      inscricao: {
        include: { pessoa: true },
      },
    },
  })

  const restricoes = fichas
    .map((f) => {
      try {
        const data = JSON.parse(f.respostas)
        return {
          nome: f.inscricao.pessoa.nome_completo,
          codigo: f.inscricao.codigo,
          alergia: data.alergia || '',
          restricao: data.restricao_alimentar || '',
        }
      } catch {
        return null
      }
    })
    .filter((r) => r && (r.alergia || r.restricao))

  return (
    <div className="space-y-6 font-figtree">
      <div>
        <div className="flex items-center gap-2">
          <Printer className="w-7 h-7 text-cobre" />
          <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Central de Impressos</h1>
        </div>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          Gere e imprima etiquetas de mala, listas de porta de quarto e cartões de bolso dos anjos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-noite-2 border border-linha rounded-[16px] p-5 space-y-3">
          <div className="w-10 h-10 rounded-[12px] bg-cobre/15 border border-cobre/30 flex items-center justify-center text-cobre">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-jost text-base font-semibold text-texto">Etiquetas de Mala</h3>
            <p className="text-xs text-texto-3 mt-1">
              Etiquetas adesivas com código, nome e quarto para identificação da bagagem
            </p>
          </div>
          <button
            className="w-full py-2 bg-noite-3 hover:bg-cobre hover:text-noite text-cobre border border-linha hover:border-cobre rounded-[10px] text-xs font-semibold transition-colors"
          >
            Imprimir Etiquetas
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-noite-2 border border-linha rounded-[16px] p-5 space-y-3">
          <div className="w-10 h-10 rounded-[12px] bg-salvia/15 border border-salvia/30 flex items-center justify-center text-salvia">
            <DoorOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-jost text-base font-semibold text-texto">Listas de Porta</h3>
            <p className="text-xs text-texto-3 mt-1">
              Folhas A4 para fixação na porta de cada quarto com as camas e nomes dos ocupantes
            </p>
          </div>
          <button className="w-full py-2 bg-noite-3 hover:bg-salvia hover:text-noite text-salvia border border-linha hover:border-salvia rounded-[10px] text-xs font-semibold transition-colors">
            Imprimir Portas
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-noite-2 border border-linha rounded-[16px] p-5 space-y-3">
          <div className="w-10 h-10 rounded-[12px] bg-ceu/15 border border-ceu/30 flex items-center justify-center text-ceu">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-jost text-base font-semibold text-texto">Cartões dos Anjos</h3>
            <p className="text-xs text-texto-3 mt-1">
              Cartões de bolso com quarto, restrições e dados dos encontristas vinculados
            </p>
          </div>
          <button className="w-full py-2 bg-noite-3 hover:bg-ceu hover:text-noite text-ceu border border-linha hover:border-ceu rounded-[10px] text-xs font-semibold transition-colors">
            Imprimir Cartões
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-noite-2 border border-linha rounded-[16px] p-5 space-y-3">
          <div className="w-10 h-10 rounded-[12px] bg-ambar/15 border border-ambar/30 flex items-center justify-center text-ambar">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-jost text-base font-semibold text-texto">Crachás da Equipe</h3>
            <p className="text-xs text-texto-3 mt-1">
              Identificação plastificada com nome, departamento e cor do ministério
            </p>
          </div>
          <button className="w-full py-2 bg-noite-3 hover:bg-ambar hover:text-noite text-ambar border border-linha hover:border-ambar rounded-[10px] text-xs font-semibold transition-colors">
            Imprimir Crachás
          </button>
        </div>
      </div>

      {/* Tabela de Restrições Alimentares - Guia dos Anjos */}
      <div className="bg-noite-2 rounded-[20px] overflow-hidden border border-linha shadow-sm">
        <div className="p-6 border-b border-linha space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-jost font-semibold text-texto">
              Guia dos Anjos: Restrições e Cuidados Alimentares ({restricoes.length})
            </h2>
            <Badge variant="salvia">Cuidado Exclusivo do Anjo</Badge>
          </div>
          <p className="text-xs text-texto-3">
            O Anjo serve a comida do encontrista em todas as refeições e é o único responsável pela atenção às restrições
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-texto text-sm">
            <thead className="bg-noite-3 border-b border-linha text-texto-3 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Cód</th>
                <th className="p-4">Encontrista</th>
                <th className="p-4">Alergia Declarada</th>
                <th className="p-4">Dieta / Restrição</th>
                <th className="p-4">Atenção do Anjo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linha/40">
              {restricoes.map((r: any, idx) => (
                <tr key={idx} className="hover:bg-noite-3/40 transition-colors">
                  <td className="p-4 font-mono text-xs text-cobre font-semibold">#{r.codigo}</td>
                  <td className="p-4 font-medium text-texto">{r.nome}</td>
                  <td className="p-4">
                    {r.alergia ? (
                      <Badge variant="terracota" className="text-xs">
                        {r.alergia}
                      </Badge>
                    ) : (
                      <span className="text-texto-3 text-xs">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    {r.restricao ? (
                      <Badge variant="ambar" className="text-xs">
                        {r.restricao}
                      </Badge>
                    ) : (
                      <span className="text-texto-3 text-xs">-</span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-salvia font-medium">
                    Servir pessoalmente
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
