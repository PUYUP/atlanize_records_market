import type { FilePreview, IEntity } from "@svar-ui/svelte-filemanager";
import { en } from "@svar-ui/filemanager-locales";
import { en as enCore } from "@svar-ui/core-locales";

// Salin locale Inggris, sesuaikan label filemanager
export const fileManagerWords = {
	...enCore,
	...en,
	filemanager: {
		...en.filemanager,
		"My files": "Files",
	},
};

export const defaultFilesData: IEntity[] = [
	{ id: "/Code", type: "folder", size: 4096, date: new Date() },
	{ id: "/Music", type: "folder", size: 4096, date: new Date() },
	{
		id: "/Music/The_sounds_of_silence.png",
		size: 6825661,
		date: new Date(),
		type: "file",
	},
	{
		id: "/Pictures",
		size: 907532,
		date: new Date(2023, 11, 4, 4, 1),
		type: "folder",
	},
	{
		id: "/Pictures/Forest.jpeg",
		size: 907532,
		date: new Date(2023, 11, 4, 4, 1),
		type: "file",
	},
	{
		id: "/Pictures/Night_sky.jpg",
		size: 84506,
		date: new Date(2023, 11, 4, 4, 1),
		type: "file",
	},
	{
		id: "/Pictures/Pattern.pdf",
		size: 124506,
		date: new Date(2023, 11, 4, 4, 5),
		type: "file",
	},
	{
		id: "/Pictures/Nature",
		size: 907532,
		date: new Date(2023, 11, 4, 4, 1),
		type: "folder",
	},
	{
		id: "/Pictures/Nature/Nature.jpg",
		size: 124506,
		date: new Date(2023, 11, 4, 4, 5),
		type: "file",
	},
	{ id: "/Info.zip", type: "file", size: 1000, date: new Date() },
];

// Ikon yang tersedia di static/icons/ (tanpa suffix -big/-small)
export const AVAILABLE_ICONS = new Set([
	"folder",
	"file",
	"zip",
	"txt",
	"sheet",
	"pdf",
	"png",
	"jpg",
]);

// Akhiran berkas multi-bagian dicek lebih dahulu (tar.gz dsb.)
export const ARCHIVE_SUFFIXES = [
	".tar.gz",
	".tar.bz2",
	".tar.xz",
	".tar.zst",
	".zip",
	".rar",
	".7z",
	".tar",
	".gz",
	".tgz",
	".bz2",
	".tbz2",
	".xz",
	".txz",
	".zst",
];

// Ekstensi -> nama ikon
export const EXT_ICON: Record<string, string> = {
	txt: "txt",
	text: "txt",
	md: "txt",
	log: "txt",
	rtf: "txt",
	doc: "txt",
	docx: "txt",
	odt: "txt",
	xls: "sheet",
	xlsx: "sheet",
	xlsm: "sheet",
	ods: "sheet",
	csv: "sheet",
	tsv: "sheet",
	pdf: "pdf",
	png: "png",
	jpg: "jpg",
	jpeg: "jpg",
};

export function getIconName(id: string): string {
	const lower = id.toLowerCase();

	if (ARCHIVE_SUFFIXES.some((s) => lower.endsWith(s))) return "zip";

	const base = lower.slice(lower.lastIndexOf("/") + 1);
	const dot = base.lastIndexOf(".");
	const ext = dot > 0 ? base.slice(dot + 1) : "";

	const name = EXT_ICON[ext] ?? "file";
	return AVAILABLE_ICONS.has(name) ? name : "file";
}

export function getFileIcon(file: FilePreview, size: "small" | "big"): string | false {
	if (file.type === "folder") return `/icons/folder-${size}.svg`;
	return `/icons/${getIconName(String((file as any).id ?? ""))}-${size}.svg`;
}

// Fallback saat berkas ikon gagal dimuat
export function handleIconError(e: Event) {
	const img = e.target;
	if (!(img instanceof HTMLImageElement)) return;

	const m = img.src.match(/\/icons\/([a-z0-9-]+)-(small|big)\.svg$/i);
	if (!m) return;

	const [, name, size] = m;
	if (name === "file" || name === "folder") return;

	img.src = `/icons/file-${size}.svg`;
}

// Interceptor agar tampilan filemanager terkunci di mode table
export function setupModeInterceptor(api: any) {
	if (!api?.intercept) return;
	api.intercept("set-mode", ({ mode }: any) => {
		if (mode === "cards" || mode === "panels") {
			queueMicrotask(() => api.exec("set-mode", { mode: "table" }));
			return false;
		}
	});
}

// Mengambil path panel aktif
export function getCurrentPath(api: any): string {
	if (!api?.getState) return "/";
	const { panels, activePanel } = api.getState();
	return panels?.[activePanel]?.path ?? "/";
}

// Memecah path menjadi segmen breadcrumb
export function getPathSegments(path: string) {
	return path
		.split("/")
		.filter(Boolean)
		.map((name, i, arr) => ({
			name,
			path: "/" + arr.slice(0, i + 1).join("/"),
		}));
}
