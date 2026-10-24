<script lang="ts">
	import * as Sidebar from "#lib/components/ui/sidebar/index.js";
	import * as Breadcrumb from "#lib/components/ui/breadcrumb/index.js";
	import * as Avatar from "#lib/components/ui/avatar/index.js";
	import * as Item from "#lib/components/ui/item/index.js";
	import AppSidebar from "../../lib/components/internal/app-sidebar/app-sidebar.svelte";
	const { children } = $props();

	const user = {
		username: "Aksin Benjamin",
		email: "maxleiter@vercel.com",
		avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
	};
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<div class="flex gap-4 items-center w-full px-4">
			<div class="block">
				<Sidebar.Trigger />
			</div>

			<div class="hidden sm:flex flex-1">
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/">Logs</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link>All Logs</Breadcrumb.Link>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>

			<div class="ml-auto px-2">
				<Item.Root size="xs" class="w-full p-2">
					<Item.Media>
						<Avatar.Root class="size-[--spacing(8)]">
							<Avatar.Image src={user.avatar} class="grayscale" />
							<Avatar.Fallback>
								{user.username.charAt(0)}
							</Avatar.Fallback>
						</Avatar.Root>
					</Item.Media>
					<Item.Content class="gap-0">
						<Item.Title>{user.username}</Item.Title>
						<Item.Description class="leading-none mt-0.5">
							{user.email}
						</Item.Description>
					</Item.Content>
				</Item.Root>
			</div>
		</div>

		{@render children?.()}
	</main>
</Sidebar.Provider>
