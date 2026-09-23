import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings, CheckCircle2, XCircle, ShieldCheck, Database, Key } from 'lucide-react'

export default async function ConfiguracoesPage() {
  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
    include: { local: true },
  })

  return (
    <div className="space-y-8 font-figtree max-w-4xl">
      <div>
        <div className="flex items-center gap-2">
          <Settings className="w-7 h-7 text-cobre" />
          <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Configurações do Sistema</h1>
        </div>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          Parâmetros do encontro atual e status dos serviços de retaguarda
        </p>
      </div>

      {/* Modo Teste Banner */}
      <div className="bg-ambar/10 border border-ambar/30 rounded-[20px] p-6 space-y-2">
        <div className="flex items-center gap-2 text-ambar font-medium font-jost text-lg">
          <ShieldCheck className="w-5 h-5" />
          Modo de Teste / Demonstração Ativo
        </div>
        <p className="text-xs text-texto-2 leading-relaxed">
          O sistema está operando em modo local seguro (SQLite), sem dependência de serviços externos
          como Supabase, gateways de pagamento ou WhatsApp. Todos os dados são simulados e a senha
          universal para todos os perfis cadastrados é <code className="bg-noite-3 text-cobre px-1.5 py-0.5 rounded font-mono">123456</code>.
        </p>
      </div>

      {/* Dados do Encontro Atual */}
      <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-6">
        <div className="border-b border-linha pb-4">
          <h2 className="text-xl font-jost font-semibold text-texto">Dados da Edição Atual</h2>
          <p className="text-xs text-texto-3">Informações básicas do retiro em andamento</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-texto-2">Nome do Encontro</Label>
            <Input
              defaultValue={encontroAtual?.nome || ''}
              className="bg-noite-3 border-linha text-texto"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-texto-2">Local do Evento</Label>
            <Input
              defaultValue={encontroAtual?.local?.nome || 'Pousada Águas Claras'}
              className="bg-noite-3 border-linha text-texto"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-texto-2">Capacidade Máxima</Label>
            <Input
              type="number"
              defaultValue={encontroAtual?.capacidade || 60}
              className="bg-noite-3 border-linha text-texto"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-texto-2">Meta Mínima de Cartas</Label>
            <Input
              type="number"
              defaultValue={encontroAtual?.meta_minima_cartas || 3}
              className="bg-noite-3 border-linha text-texto"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-texto-2">Valor da Inscrição (R$)</Label>
            <Input
              type="number"
              defaultValue={encontroAtual?.valor_inscricao || 150}
              className="bg-noite-3 border-linha text-texto"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-texto-2">Link do Grupo de WhatsApp</Label>
            <Input
              defaultValue={encontroAtual?.link_grupo_whatsapp || ''}
              className="bg-noite-3 border-linha text-texto"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button className="bg-cobre hover:bg-cobre-claro text-noite font-semibold px-6">
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Integrações */}
      <div className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4">
        <div className="border-b border-linha pb-4">
          <h2 className="text-xl font-jost font-semibold text-texto">Integrações de Serviços</h2>
          <p className="text-xs text-texto-3">Status das conexões com APIs externas</p>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-[14px] bg-noite-3 border border-linha flex items-center justify-between">
            <div>
              <div className="font-medium text-texto text-sm">Supabase / PostgreSQL</div>
              <div className="text-xs text-texto-3">
                Banco de dados em nuvem para sincronização multi-dispositivo
              </div>
            </div>
            <Badge variant="outline" className="text-xs text-texto-3">
              Desligado (Modo SQLite)
            </Badge>
          </div>

          <div className="p-4 rounded-[14px] bg-noite-3 border border-linha flex items-center justify-between">
            <div>
              <div className="font-medium text-texto text-sm">Asaas Gateway de Pagamentos</div>
              <div className="text-xs text-texto-3">
                Cobranças automáticas via PIX e Cartão de Crédito
              </div>
            </div>
            <Badge variant="outline" className="text-xs text-texto-3">
              Desligado (Manual Confirmado)
            </Badge>
          </div>

          <div className="p-4 rounded-[14px] bg-noite-3 border border-linha flex items-center justify-between">
            <div>
              <div className="font-medium text-texto text-sm">WhatsApp Business API (Z-API / Gupshup)</div>
              <div className="text-xs text-texto-3">Disparo automático de réguas de lembretes</div>
            </div>
            <Badge variant="outline" className="text-xs text-texto-3">
              Desligado (Templates Manuais)
            </Badge>
          </div>

          <div className="p-4 rounded-[14px] bg-noite-3 border border-linha flex items-center justify-between">
            <div>
              <div className="font-medium text-texto text-sm">Resend / E-mail Transacional</div>
              <div className="text-xs text-texto-3">Envio de comprovantes e cartas em PDF</div>
            </div>
            <Badge variant="outline" className="text-xs text-texto-3">
              Desligado
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
