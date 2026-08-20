import { Type } from "@sinclair/typebox";
import { LEGAL_REBUILD_MIN_REASON } from "@common/types/legal/index.ts";

/** Schemas TypeBox de la tab «Legales» del panel de administración. */

const DocId = Type.Union([Type.Literal("terms"), Type.Literal("privacy"), Type.Literal("cookies"), Type.Literal("dpa")]);

const PdfInfo = Type.Object({
	file: Type.String(),
	bytes: Type.Number(),
	generatedAt: Type.String({ format: "date-time" }),
	href: Type.String(),
});

const Correction = Type.Object({
	date: Type.String(),
	summary: Type.String(),
});

const DocOverview = Type.Object({
	id: Type.String(),
	label: Type.String(),
	href: Type.String(),
	version: Type.String(),
	effectiveFrom: Type.String(),
	requiresAcceptance: Type.Boolean(),
	sourcePath: Type.String(),
	state: Type.Union([Type.Literal("en-preaviso"), Type.Literal("vigente")]),
	daysUntilEffective: Type.Number(),
	noticeDays: Type.Number(),
	noticeOk: Type.Boolean(),
	sealedHash: Type.String(),
	deployedHash: Type.Union([Type.String(), Type.Null()]),
	drifted: Type.Boolean(),
	corrections: Type.Array(Correction),
	pdf: Type.Union([PdfInfo, Type.Null()]),
});

const Adoption = Type.Object({
	total: Type.Number(),
	accepted: Type.Number(),
	pending: Type.Number(),
	pendingSeen: Type.Number(),
	pendingDormant: Type.Number(),
	deleting: Type.Number(),
	computedAt: Type.String({ format: "date-time" }),
	termsVersion: Type.String(),
	privacyVersion: Type.String(),
	enforcedFrom: Type.String(),
});

export const OverviewResponse = Type.Object({
	docs: Type.Array(DocOverview),
	adoption: Type.Union([Adoption, Type.Null()]),
	nextVersion: Type.Object({ version: Type.String(), effectiveFrom: Type.String() }),
	nodeId: Type.String(),
});

export const RunsQuery = Type.Object({
	limit: Type.Optional(Type.String({ pattern: String.raw`^\d+$`, description: "Tamaño de página (máx. 100, por defecto 25)" })),
	cursor: Type.Optional(Type.String({ description: "`nextCursor` de la página anterior" })),
});

export const RunsResponse = Type.Object({
	items: Type.Array(
		Type.Object({
			id: Type.String(),
			kind: Type.Union([Type.Literal("pdf"), Type.Literal("announce"), Type.Literal("rebuild")]),
			at: Type.String({ format: "date-time" }),
			nodeId: Type.String(),
			actorUserId: Type.Union([Type.String(), Type.Null()]),
			ok: Type.Boolean(),
			summary: Type.String(),
			docIds: Type.Array(Type.String()),
		})
	),
	nextCursor: Type.Union([Type.String(), Type.Null()]),
});

export const PdfBuildResponse = Type.Object({
	ok: Type.Boolean(),
	written: Type.Array(Type.String()),
	skipped: Type.Array(Type.String()),
	durationMs: Type.Number(),
});

export const RebuildBody = Type.Object({
	docId: DocId,
	reason: Type.String({
		minLength: LEGAL_REBUILD_MIN_REASON,
		maxLength: 300,
		description: "Por qué se rehace un archivo congelado. Queda en el audit log y en el historial.",
	}),
});

export const AnnounceBody = Type.Object({ docId: DocId });

export const AnnounceResponse = Type.Object({ ok: Type.Boolean() });
