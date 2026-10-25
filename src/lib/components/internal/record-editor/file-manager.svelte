<script lang="ts">
	import "./component.css";
	import Button from "#lib/components/ui/button/button.svelte";
	import { FolderPlus } from "lucide-svelte";
	import { FilePlusCorner } from "@lucide/svelte";
	import { onMount } from "svelte";
	import { browser } from "$app/env";
	import type { IEntity } from "@svar-ui/svelte-filemanager";
	import {
		fileManagerWords,
		defaultFilesData,
		getFileIcon,
		handleIconError,
		setupModeInterceptor,
		getCurrentPath,
	} from "./file-manager.utils.js";

	interface Props {
		data?: IEntity[];
		mode?: string;
		activePanel?: number;
		api?: any;
		currentPath?: string;
		onAddFolder?: () => void;
		onAddFile?: () => void;
		onPathChange?: (path: string) => void;
	}

	let {
		data = defaultFilesData,
		mode = "table",
		activePanel = 0,
		api = $bindable(null),
		currentPath = $bindable("/"),
		onAddFolder,
		onAddFile,
		onPathChange,
	}: Props = $props();

	let hostEl = $state<HTMLDivElement | null>(null);
	let FM = $state<any>(null);
	let Loc = $state<any>(null);

	function syncPath() {
		currentPath = getCurrentPath(api);
		onPathChange?.(currentPath);
	}

	function fileManagerInit(fm: any) {
		api = fm;

		// Perbarui setiap kali folder berpindah
		fm.on("set-path", syncPath);
		fm.on("set-active-panel", syncPath);

		// Batasi mode hanya table
		setupModeInterceptor(api);

		syncPath(); // Nilai awal
	}

	function handleAddFolder() {
		if (onAddFolder) {
			syncPath();

			api.exec("create-file", {
				file: {
					name: "Test",
					type: "folder",
					date: new Date(),
					size: 400000000000,
				},
				parent: currentPath,
				newId: "13141",
			});

			onAddFolder();
		}
	}

	function handleAddFile() {
		if (onAddFile) {
			syncPath();

			api.exec("create-file", {
				file: {
					name: "Test.txt",
					type: "file",
					date: new Date(),
					size: 89404,
				},
				parent: currentPath,
				newId: "13141",
			});

			onAddFile();
		}
	}

	onMount(() => {
		const el = hostEl;
		if (el) {
			// Event "error" tidak bubble, jadi harus lewat fase capture
			el.addEventListener("error", handleIconError, true);
		}

		(async () => {
			const [fm, core] = await Promise.all([
				import("@svar-ui/svelte-filemanager"),
				import("@svar-ui/svelte-core"),
			]);
			FM = fm.Filemanager;
			Loc = core.Locale;
		})();

		return () => {
			if (el) {
				el.removeEventListener("error", handleIconError, true);
			}
		};
	});
</script>

<div class="block flex items-center gap-2">
	Add new:
	<Button type="button" size="sm" variant="ghost" onclick={handleAddFolder}>
		<FolderPlus />
		Folder
	</Button>

	<Button type="button" size="sm" variant="ghost" onclick={handleAddFile}>
		<FilePlusCorner />
		File
	</Button>
</div>

<div class="flex items-center gap-4">
	<div class="w-full">
		<div class="fm-host" bind:this={hostEl}>
			{#if browser && FM && Loc}
				<Loc words={fileManagerWords}>
					<FM
						{data}
						{mode}
						init={fileManagerInit}
						icons={getFileIcon}
						{activePanel}
					/>
				</Loc>
			{/if}
		</div>
	</div>
</div>
