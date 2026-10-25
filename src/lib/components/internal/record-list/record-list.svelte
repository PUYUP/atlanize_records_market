<script lang="ts">
    import "./component.css";
    import * as Pagination from "#lib/components/ui/pagination/index.js";
    import RecordItem from "#lib/components/internal/record-item/record-item.svelte";
</script>

<div class="block">
    <div class="record-list flex flex-col gap-0 w-full">
        <RecordItem />
        <RecordItem />
        <RecordItem />
        <RecordItem />
        <RecordItem />
        <RecordItem />
        <RecordItem />
    </div>

    <div class="mt-6">
        <Pagination.Root count={30} perPage={10} page={2}>
            {#snippet children({ pages, currentPage })}
                <Pagination.Content class="flex justify-between w-full">
                    <Pagination.Item>
                        <Pagination.Previous />
                    </Pagination.Item>
                    <div class="flex w-full justify-center">
                        {#each pages as page (page.key)}
                            {#if page.type === "ellipsis"}
                                <Pagination.Item>
                                    <Pagination.Ellipsis />
                                </Pagination.Item>
                            {:else}
                                <Pagination.Item>
                                    <Pagination.Link
                                        {page}
                                        isActive={currentPage === page.value}
                                    >
                                        {page.value}
                                    </Pagination.Link>
                                </Pagination.Item>
                            {/if}
                        {/each}
                        <Pagination.Item>
                            <Pagination.Ellipsis />
                        </Pagination.Item>
                    </div>
                    <Pagination.Item>
                        <Pagination.Next />
                    </Pagination.Item>
                </Pagination.Content>
            {/snippet}
        </Pagination.Root>
    </div>
</div>
