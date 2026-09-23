'use client'

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Building2,
  Clock,
  Users,
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Info,
  X,
  Lock,
} from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

interface GuiaOperacional {
  descricao: string
  oQueFazer: string[]
  oQueFicarAtento: string[]
  oQueNaoFazer: string[]
  errosComuns: string[]
  regrasBloqueio: string
}

const GUIAS: Record<string, GuiaOperacional> = {
  'Administração': {
    descricao: 'Coordenação executiva, controle geral de listas de participantes e suporte administrativo direto à liderança.',
    oQueFazer: [
      'Garantir a comunicação ágil entre todas as frentes de serviço',
      'Gerenciar listas oficiais de encontristas e servos',
      'Emitir impressões ou relatórios emergenciais requisitados pelos coordenadores',
    ],
    oQueFicarAtento: [
      'Alterações de última hora em quartos ou status de participantes',
      'Manter o sistema digital sempre sincronizado com qualquer ajuste manual',
    ],
    oQueNaoFazer: [
      'Tomar decisões doutrinárias ou de escala crítica sem autorização pastoral',
      'Alterar alocações no sistema sem comunicar os anjos e líderes envolvidos',
    ],
    errosComuns: [
      'Deixar anotações em papéis soltos sem atualizar a Central ECD',
    ],
    regrasBloqueio: 'Elegível para escalas de apoio geral quando não houver fechamentos em andamento.',
  },
  'Financeiro': {
    descricao: 'Gestão do caixa operacional para suprimentos emergenciais e controle financeiro do encontro.',
    oQueFazer: [
      'Custodiar o caixa miúdo para compras pontuais da cozinha ou manutenção',
      'Coletar notas fiscais e recibos de todas as saídas financeiras',
      'Conferir relatórios de fechamento de inscrições (100% quitadas antecipadamente)',
    ],
    oQueFicarAtento: [
      'Todas as inscrições do encontro já entram 100% pagas e aprovadas',
      'Nunca receber ou aceitar pagamentos parciais no local do retiro',
    ],
    oQueNaoFazer: [
      'Efetuar qualquer reembolso sem autorização formal do pastor líder',
      'Misturar recursos pessoais com os valores do encontro',
    ],
    errosComuns: [
      'Autorizar compras sem emissão de comprovante fiscal adequado',
    ],
    regrasBloqueio: 'Elegível para apoio em escalas gerais de limpeza e serviços nos horários livres.',
  },
  'Logística e Transporte': {
    descricao: 'Organização do ônibus oficial, mural de caronas solidárias (partidas da Igreja Get Church) e acolhimento com check-in no sítio.',
    oQueFazer: [
      'Organizar o embarque no pátio da Get Church Floripa às 19:00 de sexta-feira',
      'Conferir a lista de passageiros e orientar o motorista do ônibus',
      'Realizar o check-in rápido na chegada, entregando crachás e orientando os quartos',
    ],
    oQueFicarAtento: [
      'Todas as caronas partem exclusivamente da Igreja (Get Church Floripa)',
      'Identificar todas as malas com etiquetas antes de colocá-las no bagageiro',
      'Garantir que nenhum encontrista fique sem meio de transporte',
    ],
    oQueNaoFazer: [
      'Permitir que pessoas não inscritas ou não autorizadas embarquem',
      'Desviar rotas de caronas sem aviso prévio à coordenação',
    ],
    errosComuns: [
      'Esquecer de conferir o canhoto de bagagem ao descarregar as malas no sítio',
    ],
    regrasBloqueio: 'Sexta-feira dedicação 100% ao transporte e check-in. Elegível para escalas no sábado e domingo.',
  },
  'Anjos': {
    descricao: 'Ministério de paternidade e acolhimento dedicado: cada anjo cuida individualmente de 1 a 2 encontristas durante todo o retiro.',
    oQueFazer: [
      'Dormir no mesmo quarto que o seu encontrista para vigiar e acolher',
      'Servir a comida do seu encontrista em todas as refeições (café, almoço e jantar)',
      'Cuidar pessoalmente de todas as restrições alimentares, alergias e medicamentos dele',
      'Interceder e dar suporte emocional e espiritual durante as plenárias',
    ],
    oQueFicarAtento: [
      'A responsabilidade da alimentação do encontrista é estritamente do Anjo!',
      'Sinais de isolamento, tristeza profunda ou vontade de desistir',
      'Manter discrição e respeito absoluto ao espaço do encontrista',
    ],
    oQueNaoFazer: [
      'Deixar seu encontrista sozinho nas refeições ou momentos de refeição livre',
      'Quebrar o sigilo das partilhas e confissões feitas pelo encontrista',
      'Ausentar-se do sítio ou do quarto sem comunicar a liderança dos anjos',
    ],
    errosComuns: [
      'Esperar que a cozinha controle a dieta do encontrista em vez de servi-lo pessoalmente',
      'Ficar conversando com outros servos e descuidar do encontrista',
    ],
    regrasBloqueio: 'Dedicação exclusiva ao encontrista. NÃO participam da Escala de Limpeza nas refeições pois estão servindo seus encontristas.',
  },
  'Cozinha': {
    descricao: 'Preparo com excelência e amor de todas as refeições do encontro (café, almoço, lanches, jantar e ceia).',
    oQueFazer: [
      'Cozinhar dentro do cronograma estrito para alimentar pontualmente os participantes',
      'Manter padrões rigorosos de higiene, manipulação e acondicionamento dos alimentos',
      'Disponibilizar os alimentos nas bancadas para que os anjos sirvam seus encontristas',
    ],
    oQueFicarAtento: [
      'Pontualidade britânica: atrasos na cozinha desregulam todo o cronograma da capela',
      'Manter água quente e café sempre frescos nos intervalos',
    ],
    oQueNaoFazer: [
      'Modificar o cardápio sem alinhamento com a coordenação',
      'Permitir entrada de pessoas estranhas à equipe na área de manipulação',
    ],
    errosComuns: [
      'Subestimar a quantidade de comida necessária em dias de jejum quebrado',
    ],
    regrasBloqueio: 'Isentos da lavação de louças gerais (a louça é lavada pelos servos escalados na Escala de Limpeza!).',
  },
  'Serviços Gerais': {
    descricao: 'Manutenção contínua do sítio, abastecimento e higienização dos banheiros, recolhimento de lixo e suporte geral.',
    oQueFazer: [
      'Fazer vistorias frequentes em todos os banheiros antes de cada intervalo',
      'Repor papel higiênico, sabonete líquido e toalhas de papel',
      'Esvaziar lixeiras e manter as áreas externas limpas e organizadas',
    ],
    oQueFicarAtento: [
      'Banheiros impecáveis e secos antes do término das plenárias da capela',
      'Manter produtos de limpeza sempre em locais seguros e identificados',
    ],
    oQueNaoFazer: [
      'Fazer ruídos ou bater portas perto da capela durante ministrações silenciosas',
      'Deixar faltar insumos básicos nos banheiros nos horários de pico',
    ],
    errosComuns: [
      'Limpar banheiros exatamente no momento do intervalo quando os encontristas chegam',
    ],
    regrasBloqueio: 'Lideram e executam os turnos de banheiros da Escala de Limpeza juntamente com a equipe de Stand-by.',
  },
  'Stand-by': {
    descricao: 'Força móvel e reserva estratégica pronta para cobrir faltas, reforçar postos com sobrecarga e garantir a fluidez do retiro.',
    oQueFazer: [
      'Estar permanentemente contactável e de prontidão no sítio',
      'Assumir postos de limpeza, louça, apoio logístico ou substituição quando convocado',
      'Auxiliar na organização geral dos ambientes e movimentação de cadeiras',
    ],
    oQueFicarAtento: [
      'Manter celular e rádio ativos; responder aos chamados imediatamente',
      'Postura solícita e pronta para qualquer tarefa necessária',
    ],
    oQueNaoFazer: [
      'Achar que estar de stand-by significa tempo livre ou folga para passear',
      'Ausentar-se das imediações das áreas centrais sem avisar o líder',
    ],
    errosComuns: [
      'Não comparecer prontamente às convocações da liderança',
    ],
    regrasBloqueio: 'Principais pilares da Escala de Limpeza e cobertura de turnos.',
  },
  'Torre de Guerra': {
    descricao: 'Intercessão espiritual contínua 24h, oração em turnos ininterruptos e retaguarda espiritual durante todo o retiro.',
    oQueFazer: [
      'Cobrir os turnos designados em oração de joelhos e clamor silencioso',
      'Interceder pelos preletores, pelo coração dos encontristas e contra todo impedimento',
      'Passar o bastão da oração ao próximo turno sem deixar nenhum minuto descoberto',
    ],
    oQueFicarAtento: [
      'Turnos da madrugada e turno crítico de Sábado (11h às 14h - Libertação)',
      'Ambiente de reverência, sem conversas paralelas na sala de oração',
    ],
    oQueNaoFazer: [
      'Usar celular para entretenimento ou conversas banais na torre',
      'Abandonar o posto antes da chegada física do próximo intercessor',
    ],
    errosComuns: [
      'Chegar atrasado para render o irmão do turno anterior',
    ],
    regrasBloqueio: 'BLOQUEIO ABSOLUTO: Intercessores escalados no Sábado entre 11h e 14h NÃO podem fazer limpeza, pois estão em combate de oração para a libertação.',
  },
  'Cartas': {
    descricao: 'Triagem confidencial, conferência de metas e montagem dos envelopes surpresa de cartas dos familiares.',
    oQueFazer: [
      'Organizar as cartas por participante em pastas individuais lacradas',
      'Conferir se cada encontrista atingiu a meta mínima de 3 cartas',
      'Identificar quem tem menos de 3 cartas e articular cartas de emergência dos líderes',
    ],
    oQueFicarAtento: [
      'Sigilo e confidencialidade absoluta: nenhuma carta pode ser violada ou lida',
      'Organização impecável por ordem de quarto e código do encontrista',
    ],
    oQueNaoFazer: [
      'Ler o conteúdo das cartas de familiares',
      'Entregar cartas antes do momento oficial determinado pela coordenação',
    ],
    errosComuns: [
      'Trocar cartas entre encontristas com nomes semelhantes (conferir sempre o código!)',
    ],
    regrasBloqueio: 'Dedicação total na sexta e sábado até o fechamento de todos os envelopes.',
  },
  'Ministração': {
    descricao: 'Pastores e preletores oficiais responsáveis pela proclamação da Palavra de Deus e condução espiritual dos momentos de apelo.',
    oQueFazer: [
      'Ministrar as mensagens bíblicas de cada etapa do Encontro com Deus',
      'Conduzir os momentos de quebra de maldições, perdão e batismo no Espírito Santo',
      'Liderar as equipes de libertação no sábado',
    ],
    oQueFicarAtento: [
      'Sensibilidade à condução do Espírito Santo e respeito aos horários da programação',
      'Alinhamento doutrinário com a visão da Get Church Floripa',
    ],
    oQueNaoFazer: [
      'Estender excessivamente as reuniões a ponto de comprometer as refeições e sono',
      'Tratar de temas fora do escopo profético do encontro',
    ],
    errosComuns: [
      'Não sincronizar o término da ministração com a equipe de Apoio Capela',
    ],
    regrasBloqueio: 'BLOQUEIO COMPLETO: Pastores são expressamente proibidos de tarefas de limpeza ou louça.',
  },
  'Apoio Capela': {
    descricao: 'Sustentação física e espiritual no altar durante apelos, amparo a encontristas emocionados, lenços e ordem no templo.',
    oQueFazer: [
      'Posicionar-se nas laterais da capela 10 minutos antes do fim de cada ministração',
      'Amparar pessoas durante o mover do Espírito Santo (homens com homens, mulheres com mulheres)',
      'Distribuir lenços de papel e recolher com discrição',
      'Apoiar os ministrantes em orações individuais',
    ],
    oQueFicarAtento: [
      'Postura firme, olhar vigilante e reverência o tempo todo',
      'Nunca chamar atenção para si mesmo durante o culto',
    ],
    oQueNaoFazer: [
      'Sair da capela durante o culto ("não saem de lá por nada")',
      'Permitir que pessoas caiam no chão sem o devido amparo cuidadoso',
      'Tocar de forma inadequada em encontristas do sexo oposto',
    ],
    errosComuns: [
      'Ficar de olhos fechados orando em vez de vigiar os encontristas no altar',
    ],
    regrasBloqueio: 'BLOQUEIO COMPLETO: Servos do Apoio Capela NÃO fazem limpeza nem serviços fora da capela durante o encontro.',
  },
  'Som e Mídia': {
    descricao: 'Operação dos sistemas de áudio, microfones dos pastores, projeção de letras e versículos, iluminação e suporte ao louvor.',
    oQueFazer: [
      'Checar baterias de todos os microfones antes de cada plenária',
      'Garantir áudio limpo, sem microfonia e com volume confortável',
      'Projetar letras de louvores e versículos no momento exato',
      'Controlar a iluminação suave nos apelos',
    ],
    oQueFicarAtento: [
      'Estar focado 100% no andamento da reunião; nunca abandonar a mesa técnica',
      'Microfone reserva testado e pronto ao lado da mesa',
    ],
    oQueNaoFazer: [
      'Mexer no som sem autorização do operador líder',
      'Deixar microfones abertos fora de uso gerando ruídos indesejados',
    ],
    errosComuns: [
      'Música de fundo muito alta abafando as orações do pastor no altar',
    ],
    regrasBloqueio: 'BLOQUEIO COMPLETO: Operadores de Som e Mídia NÃO fazem limpeza durante o encontro.',
  },
  'Aconselhamentos': {
    descricao: 'Atendimento e aconselhamento pastoral confidencial individual para participantes que demandam cuidado e oração profunda.',
    oQueFazer: [
      'Receber os encontristas encaminhados com amor, compaixão e graça',
      'Ouvir pacientemente e aplicar os princípios da Palavra de Deus',
      'Preencher a Ficha de Aconselhamento com zelo e sigilo inviolável',
    ],
    oQueFicarAtento: [
      'Identificar casos graves que exijam continuidade no pastoreio local após o retiro',
      'Garantir sigilo absoluto sobre todas as confissões ouvidas',
    ],
    oQueNaoFazer: [
      'Comentar o teor do aconselhamento com outros servos ou irmãos',
      'Fazer promessas que fujam da verdade bíblica',
    ],
    errosComuns: [
      'Tentar resolver dilemas complexos de anos em 15 minutos sem direcionar ao discipulado contínuo',
    ],
    regrasBloqueio: 'Conselheiros escalados para o pós-almoço de sábado estão BLOQUEADOS de lavar louça do almoço.',
  },
  'Chofar': {
    descricao: 'Convocação bíblica sonora para os momentos de despertar, refeições e abertura das reuniões do Encontro com Deus.',
    oQueFazer: [
      'Tocar o chofar pontualmente nos horários de chamada (acordar, café, almoço, culto)',
      'Percorrer as áreas comuns permitindo que todos os quartos escutem a convocação',
      'Guardar o instrumento em estojo apropriado com zelo',
    ],
    oQueFicarAtento: [
      'Pontualidade britânica para soar o toque nos pavilhões',
      'Toque claro, firme e solene',
    ],
    oQueNaoFazer: [
      'Tocar o chofar fora dos momentos determinados pela coordenação',
      'Permitir que terceiros brinquem com o instrumento cerimonial',
    ],
    errosComuns: [
      'Atrasar o toque do despertar na manhã de sábado ou domingo',
    ],
    regrasBloqueio: 'Elegível para apoios em escalas gerais nos intervalos entre as convocações.',
  },
}

export function DepartamentosClient({
  departamentos,
  servos,
}: {
  departamentos: any[]
  servos: any[]
}) {
  const [selectedDept, setSelectedDept] = useState<any | null>(null)

  const guia = selectedDept ? GUIAS[selectedDept.nome] : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {departamentos.map((dept) => {
          const membros = servos.filter((s) =>
            s.departamentos?.toLowerCase().includes(dept.nome.toLowerCase())
          )

          return (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className="bg-noite-2 border border-linha hover:border-cobre/50 hover:bg-noite-3/40 rounded-[16px] p-5 space-y-3 transition-all duration-150 cursor-pointer shadow-sm group"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-[12px] bg-noite-3 border border-linha flex items-center justify-center text-cobre group-hover:scale-105 transition-transform shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                {dept.chegada_ate && (
                  <Badge variant="outline" className="text-[10px] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Chegar até {dept.chegada_ate}
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="font-jost text-base font-semibold text-texto leading-tight mb-1 group-hover:text-cobre transition-colors">
                  {dept.nome}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-texto-3">
                  <Users className="w-3.5 h-3.5" />
                  <span>{membros.length} servo(s) escalado(s)</span>
                </div>
              </div>

              {membros.length > 0 && (
                <div className="pt-3 border-t border-linha/60 space-y-1">
                  <span className="text-[11px] text-texto-3 font-medium uppercase tracking-wider block">
                    Equipe:
                  </span>
                  <div className="space-y-0.5">
                    {membros.slice(0, 3).map((m) => (
                      <div key={m.id} className="text-xs text-texto-2 truncate">
                        &bull; {m.pessoa.nome_completo}
                      </div>
                    ))}
                    {membros.length > 3 && (
                      <span className="text-[10px] text-cobre block">
                        +{membros.length - 3} outros
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-2 text-right">
                <span className="text-[11px] text-cobre font-medium inline-flex items-center gap-1 group-hover:underline">
                  Ver Guia Operacional &rarr;
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Guia Operacional */}
      <DialogPrimitive.Root
        open={!!selectedDept}
        onOpenChange={(open) => !open && setSelectedDept(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-noite/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-linha bg-noite-2 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:rounded-[20px] max-h-[90vh] overflow-y-auto">
            {selectedDept && (
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-linha">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-[12px] bg-cobre/15 border border-cobre/30 flex items-center justify-center text-cobre shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-jost font-semibold text-texto">
                        {selectedDept.nome}
                      </h2>
                      <p className="text-xs text-cobre font-mono tracking-wider uppercase">
                        Guia Operacional e Regras de Serviço
                      </p>
                    </div>
                  </div>
                  <DialogPrimitive.Close className="rounded-lg p-1 text-texto-2 hover:text-texto hover:bg-noite-3 transition-colors">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Fechar</span>
                  </DialogPrimitive.Close>
                </div>

                {/* Descrição */}
                {guia && (
                  <>
                    <div className="bg-noite-3 rounded-[12px] p-3.5 border border-linha text-sm text-texto-2 leading-relaxed">
                      <span className="font-semibold text-texto block mb-1">
                        Descrição da Função:
                      </span>
                      {guia.descricao}
                    </div>

                    {/* Regra de Escala & Bloqueios */}
                    <div className="bg-terracota/10 border border-terracota/30 rounded-[12px] p-3.5 flex items-start gap-3">
                      <Lock className="w-5 h-5 text-terracota shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-terracota text-xs uppercase tracking-wider block">
                          Regras de Escala e Bloqueios:
                        </span>
                        <p className="text-xs text-texto mt-0.5">{guia.regrasBloqueio}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* O que fazer */}
                      <div className="bg-noite-3/70 rounded-[14px] p-4 border border-linha space-y-2">
                        <div className="flex items-center gap-2 text-salvia font-semibold text-xs uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4" /> O que Fazer (Passo a Passo)
                        </div>
                        <ul className="space-y-1.5 text-xs text-texto-2">
                          {guia.oQueFazer.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-salvia">&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* O que ficar atento */}
                      <div className="bg-noite-3/70 rounded-[14px] p-4 border border-linha space-y-2">
                        <div className="flex items-center gap-2 text-ambar font-semibold text-xs uppercase tracking-wider">
                          <AlertTriangle className="w-4 h-4" /> Pontos Críticos de Atenção
                        </div>
                        <ul className="space-y-1.5 text-xs text-texto-2">
                          {guia.oQueFicarAtento.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-ambar">&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* O que NÃO fazer */}
                      <div className="bg-noite-3/70 rounded-[14px] p-4 border border-linha space-y-2">
                        <div className="flex items-center gap-2 text-terracota font-semibold text-xs uppercase tracking-wider">
                          <XCircle className="w-4 h-4" /> O que NÃO Fazer
                        </div>
                        <ul className="space-y-1.5 text-xs text-texto-2">
                          {guia.oQueNaoFazer.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-terracota">&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Erros Comuns */}
                      <div className="bg-noite-3/70 rounded-[14px] p-4 border border-linha space-y-2">
                        <div className="flex items-center gap-2 text-ceu font-semibold text-xs uppercase tracking-wider">
                          <HelpCircle className="w-4 h-4" /> Erros Comuns a Evitar
                        </div>
                        <ul className="space-y-1.5 text-xs text-texto-2">
                          {guia.errosComuns.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-ceu">&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-2 text-right">
                  <button
                    onClick={() => setSelectedDept(null)}
                    className="px-5 py-2 bg-noite-3 hover:bg-cobre hover:text-noite text-texto border border-linha rounded-[10px] text-xs font-semibold transition-colors"
                  >
                    Entendido e Fechar
                  </button>
                </div>
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  )
}
