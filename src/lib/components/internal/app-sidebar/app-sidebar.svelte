<script lang="ts">
    import "./style.css";
    import { page } from "$app/state";
    import type { Component } from "svelte";
    import * as Sidebar from "#lib/components/ui/sidebar/index.js";
    import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
    import * as Collapsible from "#lib/components/ui/collapsible/index.js";
    import {
        ChevronsUpDown,
        ChevronRight,
        University,
        FileText,
        Receipt,
        Search,
        Wallet,
        Settings,
        LayoutDashboard,
    } from "@lucide/svelte";
    import { Plus } from "lucide-svelte";

    type SubItem = { title: string; url: string };

    type MenuItem = {
        title: string;
        icon: Component;
        url?: string;
        items?: SubItem[];
    };

    const organizations = [
        {
            id: "berkeley",
            name: "University of Berkeley",
            description: "Bio Lab, Room 123",
        },
        {
            id: "dynopark",
            name: "Dynopark Konjaru",
            description: "Startup 12, Inc",
        },
    ];

    const menus: MenuItem[] = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            url: "/",
        },
        {
            title: "Discover",
            icon: Search,
            url: "/discover",
        },
        {
            title: "My Records",
            icon: FileText,
            items: [
                { title: "Add New", url: "/records-editor" },
                { title: "Published", url: "/records/published" },
                { title: "Drafts", url: "/records/draft" },
            ],
        },
        {
            title: "Transactions",
            icon: Receipt,
            items: [
                { title: "All Transactions", url: "/transaction" },
                { title: "Add New", url: "/transaction/new" },
            ],
        },
        {
            title: "Earnings",
            icon: Wallet,
            url: "/earnings",
        },
        {
            title: "Settings",
            icon: Settings,
            url: "/settings",
        },
    ];

    type Organization = (typeof organizations)[number];
    let selected = $state<Organization>(organizations[0]);

    // Aktif jika path sama persis atau halaman turunannya (/report/123 -> /report)
    function isActive(url?: string) {
        if (!url) return false;
        const path = page.url.pathname;
        return path === url || path.startsWith(url + "/");
    }

    // Aktif hanya jika path sama persis (untuk sub-menu)
    function isExact(url?: string) {
        return !!url && page.url.pathname === url;
    }
</script>

<Sidebar.Root>
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        {#snippet child({ props })}
                            <Sidebar.MenuButton class="py-6" {...props}>
                                <div class="flex flex-row py-2">
                                    <div
                                        class="w-10 h-10 flex items-center justify-start"
                                    >
                                        <University class="!size-6" />
                                    </div>
                                    <div class="block flex-1">
                                        <span class="block">
                                            {selected.name}
                                        </span>
                                        <span
                                            class="text-xs block text-neutral-500"
                                        >
                                            {selected.description}
                                        </span>
                                    </div>
                                </div>
                                <ChevronsUpDown class="ms-auto" />
                            </Sidebar.MenuButton>
                        {/snippet}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        {#each organizations as org (org.id)}
                            <DropdownMenu.Item
                                onSelect={() => (selected = org)}
                            >
                                <div class="flex flex-col">
                                    <div class="block">{org.name}</div>
                                    <div class="text-xs block text-neutral-500">
                                        {org.description}
                                    </div>
                                </div>
                            </DropdownMenu.Item>
                        {/each}

                        {#if organizations.length > 0}
                            <DropdownMenu.Separator />
                        {/if}

                        <DropdownMenu.Item>
                            <a
                                href="/organizations-new"
                                class="flex flex-col w-full"
                            >
                                <div class="flex items-center gap-2">
                                    <Plus class="size-4" />
                                    <div class="block">Add Organization</div>
                                </div>
                            </a>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Header>

    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each menus as menu (menu.title)}
                        {#if menu.items?.length}
                            {@const items = menu.items}
                            <Collapsible.Root
                                class="group/collapsible"
                                open={items.some((s) => isActive(s.url))}
                            >
                                {#snippet child({ props })}
                                    <Sidebar.MenuItem {...props}>
                                        <Collapsible.Trigger>
                                            {#snippet child({ props })}
                                                <Sidebar.MenuButton
                                                    {...props}
                                                    isActive={items.some((s) =>
                                                        isExact(s.url),
                                                    )}
                                                >
                                                    <menu.icon />
                                                    <span>{menu.title}</span>
                                                    <ChevronRight
                                                        class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                                    />
                                                </Sidebar.MenuButton>
                                            {/snippet}
                                        </Collapsible.Trigger>
                                        <Collapsible.Content>
                                            <Sidebar.MenuSub>
                                                {#each items as sub (sub.title)}
                                                    <Sidebar.MenuSubItem>
                                                        <Sidebar.MenuSubButton
                                                            isActive={isExact(
                                                                sub.url,
                                                            )}
                                                        >
                                                            {#snippet child({
                                                                props,
                                                            })}
                                                                <a
                                                                    href={sub.url}
                                                                    {...props}
                                                                >
                                                                    <span
                                                                        >{sub.title}</span
                                                                    >
                                                                </a>
                                                            {/snippet}
                                                        </Sidebar.MenuSubButton>
                                                    </Sidebar.MenuSubItem>
                                                {/each}
                                            </Sidebar.MenuSub>
                                        </Collapsible.Content>
                                    </Sidebar.MenuItem>
                                {/snippet}
                            </Collapsible.Root>
                        {:else}
                            <Sidebar.MenuItem>
                                <Sidebar.MenuButton
                                    isActive={isActive(menu.url)}
                                >
                                    {#snippet child({ props })}
                                        <a href={menu.url} {...props}>
                                            <menu.icon />
                                            <span>{menu.title}</span>
                                        </a>
                                    {/snippet}
                                </Sidebar.MenuButton>
                            </Sidebar.MenuItem>
                        {/if}
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer />
</Sidebar.Root>
