import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { LegalPage, LegalSection, LegalCallout, LegalContact } from '@/components/legal/legal-page'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Qué datos se recogen al usar este sitio y las herramientas de consulta de Minecraft.',
}

const sections = [
  { id: 'resumen', title: 'Resumen' },
  { id: 'que-datos', title: 'Qué datos se recogen' },
  { id: 'herramientas', title: 'Herramientas de consulta' },
  { id: 'contacto-formulario', title: 'Formulario de contacto' },
  { id: 'cookies', title: 'Cookies y analítica' },
  { id: 'terceros', title: 'Servicios de terceros' },
  { id: 'derechos', title: 'Tus derechos' },
  { id: 'cambios', title: 'Cambios en esta política' },
  { id: 'contacto', title: 'Contacto' },
]

export default function PrivacidadPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Lock"
        eyebrow="{ legal }"
        title="Política de privacidad"
        description="Cómo se tratan los datos cuando usas este sitio, incluidas las herramientas de búsqueda de jugadores y servidores."
        meta={[{ label: 'Última actualización', value: 'Agosto 2026' }]}
      />

      <section className="relative py-10">
        <LegalPage sections={sections}>
          <LegalSection id="resumen" title="Resumen">
            <LegalCallout title="Lo esencial" tone="info">
              <p>
                Este Sitio recoge la mínima información necesaria para funcionar. No hay
                registro de usuarios, no se venden datos a terceros y las búsquedas de
                jugadores o servidores se envían directamente a las APIs correspondientes sin
                guardarse en nuestros propios servidores.
              </p>
            </LegalCallout>
          </LegalSection>

          <LegalSection id="que-datos" number="01" title="Qué datos se recogen">
            <p>
              Al navegar por el Sitio se pueden generar registros técnicos estándar (dirección
              IP, tipo de navegador, páginas visitadas) con fines de seguridad y de análisis
              agregado de tráfico, gestionados por Vercel Analytics y Vercel Speed Insights.
            </p>
          </LegalSection>

          <LegalSection id="herramientas" number="02" title="Herramientas de consulta">
            <p>
              Cuando usas la búsqueda de jugadores, el estado de servidores, la wiki, los
              changelogs o las novedades, el nombre de usuario o la dirección del servidor que
              introduces se reenvía a la API correspondiente (Mojang, Crafatar, PlayerDB,
              Crafty.gg o mcsrvstat.us) para obtener la respuesta. No almacenamos un historial
              de tus búsquedas ni las asociamos a tu identidad.
            </p>
          </LegalSection>

          <LegalSection id="contacto-formulario" number="03" title="Formulario de contacto">
            <p>
              Si usas el formulario o el enlace de contacto para solicitar un presupuesto,
              los datos que compartas (por ejemplo, tu usuario de Discord o el detalle de tu
              proyecto) se usan únicamente para responderte y, si procede, gestionar el
              encargo.
            </p>
          </LegalSection>

          <LegalSection id="cookies" number="04" title="Cookies y analítica">
            <p>
              El Sitio no usa cookies de seguimiento publicitario. Puede usar almacenamiento
              técnico mínimo necesario para el funcionamiento de la interfaz (por ejemplo,
              preferencias de visualización) y las herramientas de analítica de Vercel
              mencionadas arriba.
            </p>
          </LegalSection>

          <LegalSection id="terceros" number="05" title="Servicios de terceros">
            <p>
              Las herramientas de Minecraft de este Sitio dependen de servicios externos:
              Mojang (perfiles y notas de parche), Crafatar y PlayerDB (skins y UUIDs),
              Crafty.gg (búsqueda e historial de nombres) y mcsrvstat.us (estado de
              servidores). El tratamiento de datos de cada uno de esos servicios se rige por
              sus propias políticas de privacidad.
            </p>
          </LegalSection>

          <LegalSection id="derechos" number="06" title="Tus derechos">
            <p>
              Puedes solicitar en cualquier momento información sobre los datos de contacto
              que nos hayas facilitado, así como pedir su corrección o eliminación,
              escribiendo por Discord o a través del formulario de contacto.
            </p>
          </LegalSection>

          <LegalSection id="cambios" number="07" title="Cambios en esta política">
            <p>
              Esta política puede actualizarse para reflejar cambios en el Sitio o en la
              normativa aplicable. La fecha de la parte superior de esta página indica la
              última revisión.
            </p>
          </LegalSection>

          <LegalSection id="contacto" number="08" title="Contacto">
            <LegalContact />
          </LegalSection>
        </LegalPage>
      </section>
    </main>
  )
}
