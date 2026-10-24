<script lang="ts">
	import "./component.css";
	import "@tarekraafat/autocomplete.js/dist/css/autoComplete.02.css";
	import * as Avatar from "#lib/components/ui/avatar/index.js";
	import * as Table from "#lib/components/ui/table/index.js";
	import * as Tabs from "#lib/components/ui/tabs/index.js";
	import * as Item from "#lib/components/ui/item/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import * as Label from "#lib/components/ui/label/index.js";
	import * as Card from "#lib/components/ui/card/index.js";
	import * as RadioGroup from "#lib/components/ui/radio-group/index.js";
	import * as Select from "#lib/components/ui/select/index.js";
	import * as Accordion from "#lib/components/ui/accordion/index.js";
	import * as InputGroup from "#lib/components/ui/input-group/index.js";
	import * as Dialog from "#lib/components/ui/dialog/index.js";
	import Button from "#lib/components/ui/button/button.svelte";
	import { Separator } from "#lib/components/ui/separator/index.js";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import {
		Filemanager,
		Willow,
		type IEntity,
	} from "@svar-ui/svelte-filemanager";
	import {
		Database,
		NotepadText,
		StickyNotePlus,
		UserCog,
		Tags as TagsIcon,
		Plus,
		UsersRound,
		UsersCollaboration,
		NotebookText,
		FolderTree,
		ChartCandlestick,
		Edit,
		EditIcon,
		Save,
		Eye,
		Copyright,
		DollarSign,
		X as CloseIcon,
		IdCardLanyard,
		User,
		Signpost,
	} from "@lucide/svelte";
	import {
		Calendar,
		ChevronsUpDown,
		FileQuestionMark,
		ShieldCheck,
		University,
		UserPlus,
	} from "lucide-svelte";

	import Tags from "svelte-tags-input";
	import { onMount } from "svelte";
	import { CurrencyInput } from "@canutin/svelte-currency-input";

	let price = $state<string>("");
	let resources = $state<string[]>([]);
	let roles = $state<string[]>([]);
	let keywords = $state<string[]>([]);
	let inputEl = $state<HTMLInputElement | null>(null);
	let wrapperEl = $state<HTMLDivElement | null>(null);

	const resourceType = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"American Samoa",
		"Andorra",
	];

	const keywordList = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"American Samoa",
		"Andorra",
	];

	const roleList = [
		{
			name: "Annotator",
			slug: "annotator",
		},
		{
			name: "Contact person",
			slug: "contact_person",
		},
		{
			name: "Data collector",
			slug: "data_collector",
		},
		{
			name: "Data curator",
			slug: "data_curator",
		},
		{
			name: "Data manager",
			slug: "data_manager",
		},
		{
			name: "Distributor",
			slug: "distributor",
		},
		{
			name: "Editor",
			slug: "editor",
		},
		{
			name: "Hosting institution",
			slug: "hosting_institution",
		},
		{
			name: "Other",
			slug: "other",
		},
		{
			name: "Producer",
			slug: "producer",
		},
		{
			name: "Project leader",
			slug: "project_leader",
		},
		{
			name: "Project manager",
			slug: "project_manager",
		},
		{
			name: "Project member",
			slug: "project_member",
		},
		{
			name: "Registration agency",
			slug: "registration_agency",
		},
		{
			name: "Registration authority",
			slug: "registration_authority",
		},
		{
			name: "Related person",
			slug: "related_person",
		},
		{
			name: "Research group",
			slug: "research_group",
		},
		{
			name: "Researcher",
			slug: "researcher",
		},
		{
			name: "Rights holder",
			slug: "rights_holder",
		},
		{
			name: "Sponsor",
			slug: "sponsor",
		},
		{
			name: "Supervisor",
			slug: "supervisor",
		},
		{
			name: "Work package leader",
			slug: "work_package_leader",
		},
	];

	const filesData: IEntity[] = [
		{ id: "/Code", type: "folder", size: 4096, date: new Date() },
		{ id: "/Info.txt", type: "file", size: 1000, date: new Date() },
	];

	// buka list saat input fokus (termasuk fokus lewat Tab)
	function openListOnFocus(e: Event) {
		if (e.target instanceof HTMLInputElement) e.target.click();
	}

	function onFocusIn(e: Event) {
		(e.currentTarget as HTMLElement)
			.closest("[data-accordion-content]")
			?.classList.add("tags-focused");
	}

	function onFocusOut(e: Event) {
		(e.currentTarget as HTMLElement)
			.closest("[data-accordion-content]")
			?.classList.remove("tags-focused");
	}

	onMount(() => {
		const els = document.querySelectorAll<HTMLElement>(
			".svelte-tags-input-layout",
		);
		els.forEach((el) => {
			el.addEventListener("focusin", onFocusIn);
			el.addEventListener("focusout", onFocusOut);
		});

		// cleanup
		return () => {
			els.forEach((el) => {
				el.removeEventListener("focusin", onFocusIn);
				el.removeEventListener("focusout", onFocusOut);
			});
		};
	});

	// autoComplete.js: jalan setiap kali input di dalam dialog muncul
	$effect(() => {
		const input = inputEl;
		const wrapper = wrapperEl;
		if (!input || !wrapper) return;

		let ac: any;
		let cancelled = false;

		(async () => {
			const { default: autoComplete } = await import(
				"@tarekraafat/autocomplete.js"
			);
			if (cancelled) return;

			ac = new autoComplete({
				selector: () => input,
				threshold: 1,
				debounce: 300,
				data: {
					src: async (query: string) => {
						const res = await fetch(
							`https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(query)}`,
						);
						return await res.json();
					},
					keys: ["name"],
					cache: false,
				},
				resultsList: {
					destination: () => wrapper,
					position: "beforeend",
				},
				resultItem: { highlight: true },
				events: {
					input: {
						selection: (event: any) => {
							input.value = event.detail.selection.value.name;
						},
					},
				},
			});
		})();

		return () => {
			cancelled = true;
			try {
				ac?.unInit();
			} catch {}
		};
	});

	// add author handler
	let authorDialogOpen = $state(false);
	function addAuthorHandler() {
		authorDialogOpen = true;
	}

	// turunan: array object yang terpilih
	const selectedRole = $derived(
		roles.map((t) => roleList.find((o) => o.name === t)).filter(Boolean),
	);

	$effect(() => {
		console.log(selectedRole);
	});

	// Pengaman tambahan: blokir perpindahan ke cards/panels.
	// "search" tetap diizinkan supaya pencarian berfungsi.
	function fileManagerInit(api: any) {
		api.intercept("set-mode", ({ mode }: any) => {
			if (mode === "cards" || mode === "panels") return false;
		});
	}
</script>

<div class="block xl:flex gap-8">
	<div class="flex-1 min-w-0">
		<div class="block">
			<Accordion.Root
				class="record-accordion gap-4"
				type="multiple"
				value={["basic-information"]}
			>
				<Accordion.Item value="basic-information" class="!border-b-0">
					<Accordion.Trigger class="cursor-pointer">
						Basic information
					</Accordion.Trigger>
					<Accordion.Content class="px-1">
						<Card.Root class="rounded-md mt-4 overflow-visible">
							<Card.Content class="overflow-visible">
								<Field.FieldGroup class="gap-4">
									<Field.Field class="gap-2">
										<Field.Label for="inline-start-input">
											<NotepadText class="size-4" />
											Title
											<span class="text-red-500">*</span>
										</Field.Label>
										<InputGroup.Root>
											<InputGroup.Input
												placeholder="e.g. Finding a new species of plant"
												required
											/>
										</InputGroup.Root>
									</Field.Field>

									<Field.Field class="gap-2">
										<Field.Label for="inline-start-input">
											<Calendar class="size-4" />
											Research date
											<span class="text-red-500">*</span>
										</Field.Label>
										<InputGroup.Root>
											<InputGroup.Input
												placeholder="YYYY-MM-DD or YYYY-MM-DD/YYYY-MM-DD for intervals. MM and DD are optional."
												required
											/>
										</InputGroup.Root>
										<Field.Description
											class="text-xs !text-neutral-500"
										>
											In case your upload was already
											published elsewhere, please use the
											date of the first publication.
											Format: YYYY-MM-DD, YYYY-MM, or
											YYYY. For intervals use DATE/DATE,
											e.g. 1939/1945
										</Field.Description>
									</Field.Field>

									<Field.Field class="gap-2">
										<Field.Label for="resource-type">
											<Database class="size-4" />
											Resource type
											<span class="text-red-500">*</span>
										</Field.Label>

										<div onfocusin={openListOnFocus}>
											<Tags
												bind:tags={resources}
												addKeys={[]}
												onTagAdded={(tag) =>
													(resources = [String(tag)])}
												allowPaste={true}
												allowDrop={true}
												splitWith={"/"}
												onlyUnique={true}
												removeKeys={[8, 27]}
												placeholder={"Click to select..."}
												autoComplete={resourceType}
												autoCompleteStartFocused={false}
												name={"resources"}
												id={"resources"}
												allowBlur={true}
												cleanOnBlur={true}
												minChars={0}
												onlyAutocomplete={true}
												labelText={"Label Example"}
												labelShow={false}
												onTagClick={(tag) => alert(tag)}
											/>
										</div>
									</Field.Field>

									<Field.Field class="gap-2">
										<Field.Label for="inline-start-input">
											<TagsIcon class="size-4" />
											Keywords and subjects
											<span class="text-red-500">*</span>
										</Field.Label>

										<div onfocusin={openListOnFocus}>
											<Tags
												bind:tags={keywords}
												addKeys={[9, 13]}
												maxTags={15}
												allowPaste={true}
												allowDrop={true}
												splitWith={"/"}
												onlyUnique={true}
												removeKeys={[8, 27]}
												placeholder={"Enter a keyword or subject..."}
												autoComplete={keywordList}
												name={"keywords"}
												id={"keywords"}
												allowBlur={true}
												minChars={1}
												onlyAutocomplete={false}
												labelText={"Label Example"}
												labelShow={false}
												onTagClick={(tag) => alert(tag)}
											/>
										</div>

										<Field.Description
											class="text-xs !text-neutral-500"
										>
											Type a few keywords or subjects to
											help researchers find record. Use
											"Tab" or "Enter" to add a new
											keyword.
										</Field.Description>
									</Field.Field>
								</Field.FieldGroup>
							</Card.Content>
						</Card.Root>
					</Accordion.Content>
				</Accordion.Item>
				<!-- /.basic information -->

				<Accordion.Item
					value="authors-contributors"
					class="!border-b-0"
				>
					<Accordion.Trigger class="cursor-pointer">
						Authors & contributors
					</Accordion.Trigger>
					<Accordion.Content class="px-1">
						<Card.Root class="rounded-md mt-4 overflow-visible">
							<Card.Content class="overflow-visible">
								<div class="flex flex-col gap-2 !pb-0">
									<div class="flex items-center">
										<Field.Field class="gap-2">
											<Field.Label
												for="inline-start-input"
											>
												<UsersRound class="size-4" />
												Authors
												<span class="text-red-500"
													>*</span
												>
											</Field.Label>
										</Field.Field>

										<Button
											variant="link"
											size="sm"
											class="w-22 ml-auto"
											onclick={addAuthorHandler}
										>
											<Plus />
											Add
										</Button>
									</div>

									<Separator />

									<div class="flex items-center">
										<Field.Field class="gap-2">
											<Field.Label
												for="inline-start-input"
											>
												<UsersCollaboration
													class="size-4"
												/>
												Contributors
											</Field.Label>
										</Field.Field>

										<Button
											variant="link"
											size="sm"
											class="w-22 ml-auto"
										>
											<Plus />
											Add
										</Button>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</Accordion.Content>
				</Accordion.Item>
				<!-- /.authors & contributors -->

				<Accordion.Item value="research-content" class="!border-b-0">
					<Accordion.Trigger class="cursor-pointer">
						Contents
					</Accordion.Trigger>
					<Accordion.Content class="px-1">
						<Card.Root class="rounded-md mt-4 overflow-visible">
							<Card.Content class="overflow-visible">
								<div class="flex flex-col gap-2 !pb-0">
									<div class="block w-full">
										<div class="flex items-center">
											<Field.Field class="gap-2">
												<Field.Label
													for="inline-start-input"
												>
													<NotebookText
														class="size-4"
													/>
													Abstract
													<span class="text-red-500"
														>*</span
													>
												</Field.Label>
											</Field.Field>

											<Button
												variant="link"
												size="sm"
												class="w-22 ml-auto"
											>
												<EditIcon />
												Edit
											</Button>
										</div>

										<div class="block pt-2 pb-4">
											<div
												class="block p-4 bg-neutral-100 rounded-lg"
											>
												Sed lobortis lacinia tellus, sed
												venenatis eros lobortis et. Cras
												tincidunt tincidunt dolor, id
												gravida metus semper sit amet.
												Quisque vel egestas mi, quis
												pretium libero. Vestibulum at
												magna vitae justo sodales
												tristique a eget nisl. Curabitur
												elementum ullamcorper tincidunt.
												Mauris vel arcu interdum,
												facilisis lacus id, tristique
												est. Integer egestas diam et
												orci blandit, vel ullamcorper
												velit aliquam. Vestibulum in
												vestibulum arcu. Etiam sit amet
												varius lorem. Sed libero risus,
												sagittis eget nunc eu, auctor
												luctus ex. Nulla eu sodales
												elit. Aliquam in odio non tortor
												pretium porttitor eu a sapien.
												In diam lectus, congue tempus
												dolor vel, condimentum molestie
												purus. Donec sed ultrices velit,
												a venenatis libero. Sed eu justo
												vitae nunc rhoncus eleifend eu
												pretium augue. Praesent
												fringilla tincidunt semper.
											</div>
										</div>
									</div>

									<Separator />

									<div class="flex items-center">
										<Field.Field class="gap-2">
											<Field.Label
												for="inline-start-input"
											>
												<FileQuestionMark
													class="size-4"
												/>
												Introduction
											</Field.Label>
										</Field.Field>

										<Button
											variant="link"
											size="sm"
											class="w-22 ml-auto"
										>
											<Plus />
											Add
										</Button>
									</div>

									<Separator />

									<div class="block w-full">
										<div class="flex items-center">
											<Field.Field class="gap-2">
												<Field.Label
													for="inline-start-input"
												>
													<FolderTree
														class="size-4"
													/>
													Methodology
													<span class="text-red-500"
														>*</span
													>
												</Field.Label>
											</Field.Field>

											<Button
												variant="link"
												size="sm"
												class="w-22 ml-auto"
											>
												<EditIcon />
												Edit
											</Button>
										</div>

										<div class="block pt-2 pb-4">
											<div
												class="block p-4 bg-neutral-100 rounded-lg"
											>
												Lorem ipsum dolor sit amet,
												consectetur adipiscing elit.
												Nulla mattis ligula quis lorem
												efficitur scelerisque. Maecenas
												sed condimentum ante.
												Suspendisse arcu lectus,
												sollicitudin euismod sodales
												non, tempor eu tellus. Maecenas
												non dui risus. Nulla feugiat est
												eu lectus vehicula, et faucibus
												nisl ullamcorper. Vestibulum
												pharetra, elit sed mollis
												rutrum, est quam finibus dui,
												sit amet tincidunt lectus purus
												sed augue. Quisque mattis tempus
												porttitor. Suspendisse ornare
												felis ipsum.
											</div>
										</div>
									</div>

									<Separator />

									<div class="flex items-center">
										<Field.Field class="gap-2">
											<Field.Label
												for="inline-start-input"
											>
												<ChartCandlestick
													class="size-4"
												/>
												Results
												<span class="text-red-500"
													>*</span
												>
											</Field.Label>
										</Field.Field>

										<Button
											variant="link"
											size="sm"
											class="w-22 ml-auto"
										>
											<Plus />
											Add
										</Button>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</Accordion.Content>
				</Accordion.Item>
				<!-- /.research contents -->

				<Accordion.Item value="files" class="!border-b-0">
					<Accordion.Trigger class="cursor-pointer">
						File manager
					</Accordion.Trigger>
					<Accordion.Content class="px-1">
						<div class="mt-4 overflow-visible">
							<Willow>
								<div class="fm-host">
									<Filemanager
										data={filesData}
										mode={"table"}
										init={fileManagerInit}
									/>
								</div>
							</Willow>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<!-- /.files -->
			</Accordion.Root>
		</div>
	</div>

	<div class="flex-none pt-8 xl:pt-0">
		<div class="w-full xl:w-[320px] sticky top-10 h-fit">
			<Card.Root class="rounded-md">
				<Card.Content>
					<Field.FieldGroup class="gap-4 mb-2">
						<Field.Field class="gap-2">
							<Field.Label for="inline-start-input">
								<DollarSign class="size-4" />
								Prices
							</Field.Label>
							<div class="block">
								<CurrencyInput
									bind:value={price}
									intlConfig={{
										locale: "en-US",
										currency: "USD",
									}}
									class="w-full rounded-lg"
									placeholder="0.00"
								/>
							</div>
							<Field.Description
								class="text-xs !text-neutral-500"
							>
								How much does this record cost per-access or
								per-download? (0.00 = Free).
							</Field.Description>
						</Field.Field>
					</Field.FieldGroup>

					<div class="grid grid-cols-2 gap-4">
						<div class="block">
							<Button variant="outline" class="w-full">
								<Save />
								Save Draft
							</Button>
						</div>

						<div class="block">
							<Button
								variant="default"
								color="primary"
								class="w-full"
							>
								<Eye />
								Publish
							</Button>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>

<Dialog.Root bind:open={authorDialogOpen}>
	<Dialog.Content
		onInteractOutside={(event: Event) => event.preventDefault()}
		showCloseButton={false}
		class="gap-4 max-w-xl w-4/5"
	>
		<Dialog.Header>
			<Dialog.Title class="!text-lg">Add author</Dialog.Title>
		</Dialog.Header>

		<Separator />

		<div class="block">
			<Field.FieldGroup class="gap-4 mb-2">
				<Field.Field class="gap-2">
					<Field.Label for="inline-start-input">
						<Signpost class="size-4" />
						Type
					</Field.Label>
					<RadioGroup.Root
						value="organization"
						class="w-full flex flex-row gap-10"
					>
						<div class="flex items-center gap-2">
							<RadioGroup.Item value="person" id="person" />
							<Field.Label for="person" class="font-normal">
								Person
							</Field.Label>
						</div>
						<div class="flex items-center gap-2">
							<RadioGroup.Item
								value="organization"
								id="organization"
							/>
							<Field.Label for="organization" class="font-normal">
								Organization
							</Field.Label>
						</div>
					</RadioGroup.Root>
				</Field.Field>

				<Separator />

				<Field.Field class="gap-2">
					<Field.Label for="inline-start-input">
						<User class="size-4" />
						Name
						<span class="text-red-500">*</span>
					</Field.Label>

					<div
						bind:this={wrapperEl}
						class="relative autoComplete_wrapper"
					>
						<InputGroup.Root>
							<InputGroup.Input
								bind:ref={inputEl}
								placeholder="Search for persons by name, identifier, or affiliation..."
								autocomplete="off"
								required
							/>
						</InputGroup.Root>
					</div>
				</Field.Field>

				<Field.Field class="gap-2">
					<Field.Label for="inline-start-input">
						<IdCardLanyard class="size-4" />
						Identifier
						<span class="text-red-500">*</span>
					</Field.Label>
					<div onfocusin={openListOnFocus}>
						<Tags
							bind:tags={keywords}
							addKeys={[9, 13]}
							maxTags={15}
							allowPaste={true}
							allowDrop={true}
							splitWith={"/"}
							onlyUnique={true}
							removeKeys={[8, 27]}
							placeholder={"e.g. ORCID, ISNI or GND"}
							autoComplete={keywordList}
							name={"identifiers"}
							id={"identifiers"}
							allowBlur={true}
							minChars={1}
							onlyAutocomplete={false}
							labelText={"Label Example"}
							labelShow={false}
							onTagClick={(tag) => alert(tag)}
						/>
					</div>
				</Field.Field>

				<Field.Field class="gap-2">
					<Field.Label for="role">
						<ShieldCheck class="size-4" />
						Role
						<span class="text-red-500">*</span>
					</Field.Label>

					<div onfocusin={openListOnFocus}>
						<Tags
							bind:tags={roles}
							addKeys={[]}
							onTagAdded={(tag) => (roles = [String(tag)])}
							allowPaste={true}
							allowDrop={true}
							splitWith={"/"}
							onlyUnique={true}
							removeKeys={[8, 27]}
							placeholder={"Click to select..."}
							autoComplete={roleList.map((o) => o.name)}
							autoCompleteStartFocused={false}
							name={"roles"}
							id={"roles"}
							allowBlur={true}
							cleanOnBlur={true}
							minChars={0}
							onlyAutocomplete={true}
							labelText={"Label Example"}
							labelShow={false}
							onTagClick={(tag) => alert(tag)}
							autoCompleteKey="name"
							autoCompleteValue="slug"
						/>
					</div>
				</Field.Field>
			</Field.FieldGroup>
		</div>

		<Dialog.Footer>
			<div class="flex justify-between flex-1">
				<div class="block">
					<Button
						variant="ghost"
						onclick={() => (authorDialogOpen = false)}
					>
						<CloseIcon />
						Cancel
					</Button>
				</div>

				<div class="block">
					<Button
						variant="default"
						color="primary"
						onclick={() => (authorDialogOpen = false)}
					>
						<Save />
						Save
					</Button>
				</div>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
