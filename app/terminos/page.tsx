import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { LegalPage, LegalSection, LegalCallout, LegalContact } from '@/components/legal/legal-page'

export const metadata: Metadata = {
  title: 'Términos de servicio',
  description: 'Los términos que rigen el uso de este sitio y de los servicios de desarrollo ofrecidos por Shodzery.',
}

const sections = [
  { id: 'resumen', title: 'Resumen' },
  { id: 'aceptacion', title: 'Aceptación' },
  { id: 'el-sitio', title: 'El sitio y sus herramientas' },
  { id: 'servicios', title: 'Servicios de desarrollo' },
  { id: 'uso-permitido', title: 'Uso permitido' },
  { id: 'uso-prohibido', title: 'Uso prohibido' },
  { id: 'contenido-terceros', title: 'Contenido y APIs de terceros' },
  { id: 'propiedad-intelectual', title: 'Propiedad intelectual' },
  { id: 'marcas', title: 'Marcas y Mojang/Microsoft' },
  { id: 'pagos', title: 'Pagos y encargos' },
  { id: 'disponibilidad', title: 'Disponibilidad del servicio' },
  { id: 'garantias', title: 'Exención de garantías' },
  { id: 'responsabilidad', title: 'Limitación de responsabilidad' },
  { id: 'cambios', title: 'Cambios en estos términos' },
  { id: 'ley', title: 'Ley aplicable' },
  { id: 'contacto', title: 'Contacto' },
]

export default function TerminosPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Scale"
        eyebrow="{ legal }"
        title="Términos de servicio"
        description="Las condiciones que rigen el uso de este sitio web, de sus herramientas gratuitas y de los servicios de desarrollo que ofrezco como Shodzery."
        meta={[{ label: 'Última actualización', value: 'Agosto 2026' }]}
      />

      <section className="relative py-10">
        <LegalPage sections={sections}>
          <LegalSection id="resumen" title="Resumen">
            <LegalCallout title="Lo esencial, en pocas líneas" tone="info">
              <p>
                Usa este sitio con normalidad: no lo satures con peticiones automatizadas
                abusivas ni intentes hacerte pasar por Shodzery. Las herramientas de consulta
                (jugadores, servidores, wiki, changelogs, novedades) se ofrecen{' '}
                <strong>tal cual</strong>, de forma gratuita, y dependen de APIs de terceros
                (Mojang, Crafatar, mcsrvstat.us) sobre las que no tengo control total.
              </p>
              <p>
                Los <strong>servicios de desarrollo</strong> (plugins, mods, configuración de
                servidores) son contratos independientes que se acuerdan caso por caso, por
                fuera de estos términos generales del sitio.
              </p>
            </LegalCallout>
          </LegalSection>

          <LegalSection id="aceptacion" number="01" title="Aceptación de estos términos">
            <p>
              Al acceder o usar este sitio web (el &quot;Sitio&quot;) aceptas quedar sujeto a
              estos Términos de Servicio (los &quot;Términos&quot;). Si no estás de acuerdo con
              alguna parte, la única opción es dejar de usar el Sitio.
            </p>
            <p>
              Estos Términos constituyen un acuerdo entre tú (&quot;el usuario&quot;) y Shodzery
              (&quot;nosotros&quot;, &quot;el operador del Sitio&quot;).
            </p>
          </LegalSection>

          <LegalSection id="el-sitio" number="02" title="El sitio y sus herramientas">
            <p>
              Este Sitio es el portafolio y espacio de trabajo de Shodzery, dedicado al
              desarrollo y configuración de servidores de Minecraft. Además del contenido de
              presentación (servicios, proyectos, experiencia), incluye herramientas gratuitas
              de consulta:
            </p>
            <ul>
              <li>Búsqueda de jugadores: perfil, UUID, skin en 3D y capa.</li>
              <li>Estado de servidores: disponibilidad, versión y jugadores conectados.</li>
              <li>Una wiki de referencia sobre el Overworld, el Nether y el End.</li>
              <li>Changelogs de las notas de parche oficiales de Mojang.</li>
              <li>Un listado de novedades sindicado desde minecraft.net.</li>
            </ul>
            <p>Estas herramientas no almacenan cuentas de Minecraft ni datos de pago de ningún tipo.</p>
          </LegalSection>

          <LegalSection id="servicios" number="03" title="Servicios de desarrollo">
            <p>
              Los servicios de desarrollo de plugins, mods, configuración de servidores y
              optimización que se describen en la sección &quot;Servicios&quot; del Sitio se
              contratan de forma individual, normalmente a través de Discord. El alcance, el
              plazo y cualquier condición económica de cada encargo se acuerdan por escrito
              antes de comenzar el trabajo y prevalecen sobre estos Términos en caso de
              conflicto específico sobre ese encargo.
            </p>
          </LegalSection>

          <LegalSection id="uso-permitido" number="04" title="Uso permitido">
            <ul>
              <li>Consultar las herramientas del Sitio para uso personal o de tu comunidad/servidor.</li>
              <li>Compartir enlaces a perfiles de jugador, servidores o entradas de la wiki.</li>
              <li>Contactar para solicitar presupuesto o información sobre los servicios ofrecidos.</li>
            </ul>
          </LegalSection>

          <LegalSection id="uso-prohibido" number="05" title="Uso prohibido">
            <ul>
              <li>Realizar scraping masivo o peticiones automatizadas que puedan degradar el servicio para otros usuarios.</li>
              <li>Usar las herramientas del Sitio para acosar, suplantar o dañar a terceros.</li>
              <li>Presentar el contenido del Sitio como propio o eliminar avisos de autoría.</li>
              <li>Intentar vulnerar la seguridad del Sitio o de las APIs que consume.</li>
            </ul>
          </LegalSection>

          <LegalSection id="contenido-terceros" number="06" title="Contenido y APIs de terceros">
            <p>
              Las secciones de jugadores, servidores, wiki, changelogs y novedades muestran
              información obtenida de servicios externos como la API de Mojang, Crafatar,
              PlayerDB, Crafty.gg y mcsrvstat.us. No controlamos la disponibilidad ni la
              exactitud de esos datos, y no somos responsables de errores, retrasos o
              interrupciones originados en esos servicios de terceros.
            </p>
          </LegalSection>

          <LegalSection id="propiedad-intelectual" number="07" title="Propiedad intelectual">
            <p>
              El diseño, el código y los textos originales de este Sitio son propiedad de
              Shodzery. El código fuente de plugins o mods entregados como parte de un
              encargo se rige por lo acordado específicamente en ese contrato.
            </p>
          </LegalSection>

          <LegalSection id="marcas" number="08" title="Marcas y Mojang/Microsoft">
            <p>
              &quot;Minecraft&quot; es una marca registrada de Mojang Studios / Microsoft. Este
              Sitio no está afiliado, respaldado ni patrocinado por Mojang ni por Microsoft. El
              uso de nombres de usuario, skins o datos de servidores se hace únicamente con
              fines informativos.
            </p>
          </LegalSection>

          <LegalSection id="pagos" number="09" title="Pagos y encargos">
            <p>
              Las herramientas de consulta del Sitio son completamente gratuitas. Los servicios
              de desarrollo contratados pueden implicar un coste, que se comunica y acepta antes
              de iniciar el trabajo. Cualquier condición de pago, plazos de entrega o política
              de reembolso se define en la conversación previa a cada encargo, nunca de forma
              automática dentro del Sitio.
            </p>
          </LegalSection>

          <LegalSection id="disponibilidad" number="10" title="Disponibilidad del servicio">
            <p>
              No garantizamos que el Sitio o sus herramientas estén disponibles de forma
              ininterrumpida. Puede haber mantenimiento, cambios o caídas puntuales, incluidas
              las derivadas de los servicios de terceros de los que dependen las herramientas.
            </p>
          </LegalSection>

          <LegalSection id="garantias" number="11" title="Exención de garantías">
            <p>
              El Sitio y sus herramientas se ofrecen &quot;tal cual&quot; y &quot;según
              disponibilidad&quot;, sin garantías de ningún tipo, expresas o implícitas, sobre
              su exactitud, disponibilidad o idoneidad para un propósito concreto.
            </p>
          </LegalSection>

          <LegalSection id="responsabilidad" number="12" title="Limitación de responsabilidad">
            <p>
              En la máxima medida permitida por la ley, no seremos responsables de daños
              indirectos, incidentales o consecuentes derivados del uso del Sitio o de la
              imposibilidad de usarlo, incluidas pérdidas de datos o de disponibilidad de tu
              propio servidor.
            </p>
          </LegalSection>

          <LegalSection id="cambios" number="13" title="Cambios en estos términos">
            <p>
              Podemos actualizar estos Términos en cualquier momento. Los cambios relevantes se
              reflejarán actualizando la fecha en la parte superior de esta página. El uso
              continuado del Sitio tras una actualización implica la aceptación de los nuevos
              Términos.
            </p>
          </LegalSection>

          <LegalSection id="ley" number="14" title="Ley aplicable">
            <p>
              Estos Términos se interpretan conforme a la legislación aplicable en el lugar de
              residencia del operador del Sitio, sin perjuicio de los derechos que la ley de tu
              propio país de residencia pueda reconocerte como consumidor.
            </p>
          </LegalSection>

          <LegalSection id="contacto" number="15" title="Contacto">
            <LegalContact />
          </LegalSection>
        </LegalPage>
      </section>
    </main>
  )
}
