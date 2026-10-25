<script lang="ts">
    import { Badge } from "#lib/components/ui/badge/index.js";
    import Button from "#lib/components/ui/button/button.svelte";
    import { ShoppingCartPlus } from "@lucide/svelte";
</script>

<div class="record-item py-4 pt-6 w-full">
    <div class="flex gap-2 w-full mb-2 items-center text-sm">
        <Badge variant="secondary" color="secondary">v2.10.23</Badge>
        <Badge variant="secondary" color="secondary">Datasheet</Badge>
        <div class="text-neutral-500">December 8, 2025</div>
    </div>

    <h3>
        Anonymized interview metadata from the study "First things first: How to
        keep the United Nations
    </h3>

    <div class="mt-2 flex gap-2 items-center">
        <div class="font-bold text-primary">$100.20</div>

        <Button variant="ghost" size="sm" color="primary">
            <ShoppingCartPlus />
            <span>Add to cart</span>
        </Button>
    </div>
</div>
