# Help

Centro de ayuda público: tutoriales de la plataforma y base legal/ética del sitio (privacidad
—Ley 25.326 y RGPD para personas en la UE—, cookies, términos, valores + marco GNI, código de
ética, contacto y roadmap de cumplimiento).

- `src/pages/`: páginas estáticas versionadas (`/`, `/privacy`, `/cookies`, `/dpa` —para
  organizaciones con plan de equipo—, `/terms`, `/licenses`, `/values`, `/ethics`, `/hria`,
  `/authority-requests`, `/transparency`, `/contact`, `/roadmap`) y tutoriales.
- `src/components/`: layout con sidebar y header. `src/data/`: contactos y metadatos.

Los tutoriales se descubren en runtime: cada microfront publica `public/tutorials/index.json`
+ `.md` en su propio origen y esta app los lista/renderiza vía `@ui-library/utils/tutorials`
y `@ui-library/utils/markdown-blocks` (ver `docs/structure/apps/frontend.md`).
