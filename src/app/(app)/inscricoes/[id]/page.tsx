import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { formatarData, formatarMoeda } from '@/lib/utils'
import { Bed, Mail, ArrowLeft, Phone, MapPin, AlertTriangle, MessageCircle } from 'lucide-react'

export default async function InscricaoDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const inscricao = await prisma.inscricao.findUnique({
    where: { id },
    include: {
      pessoa: {
        include: {
          alocacoes_cama: {
            include: { cama: { include: { quarto: true } } },
          },
          vinculos_anjo_como_encontrista: {
            include: { anjo: true },
          },
        },
      },
      pagamentos: true,
      cartas: true,
      ficha_respostas: true,
      contatos_emergencia: true,
      encontro: true,
    },
  })

  if (!inscricao) notFound()

  const alocacao = inscricao.pessoa.alocacoes_cama[0]
  const anjoVinculo = inscricao.pessoa.vinculos_anjo_como_encontrista[0]
  const totalPago = inscricao.pagamentos.reduce((acc, p) => acc + p.valor, 0)
  const respostasFicha = inscricao.ficha_respostas?.respostas
    ? (() => { try { return JSON.parse(inscricao.ficha_respostas.respostas) } catch { return null } })()
    : null

  const temRestricao = !!(respostasFicha?.alergia || respostasFicha?.restricao_alimentar)
  const iniciais = (inscricao.pessoa.nome_preferido || inscricao.pessoa.nome_completo).substring(0, 2).toUpperCase()

  return (
    <div className="space-y-6 font-figtree">
      <Link
        href="/inscricoes"
        className="inline-flex items-center gap-2 text-sm text-cobre hover:text-cobre-claro transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para inscrições
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-noite-2 p-6 rounded-[20px] border border-linha">
        <div className="w-20 h-20 rounded-full bg-noite-3 border border-linha flex items-center justify-center text-2xl font-jost text-cobre font-bold shrink-0">
          {iniciais}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h1 className="text-2xl sm:text-3xl font-jost font-semibold text-texto text-center sm:text-left">
              {inscricao.pessoa.nome_completo}
            </h1>
            <Badge variant="outline" className="font-mono text-xs">
              #{inscricao.codigo}
            </Badge>
            {inscricao.checkin_em ? (
              <Badge variant="salvia">Check-in realizado</Badge>
            ) : (
              <Badge variant="outline">Check-in pendente</Badge>
            )}
          </div>
          <div className="text-xs text-texto-3 flex items-center gap-4 flex-wrap">
            {inscricao.pessoa.cidade && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {inscricao.pessoa.cidade} {inscricao.pessoa.bairro ? `(${inscricao.pessoa.bairro})` : ''}
              </span>
            )}
            {inscricao.pessoa.telefone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {inscricao.pessoa.telefone}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Alerta de Alimentação em Vermelho para o Anjo */}
      {temRestricao && (
        <div className="p-5 rounded-[18px] bg-terracota/15 border-2 border-terracota/50 shadow-[0_0_20px_rgba(209,106,82,0.2)] flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-terracota/20 border border-terracota text-terracota flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-terracota font-jost uppercase tracking-wide">
              Alerta Obrigatório para o Anjo ({anjoVinculo?.anjo?.nome_completo || 'Anjo a designar'}):
            </h2>
            <p className="text-sm text-texto leading-relaxed">
              <strong>O Anjo é o único responsável por servir a alimentação deste encontrista</strong> e zelar para que ele não ingira nenhum dos itens restritos.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              {respostasFicha?.alergia && (
                <span className="px-3 py-1 rounded-full bg-terracota text-white font-semibold">
                  Alergias: {respostasFicha.alergia}
                </span>
              )}
              {respostasFicha?.restricao_alimentar && (
                <span className="px-3 py-1 rounded-full bg-terracota/40 border border-terracota text-white font-medium">
                  Dieta / Restrição: {respostasFicha.restricao_alimentar}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-noite-2 rounded-[20px] border border-linha p-6">
            <h2 className="text-lg font-jost font-semibold text-cobre mb-4 flex items-center gap-2">
              <Bed className="w-5 h-5" /> Quarto e Cama
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-noite-3 p-4 rounded-[12px] border border-linha">
                <div className="text-xs text-texto-3 mb-1">Quarto do Encontrista</div>
                <div className="text-texto font-medium">
                  {alocacao?.cama?.quarto?.nome || 'Não alocado em quarto'}
                </div>
                {alocacao?.cama && (
                  <div className="text-xs text-cobre mt-0.5 font-medium">
                    Cama {alocacao.cama.codigo} ({alocacao.cama.posicao === 'inferior' ? 'Inferior' : 'Superior'})
                  </div>
                )}
              </div>

              <div className="bg-noite-3 p-4 rounded-[12px] border border-linha">
                <div className="text-xs text-texto-3 mb-1">Cama do Anjo</div>
                <div className="text-texto font-medium">
                  {anjoVinculo?.anjo?.nome_completo || 'Sem anjo vinculado'}
                </div>
                {anjoVinculo?.anjo?.telefone && (
                  <div className="text-xs text-texto-3 mt-0.5">
                    {anjoVinculo.anjo.telefone}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-noite-2 rounded-[20px] border border-linha p-6">
            <h2 className="text-lg font-jost font-semibold text-cobre mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" /> Cartas Recebidas ({inscricao.cartas.length})
            </h2>
            {inscricao.cartas.length === 0 ? (
              <p className="text-sm text-texto-3">Nenhuma carta registrada ainda para este encontrista.</p>
            ) : (
              <div className="space-y-3">
                {inscricao.cartas.map((carta) => (
                  <div
                    key={carta.id}
                    className="p-4 rounded-[12px] bg-noite-3 border border-linha flex justify-between items-start"
                  >
                    <div>
                      <div className="font-medium text-texto text-sm">{carta.remetente_nome}</div>
                      <div className="text-xs text-texto-3 capitalize">{carta.relacao || 'Amigo / Familiar'}</div>
                      {carta.conteudo && (
                        <p className="text-xs text-texto-2 font-literata mt-2 line-clamp-2 italic">
                          &ldquo;{carta.conteudo}&rdquo;
                        </p>
                      )}
                    </div>
                    <Badge variant="salvia" className="text-[10px]">
                      Recebida para Entrega
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-noite-2 rounded-[20px] border border-linha p-6">
            <h2 className="text-lg font-jost font-semibold text-cobre mb-4">Ficha de Saúde e Inscrição</h2>
            {respostasFicha ? (
              <div className="space-y-3 text-sm">
                {respostasFicha.medicacao && (
                  <div>
                    <span className="text-texto-3 block text-xs">Medicação contínua:</span>
                    <span className="text-texto font-medium">{respostasFicha.medicacao}</span>
                  </div>
                )}
                {respostasFicha.alergia && (
                  <div>
                    <span className="text-texto-3 block text-xs">Alergias declaradas:</span>
                    <span className="text-terracota font-medium">{respostasFicha.alergia}</span>
                  </div>
                )}
                {respostasFicha.restricao_alimentar && (
                  <div>
                    <span className="text-texto-3 block text-xs">Restrição alimentar / Dieta:</span>
                    <span className="text-terracota font-medium">{respostasFicha.restricao_alimentar}</span>
                  </div>
                )}
                {respostasFicha.info_equipe && (
                  <div>
                    <span className="text-texto-3 block text-xs">Observações adicionais:</span>
                    <span className="text-texto">{respostasFicha.info_equipe}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-texto-3">A ficha ainda não foi preenchida pelo encontrista.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-noite-2 rounded-[20px] border border-linha p-6">
            <h2 className="text-lg font-jost font-semibold text-cobre mb-4">Pagamento</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-texto-3">Valor total:</span>
                <span className="text-texto font-semibold">{formatarMoeda(inscricao.valor_total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-texto-3">Total pago:</span>
                <span className="text-salvia font-semibold">{formatarMoeda(totalPago)}</span>
              </div>
              <div className="pt-2 border-t border-linha">
                <span className="text-xs text-texto-3 block mb-1">Registros:</span>
                {inscricao.pagamentos.map((p) => (
                  <div key={p.id} className="text-xs text-texto-2 flex justify-between py-1">
                    <span className="uppercase">{p.forma}</span>
                    <span className="tabular-nums">{formatarMoeda(p.valor)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-noite-2 rounded-[20px] border border-linha p-6">
            <h2 className="text-lg font-jost font-semibold text-cobre mb-4">Contatos de Emergência</h2>
            {inscricao.contatos_emergencia.length === 0 ? (
              <p className="text-sm text-texto-3">Nenhum contato cadastrado.</p>
            ) : (
              <div className="space-y-4 text-sm">
                {inscricao.contatos_emergencia.map((c) => {
                  const phoneDigits = (c.telefone || '').replace(/\D/g, '')
                  const waNumber = phoneDigits.length === 11 ? `55${phoneDigits}` : phoneDigits.length === 10 ? `55${phoneDigits}` : phoneDigits

                  return (
                    <div key={c.id} className="p-4 bg-noite-3 rounded-[12px] border border-linha space-y-3">
                      <div>
                        <div className="font-semibold text-texto text-base">{c.nome}</div>
                        <div className="text-xs text-texto-3 capitalize">{c.parentesco || 'Familiar'}</div>
                        {c.telefone && <div className="text-xs font-mono text-cobre mt-0.5">{c.telefone}</div>}
                      </div>

                      {/* Botões de Ação Direta: WhatsApp e Ligar */}
                      {phoneDigits && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <a
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Olá ${c.nome}, sou da equipe do Encontro com Deus da Get Church Floripa referente ao(à) ${inscricao.pessoa.nome_completo}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[10px] bg-salvia/20 hover:bg-salvia/30 text-salvia border border-salvia/40 text-xs font-semibold transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${phoneDigits}`}
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[10px] bg-noite-2 hover:bg-noite text-texto border border-linha text-xs font-semibold transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-cobre" />
                            Ligar
                          </a>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
