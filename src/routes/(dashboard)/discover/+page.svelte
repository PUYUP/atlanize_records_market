<script lang="ts">
    import * as InputGroup from "#lib/components/ui/input-group/index.js";
    import { RecordList } from "#lib/components/internal/record-list/index.ts";
    import { Search } from "lucide-svelte";
</script>

<div class="p-6">
    <div class="max-w-2xl">
        <div class="block mb-6">
            <div class="block mb-4">
                <h1 class="text-xl font-bold mb-2">Discover</h1>
                <p class="text-base text-gray-500">
                    Explore research methods, experimental failures, and lessons learned
                    from researchers around the world.
                </p>
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