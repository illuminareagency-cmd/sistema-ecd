import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { VineIcon } from '@/components/ui/vine-icon'

export default async function CartasFamiliaPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const contato = await prisma.contatoEmergencia.findFirst({
    where: { token_familia: token },
    include: {
      inscricao: {
        include: { pessoa: true, encontro: true }
      }
    }
  })

  if (!contato) notFound()

  const indicacoes = await prisma.indicacaoCarta.findMany({
    where: { inscricao_id: contato.inscricao_id }
  })

  const nomeEncontrista = contato.inscricao.pessoa.nome_completo

  return (
    <div className="min-h-screen bg-white text-gray-900 font-literata py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <VineIcon size={48} className="text-[#9A5A2C]" />
          <div>
            <h1 className="text-2xl font-jost mb-2">Cartas para {nomeEncontrista}</h1>
            <p className="text-gray-600 font-figtree text-sm">
              Escreva uma mensagem especial de amor e encorajamento para ser entregue durante o Encontro com Deus.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href={`/cartas/escrever/${contato.token_familia}`}>
            <Button className="bg-[#9A5A2C] hover:bg-[#C8844F] text-white text-base h-12 px-8">
              Escrever minha carta
            </Button>
          </Link>
        </div>

        {indicacoes.length > 0 && (
          <div className="mt-12 space-y-4 font-figtree">
            <h2 className="text-xl font-jost font-semibold border-b pb-2">Convites enviados</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {indicacoes.map(ind => (
                <Card key={ind.id} className="bg-gray-50 border-gray-200">
                  <CardHeader className="py-4">
                    <CardTitle className="text-base text-gray-900">{ind.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0 pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 capitalize">{ind.relacao || 'Amigo/Familiar'}</span>
                      <Link href={`/cartas/escrever/${ind.token_carta}`}>
                        <Button variant="outline" size="sm" className="border-[#9A5A2C] text-[#9A5A2C] hover:bg-[#9A5A2C]/10">
                          Acessar link
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
