<script lang="ts">
    import "./layout.css";
    import * as Tabs from "#lib/components/ui/tabs/index.js";
    import { FileText, UserGroup, Settings } from "@lucide/svelte";
    import { page } from "$app/state";

    const { children } = $props();

    const baseUrl = "/organizations/atlanize";
    const tabs = [
        {
            value: "records",
            label: "Records",
            href: "/records",
            icon: FileText,
            count: 1000,
        },
        {
            value: "members",
            label: "Members",
            href: "/members",
            icon: UserGroup,
            count: null,
        },
        {
            value: "settings",
            label: "Settings",
            href: "/settings",
            icon: Settings,
            count: null,
        },
    ];

    // Tab aktif diturunkan dari URL
    const active = $derived(
        tabs.find((t) => page.url.pathname.endsWith(t.href))?.value ??
            "records",
    );

    // Hide organization detail
    const hideOrganization = $derived(
        page.url.pathname.endsWith("/records-new"),
    );
</script>

<div class="block">
    {#if !hideOrganization}
        <div class="px-6 pt-6">
            <div class="flex items-center gap-4 mb-6">
                <div class="w-18 h-18 relative">
                    <enhanced:img
                        src="/static/images/login-unsplash.jpg"
                        alt="Welcome to Atlanize"
                        class="object-cover w-full h-full absolute"
                    />
                </div>

                <div class="block">
                    <h1 class="block text-xl">Atlanize</h1>
                    <p class="block text-sm text-muted-foreground">
                        Manage your organization records and members
                    </p>
                </div>
            </div>

            <Tabs.Root value={active} class="tabs-list relative">
                <Tabs.List variant="line" class="gap-2 relative z-20 px-0">
                    {#each tabs as tab (tab.value)}
                        <Tabs.Trigger value={tab.value}>
                            {#snippet child({ props })}
                                <a {...props} href={baseUrl + tab.href}>
                                    <div class="flex items-center gap-2">
                                        <tab.icon />
                                        <span class="block">{tab.label}</span>
                                    </div>
                                </a>
                            {/snippet}
                        </Tabs.Trigger>
                    {/each}
                </Tabs.List>
            </Tabs.Root>
        </div>
    {/if}

    {@render children?.()}
</div>
