import { prisma } from '@/lib/prisma'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatarMoeda, formatarData } from '@/lib/utils'
import { CreditCard, DollarSign, Wallet, TrendingUp } from 'lucide-react'

export default async function FinanceiroPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  const pagamentos = await prisma.pagamento.findMany({
    where: encontroAtual ? { inscricao: { encontro_id: encontroAtual.id } } : {},
    include: {
      inscricao: {
        include: { pessoa: true },
      },
    },
    orderBy: { data: 'desc' },
  })

  const total = pagamentos.reduce((acc, p) => acc + p.valor, 0)
  const totalPix = pagamentos.filter((p) => p.forma.toLowerCase() === 'pix').reduce((acc, p) => acc + p.valor, 0)
  const totalCartao = pagamentos.filter((p) => p.forma.toLowerCase() === 'cartao').reduce((acc, p) => acc + p.valor, 0)
  const totalDinheiro = pagamentos.filter((p) => p.forma.toLowerCase() === 'dinheiro').reduce((acc, p) => acc + p.valor, 0)

  return (
    <div className="space-y-6 font-figtree">
      <div>
        <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Financeiro</h1>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          Resumo de inscrições confirmadas e pagamentos recebidos
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-texto-2">Total Arrecadado</CardTitle>
            <DollarSign className="w-4 h-4 text-salvia" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-salvia">{formatarMoeda(total)}</div>
            <p className="text-xs text-texto-3 mt-1">{pagamentos.length} pagamentos</p>
          </CardContent>
        </Card>

        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-texto-2">PIX</CardTitle>
            <Wallet className="w-4 h-4 text-cobre" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-texto">{formatarMoeda(totalPix)}</div>
            <p className="text-xs text-texto-3 mt-1">
              {total > 0 ? Math.round((totalPix / total) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-texto-2">Cartão</CardTitle>
            <CreditCard className="w-4 h-4 text-ceu" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-texto">{formatarMoeda(totalCartao)}</div>
            <p className="text-xs text-texto-3 mt-1">
              {total > 0 ? Math.round((totalCartao / total) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-noite-2 border-linha">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-texto-2">Dinheiro / Outro</CardTitle>
            <TrendingUp className="w-4 h-4 text-ambar" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-jost font-semibold text-texto">{formatarMoeda(totalDinheiro)}</div>
            <p className="text-xs text-texto-3 mt-1">
              {total > 0 ? Math.round((totalDinheiro / total) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-noite-2 rounded-[20px] overflow-hidden border border-linha shadow-sm">
        <div className="p-6 border-b border-linha flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-jost font-semibold text-texto">Histórico de Pagamentos</h2>
            <p className="text-xs text-texto-3 mt-0.5">Todos os pagamentos registrados no sistema</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-texto text-sm">
            <thead className="bg-noite-3 border-b border-linha text-texto-3 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Cód</th>
                <th className="p-4">Encontrista</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Forma</th>
                <th className="p-4">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linha/40">
              {pagamentos.map((p) => (
                <tr key={p.id} className="hover:bg-noite-3/40 transition-colors">
                  <td className="p-4 font-mono text-xs text-cobre font-semibold">
                    #{p.inscricao.codigo}
                  </td>
                  <td className="p-4 font-medium text-texto">
                    {p.inscricao.pessoa.nome_completo}
                  </td>
                  <td className="p-4 text-salvia font-semibold tabular-nums">
                    {formatarMoeda(p.valor)}
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="uppercase text-[11px] tracking-wide">
                      {p.forma}
                    </Badge>
                  </td>
                  <td className="p-4 text-texto-3 tabular-nums text-xs">
                    {formatarData(p.data)}
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
