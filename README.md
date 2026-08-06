# help [![Security](https://github.com/A-Digital-Cafe/help/actions/workflows/security.yml/badge.svg)](https://github.com/A-Digital-Cafe/help/actions/workflows/security.yml)

Preset con la app `help`: centro de ayuda de la plataforma, tutoriales y las páginas
institucionales — política de privacidad, términos, cookies, valores, ética, HRIA, transparencia,
solicitudes de autoridades, equipo y hoja de ruta.

## Contenido

- `apps/help/` — App UI federada (host, `isHost: true`) servida en el subdominio `help`. Usa
  `SEOService` (opcional) para sitemap y metadatos por página, y `media-ui-library` (preset
  `adc-media`) para renderizar los tutoriales en Markdown.

## Por qué vive en su propio repositorio

No es una separación técnica sino de licencia. Esta app publica **textos legales que identifican a
una persona concreta como responsable del tratamiento** (con nombre real, CUIT y datos de contacto) y
**datos personales de terceros** (nombres y fotografías del equipo, publicados con permiso para este
sitio). Bajo la licencia permisiva del repositorio principal, cualquiera podría redistribuir un fork
que sirva una política de privacidad nombrando a otra persona como responsable de los datos de sus
usuarios.

Por eso este repositorio tiene [LICENSE.md](LICENSE.md) y
[TRADEMARK_POLICY.md](TRADEMARK_POLICY.md) propios: el **código** sigue siendo ISC y reutilizable,
pero los textos legales, los datos del equipo y la marca quedan expresamente fuera de la concesión.
Leelos antes de forkear.

## Fuente de verdad de las versiones legales

La versión vigente de los Términos y de la Política de Privacidad **no vive acá**: vive en
`@common/utils/legal-docs.ts`, en el repositorio principal, porque también la necesitan el formulario
de registro (que graba qué versión aceptó cada persona) y el avisador de cambios. Al editar un
documento legal hay que subir su versión ahí; esta app la lee y la muestra como fecha de última
actualización.

## Uso

El preset es opcional: si la carpeta está presente, la app se carga; si no, la plataforma funciona
igual (los enlaces a `/privacy`, `/terms` y demás quedan sin destino, pero nada se rompe).
