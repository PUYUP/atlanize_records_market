<script lang="ts">
    import * as InputGroup from "#lib/components/ui/input-group/index.js";
    import { RecordList } from "#lib/components/internal/record-list/index.ts";
    import { Search } from "lucide-svelte";
    import { page } from "$app/state";

    let currentStatus = $derived(page.url.searchParams.get("status") || "draft");
    let pageTitle = $derived(
        currentStatus === "published"
            ? "Published Records"
            : "Draft Records",
    );
</script>

<div class="p-6">
    <div class="max-w-2xl">
        <div class="block mb-6">
            <div class="block mb-4">
                <h1 class="text-xl font-bold mb-2">{pageTitle}</h1>
            </div>
            
            <div class="block">
                <InputGroup.Root>
                    <InputGroup.Input placeholder="Type to search..." />
                    <InputGroup.Addon>
                        <Search />
                    </InputGroup.Addon>
                    <InputGroup.Addon align="inline-end">
                        <InputGroup.Button variant="secondary">Search</InputGroup.Button>
                    </InputGroup.Addon> 
                </InputGroup.Root>
            </div>
        </div>
    
        <RecordList />
    </div>
</div>