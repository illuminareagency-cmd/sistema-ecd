"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var PrismaClient = require('@prisma/client').PrismaClient;
var prisma = new PrismaClient();
// ============================================================
// DADOS FICTÍCIOS
// ============================================================
var NOMES_ENCONTRISTAS = [
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
];
var NOMES_SERVOS_MASCULINOS = [
    'Marcos Teixeira', 'Anderson Lima', 'Ricardo Souza', 'Cristiano Alves', 'Renato Barbosa',
    'Júnior Moura', 'Evandro Carvalho', 'Wander Figueiredo', 'Sérgio Prado', 'Luiz Carlos Queiroz',
    'Rogério Sena', 'Alberto Torres', 'Benedito Ulhoa', 'Carlos Eduardo Vilas',
];
var NOMES_SERVOS_FEMININOS = [
    'Ana Paula Ferreira', 'Camila Rodrigues', 'Daniela Costa', 'Elaine Martins', 'Fernanda Santos',
    'Gisele Lima', 'Helena Oliveira', 'Isabel Pereira', 'Juliana Almeida', 'Karla Barbosa',
    'Letícia Moreira', 'Mariana Souza', 'Natália Carvalho', 'Patrícia Gomes', 'Roberta Silva',
    'Sandra Mendes', 'Tatiana Freitas', 'Vera Correia', 'Wilma Dias',
];
var NOMES_PASTORES = [
    'Pr. Antônio Borges', 'Pr. Cláudio Menezes', 'Pr. Daniel Faria', 'Pr. Eduardo Lacerda',
    'Pr. Francisco Araújo', 'Pr. Geraldo Nascimento', 'Pr. Humberto Pinto', 'Pr. Ismael Rocha',
];
// Clãs fictícios
var CLAS = ['Clã Leão', 'Clã Cordeiro', 'Clã Águia', 'Clã Pomba', 'Clã Oliveira', 'Clã Cedro'];
// Líderes de clã fictícios
var LIDERES_CLA = ['Ana Santos', 'Bruno Mendes', 'Carla Rodrigues', 'Daniel Costa', 'Elisa Ferreira', 'Fernando Lima'];
function telefone() {
    var ddd = ['48', '47', '49', '51', '11'][Math.floor(Math.random() * 5)];
    var n = String(Math.floor(Math.random() * 90000000) + 10000000);
    return "+55".concat(ddd, "9").concat(n.substring(0, 4)).concat(n.substring(4, 8));
}
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function opcoes(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function dt(base, horas, minutos) {
            if (minutos === void 0) { minutos = 0; }
            var d = new Date(base);
            d.setHours(horas, minutos, 0, 0);
            return d;
        }
        var local, quarto1, quarto2, quarto3, quartoSuperior, casaAuxiliar, camaCounter, camasQ1, i, numInf, numSup, cInf, cSup, camasQ2, i, numInf, numSup, cInf, cSup, camasQ3, i, numInf, numSup, cInf, cSup, hoje, encontroAtual, encontroAnterior1, encontroAnterior2, usuariosAdmin, pessoasAdmin, _i, usuariosAdmin_1, u, p, pastores, _a, NOMES_PASTORES_1, nome, existente, p, servos, _b, NOMES_SERVOS_MASCULINOS_1, nome, p, _c, NOMES_SERVOS_FEMININOS_1, nome, p, encontristas, codigo, _d, NOMES_ENCONTRISTAS_1, nome, p, inscricoes, fichaStatuses, _e, encontristas_1, pessoa, checkinDone, fichaStatus, insc, formas, _f, inscricoes_1, insc, inscricoesComFicha, _loop_1, _g, inscricoesComFicha_1, insc, _h, _j, insc, statusCartas, origens, relacoes, textosCartas, i, insc, numCartas, j, indicacao, todoServos, depts, modosViagem, i, servo, ehAnjo, _loop_2, _k, pastores_1, pastor, departamentosNomes, departamentos, _l, departamentosNomes_1, d, _m, _o, onibus, inscricoesOnibus, _p, inscricoesOnibus_1, insc, anjosServos, todasCamas, camaIdx, _loop_3, ai, state_1, sexta, sabado, domingo, ministrador1, ministrador2, ministrador3, ministrador4, atividadesData, atividadesCriadas, _q, atividadesData_1, ativ, a, _r, _s, ativ, torreOracao, dia, hora, inicio, fim, turno, servo, statusAtendimento, i, insc, i, i, templates, _t, templates_1, t, _u, _v, enc, baseDt, ministradores, m, inicioPlan, atraso, inicioReal, fimReal, _w, usuariosAdmin_2, u;
        var _x, _y, _z;
        return __generator(this, function (_0) {
            switch (_0.label) {
                case 0:
                    console.log('🌱 Iniciando seed completo do Central ECD...\n');
                    // Limpar banco (ordem reversa de dependências)
                    return [4 /*yield*/, prisma.auditoria.deleteMany()];
                case 1:
                    // Limpar banco (ordem reversa de dependências)
                    _0.sent();
                    return [4 /*yield*/, prisma.notificacao.deleteMany()];
                case 2:
                    _0.sent();
                    return [4 /*yield*/, prisma.mensagem.deleteMany()];
                case 3:
                    _0.sent();
                    return [4 /*yield*/, prisma.fichaAtendimento.deleteMany()];
                case 4:
                    _0.sent();
                    return [4 /*yield*/, prisma.selecaoApoioAltar.deleteMany()];
                case 5:
                    _0.sent();
                    return [4 /*yield*/, prisma.chamadaEquipe.deleteMany()];
                case 6:
                    _0.sent();
                    return [4 /*yield*/, prisma.atividade.deleteMany()];
                case 7:
                    _0.sent();
                    return [4 /*yield*/, prisma.torreAlocacao.deleteMany()];
                case 8:
                    _0.sent();
                    return [4 /*yield*/, prisma.torreTurno.deleteMany()];
                case 9:
                    _0.sent();
                    return [4 /*yield*/, prisma.torre.deleteMany()];
                case 10:
                    _0.sent();
                    return [4 /*yield*/, prisma.alocacaoTurno.deleteMany()];
                case 11:
                    _0.sent();
                    return [4 /*yield*/, prisma.turno.deleteMany()];
                case 12:
                    _0.sent();
                    return [4 /*yield*/, prisma.departamento.deleteMany()];
                case 13:
                    _0.sent();
                    return [4 /*yield*/, prisma.caronaCombinada.deleteMany()];
                case 14:
                    _0.sent();
                    return [4 /*yield*/, prisma.caronaPedido.deleteMany()];
                case 15:
                    _0.sent();
                    return [4 /*yield*/, prisma.caronaOferta.deleteMany()];
                case 16:
                    _0.sent();
                    return [4 /*yield*/, prisma.embarque.deleteMany()];
                case 17:
                    _0.sent();
                    return [4 /*yield*/, prisma.veiculo.deleteMany()];
                case 18:
                    _0.sent();
                    return [4 /*yield*/, prisma.vinculoAnjo.deleteMany()];
                case 19:
                    _0.sent();
                    return [4 /*yield*/, prisma.alocacaoCama.deleteMany()];
                case 20:
                    _0.sent();
                    return [4 /*yield*/, prisma.carta.deleteMany()];
                case 21:
                    _0.sent();
                    return [4 /*yield*/, prisma.indicacaoCarta.deleteMany()];
                case 22:
                    _0.sent();
                    return [4 /*yield*/, prisma.contatoEmergencia.deleteMany()];
                case 23:
                    _0.sent();
                    return [4 /*yield*/, prisma.fichaResposta.deleteMany()];
                case 24:
                    _0.sent();
                    return [4 /*yield*/, prisma.pagamento.deleteMany()];
                case 25:
                    _0.sent();
                    return [4 /*yield*/, prisma.inscricao.deleteMany()];
                case 26:
                    _0.sent();
                    return [4 /*yield*/, prisma.formularioCampo.deleteMany()];
                case 27:
                    _0.sent();
                    return [4 /*yield*/, prisma.participacaoServo.deleteMany()];
                case 28:
                    _0.sent();
                    return [4 /*yield*/, prisma.compromissoJejum.deleteMany()];
                case 29:
                    _0.sent();
                    return [4 /*yield*/, prisma.session.deleteMany()];
                case 30:
                    _0.sent();
                    return [4 /*yield*/, prisma.usuario.deleteMany()];
                case 31:
                    _0.sent();
                    return [4 /*yield*/, prisma.pessoa.deleteMany()];
                case 32:
                    _0.sent();
                    return [4 /*yield*/, prisma.cama.deleteMany()];
                case 33:
                    _0.sent();
                    return [4 /*yield*/, prisma.quarto.deleteMany()];
                case 34:
                    _0.sent();
                    return [4 /*yield*/, prisma.local.deleteMany()];
                case 35:
                    _0.sent();
                    return [4 /*yield*/, prisma.encontro.deleteMany()];
                case 36:
                    _0.sent();
                    return [4 /*yield*/, prisma.templatesMensagem.deleteMany()];
                case 37:
                    _0.sent();
                    console.log('✓ Banco limpo');
                    return [4 /*yield*/, prisma.local.create({
                            data: {
                                nome: 'Pousada Águas Claras',
                                endereco: 'Rodovia SC-401, km 23, Canasvieiras, Florianópolis - SC',
                            },
                        })
                        // Criar quartos com camas (conforme spec e solicitação: numeração contínua sem palavra beliche)
                    ];
                case 38:
                    local = _0.sent();
                    return [4 /*yield*/, prisma.quarto.create({
                            data: {
                                local_id: local.id,
                                nome: 'Quarto 01',
                                tipo: 'dormitorio',
                                numerado: true,
                                uso_padrao: 'encontristas',
                            },
                        })];
                case 39:
                    quarto1 = _0.sent();
                    return [4 /*yield*/, prisma.quarto.create({
                            data: {
                                local_id: local.id,
                                nome: 'Quarto 02',
                                tipo: 'dormitorio',
                                numerado: true,
                                uso_padrao: 'encontristas',
                            },
                        })];
                case 40:
                    quarto2 = _0.sent();
                    return [4 /*yield*/, prisma.quarto.create({
                            data: {
                                local_id: local.id,
                                nome: 'Quarto 03',
                                tipo: 'dormitorio',
                                numerado: true,
                                uso_padrao: 'encontristas',
                            },
                        })];
                case 41:
                    quarto3 = _0.sent();
                    return [4 /*yield*/, prisma.quarto.create({
                            data: {
                                local_id: local.id,
                                nome: 'Quartos Superiores (Servos)',
                                tipo: 'quartos_superiores',
                                numerado: false,
                                capacidade_livre: 20,
                                uso_padrao: 'servos',
                            },
                        })];
                case 42:
                    quartoSuperior = _0.sent();
                    return [4 /*yield*/, prisma.quarto.create({
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
                    ];
                case 43:
                    casaAuxiliar = _0.sent();
                    camaCounter = 1;
                    camasQ1 = [];
                    i = 1;
                    _0.label = 44;
                case 44:
                    if (!(i <= 22)) return [3 /*break*/, 48];
                    numInf = camaCounter++;
                    numSup = camaCounter++;
                    return [4 /*yield*/, prisma.cama.create({
                            data: {
                                quarto_id: quarto1.id,
                                codigo: "Cama ".concat(String(numInf).padStart(2, '0')),
                                indice_par: i,
                                posicao: 'inferior',
                                ativa: true,
                            },
                        })];
                case 45:
                    cInf = _0.sent();
                    return [4 /*yield*/, prisma.cama.create({
                            data: {
                                quarto_id: quarto1.id,
                                codigo: "Cama ".concat(String(numSup).padStart(2, '0')),
                                indice_par: i,
                                posicao: 'superior',
                                ativa: true,
                            },
                        })];
                case 46:
                    cSup = _0.sent();
                    camasQ1.push(cInf, cSup);
                    _0.label = 47;
                case 47:
                    i++;
                    return [3 /*break*/, 44];
                case 48:
                    camasQ2 = [];
                    i = 1;
                    _0.label = 49;
                case 49:
                    if (!(i <= 13)) return [3 /*break*/, 53];
                    numInf = camaCounter++;
                    numSup = camaCounter++;
                    return [4 /*yield*/, prisma.cama.create({
                            data: {
                                quarto_id: quarto2.id,
                                codigo: "Cama ".concat(String(numInf).padStart(2, '0')),
                                indice_par: i,
                                posicao: 'inferior',
                                ativa: true,
                            },
                        })];
                case 50:
                    cInf = _0.sent();
                    return [4 /*yield*/, prisma.cama.create({
                            data: {
                                quarto_id: quarto2.id,
                                codigo: "Cama ".concat(String(numSup).padStart(2, '0')),
                                indice_par: i,
                                posicao: 'superior',
                                ativa: true,
                            },
                        })];
                case 51:
                    cSup = _0.sent();
                    camasQ2.push(cInf, cSup);
                    _0.label = 52;
                case 52:
                    i++;
                    return [3 /*break*/, 49];
                case 53:
                    camasQ3 = [];
                    i = 1;
                    _0.label = 54;
                case 54:
                    if (!(i <= 9)) return [3 /*break*/, 58];
                    numInf = camaCounter++;
                    numSup = camaCounter++;
                    return [4 /*yield*/, prisma.cama.create({
                            data: {
                                quarto_id: quarto3.id,
                                codigo: "Cama ".concat(String(numInf).padStart(2, '0')),
                                indice_par: i,
                                posicao: 'inferior',
                                ativa: true,
                            },
                        })];
                case 55:
                    cInf = _0.sent();
                    return [4 /*yield*/, prisma.cama.create({
                            data: {
                                quarto_id: quarto3.id,
                                codigo: "Cama ".concat(String(numSup).padStart(2, '0')),
                                indice_par: i,
                                posicao: 'superior',
                                ativa: true,
                            },
                        })];
                case 56:
                    cSup = _0.sent();
                    camasQ3.push(cInf, cSup);
                    _0.label = 57;
                case 57:
                    i++;
                    return [3 /*break*/, 54];
                case 58:
                    console.log('✓ Local e quartos criados');
                    hoje = new Date('2026-10-09') // Sábado do encontro para demonstração
                    ;
                    return [4 /*yield*/, prisma.encontro.create({
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
                    ];
                case 59:
                    encontroAtual = _0.sent();
                    return [4 /*yield*/, prisma.encontro.create({
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
                    ];
                case 60:
                    encontroAnterior1 = _0.sent();
                    return [4 /*yield*/, prisma.encontro.create({
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
                        })];
                case 61:
                    encontroAnterior2 = _0.sent();
                    console.log('✓ Encontros criados');
                    usuariosAdmin = [
                        { nome: 'Pastor Antônio Borges', email: 'admin@getfloripa.com', perfis: 'admin', permissoes: 'financeiro,saude,atendimento,cronograma', eh_pastor: true, sexo: 'masculino' },
                        { nome: 'Irmã Fernanda Gestão', email: 'financeiro@getfloripa.com', perfis: 'admin', permissoes: 'financeiro', eh_pastor: false, sexo: 'feminino' },
                        { nome: 'Irmã Camila Cartas', email: 'cartas@getfloripa.com', perfis: 'lider_departamento', permissoes: '', eh_pastor: false, sexo: 'feminino' },
                        { nome: 'Irmã Sandra Cozinha', email: 'cozinha@getfloripa.com', perfis: 'lider_departamento', permissoes: '', eh_pastor: false, sexo: 'feminino' },
                        { nome: 'Marcos Anjo Servo', email: 'servo1@getfloripa.com', perfis: 'servo', permissoes: '', eh_pastor: false, sexo: 'masculino' },
                        { nome: 'Irmão Jonas Checkin', email: 'checkin@getfloripa.com', perfis: 'servo', permissoes: '', eh_pastor: false, sexo: 'masculino' },
                        { nome: 'Pr. Daniel Atendimento', email: 'atendimento@getfloripa.com', perfis: 'lider_departamento', permissoes: 'atendimento', eh_pastor: true, sexo: 'masculino' },
                        { nome: 'Dr. Henrique Saúde', email: 'saude@getfloripa.com', perfis: 'servo', permissoes: 'saude', eh_pastor: false, sexo: 'masculino' },
                    ];
                    pessoasAdmin = {};
                    _i = 0, usuariosAdmin_1 = usuariosAdmin;
                    _0.label = 62;
                case 62:
                    if (!(_i < usuariosAdmin_1.length)) return [3 /*break*/, 66];
                    u = usuariosAdmin_1[_i];
                    return [4 /*yield*/, prisma.pessoa.create({
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
                        })];
                case 63:
                    p = _0.sent();
                    return [4 /*yield*/, prisma.usuario.create({
                            data: {
                                pessoa_id: p.id,
                                email: u.email,
                                senha_hash: '123456',
                                perfis: u.perfis,
                                permissoes: u.permissoes,
                            },
                        })];
                case 64:
                    _0.sent();
                    pessoasAdmin[u.email] = p;
                    _0.label = 65;
                case 65:
                    _i++;
                    return [3 /*break*/, 62];
                case 66:
                    console.log('✓ Usuários admin criados');
                    pastores = [];
                    _a = 0, NOMES_PASTORES_1 = NOMES_PASTORES;
                    _0.label = 67;
                case 67:
                    if (!(_a < NOMES_PASTORES_1.length)) return [3 /*break*/, 70];
                    nome = NOMES_PASTORES_1[_a];
                    existente = Object.values(pessoasAdmin).find(function (p) { return p.nome_completo.includes('Antônio'); });
                    if (nome === 'Pr. Antônio Borges' && existente) {
                        pastores.push(existente);
                        return [3 /*break*/, 69];
                    }
                    if (nome === 'Pr. Daniel Faria') {
                        pastores.push(pessoasAdmin['atendimento@getfloripa.com']);
                        return [3 /*break*/, 69];
                    }
                    return [4 /*yield*/, prisma.pessoa.create({
                            data: {
                                nome_completo: nome,
                                nome_preferido: nome.split(' ')[1],
                                sexo: 'masculino',
                                telefone: telefone(),
                                eh_pastor: true,
                                cla: opcoes(CLAS),
                                lider_cla: opcoes(LIDERES_CLA),
                            },
                        })];
                case 68:
                    p = _0.sent();
                    pastores.push(p);
                    _0.label = 69;
                case 69:
                    _a++;
                    return [3 /*break*/, 67];
                case 70:
                    console.log('✓ Pastores criados');
                    servos = [];
                    _b = 0, NOMES_SERVOS_MASCULINOS_1 = NOMES_SERVOS_MASCULINOS;
                    _0.label = 71;
                case 71:
                    if (!(_b < NOMES_SERVOS_MASCULINOS_1.length)) return [3 /*break*/, 74];
                    nome = NOMES_SERVOS_MASCULINOS_1[_b];
                    return [4 /*yield*/, prisma.pessoa.create({
                            data: {
                                nome_completo: nome,
                                nome_preferido: nome.split(' ')[0],
                                sexo: 'masculino',
                                telefone: telefone(),
                                cla: opcoes(CLAS),
                                lider_cla: opcoes(LIDERES_CLA),
                            },
                        })];
                case 72:
                    p = _0.sent();
                    servos.push(p);
                    _0.label = 73;
                case 73:
                    _b++;
                    return [3 /*break*/, 71];
                case 74:
                    _c = 0, NOMES_SERVOS_FEMININOS_1 = NOMES_SERVOS_FEMININOS;
                    _0.label = 75;
                case 75:
                    if (!(_c < NOMES_SERVOS_FEMININOS_1.length)) return [3 /*break*/, 78];
                    nome = NOMES_SERVOS_FEMININOS_1[_c];
                    return [4 /*yield*/, prisma.pessoa.create({
                            data: {
                                nome_completo: nome,
                                nome_preferido: nome.split(' ')[0],
                                sexo: 'feminino',
                                telefone: telefone(),
                                cla: opcoes(CLAS),
                                lider_cla: opcoes(LIDERES_CLA),
                            },
                        })];
                case 76:
                    p = _0.sent();
                    servos.push(p);
                    _0.label = 77;
                case 77:
                    _c++;
                    return [3 /*break*/, 75];
                case 78:
                    // Adicionar usuário admin como servo também
                    servos.push(pessoasAdmin['servo1@getfloripa.com']);
                    servos.push(pessoasAdmin['checkin@getfloripa.com']);
                    console.log("\u2713 ".concat(servos.length, " servos criados"));
                    encontristas = [];
                    codigo = 1;
                    _d = 0, NOMES_ENCONTRISTAS_1 = NOMES_ENCONTRISTAS;
                    _0.label = 79;
                case 79:
                    if (!(_d < NOMES_ENCONTRISTAS_1.length)) return [3 /*break*/, 82];
                    nome = NOMES_ENCONTRISTAS_1[_d];
                    return [4 /*yield*/, prisma.pessoa.create({
                            data: {
                                nome_completo: nome,
                                nome_preferido: nome.split(' ')[0],
                                sexo: 'masculino',
                                telefone: telefone(),
                                email: "".concat(nome.split(' ')[0].toLowerCase(), ".").concat(nome.split(' ')[1].toLowerCase(), "@email.com"),
                                cidade: opcoes(['Florianópolis', 'São José', 'Palhoça', 'Biguaçu', 'Joinville']),
                                bairro: opcoes(['Trindade', 'Itacorubi', 'Agronômica', 'Centro', 'Kobrasol', 'Campinas']),
                                cla: opcoes(CLAS),
                                lider_cla: opcoes(LIDERES_CLA),
                                quem_convidou: opcoes(__spreadArray(__spreadArray([], NOMES_SERVOS_MASCULINOS, true), NOMES_PASTORES, true)).split(' ')[0],
                            },
                        })];
                case 80:
                    p = _0.sent();
                    encontristas.push(p);
                    _0.label = 81;
                case 81:
                    _d++;
                    return [3 /*break*/, 79];
                case 82:
                    console.log("\u2713 ".concat(encontristas.length, " encontristas criados"));
                    inscricoes = [];
                    codigo = 1;
                    fichaStatuses = ['concluida', 'concluida', 'concluida', 'pendente', 'enviada'] // 60% concluída, 20% pendente, 20% enviada
                    ;
                    _e = 0, encontristas_1 = encontristas;
                    _0.label = 83;
                case 83:
                    if (!(_e < encontristas_1.length)) return [3 /*break*/, 86];
                    pessoa = encontristas_1[_e];
                    checkinDone = Math.random() > 0.35 // ~65% fizeram check-in
                    ;
                    fichaStatus = opcoes(fichaStatuses);
                    return [4 /*yield*/, prisma.inscricao.create({
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
                        })];
                case 84:
                    insc = _0.sent();
                    inscricoes.push(insc);
                    codigo++;
                    _0.label = 85;
                case 85:
                    _e++;
                    return [3 /*break*/, 83];
                case 86:
                    console.log("\u2713 ".concat(inscricoes.length, " inscri\u00E7\u00F5es criadas"));
                    formas = ['pix', 'pix', 'pix', 'cartao', 'dinheiro', 'pix'];
                    _f = 0, inscricoes_1 = inscricoes;
                    _0.label = 87;
                case 87:
                    if (!(_f < inscricoes_1.length)) return [3 /*break*/, 90];
                    insc = inscricoes_1[_f];
                    return [4 /*yield*/, prisma.pagamento.create({
                            data: {
                                inscricao_id: insc.id,
                                valor: 150.0,
                                forma: opcoes(formas),
                                data: randomDate(new Date('2026-09-01'), new Date('2026-10-08')),
                                registrado_por_id: pessoasAdmin['financeiro@getfloripa.com'].id,
                            },
                        })];
                case 88:
                    _0.sent();
                    _0.label = 89;
                case 89:
                    _f++;
                    return [3 /*break*/, 87];
                case 90:
                    console.log('✓ Pagamentos criados');
                    inscricoesComFicha = inscricoes.filter(function (i) { return i.ficha_status === 'concluida'; });
                    _loop_1 = function (insc) {
                        return __generator(this, function (_1) {
                            switch (_1.label) {
                                case 0: return [4 /*yield*/, prisma.fichaResposta.create({
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
                                ];
                                case 1:
                                    _1.sent();
                                    // Contato de emergência
                                    return [4 /*yield*/, prisma.contatoEmergencia.create({
                                            data: {
                                                inscricao_id: insc.id,
                                                nome: "Familiar de ".concat(((_y = (_x = encontristas.find(function (e) { var _a; return ((_a = inscricoes.find(function (i) { return i.id === insc.id && i.pessoa_id === e.id; })) === null || _a === void 0 ? void 0 : _a.id) === insc.id; })) === null || _x === void 0 ? void 0 : _x.nome_completo) === null || _y === void 0 ? void 0 : _y.split(' ')[0]) || 'Encontrista'),
                                                parentesco: opcoes(['pai', 'mãe', 'esposa', 'irmão', 'irmã']),
                                                telefone: telefone(),
                                                email: "familiar".concat(Math.floor(Math.random() * 1000), "@email.com"),
                                            },
                                        })];
                                case 2:
                                    // Contato de emergência
                                    _1.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _g = 0, inscricoesComFicha_1 = inscricoesComFicha;
                    _0.label = 91;
                case 91:
                    if (!(_g < inscricoesComFicha_1.length)) return [3 /*break*/, 94];
                    insc = inscricoesComFicha_1[_g];
                    return [5 /*yield**/, _loop_1(insc)];
                case 92:
                    _0.sent();
                    _0.label = 93;
                case 93:
                    _g++;
                    return [3 /*break*/, 91];
                case 94:
                    _h = 0, _j = inscricoes.filter(function (i) { return i.ficha_status !== 'concluida'; });
                    _0.label = 95;
                case 95:
                    if (!(_h < _j.length)) return [3 /*break*/, 98];
                    insc = _j[_h];
                    if (!(Math.random() > 0.5)) return [3 /*break*/, 97];
                    return [4 /*yield*/, prisma.contatoEmergencia.create({
                            data: {
                                inscricao_id: insc.id,
                                nome: "Familiar",
                                parentesco: opcoes(['pai', 'mãe', 'esposa']),
                                telefone: telefone(),
                            },
                        })];
                case 96:
                    _0.sent();
                    _0.label = 97;
                case 97:
                    _h++;
                    return [3 /*break*/, 95];
                case 98:
                    console.log('✓ Fichas e contatos criados');
                    statusCartas = ['aprovada', 'aprovada', 'aprovada', 'recebida', 'sinalizada'];
                    origens = ['texto_digital', 'texto_digital', 'foto_manuscrita', 'carta_fisica'];
                    relacoes = ['pai', 'mãe', 'esposa', 'irmão', 'irmã', 'amigo', 'amiga', 'líder', 'colega'];
                    textosCartas = [
                        'Que Deus te abençoe neste fim de semana especial. Você é muito importante para mim e estou orando por você!',
                        'Este momento é um presente de Deus para você. Que você possa encontrar a paz que excede todo entendimento. Te amo muito!',
                        'Você merece cada bênção que Deus tem preparado. Estou torcendo por você e orando todos os dias.',
                        'Que este encontro transforme sua vida. Deus tem muito para te falar. Eu acredito em você!',
                        'Com amor e gratidão, desejo que este fim de semana seja marcante. Você é especial para nós.',
                        'Que Deus te alcance de um jeito profundo e real. Ele tem um propósito lindo para sua vida!',
                        'Cada vez que penso em você, oro. Aproveite cada momento deste encontro. Você não vai se arrepender.',
                        'Este é o seu momento com Deus. Deixa Ele te falar. Eu estarei orando por você do começo ao fim.',
                    ];
                    i = 0;
                    _0.label = 99;
                case 99:
                    if (!(i < inscricoes.length)) return [3 /*break*/, 107];
                    insc = inscricoes[i];
                    numCartas = Math.random() > 0.15 ? (Math.random() > 0.15 ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 2) + 1) : 0;
                    j = 0;
                    _0.label = 100;
                case 100:
                    if (!(j < numCartas)) return [3 /*break*/, 104];
                    return [4 /*yield*/, prisma.indicacaoCarta.create({
                            data: {
                                inscricao_id: insc.id,
                                nome: "Remetente ".concat(j + 1),
                                relacao: opcoes(relacoes),
                                telefone: telefone(),
                                status: 'carta_recebida',
                            },
                        })];
                case 101:
                    indicacao = _0.sent();
                    return [4 /*yield*/, prisma.carta.create({
                            data: {
                                inscricao_id: insc.id,
                                indicacao_id: indicacao.id,
                                remetente_nome: "Remetente ".concat(j + 1),
                                relacao: indicacao.relacao,
                                origem: opcoes(origens),
                                conteudo: opcoes(textosCartas),
                                status: opcoes(statusCartas),
                                revisada_por: pessoasAdmin['cartas@getfloripa.com'].nome_completo,
                            },
                        })];
                case 102:
                    _0.sent();
                    _0.label = 103;
                case 103:
                    j++;
                    return [3 /*break*/, 100];
                case 104:
                    if (!(numCartas === 0)) return [3 /*break*/, 106];
                    return [4 /*yield*/, prisma.indicacaoCarta.create({
                            data: {
                                inscricao_id: insc.id,
                                nome: 'Familiar Pendente',
                                relacao: 'familiar',
                                telefone: telefone(),
                                status: 'convite_enviado',
                            },
                        })];
                case 105:
                    _0.sent();
                    _0.label = 106;
                case 106:
                    i++;
                    return [3 /*break*/, 99];
                case 107:
                    console.log('✓ Cartas criadas');
                    todoServos = __spreadArray(__spreadArray([], servos, true), pastores, true);
                    depts = {
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
                    };
                    modosViagem = ['onibus', 'onibus', 'onibus', 'carro_proprio', 'carro_proprio', 'precisa_carona'];
                    i = 0;
                    _0.label = 108;
                case 108:
                    if (!(i < servos.length)) return [3 /*break*/, 111];
                    servo = servos[i];
                    ehAnjo = i < 27 // primeiros 27 são anjos
                    ;
                    return [4 /*yield*/, prisma.participacaoServo.create({
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
                        })];
                case 109:
                    _0.sent();
                    _0.label = 110;
                case 110:
                    i++;
                    return [3 /*break*/, 108];
                case 111:
                    _loop_2 = function (pastor) {
                        return __generator(this, function (_2) {
                            switch (_2.label) {
                                case 0:
                                    if (!todoServos.find(function (s) { return s.id === pastor.id; }))
                                        return [2 /*return*/, "continue"];
                                    return [4 /*yield*/, prisma.participacaoServo.upsert({
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
                                        })];
                                case 1:
                                    _2.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _k = 0, pastores_1 = pastores;
                    _0.label = 112;
                case 112:
                    if (!(_k < pastores_1.length)) return [3 /*break*/, 115];
                    pastor = pastores_1[_k];
                    return [5 /*yield**/, _loop_2(pastor)];
                case 113:
                    _0.sent();
                    _0.label = 114;
                case 114:
                    _k++;
                    return [3 /*break*/, 112];
                case 115:
                    console.log('✓ Participações de servos criadas');
                    departamentosNomes = [
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
                    ];
                    departamentos = {};
                    _l = 0, departamentosNomes_1 = departamentosNomes;
                    _0.label = 116;
                case 116:
                    if (!(_l < departamentosNomes_1.length)) return [3 /*break*/, 119];
                    d = departamentosNomes_1[_l];
                    _m = departamentos;
                    _o = d.nome;
                    return [4 /*yield*/, prisma.departamento.create({
                            data: {
                                encontro_id: encontroAtual.id,
                                nome: d.nome,
                                icone: d.icone,
                                chegada_ate: d.chegada_ate,
                                lideres: opcoes(servos).id,
                            },
                        })];
                case 117:
                    _m[_o] = _0.sent();
                    _0.label = 118;
                case 118:
                    _l++;
                    return [3 /*break*/, 116];
                case 119:
                    console.log('✓ Departamentos criados');
                    return [4 /*yield*/, prisma.veiculo.create({
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
                    ];
                case 120:
                    onibus = _0.sent();
                    inscricoesOnibus = inscricoes.slice(0, 40);
                    _p = 0, inscricoesOnibus_1 = inscricoesOnibus;
                    _0.label = 121;
                case 121:
                    if (!(_p < inscricoesOnibus_1.length)) return [3 /*break*/, 124];
                    insc = inscricoesOnibus_1[_p];
                    return [4 /*yield*/, prisma.inscricao.update({
                            where: { id: insc.id },
                            data: { veiculo_id: onibus.id },
                        })];
                case 122:
                    _0.sent();
                    _0.label = 123;
                case 123:
                    _p++;
                    return [3 /*break*/, 121];
                case 124:
                    console.log('✓ Transporte criado');
                    anjosServos = servos.slice(0, 27);
                    todasCamas = __spreadArray(__spreadArray(__spreadArray([], camasQ1, true), camasQ2, true), camasQ3, true);
                    camaIdx = 0;
                    _loop_3 = function (ai) {
                        var anjo, enc1, enc2, insc1, insc2, camaAnjo, camaEnc1, camaEnc2, usarQuartoErrado, camaOutroQuarto, e_1;
                        return __generator(this, function (_3) {
                            switch (_3.label) {
                                case 0:
                                    anjo = anjosServos[ai];
                                    enc1 = encontristas[ai * 2];
                                    enc2 = encontristas[ai * 2 + 1];
                                    if (!enc1 || !enc2)
                                        return [2 /*return*/, "break"];
                                    insc1 = inscricoes.find(function (i) { return i.pessoa_id === enc1.id; });
                                    insc2 = inscricoes.find(function (i) { return i.pessoa_id === enc2.id; });
                                    if (!insc1 || !insc2)
                                        return [2 /*return*/, "continue"];
                                    camaAnjo = todasCamas[camaIdx];
                                    camaEnc1 = todasCamas[camaIdx + 1];
                                    camaEnc2 = todasCamas[camaIdx + 2];
                                    if (!camaAnjo || !camaEnc1 || !camaEnc2)
                                        return [2 /*return*/, "break"];
                                    usarQuartoErrado = ai === 5 // sexto anjo fica em quarto diferente
                                    ;
                                    _3.label = 1;
                                case 1:
                                    _3.trys.push([1, 12, , 13]);
                                    return [4 /*yield*/, prisma.alocacaoCama.create({
                                            data: { encontro_id: encontroAtual.id, cama_id: camaAnjo.id, pessoa_id: anjo.id, papel: 'anjo' },
                                        })];
                                case 2:
                                    _3.sent();
                                    if (!!usarQuartoErrado) return [3 /*break*/, 5];
                                    return [4 /*yield*/, prisma.alocacaoCama.create({
                                            data: { encontro_id: encontroAtual.id, cama_id: camaEnc1.id, pessoa_id: enc1.id, papel: 'encontrista' },
                                        })];
                                case 3:
                                    _3.sent();
                                    return [4 /*yield*/, prisma.alocacaoCama.create({
                                            data: { encontro_id: encontroAtual.id, cama_id: camaEnc2.id, pessoa_id: enc2.id, papel: 'encontrista' },
                                        })];
                                case 4:
                                    _3.sent();
                                    return [3 /*break*/, 9];
                                case 5:
                                    camaOutroQuarto = camasQ3[0];
                                    if (!camaOutroQuarto) return [3 /*break*/, 7];
                                    return [4 /*yield*/, prisma.alocacaoCama.create({
                                            data: { encontro_id: encontroAtual.id, cama_id: camaOutroQuarto.id, pessoa_id: enc1.id, papel: 'encontrista' },
                                        })];
                                case 6:
                                    _3.sent();
                                    _3.label = 7;
                                case 7: return [4 /*yield*/, prisma.alocacaoCama.create({
                                        data: { encontro_id: encontroAtual.id, cama_id: camaEnc2.id, pessoa_id: enc2.id, papel: 'encontrista' },
                                    })];
                                case 8:
                                    _3.sent();
                                    _3.label = 9;
                                case 9: 
                                // Vínculo anjo-encontrista
                                return [4 /*yield*/, prisma.vinculoAnjo.create({
                                        data: {
                                            encontro_id: encontroAtual.id,
                                            anjo_pessoa_id: anjo.id,
                                            encontrista_pessoa_id: enc1.id,
                                            inscricao_id: insc1.id,
                                        },
                                    })];
                                case 10:
                                    // Vínculo anjo-encontrista
                                    _3.sent();
                                    return [4 /*yield*/, prisma.vinculoAnjo.create({
                                            data: {
                                                encontro_id: encontroAtual.id,
                                                anjo_pessoa_id: anjo.id,
                                                encontrista_pessoa_id: enc2.id,
                                                inscricao_id: insc2.id,
                                            },
                                        })];
                                case 11:
                                    _3.sent();
                                    return [3 /*break*/, 13];
                                case 12:
                                    e_1 = _3.sent();
                                    return [3 /*break*/, 13];
                                case 13:
                                    camaIdx += 3;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    ai = 0;
                    _0.label = 125;
                case 125:
                    if (!(ai < anjosServos.length && camaIdx < todasCamas.length - 2)) return [3 /*break*/, 128];
                    return [5 /*yield**/, _loop_3(ai)];
                case 126:
                    state_1 = _0.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 128];
                    _0.label = 127;
                case 127:
                    ai++;
                    return [3 /*break*/, 125];
                case 128:
                    console.log('✓ Camas e vínculos de anjo alocados');
                    sexta = new Date('2026-10-09');
                    sabado = new Date('2026-10-10');
                    domingo = new Date('2026-10-11');
                    ministrador1 = pastores[0];
                    ministrador2 = pastores[1];
                    ministrador3 = pastores[2];
                    ministrador4 = pastores[3];
                    atividadesData = [
                        // SEXTA
                        { dia: 0, ordem: 1, titulo: 'Check-in na igreja', tipo: 'logistica', inicio_planejado: dt(sexta, 18, 0), duracao_planejada_min: 60, local: 'Get Church Floripa', status: 'concluida', inicio_real: dt(sexta, 18, 0), fim_real: dt(sexta, 19, 0) },
                        { dia: 0, ordem: 2, titulo: 'Saída do ônibus', tipo: 'logistica', inicio_planejado: dt(sexta, 19, 0), duracao_planejada_min: 60, local: 'Get Church Floripa', ancora: true, status: 'concluida', inicio_real: dt(sexta, 19, 0), fim_real: dt(sexta, 20, 0) },
                        { dia: 0, ordem: 3, titulo: 'Chegada e recepção', tipo: 'logistica', inicio_planejado: dt(sexta, 20, 0), duracao_planejada_min: 30, local: 'Pousada Águas Claras', status: 'concluida', inicio_real: dt(sexta, 20, 5), fim_real: dt(sexta, 20, 35) },
                        { dia: 0, ordem: 4, titulo: 'Abertura', tipo: 'louvor', inicio_planejado: dt(sexta, 20, 30), duracao_planejada_min: 30, local: 'Capela', status: 'concluida', inicio_real: dt(sexta, 20, 35), fim_real: dt(sexta, 21, 0) },
                        { dia: 0, ordem: 5, titulo: 'Ministração 1', tipo: 'ministracao', inicio_planejado: dt(sexta, 21, 0), duracao_planejada_min: 90, ministrador_id: ministrador1 === null || ministrador1 === void 0 ? void 0 : ministrador1.id, local: 'Capela', status: 'concluida', inicio_real: dt(sexta, 21, 0), fim_real: dt(sexta, 22, 35) },
                        { dia: 0, ordem: 6, titulo: 'Lanche da noite', tipo: 'refeicao', inicio_planejado: dt(sexta, 22, 30), duracao_planejada_min: 30, avisa_cozinha: true, local: 'Refeitório', status: 'concluida', inicio_real: dt(sexta, 22, 35), fim_real: dt(sexta, 23, 5) },
                        { dia: 0, ordem: 7, titulo: 'Descanso', tipo: 'descanso', inicio_planejado: dt(sexta, 23, 0), duracao_planejada_min: 450, duracao_minima_min: 360, local: 'Alojamentos', status: 'concluida', inicio_real: dt(sexta, 23, 5), fim_real: dt(sabado, 6, 30) },
                        // SÁBADO
                        { dia: 1, ordem: 1, titulo: 'Despertar (chofar)', tipo: 'logistica', inicio_planejado: dt(sabado, 6, 30), duracao_planejada_min: 5, toca_chofar: true, antecedencia_chofar_min: 10, local: 'Alojamentos', status: 'concluida', inicio_real: dt(sabado, 6, 30), fim_real: dt(sabado, 6, 35) },
                        { dia: 1, ordem: 2, titulo: 'Café da manhã', tipo: 'refeicao', inicio_planejado: dt(sabado, 7, 0), duracao_planejada_min: 60, avisa_cozinha: true, local: 'Refeitório', status: 'concluida', inicio_real: dt(sabado, 7, 0), fim_real: dt(sabado, 8, 0) },
                        { dia: 1, ordem: 3, titulo: 'Ministração 2', tipo: 'ministracao', inicio_planejado: dt(sabado, 8, 0), duracao_planejada_min: 120, ministrador_id: ministrador2 === null || ministrador2 === void 0 ? void 0 : ministrador2.id, local: 'Capela', status: 'concluida', inicio_real: dt(sabado, 8, 4), fim_real: dt(sabado, 10, 14) },
                        { dia: 1, ordem: 4, titulo: 'Intervalo', tipo: 'descanso', inicio_planejado: dt(sabado, 10, 0), duracao_planejada_min: 30, duracao_minima_min: 15, local: 'Área externa', status: 'em_andamento', inicio_real: dt(sabado, 10, 14) },
                        { dia: 1, ordem: 5, titulo: 'Ministração 3', tipo: 'ministracao', inicio_planejado: dt(sabado, 10, 30), duracao_planejada_min: 120, ministrador_id: ministrador3 === null || ministrador3 === void 0 ? void 0 : ministrador3.id, local: 'Capela', status: 'planejada' },
                        { dia: 1, ordem: 6, titulo: 'Almoço', tipo: 'refeicao', inicio_planejado: dt(sabado, 12, 30), duracao_planejada_min: 90, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
                        { dia: 1, ordem: 7, titulo: 'Descanso da tarde', tipo: 'descanso', inicio_planejado: dt(sabado, 14, 0), duracao_planejada_min: 60, duracao_minima_min: 30, local: 'Alojamentos', status: 'planejada' },
                        { dia: 1, ordem: 8, titulo: 'Ministração 4', tipo: 'ministracao', inicio_planejado: dt(sabado, 15, 0), duracao_planejada_min: 120, ministrador_id: ministrador4 === null || ministrador4 === void 0 ? void 0 : ministrador4.id, local: 'Capela', status: 'planejada' },
                        { dia: 1, ordem: 9, titulo: 'Lanche da tarde', tipo: 'refeicao', inicio_planejado: dt(sabado, 17, 0), duracao_planejada_min: 30, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
                        { dia: 1, ordem: 10, titulo: 'Ministração 5', tipo: 'ministracao', inicio_planejado: dt(sabado, 17, 30), duracao_planejada_min: 120, ministrador_id: ministrador1 === null || ministrador1 === void 0 ? void 0 : ministrador1.id, local: 'Capela', status: 'planejada' },
                        { dia: 1, ordem: 11, titulo: 'Jantar', tipo: 'refeicao', inicio_planejado: dt(sabado, 19, 30), duracao_planejada_min: 60, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
                        { dia: 1, ordem: 12, titulo: 'Ministração 6', tipo: 'ministracao', inicio_planejado: dt(sabado, 20, 30), duracao_planejada_min: 150, ministrador_id: ministrador2 === null || ministrador2 === void 0 ? void 0 : ministrador2.id, local: 'Capela', status: 'planejada' },
                        { dia: 1, ordem: 13, titulo: 'Descanso', tipo: 'descanso', inicio_planejado: dt(sabado, 23, 0), duracao_planejada_min: 450, duracao_minima_min: 360, local: 'Alojamentos', status: 'planejada' },
                        // DOMINGO
                        { dia: 2, ordem: 1, titulo: 'Despertar (chofar)', tipo: 'logistica', inicio_planejado: dt(domingo, 6, 30), duracao_planejada_min: 5, toca_chofar: true, antecedencia_chofar_min: 10, local: 'Alojamentos', status: 'planejada' },
                        { dia: 2, ordem: 2, titulo: 'Café da manhã', tipo: 'refeicao', inicio_planejado: dt(domingo, 7, 0), duracao_planejada_min: 60, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
                        { dia: 2, ordem: 3, titulo: 'Ministração 7', tipo: 'ministracao', inicio_planejado: dt(domingo, 8, 0), duracao_planejada_min: 120, ministrador_id: ministrador3 === null || ministrador3 === void 0 ? void 0 : ministrador3.id, local: 'Capela', status: 'planejada' },
                        { dia: 2, ordem: 4, titulo: 'Intervalo', tipo: 'descanso', inicio_planejado: dt(domingo, 10, 0), duracao_planejada_min: 30, local: 'Área externa', status: 'planejada' },
                        { dia: 2, ordem: 5, titulo: 'Ministração 8 — Encerramento', tipo: 'ministracao', inicio_planejado: dt(domingo, 10, 30), duracao_planejada_min: 120, ministrador_id: ministrador4 === null || ministrador4 === void 0 ? void 0 : ministrador4.id, local: 'Capela', status: 'planejada' },
                        { dia: 2, ordem: 6, titulo: 'Almoço', tipo: 'refeicao', inicio_planejado: dt(domingo, 12, 30), duracao_planejada_min: 90, avisa_cozinha: true, local: 'Refeitório', status: 'planejada' },
                        { dia: 2, ordem: 7, titulo: 'Encerramento e despedida', tipo: 'logistica', inicio_planejado: dt(domingo, 14, 0), duracao_planejada_min: 30, local: 'Área externa', status: 'planejada' },
                        { dia: 2, ordem: 8, titulo: 'Saída do ônibus', tipo: 'logistica', inicio_planejado: dt(domingo, 15, 0), duracao_planejada_min: 180, local: 'Pousada Águas Claras', ancora: true, status: 'planejada' },
                        { dia: 2, ordem: 9, titulo: 'Culto de recepção na igreja', tipo: 'louvor', inicio_planejado: dt(domingo, 18, 0), duracao_planejada_min: 90, local: 'Get Church Floripa', ancora: true, status: 'planejada' },
                    ];
                    atividadesCriadas = [];
                    _q = 0, atividadesData_1 = atividadesData;
                    _0.label = 129;
                case 129:
                    if (!(_q < atividadesData_1.length)) return [3 /*break*/, 132];
                    ativ = atividadesData_1[_q];
                    return [4 /*yield*/, prisma.atividade.create({ data: __assign({ encontro_id: encontroAtual.id }, ativ) })];
                case 130:
                    a = _0.sent();
                    atividadesCriadas.push(a);
                    _0.label = 131;
                case 131:
                    _q++;
                    return [3 /*break*/, 129];
                case 132:
                    console.log('✓ Cronograma criado');
                    _r = 0, _s = atividadesCriadas.filter(function (a) { return a.tipo === 'ministracao'; });
                    _0.label = 133;
                case 133:
                    if (!(_r < _s.length)) return [3 /*break*/, 136];
                    ativ = _s[_r];
                    return [4 /*yield*/, prisma.chamadaEquipe.create({
                            data: {
                                atividade_id: ativ.id,
                                nome: 'Apoio Capela',
                                referencia: 'fim',
                                deslocamento_min: -10,
                                mensagem: 'Apoio Capela: posicione-se em 10 minutos.',
                            },
                        })];
                case 134:
                    _0.sent();
                    _0.label = 135;
                case 135:
                    _r++;
                    return [3 /*break*/, 133];
                case 136: return [4 /*yield*/, prisma.torre.create({
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
                ];
                case 137:
                    torreOracao = _0.sent();
                    dia = 0;
                    _0.label = 138;
                case 138:
                    if (!(dia < 5)) return [3 /*break*/, 144];
                    hora = 0;
                    _0.label = 139;
                case 139:
                    if (!(hora < 24)) return [3 /*break*/, 143];
                    inicio = new Date('2026-10-05T00:00:00-03:00');
                    inicio.setDate(inicio.getDate() + dia);
                    inicio.setHours(hora, 0, 0, 0);
                    fim = new Date(inicio);
                    fim.setHours(hora + 1);
                    return [4 /*yield*/, prisma.torreTurno.create({
                            data: { torre_id: torreOracao.id, inicio: inicio, fim: fim },
                        })
                        // Alocar servos em ~70% dos turnos (simular turnos descobertos)
                    ];
                case 140:
                    turno = _0.sent();
                    if (!(Math.random() > 0.3 && servos.length > 0)) return [3 /*break*/, 142];
                    servo = servos[Math.floor(Math.random() * servos.length)];
                    return [4 /*yield*/, prisma.torreAlocacao.create({
                            data: {
                                turno_id: turno.id,
                                pessoa_id: servo.id,
                                iniciou_em: Math.random() > 0.3 ? inicio : undefined,
                                concluiu_em: Math.random() > 0.5 ? fim : undefined,
                            },
                        })];
                case 141:
                    _0.sent();
                    _0.label = 142;
                case 142:
                    hora++;
                    return [3 /*break*/, 139];
                case 143:
                    dia++;
                    return [3 /*break*/, 138];
                case 144:
                    console.log('✓ Torre de Oração criada');
                    statusAtendimento = ['nova', 'atribuida', 'em_atendimento', 'concluida'];
                    i = 0;
                    _0.label = 145;
                case 145:
                    if (!(i < 6)) return [3 /*break*/, 148];
                    insc = inscricoes[i + 10];
                    return [4 /*yield*/, prisma.fichaAtendimento.create({
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
                        })];
                case 146:
                    _0.sent();
                    _0.label = 147;
                case 147:
                    i++;
                    return [3 /*break*/, 145];
                case 148:
                    console.log('✓ Fichas de atendimento criadas');
                    i = 0;
                    _0.label = 149;
                case 149:
                    if (!(i < 5)) return [3 /*break*/, 152];
                    return [4 /*yield*/, prisma.caronaOferta.create({
                            data: {
                                encontro_id: encontroAtual.id,
                                motorista_id: servos[i + 5].id,
                                regiao_saida: opcoes(['Trindade', 'Centro', 'Kobrasol', 'Norte da ilha', 'Sul da ilha']),
                                horario_saida: new Date("2026-10-09T".concat(16 + i, ":00:00-03:00")),
                                vagas: opcoes([1, 2, 3]),
                                observacoes: 'Posso buscar no caminho',
                            },
                        })];
                case 150:
                    _0.sent();
                    _0.label = 151;
                case 151:
                    i++;
                    return [3 /*break*/, 149];
                case 152:
                    i = 0;
                    _0.label = 153;
                case 153:
                    if (!(i < 4)) return [3 /*break*/, 156];
                    return [4 /*yield*/, prisma.caronaPedido.create({
                            data: {
                                encontro_id: encontroAtual.id,
                                pessoa_id: servos[i + 25].id,
                                regiao: opcoes(['Trindade', 'Agronômica', 'Kobrasol', 'São José']),
                                disponivel_a_partir: new Date("2026-10-09T1".concat(5 + i, ":00:00-03:00")),
                                status: 'aberto',
                            },
                        })];
                case 154:
                    _0.sent();
                    _0.label = 155;
                case 155:
                    i++;
                    return [3 /*break*/, 153];
                case 156:
                    console.log('✓ Caronas criadas');
                    templates = [
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
                    ];
                    _t = 0, templates_1 = templates;
                    _0.label = 157;
                case 157:
                    if (!(_t < templates_1.length)) return [3 /*break*/, 160];
                    t = templates_1[_t];
                    return [4 /*yield*/, prisma.templatesMensagem.create({ data: t })];
                case 158:
                    _0.sent();
                    _0.label = 159;
                case 159:
                    _t++;
                    return [3 /*break*/, 157];
                case 160:
                    console.log('✓ Templates criados');
                    _u = 0, _v = [encontroAnterior1, encontroAnterior2];
                    _0.label = 161;
                case 161:
                    if (!(_u < _v.length)) return [3 /*break*/, 166];
                    enc = _v[_u];
                    baseDt = enc.data_inicio;
                    ministradores = pastores.slice(0, 4);
                    m = 0;
                    _0.label = 162;
                case 162:
                    if (!(m < 8)) return [3 /*break*/, 165];
                    inicioPlan = new Date(baseDt);
                    inicioPlan.setHours(8 + m * 2, 0, 0, 0);
                    atraso = Math.floor(Math.random() * 20) - 5 // -5 a +15 min
                    ;
                    inicioReal = new Date(inicioPlan);
                    inicioReal.setMinutes(inicioReal.getMinutes() + Math.max(0, atraso));
                    fimReal = new Date(inicioReal);
                    fimReal.setMinutes(fimReal.getMinutes() + 120 + Math.floor(Math.random() * 20));
                    return [4 /*yield*/, prisma.atividade.create({
                            data: {
                                encontro_id: enc.id,
                                dia: Math.floor(m / 4),
                                ordem: (m % 4) + 1,
                                titulo: "Ministra\u00E7\u00E3o ".concat(m + 1),
                                tipo: 'ministracao',
                                inicio_planejado: inicioPlan,
                                duracao_planejada_min: 120,
                                ministrador_id: (_z = ministradores[m % 4]) === null || _z === void 0 ? void 0 : _z.id,
                                status: 'concluida',
                                inicio_real: inicioReal,
                                fim_real: fimReal,
                            },
                        })];
                case 163:
                    _0.sent();
                    _0.label = 164;
                case 164:
                    m++;
                    return [3 /*break*/, 162];
                case 165:
                    _u++;
                    return [3 /*break*/, 161];
                case 166:
                    console.log('✓ Histórico de pontualidade criado');
                    console.log('\n🎉 Seed completo! Sistema pronto para demonstração.');
                    console.log('\n📋 Usuários de teste (senha: 123456):');
                    for (_w = 0, usuariosAdmin_2 = usuariosAdmin; _w < usuariosAdmin_2.length; _w++) {
                        u = usuariosAdmin_2[_w];
                        console.log("  ".concat(u.email, " \u2014 ").concat(u.perfis).concat(u.permissoes ? " (".concat(u.permissoes, ")") : ''));
                    }
                    console.log("\n\uD83D\uDCCA Dados criados:");
                    console.log("  \u2022 ".concat(encontristas.length, " encontristas"));
                    console.log("  \u2022 ".concat(servos.length, " servos"));
                    console.log("  \u2022 ".concat(pastores.length, " pastores/ministradores"));
                    console.log("  \u2022 ".concat(inscricoes.length, " inscri\u00E7\u00F5es"));
                    console.log("  \u2022 3 encontros (1 em andamento + 2 encerrados)");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
