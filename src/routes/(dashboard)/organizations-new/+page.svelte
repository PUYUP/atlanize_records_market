<script lang="ts">
    import * as InputGroup from "#lib/components/ui/input-group/index.js";
    import * as Field from "#lib/components/ui/field/index.js";
    import { Barcode, University } from "lucide-svelte";
    import Button from "#lib/components/ui/button/button.svelte";
    import { SavePlus } from "@lucide/svelte";
</script>

<div class="p-6">
    <div class="flex flex-col mb-4">
        <h1 class="block text-lg font-bold">New Organization</h1>
    </div>

    <div class="block max-w-2xl">
        <form>
            <Field.Field class="gap-2 mb-4">
                <Field.Label for="inline-start-input">
                    Organization name <span class="text-red-500">*</span>
                </Field.Label>
                <InputGroup.Root>
                    <InputGroup.Input
                        placeholder="e.g. University of Berkeley"
                        required
                    />
                    <InputGroup.Addon>
                        <University />
                    </InputGroup.Addon>
                </InputGroup.Root>
            </Field.Field>

            <Field.Field class="gap-2 mb-4">
                <Field.Label for="inline-start-input">
                    Organization identifier <span class="text-red-500">*</span>
                </Field.Label>
                <InputGroup.Root>
                    <InputGroup.Input placeholder="e.g. berkeley" required />
                    <InputGroup.Addon>
                        <Barcode />
                    </InputGroup.Addon>
                </InputGroup.Root>
                <Field.Description class="text-xs !text-neutral-500">
                    This is your organization's unique identifier. You will be
                    able to access your organization through the URL:
                    https://atlanize.com/org/your-org-identifier
                </Field.Description>
            </Field.Field>

            <div class="mt-8">
                <Button type="submit">
                    <SavePlus />
                    Create
                </Button>
            </div>
        </form>
    </div>
</div>
