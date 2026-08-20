# LegalDocsService

Gobierno del ciclo de vida de los cuatro documentos legales versionados. Es el backend de la
tab **«Legales»** del panel de administración (`/api/legal/admin/*`, permiso `security:legal`).

El texto vive en el código (`sourcePath` de cada entrada de `LEGAL_DOCUMENTS`) y viaja con su
número en el mismo despliegue: por eso este servicio **no administra la versión**, la observa. Lo
que faltaba no era cambiar el número sino ver qué pasa con él.

- **Sello del texto**: recalcula el `sha256` del `.tsx` desplegado y lo compara con el
  `contentHash` declarado. Antes lo hacía un hook de git que había que instalar a mano en cada
  clon, así que no corría donde importaba. Fuera de la ventana de pre-vigencia, la deriva exige
  versionar; dentro, alcanza con corregir el hash.
- **PDF congelados**: inventario del nodo, generación de los faltantes al arrancar (reemplaza al
  script colgado de `bun run start`) y regeneración forzada con motivo obligatorio + audit
  fail-closed, en lugar de borrar el archivo a mano en el volumen de despliegue.
- **Anuncio de versión**: movido desde `SessionManagerService`. Marca en Redis, lease por nodo y
  `broadcastId` determinista, igual que antes; lo nuevo es que cada corrida queda asentada.
- **Aceptación**: `$group` sobre las cuentas activas (contadores, nunca personas), cacheado 5 min.

`kernelMode: 62` (después de `IdentityManagerService`, 60): ninguna app lo declara como
dependencia —el panel le habla por HTTP— así que sin kernelMode no lo cargaría nadie. Mismo caso
que `BreachRegisterService`, que también existe para una pantalla del panel.

Colección `legal_runs` (db `adc-legal`), append-only con TTL de 5 años
(`LEGAL_RUNS_RETENTION_DAYS`). Detalle operativo en
[docs/guides/legal-operations.md](../../../../docs/guides/legal-operations.md).
