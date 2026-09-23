import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Send, Copy, FileText } from 'lucide-react'

export default async function MensagensPage() {
  const templates = await prisma.templatesMensagem.findMany({
    orderBy: { titulo: 'asc' },
  })

  return (
    <div className="space-y-6 font-figtree">
      <div>
        <h1 className="text-3xl font-jost font-semibold text-texto text-center sm:text-left">Central de Mensagens</h1>
        <p className="text-texto-2 text-sm mt-1 text-center sm:text-left">
          Modelos e réguas de comunicação para WhatsApp e E-mail
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-noite-2 rounded-[20px] p-6 border border-linha shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-jost text-lg font-semibold text-texto">{tpl.titulo}</h3>
                <Badge variant="outline" className="uppercase text-[10px]">
                  {tpl.canal}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-texto-3">
                <span>Público: <strong className="text-texto-2 capitalize">{tpl.publico}</strong></span>
                <span>•</span>
                <span>Gênero: <strong className="text-texto-2 capitalize">{tpl.tipo_encontro}</strong></span>
              </div>

              <div className="bg-noite-3 p-4 rounded-[12px] border border-linha font-mono text-xs text-texto-2 whitespace-pre-wrap leading-relaxed">
                {tpl.corpo}
              </div>
            </div>

            <div className="pt-2 border-t border-linha/60 flex justify-between items-center text-xs text-texto-3">
              <span className="text-[11px] text-cobre">Variáveis prontas para envio</span>
              <button className="flex items-center gap-1 text-cobre hover:text-cobre-claro transition-colors font-medium">
                <Copy className="w-3.5 h-3.5" /> Copiar texto
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
