<script lang="ts">
    import { Badge } from "#lib/components/ui/badge/index.js";
    import Button from "#lib/components/ui/button/button.svelte";
    import { ChevronRight, FolderBookmark, ShoppingCartPlus } from "@lucide/svelte";
</script>

<div class="record-item py-4 pt-6 w-full flex gap-4">
    <div class="flex-1">
        <div class="flex gap-2 w-full mb-2 items-center text-sm">
            <Badge variant="secondary" color="secondary">v2.10.23</Badge>
            <Badge variant="secondary" color="secondary">Datasheet</Badge>
            <div class="text-neutral-500">December 8, 2025</div>
        </div>

        <h3>
            Anonymized interview metadata from the study "First things first: How to
            keep the United Nations
        </h3>

        <div class="mt-2 flex gap-1.5 items-center flex-wrap">
            <div class="font-bold text-primary bg-neutral-100 rounded-lg px-2 py-0.5 shadow text-sm">
                $100.20
            </div>

            <Button variant="ghost" size="sm" color="primary" title="Add to cart">
                <ShoppingCartPlus />
                <span class="hidden sm:inline">Add to cart</span>
            </Button>

            <Button variant="ghost" size="sm" color="primary" title="Save">
                <FolderBookmark />
                <span class="hidden sm:inline">Save</span>
            </Button>
        </div>
    </div>

    <div class="block w-10">
        <a
            href="/records/1"
            class="h-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center"
        >
            <ChevronRight class='text-primary' />
        </a>
    </div>
</div>
