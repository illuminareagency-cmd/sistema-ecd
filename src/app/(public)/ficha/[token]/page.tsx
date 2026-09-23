import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function FichaPublicaPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const inscricao = await prisma.inscricao.findFirst({
    where: { ficha_token: token },
    include: { pessoa: true, encontro: true },
  })

  if (!inscricao) notFound()

  return (
    <div className="min-h-screen bg-white text-gray-900 font-literata py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-jost font-semibold mb-2">Ficha de Inscrição</h1>
          <p className="text-gray-600 font-figtree">
            {inscricao.encontro.nome} — {inscricao.pessoa.nome_completo}
          </p>
        </div>

        <form className="space-y-8 bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-200 font-figtree">
          <section className="space-y-4">
            <h2 className="text-xl font-jost font-semibold border-b pb-2 text-gray-800">1. Saúde e Restrições</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alergias" className="text-gray-700">Alergias ou Restrições Alimentares</Label>
                <Input id="alergias" className="bg-white border-gray-300 text-gray-900" placeholder="Ex: amendoim, glúten, lactose..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicamentos" className="text-gray-700">Medicamentos de uso contínuo</Label>
                <Input id="medicamentos" className="bg-white border-gray-300 text-gray-900" placeholder="Nome do remédio e horários..." />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-jost font-semibold border-b pb-2 text-gray-800">2. Contato de Emergência</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome_emergencia" className="text-gray-700">Nome do Contato</Label>
                <Input id="nome_emergencia" className="bg-white border-gray-300 text-gray-900" placeholder="Ex: Maria da Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone_emergencia" className="text-gray-700">Telefone / WhatsApp</Label>
                <Input id="telefone_emergencia" className="bg-white border-gray-300 text-gray-900" placeholder="(48) 99999-9999" />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-jost font-semibold border-b pb-2 text-gray-800">3. Consentimento LGPD</h2>
            <div className="flex items-start gap-3 bg-amber-50/60 border border-amber-200/60 p-4 rounded-xl">
              <input type="checkbox" id="lgpd" className="mt-1" required />
              <label htmlFor="lgpd" className="text-xs text-gray-700 leading-relaxed">
                Autorizo o uso dos meus dados pessoais e dados sensíveis de saúde fornecidos neste formulário exclusivamente para os cuidados e organização do Encontro com Deus da Get Church Floripa, em conformidade com a LGPD.
              </label>
            </div>
          </section>

          <Button type="submit" className="w-full bg-[#C8844F] hover:bg-[#B57340] text-white py-3 text-base font-semibold">
            Salvar e Confirmar Ficha
          </Button>
        </form>
      </div>
    </div>
  )
}
