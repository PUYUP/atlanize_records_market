<script lang="ts">
    import * as Avatar from "#lib/components/ui/avatar/index.js";
    import * as Table from "#lib/components/ui/table/index.js";
    import * as Tabs from "#lib/components/ui/tabs/index.js";
    import Button from "#lib/components/ui/button/button.svelte";
    import { Badge } from "#lib/components/ui/badge/index.js";
    import { StickyNotePlus, UserCog } from "@lucide/svelte";
    import { ChevronsUpDown, UserPlus } from "lucide-svelte";
    import { RecordList } from "#lib/components/internal/record-list/index.ts";
</script>

<div class="block p-6">
    <div class="max-w-2xl">
        <div class="flex mb-6">
            <Tabs.Root value="records">
                <Tabs.List>
                    <Tabs.Trigger value="records">All Records</Tabs.Trigger>
                    <Tabs.Trigger value="drafts">
                        <Badge>10</Badge>
                        Drafts
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>

            <Button variant="outline" class="ml-auto" href="/records-editor/XC-9992252">
                <StickyNotePlus />
                Add Records
            </Button>
        </div>

        <div class="flex gap-4">
            <RecordList />
        </div>
    </div>
</div>
