<script lang="ts">
    import "../page.css";
    import RecordEditor from "#lib/components/internal/record-editor/record-editor.svelte";
    import * as Item from "#lib/components/ui/item/index.js";
    import { Button } from "#lib/components/ui/button/index.js";
    import { ChevronsUpDown } from "lucide-svelte";
</script>

<div class="block pb-10">
    <div class="mb-6 bg-neutral-100">
        <Item.Root variant="default" class="rounded-xl">
            <Item.Content class="gap-1">
                <Item.Title>University of Berkeley</Item.Title>
                <Item.Description class="text-xs">
                    Bio Lab, Room 123
                </Item.Description>
            </Item.Content>
            <Item.Actions>
                <Button variant="outline" size="sm">
                    <ChevronsUpDown />
                    Change
                </Button>
            </Item.Actions>
        </Item.Root>
    </div>

    <div class="max-w-6xl p-6 !pt-0">
        <RecordEditor />
    </div>
</div>
