<script lang="ts">
    import "./page.css";
    import * as InputGroup from "#lib/components/ui/input-group/index.js";
    import * as Field from "#lib/components/ui/field/index.js";
    import { Textarea } from "#lib/components/ui/textarea/index.js";
    import { Barcode, University } from "lucide-svelte";
    import Button from "#lib/components/ui/button/button.svelte";
    import { SavePlus, Tags as TagsIcon } from "@lucide/svelte";

    import Tags from "svelte-tags-input";

    let tags = $state([]);

    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
    ];
</script>

<div class="block p-6">
    <div class="max-w-2xl">
        <form>
            <Field.Field class="gap-2 mb-5">
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

            <Field.Field class="gap-2 mb-5">
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

            <Field.Field class="gap-2 mb-5">
                <Field.Label for="inline-start-input">
                    Keywords and subjects <span class="text-red-500">*</span>
                </Field.Label>

                <Tags
                    bind:tags
                    addKeys={[9, 13]}
                    maxTags={5}
                    allowPaste={true}
                    allowDrop={true}
                    splitWith={"/"}
                    onlyUnique={true}
                    removeKeys={[8, 27]}
                    placeholder={"Enter a keyword or subject..."}
                    autoComplete={countryList}
                    name={"custom-name"}
                    id={"custom-id"}
                    allowBlur={true}
                    minChars={1}
                    onlyAutocomplete={false}
                    labelText={"Label Example"}
                    labelShow={false}
                    onTagClick={(tag) => alert(tag)}
                />

                <Field.Description class="text-xs !text-neutral-500">
                    Type a few keywords or subjects to help researchers find
                    your organization. Use "Tab" or "Enter" to add a new
                    keyword.
                </Field.Description>
            </Field.Field>

            <Field.Field class="gap-2 mb-5">
                <Field.Label for="inline-start-input">
                    Short description
                </Field.Label>
                <Textarea placeholder="Type your message here." />
            </Field.Field>

            <div class="mt-8">
                <Button type="submit">
                    <SavePlus />
                    Save
                </Button>
            </div>
        </form>
    </div>
</div>
