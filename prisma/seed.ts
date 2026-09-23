export {}
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================
// DADOS FICTÍCIOS
// ============================================================

const NOMES_ENCONTRISTAS = [
  'Rafael Almeida', 'Lucas Ferreira', 'Mateus Oliveira', 'Pedro Costa', 'Gabriel Santos',
  'Felipe Rodrigues', 'João Paulo Carvalho', 'Thiago Souza', 'Diego Lima', 'André Martins',
  'Bruno Silva', 'Caio Pereira', 'Eduardo Gomes', 'Fábio Nascimento', 'Gustavo Ribeiro',
  'Henrique Castro', 'Igor Barbosa', 'Jonas Cardoso', 'Leandro Teixeira', 'Marcos Mendes',
  'Nathan Freitas', 'Otávio Correia', 'Paulo Araújo', 'Rodrigo Cunha', 'Samuel Dias',
  'Tiago Pinto', 'Victor Hugo Moreira', 'Wellington Nunes', 'Alex Borges', 'Bernardo Faria',
  'Cristiano Vieira', 'Danilo Rocha', 'Emerson Lopes', 'Fernando Batista', 'Gilberto Campos',
  'Hugo Melo', 'Ivan Monteiro', 'Jefferson Braga', 'Kleber Fernandes', 'Leonardo Pacheco',
  'Marcelo Azevedo', 'Nelson Cavalcanti', 'Oscar Duarte', 'Plínio Esteves', 'Roberto Fonseca',
  'Sandro Guimarães', 'Valter Henriques', 'Wagner Isidoro', 'Yuri Jacobsen', 'Zé Carlos Lacerda',
  'Abílio Magalhães', 'Benedito Nogueira', 'Celso Ortega', 'Davi Parreira',
]

const NOMES_SERVOS_MASCULINOS = [
  'Marcos Teixeira', 'Anderson Lima', 'Ricardo Souza', 'Cristiano Alves', 'Renato Barbosa',
  'Júnior Moura', 'Evandro Carvalho', 'Wander Figueiredo', 'Sérgio Prado', 'Luiz Carlos Queiroz',
  'Rogério Sena', 'Alberto Torres', 'Benedito Ulhoa', 'Carlos Eduardo Vilas',
]

const NOMES_SERVOS_FEMININOS = [
  'Ana Paula Ferreira', 'Camila Rodrigues', 'Daniela Costa', 'Elaine Martins', 'Fernanda Santos',
  'Gisele Lima', 'Helena Oliveira', 'Isabel Pereira', 'Juliana Almeida', 'Karla Barbosa',
  'Letícia Moreira', 'Mariana Souza', 'Natália Carvalho', 'Patrícia Gomes', 'Roberta Silva',
  'Sandra Mendes', 'Tatiana Freitas', 'Vera Correia', 'Wilma Dias',
]

const NOMES_PASTORES = [
  'Pr. Antônio Borges', 'Pr. Cláudio Menezes', 'Pr. Daniel Faria', 'Pr. Eduardo Lacerda',
  'Pr. Francisco Araújo', 'Pr. Geraldo Nascimento', 'Pr. Humberto Pinto', 'Pr. Ismael Rocha',
]

// Clãs fictícios
const CLAS = ['Clã Leão', 'Clã Cordeiro', 'Clã Águia', 'Clã Pomba', 'Clã Oliveira', 'Clã Cedro']

// Líderes de clã fictícios
const LIDERES_CLA = ['Ana Santos', 'Bruno Mendes', 'Carla Rodrigues', 'Daniel Costa', 'Elisa Ferreira', 'Fernando Lima']

function telefone() {
  const ddd = ['48', '47', '49', '51', '11'][Math.floor(Math.random() * 5)]
  const n = String(Math.floor(Math.random() * 90000000) + 10000000)
  return `+55${ddd}9${n.substring(0, 4)}${n.substring(4, 8)}`
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function opcoes<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function main() {
  console.log('🌱 Iniciando seed completo do Central ECD...\n')

  // Limpar banco (ordem reversa de dependências)
  await prisma.auditoria.deleteMany()
  await prisma.notificacao.deleteMany()
  await prisma.mensagem.deleteMany()
  await prisma.fichaAconselhamento.deleteMany()
  await prisma.selecaoApoioAltar.deleteMany()
  await prisma.chamadaEquipe.deleteMany()
  await prisma.atividade.deleteMany()
  await prisma.torreAlocacao.deleteMany()
  await prisma.torreTurno.deleteMany()
  await prisma.torre.deleteMany()
  await prisma.alocacaoTurno.deleteMany()
  await prisma.turno.deleteMany()
  await prisma.departamento.deleteMany()
  await prisma.caronaCombinada.deleteMany()
  await prisma.caronaPedido.deleteMany()
  await prisma.caronaOferta.deleteMany()
  await prisma.embarque.deleteMany()
  await prisma.veiculo.deleteMany()
  await prisma.vinculoAnjo.deleteMany()
  await prisma.alocacaoCama.deleteMany()
  await prisma.carta.deleteMany()
  await prisma.indicacaoCarta.deleteMany()
  await prisma.contatoEmergencia.deleteMany()
  await prisma.fichaResposta.deleteMany()
  await prisma.pagamento.deleteMany()
  await prisma.inscricao.deleteMany()
  await prisma.formularioCampo.deleteMany()
  await prisma.participacaoServo.deleteMany()
  await prisma.compromissoJejum.deleteMany()
  await prisma.session.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.pessoa.deleteMany()
  await prisma.cama.deleteMany()
  await prisma.quarto.deleteMany()
  await prisma.local.deleteMany()
  await prisma.encontro.deleteMany()
  await prisma.templatesMensagem.deleteMany()

  console.log('✓ Banco limpo')

  // ============================================================
  // LOCAL E QUARTOS
  // ============================================================
  const local = await prisma.local.create({
    data: {
      nome: 'Pousada Águas Claras',
      endereco: 'Rodovia SC-401, km 23, Canasvieiras, Florianópolis - SC',
    },
  })

  // Criar quartos com camas (conforme spec e solicitação: numeração contínua sem palavra beliche)
  const quarto1 = await prisma.quarto.create({
    data: {
      local_id: local.id,
      nome: 'Quarto 01',
      tipo: 'dormitorio',
      numerado: true,
      uso_padrao: 'encontristas',
    },
  })

  const quarto2 = await prisma.quarto.create({
    data: {
      local_id: local.id,
      nome: 'Quarto 02',
      tipo: 'dormitorio',
      numerado: true,
      uso_padrao: 'encontristas',
    },
  })

  const quarto3 = await prisma.quarto.create({
    data: {
      local_id: local.id,
      nome: 'Quarto 03',
      tipo: 'dormitorio',
      numerado: true,
      uso_padrao: 'encontristas',
    },
  })

  const quartoSuperior = await prisma.quarto.create({
    data: {
      local_id: local.id,
      nome: 'Quartos Superiores (Servos)',
      tipo: 'quartos_superiores',
      numerado: false,
      capacidade_livre: 20,
      uso_padrao: 'servos',
    },
  })

  const casaAuxiliar = await prisma.quarto.create({
    data: {
      local_id: local.id,
      nome: 'Casa Auxiliar (Pastores)',
      tipo: 'casa_auxiliar',
      numerado: false,
      capacidade_livre: 15,
      uso_padrao: 'pastores',
    },
  })

  // Numeração contínua de camas: Cama 01 até Cama 88
  let camaCounter = 1

  // Quarto 1: 22 pares (44 camas: Cama 01 até Cama 44)
  const camasQ1: any[] = []
  for (let i = 1; i <= 22; i++) {
    const numInf = camaCounter++
    const numSup = camaCounter++
    const cInf = await prisma.cama.create({
      data: {
        quarto_id: quarto1.id,
        codigo: `Cama ${String(numInf).padStart(2, '0')}`,
        indice_par: i,
        posicao: 'inferior',
        ativa: true,
      },
    })
    const cSup = await prisma.cama.create({
      data: {
        quarto_id: quarto1.id,
        codigo: `Cama ${String(numSup).padStart(2, '0')}`,
        indice_par: i,
        posicao: 'superior',
        ativa: true,
      },
    })
    camasQ1.push(cInf, cSup)
  }

  // Quarto 2: 13 pares (26 camas: Cama 45 até Cama 70)
  const camasQ2: any[] = []
  for (let i = 1; i <= 13; i++) {
    const numInf = camaCounter++
    const numSup = camaCounter++
    const cInf = await prisma.cama.create({
      data: {
        quarto_id: quarto2.id,
        codigo: `Cama ${String(numInf).padStart(2, '0')}`,
        indice_par: i,
        posicao: 'inferior',
        ativa: true,
      },
    })
    const cSup = await prisma.cama.create({
      data: {
        quarto_id: quarto2.id,
        codigo: `Cama ${String(numSup).padStart(2, '0')}`,
        indice_par: i,
        posicao: 'superior',
        ativa: true,
      },
    })
    camasQ2.push(cInf, cSup)
  }

  // Quarto 3: 9 pares (18 camas: Cama 71 até Cama 88)
  const camasQ3: any[] = []
  for (let i = 1; i <= 9; i++) {
    const numInf = camaCounter++
    const numSup = camaCounter++
    const cInf = await prisma.cama.create({
      data: {
        quarto_id: quarto3.id,
        codigo: `Cama ${String(numInf).padStart(2, '0')}`,
        indice_par: i,
        posicao: 'inferior',
        ativa: true,
      },
    })
    const cSup = await prisma.cama.create({
      data: {
        quarto_id: quarto3.id,
        codigo: `Cama ${String(numSup).padStart(2, '0')}`,
        indice_par: i,
        posicao: 'superior',
        ativa: true,
      },
    })
    camasQ3.push(cInf, cSup)
  }

  console.log('✓ Local e quartos criados')

  // ============================================================
  // ENCONTROS
  // ============================================================
  // Edição atual em andamento
  const hoje = new Date('2026-10-09') // Sábado do encontro para demonstração
  const encontroAtual = await prisma.encontro.create({
    data: {
      nome: '45º ECD Homens — outubro de 2026',
      tipo: 'masculino',
      data_inicio: new Date('2026-10-09T19:00:00-03:00'),
      data_fim: new Date('2026-10-11T18:00:00-03:00'),
      local_id: local.id,
      status: 'em_andamento',
      valor_inscricao: 150.0,
      capacidade: 60,
      prazo_ficha: new Date('2026-10-07T23:59:00-03:00'),
      prazo_cartas: new Date('2026-10-08T23:59:00-03:00'),
      meta_minima_cartas: 3,
      link_grupo_whatsapp: 'https://chat.whatsapp.com/exemplo-link-grupo',
      horario_saida_onibus: '19:00',
      endereco_saida: 'Get Church Floripa — Av. Beira-Mar Norte, 2040, Florianópolis - SC',
      lista_o_que_levar: '• Roupas para 3 dias\n• Artigos de higiene pessoal\n• Remédios de uso contínuo\n• Bíblia e caderno\n• Roupa de cama (lençol, fronha e cobertor)\n• Toalha\n• Chinelo\n• Roupas confortáveis para as atividades\n• Carregador de celular',
      configuracoes: JSON.stringify({ num_apoio_altar: 8, min_edicoes_apoio: 2 }),
    },
  })

  // Edição anterior 1 — homens, encerrada
  const encontroAnterior1 = await prisma.encontro.create({
    data: {
      nome: '44º ECD Homens — abril de 2026',
      tipo: 'masculino',
      data_inicio: new Date('2026-04-17T19:00:00-03:00'),
      data_fim: new Date('2026-04-19T18:00:00-03:00'),
      local_id: local.id,
      status: 'encerrado',
      valor_inscricao: 150.0,
      capacidade: 58,
    },
  })

  // Edição anterior 2 — mulheres, encerrada
  const encontroAnterior2 = await prisma.encontro.create({
    data: {
      nome: '43º ECD Mulheres — março de 2026',
      tipo: 'feminino',
      data_inicio: new Date('2026-03-13T19:00:00-03:00'),
      data_fim: new Date('2026-03-15T18:00:00-03:00'),
      local_id: local.id,
      status: 'encerrado',
      valor_inscricao: 150.0,
      capacidade: 55,
    },
  })

  console.log('✓ Encontros criados')

  // ============================================================
  // USUÁRIOS DO SISTEMA (login)
  // ============================================================
  const usuariosAdmin = [
    { nome: 'Pastor Antônio Borges', email: 'admin@getfloripa.com', perfis: 'admin', permissoes: 'financeiro,saude,atendimento,cronograma', eh_pastor: true, sexo: 'masculino' },
    { nome: 'Irmã Fernanda Gestão', email: 'financeiro@getfloripa.com', perfis: 'admin', permissoes: 'financeiro', eh_pastor: false, sexo: 'feminino' },
    { nome: 'Irmã Camila Cartas', email: 'cartas@getfloripa.com', perfis: 'lider_departamento', permissoes: '', eh_pastor: false, sexo: 'feminino' },
    { nome: 'Irmã Sandra Cozinha', email: 'cozinha@getfloripa.com', perfis: 'lider_departamento', permissoes: '', eh_pastor: false, sexo: 'feminino' },
    { nome: 'Marcos Anjo Servo', email: 'servo1@getfloripa.com', perfis: 'servo', permissoes: '', eh_pastor: false, sexo: 'masculino' },
    { nome: 'Irmão Jonas Checkin', email: 'checkin@getfloripa.com', perfis: 'servo', permissoes: '', eh_pastor: false, sexo: 'masculino' },
    { nome: 'Pr. Daniel Atendimento', email: 'atendimento@getfloripa.com', perfis: 'lider_departamento', permissoes: 'atendimento', eh_pastor: true, sexo: 'masculino' },
    { nome: 'Dr. Henrique Saúde', email: 'saude@getfloripa.com', perfis: 'servo', permissoes: 'saude', eh_pastor: false, sexo: 'masculino' },
  ]

  const pessoasAdmin: Record<string, any> = {}
  for (const u of usuariosAdmin) {
    const p = await prisma.pessoa.create({
      data: {
        nome_completo: u.nome,
        nome_preferido: u.nome.split(' ')[u.nome.startsWith('Pr.') || u.nome.startsWith('Dr.') ? 1 : 0],
        sexo: u.sexo,
        email: u.email,
        telefone: telefone(),
        eh_pastor: u.eh_pastor,
        cla: opcoes(CLAS),
        lider_cla: opcoes(LIDERES_CLA),
      },
    })
    await prisma.usuario.create({
      data: {
        pessoa_id: p.id,
        email: u.email,
        senha_hash: '123456',
        perfis: u.perfis,
        permissoes: u.permissoes,
      },
    })
    pessoasAdmin[u.email] = p
  }
  console.log('✓ Usuários admin criados')

  // ============================================================
  // PASTORES / MINISTRADORES
  // ============================================================
  const pastores: any[] = []
  for (const nome of NOMES_PASTORES) {
    const existente = Object.values(pessoasAdmin).find((p: any) => p.nome_completo.includes('Antônio'))
    if (nome === 'Pr. Antônio Borges' && existente) {
      pastores.push(existente)
      continue
    }
    if (nome === 'Pr. Daniel Faria') {
      pastores.push(pessoasAdmin['atendimento@getfloripa.com'])
      continue
    }
    const p = await prisma.pessoa.create({
      data: {
        nome_completo: nome,
        nome_preferido: nome.split(' ')[1],
        sexo: 'masculino',
        telefone: telefone(),
        eh_pastor: true,
        cla: opcoes(CLAS),
        lider_cla: opcoes(LIDERES_CLA),
      },
    })
    pastores.push(p)
  }
  console.log('✓ Pastores criados')

  // ============================================================
  // SERVOS
  // ============================================================
  const servos: any[] = []

  for (const nome of NOMES_SERVOS_MASCULINOS) {
    const p = await prisma.pessoa.create({
      data: {
        nome_completo: nome,
        nome_preferido: nome.split(' ')[0],
        sexo: 'masculino',
        telefone: telefone(),
        cla: opcoes(CLAS),
        lider_cla: opcoes(LIDERES_CLA),
      },
    })
    servos.push(p)
  }

  for (const nome of NOMES_SERVOS_FEMININOS) {
    const p = await prisma.pessoa.create({
      data: {
        nome_completo: nome,
        nome_preferido: nome.split(' ')[0],
        sexo: 'feminino',
        telefone: telefone(),
        cla: opcoes(CLAS),
        lider_cla: opcoes(LIDERES_CLA),
      },
    })
    servos.push(p)
  }

  // Adicionar usuário admin como servo também
  servos.push(pessoasAdmin['servo1@getfloripa.com'])
  servos.push(pessoasAdmin['checkin@getfloripa.com'])

  console.log(`✓ ${servos.length} servos criados`)

  // ============================================================
  // ENCONTRISTAS (54 homens)
  // ============================================================
  const encontristas: any[] = []
  let codigo = 1

  for (const nome of NOMES_ENCONTRISTAS) {
    const p = await prisma.pessoa.create({
      data: {
        nome_completo: nome,
        nome_preferido: nome.split(' ')[0],
        sexo: 'masculino',
        telefone: telefone(),
        email: `${nome.split(' ')[0].toLowerCase()}.${nome.split(' ')[1].toLowerCase()}@email.com`,
        cidade: opcoes(['Florianópolis', 'São José', 'Palhoça', 'Biguaçu', 'Joinville']),
        bairro: opcoes(['Trindade', 'Itacorubi', 'Agronômica', 'Centro', 'Kobrasol', 'Campinas']),
        cla: opcoes(CLAS),
        lider_cla: opcoes(LIDERES_CLA),
        quem_convidou: opcoes([...NOMES_SERVOS_MASCULINOS, ...NOMES_PASTORES]).split(' ')[0],
      },
    })
    encontristas.push(p)
  }
  console.log(`✓ ${encontristas.length} encontristas criados`)

  // ============================================================
  // INSCRIÇÕES (encontristas no encontro atual)
  // ============================================================
  const inscricoes: any[] = []
  codigo = 1

  const fichaStatuses = ['concluida', 'concluida', 'concluida', 'pendente', 'enviada'] // 60% concluída, 20% pendente, 20% enviada

  for (const pessoa of encontristas) {
    const checkinDone = Math.random() > 0.35 // ~65% fizeram check-in
    const fichaStatus = opcoes(fichaStatuses)

    const insc = await prisma.inscricao.create({
      data: {
        encontro_id: encontroAtual.id,
        pessoa_id: pessoa.id,
        status: 'confirmado',
        codigo: String(codigo).padStart(3, '0'),
        valor_total: 150.0,
        ficha_status: fichaStatus,
        entrou_no_grupo: Math.random() > 0.2,
        checkin_em: checkinDone ? randomDate(new Date('2026-10-09T18:30:00'), new Date('2026-10-09T21:00:00')) : null,
        checkin_por: checkinDone ? pessoasAdmin['checkin@getfloripa.com'].id : null,
        observacoes: Math.random() > 0.9 ? 'Primeiro encontro. Muito animado.' : null,
      },
    })
    inscricoes.push(insc)
    codigo++
  }
  console.log(`✓ ${inscricoes.length} inscrições criadas`)

  // ============================================================
  // PAGAMENTOS
  // ============================================================
  const formas = ['pix', 'pix', 'pix', 'cartao', 'dinheiro', 'pix']
  for (const insc of inscricoes) {
    await prisma.pagamento.create({
      data: {
        inscricao_id: insc.id,
        valor: 150.0,
        forma: opcoes(formas),
        data: randomDate(new Date('2026-09-01'), new Date('2026-10-08')),
        registrado_por_id: pessoasAdmin['financeiro@getfloripa.com'].id,
      },
    })
  }
  console.log('✓ Pagamentos criados')

  // ============================================================
  // FICHAS DE INSCRIÇÃO (respostas)
  // ============================================================
  const inscricoesComFicha = inscricoes.filter(i => i.ficha_status === 'concluida')
  for (const insc of inscricoesComFicha) {
    await prisma.fichaResposta.create({
      data: {
        inscricao_id: insc.id,
        respostas: JSON.stringify({
          medicacao: Math.random() > 0.8 ? 'Loratadina 10mg — uma vez ao dia pela manhã' : '',
          alergia: Math.random() > 0.85 ? 'Alergia a amendoim' : '',
          restricao_alimentar: opcoes(['', '', '', 'Vegetariano', 'Sem glúten']),
          cama_inferior: Math.random() > 0.9,
          info_equipe: Math.random() > 0.85 ? 'Tem ansiedade. Precisa de atenção no horário da medicação.' : '',
        }),
        consentimento_em: randomDate(new Date('2026-09-15'), new Date('2026-10-07')),
        versao_formulario: '1.0',
      },
    })

    // Contato de emergência
    await prisma.contatoEmergencia.create({
      data: {
        inscricao_id: insc.id,
        nome: `Familiar de ${encontristas.find((e: any) => inscricoes.find((i: any) => i.id === insc.id && i.pessoa_id === e.id)?.id === insc.id)?.nome_completo?.split(' ')[0] || 'Encontrista'}`,
        parentesco: opcoes(['pai', 'mãe', 'esposa', 'irmão', 'irmã']),
        telefone: telefone(),
        email: `familiar${Math.floor(Math.random() * 1000)}@email.com`,
      },
    })
  }

  // Contatos para inscrições sem ficha concluída
  for (const insc of inscricoes.filter(i => i.ficha_status !== 'concluida')) {
    if (Math.random() > 0.5) {
      await prisma.contatoEmergencia.create({
        data: {
          inscricao_id: insc.id,
          nome: `Familiar`,
          parentesco: opcoes(['pai', 'mãe', 'esposa']),
          telefone: telefone(),
        },
      })
    }
  }
  console.log('✓ Fichas e contatos criados')

  // ============================================================
  // CARTAS
  // ============================================================
  const statusCartas = ['aprovada', 'aprovada', 'aprovada', 'recebida', 'sinalizada']
  const origens = ['texto_digital', 'texto_digital', 'foto_manuscrita', 'carta_fisica']
  const relacoes = ['pai', 'mãe', 'esposa', 'irmão', 'irmã', 'amigo', 'amiga', 'líder', 'colega']

  const textosCartas = [
    'Que Deus te abençoe neste fim de semana especial. Você é muito importante para mim e estou orando por você!',
    'Este momento é um presente de Deus para você. Que você possa encontrar a paz que excede todo entendimento. Te amo muito!',
    'Você merece cada bênção que Deus tem preparado. Estou torcendo por você e orando todos os dias.',
    'Que este encontro transforme sua vida. Deus tem muito para te falar. Eu acredito em você!',
    'Com amor e gratidão, desejo que este fim de semana seja marcante. Você é especial para nós.',
    'Que Deus te alcance de um jeito profundo e real. Ele tem um propósito lindo para sua vida!',
    'Cada vez que penso em você, oro. Aproveite cada momento deste encontro. Você não vai se arrepender.',
    'Este é o seu momento com Deus. Deixa Ele te falar. Eu estarei orando por você do começo ao fim.',
  ]

  for (let i = 0; i < inscricoes.length; i++) {
    const insc = inscricoes[i]
    // Quantidade de cartas varia: 70% têm >= 3, 15% têm 1-2, 15% têm 0
    const numCartas = Math.random() > 0.15 ? (Math.random() > 0.15 ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 2) + 1) : 0

    for (let j = 0; j < numCartas; j++) {
      // Indicação
      const indicacao = await prisma.indicacaoCarta.create({
        data: {
          inscricao_id: insc.id,
          nome: `Remetente ${j + 1}`,
          relacao: opcoes(relacoes),
          telefone: telefone(),
          status: 'carta_recebida',
        },
      })

      await prisma.carta.create({
        data: {
          inscricao_id: insc.id,
          indicacao_id: indicacao.id,
          remetente_nome: `Remetente ${j + 1}`,
          relacao: indicacao.relacao,
          origem: opcoes(origens),
          conteudo: opcoes(textosCartas),
          status: opcoes(statusCartas),
          revisada_por: pessoasAdmin['cartas@getfloripa.com'].nome_completo,
        },
      })
    }

    // Para quem não tem carta, criar indicação pendente
    if (numCartas === 0) {
      await prisma.indicacaoCarta.create({
        data: {
          inscricao_id: insc.id,
          nome: 'Familiar Pendente',
          relacao: 'familiar',
          telefone: telefone(),
          status: 'convite_enviado',
        },
      })
    }
  }
  console.log('✓ Cartas criadas')

  // ============================================================
  // PARTICIPAÇÕES DE SERVOS
  // ============================================================
  const todoServos = [...servos, ...pastores]
  const depts: Record<string, string[]> = {
    admin: ['Administração'],
    financeiro: ['Financeiro'],
    anjos: ['Anjos'],
    cozinha: ['Cozinha'],
    servicos: ['Serviços Gerais'],
    standby: ['Stand-by'],
    torre: ['Torre de Guerra'],
    cartas: ['Cartas'],
    ministracao: ['Ministração'],
    apoio: ['Apoio Capela'],
    som: ['Som e Mídia'],
    aconselhamentos: ['Aconselhamentos'],
    logistica: ['Logística e Transporte'],
    chofar: ['Chofar'],
  }

  const modosViagem = ['onibus', 'onibus', 'onibus', 'carro_proprio', 'carro_proprio', 'precisa_carona']

  for (let i = 0; i < servos.length; i++) {
    const servo = servos[i]
    const ehAnjo = i < 27 // primeiros 27 são anjos
    await prisma.participacaoServo.create({
      data: {
        encontro_id: encontroAtual.id,
        pessoa_id: servo.id,
        status: 'confirmado',
        departamentos: opcoes(Object.values(depts)).join(','),
        eh_anjo: ehAnjo,
        capacidade_anjo: 2,
        experiente: Math.random() > 0.5,
        como_vai: opcoes(modosViagem),
        chegada_prevista: opcoes(['13:00', '15:00', '16:00', '18:00']),
      },
    })
  }

  for (const pastor of pastores) {
    if (!todoServos.find((s: any) => s.id === pastor.id)) continue
    await prisma.participacaoServo.upsert({
      where: { encontro_id_pessoa_id: { encontro_id: encontroAtual.id, pessoa_id: pastor.id } },
      update: { eh_anjo: false, experiente: true },
      create: {
        encontro_id: encontroAtual.id,
        pessoa_id: pastor.id,
        status: 'confirmado',
        departamentos: 'Ministração',
        eh_anjo: false,
        experiente: true,
        como_vai: 'carro_proprio',
        chegada_prevista: '13:00',
      },
    })
  }
  console.log('✓ Participações de servos criadas')

  // ============================================================
  // DEPARTAMENTOS
  // ============================================================
  const departamentosNomes = [
    { nome: 'Administração', icone: 'settings', chegada_ate: '13:00' },
    { nome: 'Financeiro', icone: 'dollar-sign', chegada_ate: '16:00' },
    { nome: 'Logística e Transporte', icone: 'truck', chegada_ate: '13:00' },
    { nome: 'Anjos', icone: 'shield', chegada_ate: '16:00' },
    { nome: 'Cozinha', icone: 'utensils', chegada_ate: '13:00' },
    { nome: 'Serviços Gerais', icone: 'wrench', chegada_ate: '13:00' },
    { nome: 'Stand-by', icone: 'users', chegada_ate: '16:00' },
    { nome: 'Torre de Guerra', icone: 'shield', chegada_ate: '16:00' },
    { nome: 'Cartas', icone: 'mail', chegada_ate: '16:00' },
    { nome: 'Ministração', icone: 'mic', chegada_ate: '18:00' },
    { nome: 'Apoio Capela', icone: 'hands-helping', chegada_ate: '18:00' },
    { nome: 'Som e Mídia', icone: 'speaker', chegada_ate: '16:00' },
    { nome: 'Aconselhamentos', icone: 'user-check', chegada_ate: '18:00' },
    { nome: 'Chofar', icone: 'volume-2', chegada_ate: '18:00' },
  ]

  const departamentos: Record<string, any> = {}
  for (const d of departamentosNomes) {
    departamentos[d.nome] = await prisma.departamento.create({
      data: {
        encontro_id: encontroAtual.id,
        nome: d.nome,
        icone: d.icone,
        chegada_ate: d.chegada_ate,
        lideres: opcoes(servos).id,
      },
    })
  }
  console.log('✓ Departamentos criados')

  // ============================================================
  // VEÍCULO (Ônibus)
  // ============================================================
  const onibus = await prisma.veiculo.create({
    data: {
      encontro_id: encontroAtual.id,
      tipo: 'onibus',
      nome: 'Ônibus principal',
      capacidade: 50,
      motorista_id: servos[0].id,
      horario_saida: new Date('2026-10-09T19:00:00-03:00'),
    },
  })

  // Atribuir ~40 encontristas ao ônibus
  const inscricoesOnibus = inscricoes.slice(0, 40)
  for (const insc of inscricoesOnibus) {
    await prisma.inscricao.update({
      where: { id: insc.id },
      data: { veiculo_id: onibus.id },
    })
  }
  console.log('✓ Transporte criado')

  // ============================================================
  // ALOCAÇÕES DE CAMA (encontristas + anjos)
  // ============================================================
  const anjosServos = servos.slice(0, 27)
  const todasCamas = [...camasQ1, ...camasQ2, ...camasQ3]
  let camaIdx = 0

  // Alocar encontristas em grupos (anjo + 2 encontristas em camas contíguas)
  for (let ai = 0; ai < anjosServos.length && camaIdx < todasCamas.length - 2; ai++) {
    const anjo = anjosServos[ai]
    const enc1 = encontristas[ai * 2]
    const enc2 = encontristas[ai * 2 + 1]

    if (!enc1 || !enc2) break

    const insc1 = inscricoes.find((i: any) => i.pessoa_id === enc1.id)
    const insc2 = inscricoes.find((i: any) => i.pessoa_id === enc2.id)

    if (!insc1 || !insc2) continue

    // Anjo na cama A (inferior), encontristas nas camas B e próxima A
    const camaAnjo = todasCamas[camaIdx]
    const camaEnc1 = todasCamas[camaIdx + 1]
    const camaEnc2 = todasCamas[camaIdx + 2]

    if (!camaAnjo || !camaEnc1 || !camaEnc2) break

    // Simular um anjo em quarto errado (demonstração de validação)
    const usarQuartoErrado = ai === 5 // sexto anjo fica em quarto diferente

    try {
      await prisma.alocacaoCama.create({
        data: { encontro_id: encontroAtual.id, cama_id: camaAnjo.id, pessoa_id: anjo.id, papel: 'anjo' },
      })
      if (!usarQuartoErrado) {
        await prisma.alocacaoCama.create({
          data: { encontro_id: encontroAtual.id, cama_id: camaEnc1.id, pessoa_id: enc1.id, papel: 'encontrista' },
        })
        await prisma.alocacaoCama.create({
          data: { encontro_id: encontroAtual.id, cama_id: camaEnc2.id, pessoa_id: enc2.id, papel: 'encontrista' },
        })
      } else {
        // Encontristas deste anjo em quarto diferente (alerta!)
        const camaOutroQuarto = camasQ3[0]
        if (camaOutroQuarto) {
          await prisma.alocacaoCama.create({
            data: { encontro_id: encontroAtual.id, cama_id: camaOutroQuarto.id, pessoa_id: enc1.id, papel: 'encontrista' },
          })
        }
        await prisma.alocacaoCama.create({
          data: { encontro_id: encontroAtual.id, cama_id: camaEnc2.id, pessoa_id: enc2.id, papel: 'encontrista' },
        })
      }

      // Vínculo anjo-encontrista
      await prisma.vinculoAnjo.create({
        data: {
          encontro_id: encontroAtual.id,
          anjo_pessoa_id: anjo.id,
          encontrista_pessoa_id: enc1.id,
          inscricao_id: insc1.id,
        },
      })
      await prisma.vinculoAnjo.create({
        data: {
          encontro_id: encontroAtual.id,
          anjo_pessoa_id: anjo.id,
          encontrista_pessoa_id: enc2.id,
          inscricao_id: insc2.id,
        },
      })
    } catch (e) {
      // Ignorar conflitos de cama
    }

    camaIdx += 3
  }
  console.log('✓ Camas e vínculos de anjo alocados')

  // ============================================================
  // CRONOGRAMA
  // ============================================================
  const sexta = new Date('2026-10-09')
  const sabado = new Date('2026-10-10')
  const domingo = new Date('2026-10-11')

  function dt(base: Date, horas: number, minutos = 0) {
    const d = new Date(base)
    d.setHours(horas, minutos, 0, 0)
    return d
  }

  const ministrador1 = pastores[0]
  const ministrador2 = pastores[1]
  const ministrador3 = pastores[2]
  const ministrador4 = pastores[3]

  const atividadesData = [
    // SEXTA
    { dia: 0, ordem: 1, titulo: 'Check-in na igreja', tipo: 'logistica', inicio_planejado: dt(sexta, 18, 0), duracao_planejada_min: 60, local: 'Get Church Floripa', status: 'concluida', inicio_real: dt(sexta, 18, 0), fim_real: dt(sexta, 19, 0) },
    { dia: 0, ordem: 2, titulo: 'Saída do ônibus', tipo: 'logistica', inicio_planejado: dt(sexta, 19, 0), duracao_planejada_min: 60, local: 'Get Church Floripa', ancora: true, status: 'concluida', inicio_real: dt(sexta, 19, 0), fim_real: dt(sexta, 20, 0) },
    { dia: 0, ordem: 3, titulo: 'Chegada e recepção', tipo: 'logistica', inicio_planejado: dt(sexta, 20, 0), duracao_planejada_min: 30, local: 'Pousada Águas Claras', status: 'concluida', inicio_real: dt(sexta, 20, 5), fim_real: dt(sexta, 20, 35) },
    { dia: 0, ordem: 4, titulo: 'Abertura', tipo: 'louvor', inicio_planejado: dt(sexta, 20, 30), duracao_planejada_min: 30, local: 'Capela', status: 'concluida', inicio_real: dt(sexta, 20, 35), fim_real: dt(sexta, 21, 0) },
    { dia: 0, ordem: 5, titulo: 'Ministração 1', tipo: 'ministracao', inicio_planejado: dt(sexta, 21, 0), duracao_planejada_min: 90, ministrador_id: ministrador1?.id, local: 'Capela', status: 'concluida', inicio_real: dt(sexta, 21, 0), fim_real: dt(sexta, 22, 35) },
    { dia: 0, ordem: 6, titulo: 'Lanche da noite', tipo: 'refeicao', inicio_planejado: dt(sexta, 22, 30), duracao_planejada_min: 30, avisa_cozinha: true, local: 'Refeitório', status: 'concluida', inicio_real: dt(sexta, 22, 35), fim_real: dt(sexta, 23, 5) },
    { dia: 0, ordem: 7, titulo: 'Descanso', tipo: 'descanso', inicio_planejado: dt(sexta, 23, 0), duracao_planejada_min: 450, duracao_minima_min: 360, local: 'Alojamentos', status: 'concluida', inicio_real: dt(sexta, 23, 5), fim_real: dt(sabado, 6, 30) },

    // SÁBADO
    { dia: 1, ordem: 1, titulo: 'Despertar (chofar)', tipo: 'logistica', inicio_planejado: dt(sabado, 6, 30), duracao_planejada_min: 5, toca_chofar: true, antecedencia_chofar_min: 10, local: 'Alojamentos', status: 'concluida', inicio_real: dt(sabado, 6, 30), fim_real: dt(sabado, 6, 35) },
    { dia: 1, ordem: 2, titulo: 'Café da manhã', tipo: 'refeicao', inicio_planejado: dt(sabado, 7, 0), duracao_planejada_min: 60, avisa_cozinha: true, local: 'Refeitório', status: 'concluida', inicio_real: dt(sabado, 7, 0), fim_real: dt(sabado, 8, 0) },
    { dia: 1, ordem: 3, titulo: 'Ministração 2', tipo: 'ministracao', inicio_planejado: dt(sabado, 8, 0), duracao_planejada_min: 120, ministrador_id: ministrador2?.id, local: 'Capela', status: 'concluida', inicio_real: dt(sabado, 8, 4), fim_real: dt(sabado, 10, 14) },
    { dia: 1, ordem: 4, titulo: 'Intervalo', tipo: 'descanso', inicio_planejado: dt(sabado, 10, 0), duracao_planejada_min: 30, duracao_minima_min: 15, local: 'Área externa', status: 'em_andamento', inicio_real: dt(sabado, 10, 14) },
    { dia: 1, ordem: 5, titulo: 'Ministração 3', tipo: 'ministracao', inicio_planejado: dt(sabado, 10, 30), duracao_planejada_min: 120, ministrador_id: ministrador3?.id, local: 'Capela', status: 'planejada' },
    { dia: 1, ordem: 6, titulo: 'Almoço', tipo: 'refeicao', inicio_planejado: dt(sabado, 12, 30), duracao_planejada_min: 90, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
    { dia: 1, ordem: 7, titulo: 'Descanso da tarde', tipo: 'descanso', inicio_planejado: dt(sabado, 14, 0), duracao_planejada_min: 60, duracao_minima_min: 30, local: 'Alojamentos', status: 'planejada' },
    { dia: 1, ordem: 8, titulo: 'Ministração 4', tipo: 'ministracao', inicio_planejado: dt(sabado, 15, 0), duracao_planejada_min: 120, ministrador_id: ministrador4?.id, local: 'Capela', status: 'planejada' },
    { dia: 1, ordem: 9, titulo: 'Lanche da tarde', tipo: 'refeicao', inicio_planejado: dt(sabado, 17, 0), duracao_planejada_min: 30, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
    { dia: 1, ordem: 10, titulo: 'Ministração 5', tipo: 'ministracao', inicio_planejado: dt(sabado, 17, 30), duracao_planejada_min: 120, ministrador_id: ministrador1?.id, local: 'Capela', status: 'planejada' },
    { dia: 1, ordem: 11, titulo: 'Jantar', tipo: 'refeicao', inicio_planejado: dt(sabado, 19, 30), duracao_planejada_min: 60, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
    { dia: 1, ordem: 12, titulo: 'Ministração 6', tipo: 'ministracao', inicio_planejado: dt(sabado, 20, 30), duracao_planejada_min: 150, ministrador_id: ministrador2?.id, local: 'Capela', status: 'planejada' },
    { dia: 1, ordem: 13, titulo: 'Descanso', tipo: 'descanso', inicio_planejado: dt(sabado, 23, 0), duracao_planejada_min: 450, duracao_minima_min: 360, local: 'Alojamentos', status: 'planejada' },

    // DOMINGO
    { dia: 2, ordem: 1, titulo: 'Despertar (chofar)', tipo: 'logistica', inicio_planejado: dt(domingo, 6, 30), duracao_planejada_min: 5, toca_chofar: true, antecedencia_chofar_min: 10, local: 'Alojamentos', status: 'planejada' },
    { dia: 2, ordem: 2, titulo: 'Café da manhã', tipo: 'refeicao', inicio_planejado: dt(domingo, 7, 0), duracao_planejada_min: 60, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
    { dia: 2, ordem: 3, titulo: 'Ministração 7', tipo: 'ministracao', inicio_planejado: dt(domingo, 8, 0), duracao_planejada_min: 120, ministrador_id: ministrador3?.id, local: 'Capela', status: 'planejada' },
    { dia: 2, ordem: 4, titulo: 'Intervalo', tipo: 'descanso', inicio_planejado: dt(domingo, 10, 0), duracao_planejada_min: 30, local: 'Área externa', status: 'planejada' },
    { dia: 2, ordem: 5, titulo: 'Ministração 8 — Encerramento', tipo: 'ministracao', inicio_planejado: dt(domingo, 10, 30), duracao_planejada_min: 120, ministrador_id: ministrador4?.id, local: 'Capela', status: 'planejada' },
    { dia: 2, ordem: 6, titulo: 'Almoço', tipo: 'refeicao', inicio_planejado: dt(domingo, 12, 30), duracao_planejada_min: 90, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
    { dia: 2, ordem: 7, titulo: 'Encerramento e despedida', tipo: 'logistica', inicio_planejado: dt(domingo, 14, 0), duracao_planejada_min: 30, local: 'Área externa', status: 'planejada' },
    { dia: 2, ordem: 8, titulo: 'Saída do ônibus', tipo: 'logistica', inicio_planejado: dt(domingo, 15, 0), duracao_planejada_min: 180, local: 'Pousada Águas Claras', ancora: true, status: 'planejada' },
    { dia: 2, ordem: 9, titulo: 'Culto de recepção na igreja', tipo: 'louvor', inicio_planejado: dt(domingo, 18, 0), duracao_planejada_min: 90, local: 'Get Church Floripa', ancora: true, status: 'planejada' },
  ]

  const atividadesCriadas: any[] = []
  for (const ativ of atividadesData) {
    const a = await prisma.atividade.create({ data: { encontro_id: encontroAtual.id, ...ativ } as any })
    atividadesCriadas.push(a)
  }
  console.log('✓ Cronograma criado')

  // Chamadas de equipe para ministrações com Apoio Capela
  for (const ativ of atividadesCriadas.filter((a: any) => a.tipo === 'ministracao')) {
    await prisma.chamadaEquipe.create({
      data: {
        atividade_id: ativ.id,
        nome: 'Apoio Capela',
        referencia: 'fim',
        deslocamento_min: -10,
        mensagem: 'Apoio Capela: posicione-se em 10 minutos.',
      },
    })
  }

  // ============================================================
  // TORRE DE ORAÇÃO
  // ============================================================
  const torreOracao = await prisma.torre.create({
    data: {
      encontro_id: encontroAtual.id,
      tipo: 'oracao_semana',
      inicio: new Date('2026-10-05T00:00:00-03:00'),
      fim: new Date('2026-10-09T19:00:00-03:00'),
      duracao_turno_min: 60,
      minimo_por_turno: 1,
    },
  })

  // Criar turnos horários (5 dias × 24 horas = 120 turnos)
  // Para a demo: criar apenas os de segunda a sexta com coverage parcial
  for (let dia = 0; dia < 5; dia++) {
    for (let hora = 0; hora < 24; hora++) {
      const inicio = new Date('2026-10-05T00:00:00-03:00')
      inicio.setDate(inicio.getDate() + dia)
      inicio.setHours(hora, 0, 0, 0)
      const fim = new Date(inicio)
      fim.setHours(hora + 1)

      const turno = await prisma.torreTurno.create({
        data: { torre_id: torreOracao.id, inicio, fim },
      })

      // Alocar servos em ~70% dos turnos (simular turnos descobertos)
      if (Math.random() > 0.3 && servos.length > 0) {
        const servo = servos[Math.floor(Math.random() * servos.length)]
        await prisma.torreAlocacao.create({
          data: {
            turno_id: turno.id,
            pessoa_id: servo.id,
            iniciou_em: Math.random() > 0.3 ? inicio : undefined,
            concluiu_em: Math.random() > 0.5 ? fim : undefined,
          },
        })
      }
    }
  }
  console.log('✓ Torre de Oração criada')

  // ============================================================
  // FICHAS DE ATENDIMENTO
  // ============================================================
  const statusAtendimento = ['nova', 'atribuida', 'em_atendimento', 'concluida']
  for (let i = 0; i < 6; i++) {
    const insc = inscricoes[i + 10]
    await prisma.fichaAconselhamento.create({
      data: {
        encontro_id: encontroAtual.id,
        inscricao_id: insc.id,
        imagens: JSON.stringify(['/demo/ficha-atendimento-placeholder.jpg']),
        enviada_por_id: pessoasAdmin['atendimento@getfloripa.com'].id,
        atribuida_a_id: Math.random() > 0.3 ? pessoasAdmin['atendimento@getfloripa.com'].id : null,
        status: opcoes(statusAtendimento),
        precisa_acompanhamento: Math.random() > 0.7,
        apagar_em: new Date('2026-10-18'),
      },
    })
  }
  console.log('✓ Fichas de atendimento criadas')

  // ============================================================
  // CARONAS
  // ============================================================
  for (let i = 0; i < 5; i++) {
    await prisma.caronaOferta.create({
      data: {
        encontro_id: encontroAtual.id,
        motorista_id: servos[i + 5].id,
        regiao_saida: opcoes(['Trindade', 'Centro', 'Kobrasol', 'Norte da ilha', 'Sul da ilha']),
        horario_saida: new Date(`2026-10-09T${16 + i}:00:00-03:00`),
        vagas: opcoes([1, 2, 3]),
        observacoes: 'Posso buscar no caminho',
      },
    })
  }

  for (let i = 0; i < 4; i++) {
    await prisma.caronaPedido.create({
      data: {
        encontro_id: encontroAtual.id,
        pessoa_id: servos[i + 25].id,
        regiao: opcoes(['Trindade', 'Agronômica', 'Kobrasol', 'São José']),
        disponivel_a_partir: new Date(`2026-10-09T1${5 + i}:00:00-03:00`),
        status: 'aberto',
      },
    })
  }
  console.log('✓ Caronas criadas')

  // ============================================================
  // TEMPLATES DE MENSAGEM
  // ============================================================
  const templates = [
    {
      chave: 'confirmacao_inscricao',
      canal: 'whatsapp',
      publico: 'encontrista',
      tipo_encontro: 'masculino',
      titulo: 'Confirmação de inscrição',
      corpo: 'Olá, {{nome}}! Sua inscrição no Encontro com Deus está confirmada. Será uma alegria ter você conosco de {{data_inicio}} a {{data_fim}}.\n\nEntre no grupo oficial dos encontristas para receber as orientações: {{link_grupo}}\n\nEm seguida, preencha sua ficha de inscrição. Leva poucos minutos: {{link_ficha}}\n\nEstamos orando por você.\nEquipe do Encontro com Deus\nGet Church Floripa',
    },
    {
      chave: 'lembrete_ficha',
      canal: 'whatsapp',
      publico: 'encontrista',
      tipo_encontro: 'ambos',
      titulo: 'Lembrete de ficha',
      corpo: 'Olá, {{nome}}! Ainda não recebemos a sua ficha de inscrição para o Encontro com Deus. Ela é importante para cuidarmos bem de você, principalmente os contatos de emergência. Faltam {{dias_restantes}} dias para o encontro. Você pode preencher agora: {{link_ficha}}',
    },
    {
      chave: 'convite_contato_emergencia',
      canal: 'whatsapp',
      publico: 'familia',
      tipo_encontro: 'masculino',
      titulo: 'Convite ao contato de emergência',
      corpo: 'Olá, {{nome_contato}}! Aqui é a equipe do Encontro com Deus da Get Church Floripa. {{nome_encontrista}} indicou você como contato de confiança e vai viver conosco um fim de semana muito especial, de {{data_inicio}} a {{data_fim}}.\n\nDurante o encontro, cada participante recebe cartas de pessoas queridas, e esse é um dos momentos mais marcantes do fim de semana. Pedimos duas coisas: que você escreva a sua carta e que nos indique outras pessoas importantes para ele que também possam escrever. Tudo é feito por este link: {{link_familia}}\n\nÉ uma surpresa. Por favor, não comente nada com ele até o fim do encontro.',
    },
    {
      chave: 'convite_indicado_carta',
      canal: 'whatsapp',
      publico: 'indicado',
      tipo_encontro: 'masculino',
      titulo: 'Convite para escrever carta',
      corpo: 'Olá, {{nome_indicado}}! {{nome_contato}} indicou você para escrever uma carta para {{nome_encontrista}}, que vai participar do Encontro com Deus da Get Church Floripa. Sua carta será entregue a ele em um momento muito especial do encontro.\n\nVocê pode escrever pelo link abaixo ou enviar uma foto da carta escrita à mão até {{prazo_cartas}}: {{link_carta}}\n\nÉ uma surpresa, então pedimos que não comente com ele. Obrigado por fazer parte disso.',
    },
    {
      chave: 'lembrete_carta',
      canal: 'whatsapp',
      publico: 'indicado',
      tipo_encontro: 'masculino',
      titulo: 'Lembrete de carta',
      corpo: 'Olá, {{nome_indicado}}! As cartas para {{nome_encontrista}} podem ser enviadas até {{prazo_cartas}}. Se ainda não escreveu, este é o seu link: {{link_carta}}',
    },
    {
      chave: 'agradecimento_carta',
      canal: 'whatsapp',
      publico: 'indicado',
      tipo_encontro: 'masculino',
      titulo: 'Agradecimento pela carta',
      corpo: 'Recebemos a sua carta para {{nome_encontrista}}. Muito obrigado! Ela será entregue a ele durante o encontro.',
    },
    {
      chave: 'vespera_encontrista',
      canal: 'whatsapp',
      publico: 'encontrista',
      tipo_encontro: 'masculino',
      titulo: 'Véspera do encontro',
      corpo: 'Olá, {{nome}}! Amanhã começa o seu Encontro com Deus. A saída será às {{horario_saida}}, da Get Church Floripa ({{endereco_saida}}). Chegue com antecedência para o check-in.\n\nO que levar: {{lista_o_que_levar}}\n\nAté amanhã!',
    },
  ]

  for (const t of templates) {
    await prisma.templatesMensagem.create({ data: t })
  }
  console.log('✓ Templates criados')

  // ============================================================
  // EDIÇÕES ANTERIORES (histórico de pontualidade)
  // ============================================================
  // Criar atividades nas edições anteriores para o relatório de pontualidade
  for (const enc of [encontroAnterior1, encontroAnterior2]) {
    const baseDt = enc.data_inicio
    const ministradores = pastores.slice(0, 4)
    for (let m = 0; m < 8; m++) {
      const inicioPlan = new Date(baseDt)
      inicioPlan.setHours(8 + m * 2, 0, 0, 0)
      const atraso = Math.floor(Math.random() * 20) - 5 // -5 a +15 min
      const inicioReal = new Date(inicioPlan)
      inicioReal.setMinutes(inicioReal.getMinutes() + Math.max(0, atraso))
      const fimReal = new Date(inicioReal)
      fimReal.setMinutes(fimReal.getMinutes() + 120 + Math.floor(Math.random() * 20))

      await prisma.atividade.create({
        data: {
          encontro_id: enc.id,
          dia: Math.floor(m / 4),
          ordem: (m % 4) + 1,
          titulo: `Ministração ${m + 1}`,
          tipo: 'ministracao',
          inicio_planejado: inicioPlan,
          duracao_planejada_min: 120,
          ministrador_id: ministradores[m % 4]?.id,
          status: 'concluida',
          inicio_real: inicioReal,
          fim_real: fimReal,
        },
      })
    }
  }
  console.log('✓ Histórico de pontualidade criado')

  console.log('\n🎉 Seed completo! Sistema pronto para demonstração.')
  console.log('\n📋 Usuários de teste (senha: 123456):')
  for (const u of usuariosAdmin) {
    console.log(`  ${u.email} — ${u.perfis}${u.permissoes ? ` (${u.permissoes})` : ''}`)
  }
  console.log(`\n📊 Dados criados:`)
  console.log(`  • ${encontristas.length} encontristas`)
  console.log(`  • ${servos.length} servos`)
  console.log(`  • ${pastores.length} pastores/ministradores`)
  console.log(`  • ${inscricoes.length} inscrições`)
  console.log(`  • 3 encontros (1 em andamento + 2 encerrados)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
