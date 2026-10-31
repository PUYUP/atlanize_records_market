<script lang="ts">
    import { page } from "$app/state";
    import * as Item from "#lib/components/ui/item/index.js";
    import * as Tabs from "#lib/components/ui/tabs/index.js";
    import * as Card from "#lib/components/ui/card/index.js";
    import { Badge } from "#lib/components/ui/badge/index.js";
    import { Button } from "#lib/components/ui/button/index.js";
    import { Separator } from "#lib/components/ui/separator/index.js";
    import {
        ArrowLeft,
        Edit,
        Eye,
        ShoppingCartPlus,
        FolderBookmark,
        Share2,
        Download,
        University,
        Users,
        Calendar,
        Tag,
        Database,
        FileText,
        Globe,
        Lock,
        ChartCandlestick,
    } from "@lucide/svelte";

    const recordId = page.params.id;

    // Mock data — replace with real fetch
    const record = {
        id: recordId,
        title: 'Anonymized interview metadata from the study "First things first: How to keep the United Nations sustainable development goals in focus"',
        version: "v2.10.23",
        resourceType: "Datasheet",
        publishedAt: "December 8, 2025",
        price: "$100.20",
        status: "published",
        doi: "10.1234/atlanize.2025.001",
        abstract:
            "This dataset contains anonymized interview metadata collected as part of a longitudinal study on sustainable development goal tracking. The interviews were conducted across 12 countries between 2022 and 2024.",
        introduction:
            "Sustainable development goals (SDGs) require continuous monitoring and evaluation. This study builds on prior qualitative research to understand institutional knowledge gaps and how data-driven approaches can support long-term tracking of SDG progress.",
        methodology:
            "Semi-structured interviews were conducted with 148 participants across government agencies, research institutions, and civil society organizations. Transcripts were anonymized using k-anonymity principles and reviewed by an independent ethics board.",
        results:
            "Analysis revealed three major thematic clusters: institutional alignment challenges, data availability gaps, and capacity-building needs. Findings are consistent across regional subgroups with minor variation in data availability perceptions.",
        keywords: ["SDG", "interview", "qualitative", "metadata", "United Nations", "sustainability"],
        authors: [
            { name: "Dr. Emily Sato", role: "Principal Investigator", orcid: "0000-0001-2345-6789" },
            { name: "Prof. James Okafor", role: "Co-investigator", orcid: "0000-0002-3456-7890" },
            { name: "Anna Müller", role: "Data Curator", orcid: "0000-0003-4567-8901" },
        ],
        organization: {
            name: "University of Berkeley",
            description: "Bio Lab, Room 123",
        },
        license: "CC BY 4.0",
        accessType: "Open",
        files: 4,
        size: "124 MB",
    };

    let activeTab = $state("overview");
</script>

<div class="block pb-10">
    <!-- Org banner -->
    <div class="mb-0 bg-neutral-100">
        <Item.Root variant="default" class="rounded-none border-b">
            <Item.Media>
                <div class="w-8 h-8 flex items-center justify-center rounded-md bg-white border">
                    <University class="size-4 text-neutral-600" />
                </div>
            </Item.Media>
            <Item.Content class="gap-0.5">
                <Item.Title>{record.organization.name}</Item.Title>
                <Item.Description class="text-xs">
                    {record.organization.description}
                </Item.Description>
            </Item.Content>
        </Item.Root>
    </div>

    <div class="max-w-6xl px-3 py-4 sm:p-6">
        <!-- Back + Actions header -->
        <div class="flex flex-wrap items-center gap-2 mb-6">
            <Button variant="ghost" size="sm" href="/records?status={record.status}">
                <ArrowLeft class="size-4" />
                Back
            </Button>

            <div class="ml-auto flex items-center gap-1.5 flex-wrap">
                <!-- Show label only on sm+ -->
                <Button variant="ghost" size="sm" title="Share">
                    <Share2 class="size-4" />
                    <span class="hidden sm:inline">Share</span>
                </Button>
                <Button variant="ghost" size="sm" title="Download">
                    <Download class="size-4" />
                    <span class="hidden sm:inline">Download</span>
                </Button>
                <Button variant="ghost" size="sm" title="Save">
                    <FolderBookmark class="size-4" />
                    <span class="hidden sm:inline">Save</span>
                </Button>
                <Button variant="outline" size="sm" color="primary" title="Add to cart">
                    <ShoppingCartPlus class="size-4" />
                    <span class="hidden sm:inline">Add to cart</span>
                </Button>
                <Button variant="default" size="sm" color="primary" href="/records-editor/{recordId}">
                    <Edit class="size-4" />
                    <span class="hidden sm:inline">Edit</span>
                </Button>
            </div>
        </div>

        <!-- Record header -->
        <div class="mb-6">
            <div class="flex flex-wrap gap-2 items-center mb-3">
                <Badge variant="secondary">{record.version}</Badge>
                <Badge variant="secondary">{record.resourceType}</Badge>
                <Badge
                    variant="outline"
                    class={record.status === "published"
                        ? "border-green-300 text-green-700 bg-green-50"
                        : "border-amber-300 text-amber-700 bg-amber-50"}
                >
                    {#if record.status === "published"}
                        <Eye class="size-3 mr-1" />
                    {:else}
                        <Lock class="size-3 mr-1" />
                    {/if}
                    {record.status === "published" ? "Published" : "Draft"}
                </Badge>
                <span class="text-sm text-neutral-500 flex items-center gap-1">
                    <Calendar class="size-3.5" />
                    {record.publishedAt}
                </span>
            </div>

            <h1 class="text-xl font-bold leading-snug mb-3">
                {record.title}
            </h1>

            <div class="flex flex-col gap-2 text-sm text-neutral-500">
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span class="flex items-center gap-1.5">
                        <Globe class="size-4" />
                        DOI: <a href="#{record.doi}" class="text-primary underline underline-offset-2 break-all">{record.doi}</a>
                    </span>
                    <span class="flex items-center gap-1.5">
                        <Lock class="size-4" />
                        {record.license}
                    </span>
                    <span class="flex items-center gap-1.5">
                        <Database class="size-4" />
                        {record.files} files · {record.size}
                    </span>
                </div>
                <div>
                    <div class="inline-block font-bold text-primary text-base bg-neutral-100 rounded-lg px-3 py-1 shadow-sm">
                        {record.price}
                    </div>
                </div>
            </div>
        </div>

        <Separator class="mb-6" />

        <!-- Tabs -->
        <Tabs.Root value={activeTab} onValueChange={(v) => (activeTab = v)} class="w-full">
            <!-- scrollable wrapper so tabs don't overflow/overlap on mobile -->
            <div class="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
                <Tabs.List class="mb-6 min-w-max w-full">
                    <Tabs.Trigger value="overview">
                        <FileText class="size-4 hidden sm:inline-block" />
                        Overview
                    </Tabs.Trigger>
                    <Tabs.Trigger value="data">
                        <Database class="size-4 hidden sm:inline-block" />
                        Files
                    </Tabs.Trigger>
                    <Tabs.Trigger value="authors">
                        <Users class="size-4 hidden sm:inline-block" />
                        Authors
                    </Tabs.Trigger>
                    <Tabs.Trigger value="metrics">
                        <ChartCandlestick class="size-4 hidden sm:inline-block" />
                        Metrics
                    </Tabs.Trigger>
                </Tabs.List>
            </div>

            <!-- Overview Tab -->
            <Tabs.Content value="overview">
                <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div class="xl:col-span-2 flex flex-col gap-6">
                        <!-- Abstract -->
                        <Card.Root class="rounded-md">
                            <Card.Content>
                                <h2 class="font-semibold text-sm text-neutral-500 uppercase tracking-wide mb-3">
                                    Abstract
                                </h2>
                                <p class="text-sm leading-relaxed text-neutral-700">
                                    {record.abstract}
                                </p>
                            </Card.Content>
                        </Card.Root>

                        <!-- Introduction -->
                        <Card.Root class="rounded-md">
                            <Card.Content>
                                <h2 class="font-semibold text-sm text-neutral-500 uppercase tracking-wide mb-3">
                                    Introduction
                                </h2>
                                <p class="text-sm leading-relaxed text-neutral-700">
                                    {record.introduction}
                                </p>
                            </Card.Content>
                        </Card.Root>

                        <!-- Methodology -->
                        <Card.Root class="rounded-md">
                            <Card.Content>
                                <h2 class="font-semibold text-sm text-neutral-500 uppercase tracking-wide mb-3">
                                    Methodology
                                </h2>
                                <p class="text-sm leading-relaxed text-neutral-700">
                                    {record.methodology}
                                </p>
                            </Card.Content>
                        </Card.Root>

                        <!-- Results -->
                        <Card.Root class="rounded-md">
                            <Card.Content>
                                <h2 class="font-semibold text-sm text-neutral-500 uppercase tracking-wide mb-3">
                                    Results
                                </h2>
                                <p class="text-sm leading-relaxed text-neutral-700">
                                    {record.results}
                                </p>
                            </Card.Content>
                        </Card.Root>
                    </div>

                    <!-- Sidebar info -->
                    <div class="flex flex-col gap-4">
                        <Card.Root class="rounded-md">
                            <Card.Content class="text-sm flex flex-col gap-3">
                                <h2 class="font-semibold text-neutral-500 uppercase tracking-wide text-xs">
                                    Record Info
                                </h2>

                                <div class="flex flex-col gap-0.5">
                                    <span class="text-xs text-neutral-400 font-medium">Resource type</span>
                                    <span>{record.resourceType}</span>
                                </div>
                                <Separator />
                                <div class="flex flex-col gap-0.5">
                                    <span class="text-xs text-neutral-400 font-medium">License</span>
                                    <span>{record.license}</span>
                                </div>
                                <Separator />
                                <div class="flex flex-col gap-0.5">
                                    <span class="text-xs text-neutral-400 font-medium">Access</span>
                                    <span>{record.accessType}</span>
                                </div>
                                <Separator />
                                <div class="flex flex-col gap-0.5">
                                    <span class="text-xs text-neutral-400 font-medium">Version</span>
                                    <span>{record.version}</span>
                                </div>
                                <Separator />
                                <div class="flex flex-col gap-0.5">
                                    <span class="text-xs text-neutral-400 font-medium">Published</span>
                                    <span>{record.publishedAt}</span>
                                </div>
                            </Card.Content>
                        </Card.Root>

                        <!-- Keywords -->
                        <Card.Root class="rounded-md">
                            <Card.Content class="text-sm flex flex-col gap-3">
                                <h2 class="font-semibold text-neutral-500 uppercase tracking-wide text-xs flex items-center gap-1.5">
                                    <Tag class="size-3.5" />
                                    Keywords
                                </h2>
                                <div class="flex flex-wrap gap-1.5">
                                    {#each record.keywords as kw}
                                        <Badge variant="secondary">{kw}</Badge>
                                    {/each}
                                </div>
                            </Card.Content>
                        </Card.Root>
                    </div>
                </div>
            </Tabs.Content>

            <!-- Data & Files Tab -->
            <Tabs.Content value="data">
                <Card.Root class="rounded-md">
                    <Card.Content>
                        <p class="text-sm text-neutral-500">File listing coming soon.</p>
                    </Card.Content>
                </Card.Root>
            </Tabs.Content>

            <!-- Authors Tab -->
            <Tabs.Content value="authors">
                <Card.Root class="rounded-md">
                    <Card.Content class="flex flex-col gap-4">
                        {#each record.authors as author, i}
                            {#if i > 0}<Separator />{/if}
                            <div class="flex flex-col gap-1">
                                <div class="font-semibold">{author.name}</div>
                                <div class="text-sm text-neutral-500">{author.role}</div>
                                <div class="text-xs text-neutral-400">ORCID: {author.orcid}</div>
                            </div>
                        {/each}
                    </Card.Content>
                </Card.Root>
            </Tabs.Content>

            <!-- Metrics Tab -->
            <Tabs.Content value="metrics">
                <Card.Root class="rounded-md">
                    <Card.Content>
                        <p class="text-sm text-neutral-500">Usage metrics coming soon.</p>
                    </Card.Content>
                </Card.Root>
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>