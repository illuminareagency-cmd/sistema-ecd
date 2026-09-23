import { Button } from '@/components/ui/button'
import { VineIcon } from '@/components/ui/vine-icon'
import { prisma } from '@/lib/prisma'

export default async function EscreverCartaPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  
  // Buscar se existe indicação pelo token
  const indicacao = await prisma.indicacaoCarta.findUnique({
    where: { token_carta: token },
    include: {
      inscricao: {
        include: { pessoa: true, encontro: true }
      }
    }
  })

  const destinatario = indicacao?.inscricao?.pessoa?.nome_completo || 'Encontrista'

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-literata py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-6 flex flex-col items-center text-center">
        <VineIcon size={40} className="text-[#9A5A2C] mb-4" />
        <h1 className="text-2xl font-jost">Carta para {destinatario}</h1>
        <p className="text-gray-600 text-sm mt-2">Sua mensagem será impressa com todo cuidado e entregue no momento oportuno do retiro.</p>
      </div>

      <div className="w-full max-w-2xl bg-[#FFFBF0] shadow-xl rounded-sm min-h-[60vh] p-8 md:p-12 border border-[#E5E0D8] relative">
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #9A5A2C 31px, #9A5A2C 32px)',
            backgroundPositionY: '8px'
          }}
        />

        <textarea
          name="conteudo"
          placeholder="Comece a escrever sua carta aqui com todo amor e encorajamento..."
          className="w-full h-full min-h-[50vh] bg-transparent resize-none outline-none text-lg leading-[32px] relative z-10 text-gray-800 placeholder:text-gray-400 font-literata"
          style={{ lineHeight: '32px' }}
        />
      </div>

      <div className="w-full max-w-2xl mt-6 flex justify-end">
        <Button className="bg-[#9A5A2C] hover:bg-[#C8844F] text-white px-8 py-3 text-base">
          Enviar Carta
        </Button>
      </div>
    </div>
  )
}
