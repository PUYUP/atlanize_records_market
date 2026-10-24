<script lang="ts">
    import * as Avatar from "#lib/components/ui/avatar/index.js";
    import * as Table from "#lib/components/ui/table/index.js";
    import * as Tabs from "#lib/components/ui/tabs/index.js";
    import Button from "#lib/components/ui/button/button.svelte";
    import { Badge } from "#lib/components/ui/badge/index.js";
    import { UserCog } from "@lucide/svelte";
    import { ChevronsUpDown, UserPlus } from "lucide-svelte";

    const roles = [
        { value: "owner", label: "Owner" },
        { value: "admin", label: "Admin" },
        { value: "editor", label: "Editor" },
        { value: "viewer", label: "Viewer" },
    ];

    const members = [
        {
            name: "Rahman",
            role: "owner",
            avatarUrl: "https://avatars.githubusercontent.com/u/112475352?v=4",
            memberSince: "April 17, 2025",
        },
        {
            name: "Lekan",
            role: "admin",
            avatarUrl: "https://avatars.githubusercontent.com/u/112475352?v=4",
            memberSince: "April 17, 2025",
        },
        {
            name: "Niyi",
            role: "editor",
            avatarUrl: "https://avatars.githubusercontent.com/u/112475352?v=4",
            memberSince: "April 17, 2025",
        },
    ];
</script>

<div class="block p-6">
    <div class="max-w-2xl">
        <div class="flex mb-6">
            <Tabs.Root value="members">
                <Tabs.List>
                    <Tabs.Trigger value="members">All Members</Tabs.Trigger>
                    <Tabs.Trigger value="invitations">
                        <Badge>10</Badge>
                        Invitations
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>

            <Button variant="outline" class="ml-auto">
                <UserPlus />
                Invite
            </Button>
        </div>

        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Since</Table.Head>
                    <Table.Head class="pl-4">Role</Table.Head>
                    <Table.Head class="text-right">Actions</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each members as member (member.name)}
                    <Table.Row>
                        <Table.Cell class="font-medium">
                            <div class="flex">
                                <Avatar.Root>
                                    <Avatar.Image
                                        src={member.avatarUrl}
                                        alt={member.name}
                                        class="grayscale"
                                    />
                                    <Avatar.Fallback>
                                        {member.name}
                                    </Avatar.Fallback>
                                </Avatar.Root>
                                <span class="self-center ml-4">
                                    {member.name}
                                </span>
                            </div>
                        </Table.Cell>
                        <Table.Cell>{member.memberSince}</Table.Cell>
                        <Table.Cell>
                            <Button variant="ghost" size="sm">
                                <ChevronsUpDown class="h-4 w-4" />
                                {member.role}
                            </Button>
                        </Table.Cell>
                        <Table.Cell class="text-right">
                            <Button variant="outline" size="xs">
                                <UserCog class="h-4 w-4" />
                                Edit
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
</div>
