import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Truck, Car, Users, Clock, MapPin, Info } from 'lucide-react'
import { formatarHora } from '@/lib/utils'

export default async function TransportePage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  // Veículo ônibus
  const onibus = await prisma.veiculo.findFirst({
    where: {
      ...(encontroAtual ? { encontro_id: encontroAtual.id } : {}),
      tipo: 'onibus',
    },
    include: {
      inscricoes: {
        include: { pessoa: true },
        orderBy: { codigo: 'asc' },
      },
    },
  })

  // Ofertas de carona
  const ofertas = await prisma.caronaOferta.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: { motorista: true },
  })

  // Pedidos de carona
  const pedidos = await prisma.caronaPedido.findMany({
    where: encontroAtual ? { encontro_id: encontroAtual.id } : {},
    include: { pessoa: true },
  })

  const passageirosOnibus = onibus?.inscricoes || []
  const capacidadeOnibus = onibus?.capacidade || 50

  return (
    <div className="space-y-6 font-figtree">
      <div>
        <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Transporte e Logística</h1>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          Embarque no ônibus oficial e mural colaborativo de caronas solidárias
        </p>
      </div>

      {/* Alerta de Ponto de Saída Único */}
      <div className="bg-cobre/10 border border-cobre/30 rounded-[16px] p-4 flex items-center gap-3">
        <MapPin className="w-5 h-5 text-cobre shrink-0" />
        <div className="text-sm">
          <strong className="text-texto">Ponto de Partida Obrigatório:</strong> Todas as caronas solidárias e o ônibus oficial saem exclusivamente da sede da{' '}
          <strong className="text-cobre">Get Church Floripa</strong> na sexta-feira às 19:00.
        </div>
      </div>

      {/* Card do Ônibus */}
      <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-linha">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[14px] bg-cobre/15 border border-cobre/30 flex items-center justify-center text-cobre">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-jost font-semibold text-texto">
                {onibus?.nome || 'Ônibus Principal'}
              </h2>
              <p className="text-xs text-texto-3">
                Saída da Get Church Floripa às 19:00 pontual na sexta-feira
              </p>
            </div>
          </div>
          <Badge variant="salvia" className="px-3 py-1.5 text-sm self-start sm:self-auto">
            {passageirosOnibus.length} / {capacidadeOnibus} vagas ocupadas
          </Badge>
        </div>

        <div>
          <div className="text-xs text-texto-3 font-semibold uppercase tracking-wider mb-3">
            Lista de Passageiros ({passageirosOnibus.length}):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {passageirosOnibus.map((p) => (
              <div
                key={p.id}
                className="p-2.5 rounded-[10px] bg-noite-3 border border-linha text-xs flex justify-between items-center"
              >
                <span className="font-medium text-texto truncate">{p.pessoa.nome_completo}</span>
                <span className="font-mono text-cobre shrink-0 ml-2">#{p.codigo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mural de Caronas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ofertas */}
        <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-linha">
            <h3 className="font-jost text-lg font-semibold text-texto flex items-center gap-2">
              <Car className="w-5 h-5 text-salvia" />
              Ofertas de Carona ({ofertas.length})
            </h3>
            <Badge variant="salvia">Saída: Get Church</Badge>
          </div>

          <div className="space-y-3">
            {ofertas.map((o) => (
              <div
                key={o.id}
                className="p-4 rounded-[14px] bg-noite-3 border border-linha space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <div className="font-medium text-texto">{o.motorista.nome_completo}</div>
                  <Badge variant="outline" className="text-xs text-salvia border-salvia/30">
                    {o.vagas} vaga(s)
                  </Badge>
                </div>
                <div className="text-xs text-texto-3 flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1 text-cobre">
                    <MapPin className="w-3.5 h-3.5" />
                    Partida: Get Church Floripa (Igreja)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Saída: {formatarHora(o.horario_saida)}
                  </span>
                </div>
                {o.observacoes && (
                  <p className="text-xs text-texto-2 italic pt-1">{o.observacoes}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pedidos */}
        <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-linha">
            <h3 className="font-jost text-lg font-semibold text-texto flex items-center gap-2">
              <Users className="w-5 h-5 text-ambar" />
              Precisam de Carona ({pedidos.length})
            </h3>
            <Badge variant="ambar">Aguardando Vaga</Badge>
          </div>

          <div className="space-y-3">
            {pedidos.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-[14px] bg-noite-3 border border-linha space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <div className="font-medium text-texto">{p.pessoa.nome_completo}</div>
                  <Badge variant="outline" className="text-xs text-ambar border-ambar/30">
                    {p.status}
                  </Badge>
                </div>
                <div className="text-xs text-texto-3 flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1 text-cobre">
                    <MapPin className="w-3.5 h-3.5" />
                    Embarque na Get Church Floripa
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Disponível a partir de: {formatarHora(p.disponivel_a_partir)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
