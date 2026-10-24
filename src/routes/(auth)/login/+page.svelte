<script lang="ts">
    import * as Field from "#lib/components/ui/field/index.js";
    import { Button } from "#lib/components/ui/button/index.js";
    import { Checkbox } from "#lib/components/ui/checkbox/index.js";
    import { Label } from "#lib/components/ui/label/index.js";
    import { Separator } from "#lib/components/ui/separator/index.js";
    import * as InputGroup from "#lib/components/ui/input-group/index.js";
    import {
        ExternalLink,
        KeyRound,
        LockKeyholeOpen,
        UserRoundPlus,
    } from "lucide-svelte";
    import { Mail } from "lucide-svelte";
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
    <div
        class="bg-white flex flex-col items-center justify-center p-8 lg:p-16 order-2 lg:order-1"
    >
        <div class="w-full xl:w-[360px] mx-auto lg:mt-auto">
            <form class="w-full">
                <Field.Group class="gap-2">
                    <Field.Set>
                        <Field.Legend class="!text-xl lg:!text-2xl">
                            <h1>Welcome to Atlanize</h1>
                        </Field.Legend>
                        <Field.Description>
                            Access your dashboard to manage your research
                            failure logs.
                        </Field.Description>
                        <Field.Group class="gap-4 md:gap-6">
                            <Field.Field class="gap-2">
                                <Field.Label for="email">Email</Field.Label>
                                <InputGroup.Root class="w-full">
                                    <InputGroup.Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <InputGroup.Addon class="pr-1">
                                        <Mail />
                                    </InputGroup.Addon>
                                </InputGroup.Root>
                            </Field.Field>
                            <Field.Field class="gap-2">
                                <Field.Label for="password">
                                    Password
                                </Field.Label>
                                <InputGroup.Root class="w-full">
                                    <InputGroup.Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <InputGroup.Addon class="pr-1">
                                        <KeyRound />
                                    </InputGroup.Addon>
                                </InputGroup.Root>
                            </Field.Field>
                            <div class="flex">
                                <Field.Field orientation="horizontal">
                                    <Checkbox id="remember" name="remember" />
                                    <Label for="remember">Remember me</Label>
                                </Field.Field>

                                <div class="ml-auto">
                                    <Button
                                        variant="link"
                                        class="!font-normal"
                                        style="color: var(--primary)"
                                    >
                                        Forgot Password
                                        <LockKeyholeOpen />
                                    </Button>
                                </div>
                            </div>
                        </Field.Group>
                    </Field.Set>
                    <Field.Field orientation="horizontal">
                        <Button type="submit" class="w-full">Log In</Button>
                    </Field.Field>
                </Field.Group>
            </form>

            <Separator class="my-10" />

            <div class="flex justify-between items-center">
                Don't have an account?
                <Button
                    variant="link"
                    class="!font-normal"
                    style="color: var(--primary)"
                    href="/register"
                >
                    <UserRoundPlus />
                    Sign Up
                </Button>
            </div>
        </div>

        <div
            class="mt-auto flex justify-between w-full text-xs lg:text-sm pt-8"
        >
            <div class="flex h-5 items-center gap-2 lg:gap-4">
                <div>Copyright &copy; 2026 Atlanize</div>
            </div>

            <div class="flex h-5 items-center gap-2 lg:gap-4">
                <div>Terms</div>
                <Separator orientation="vertical" />
                <div>Contact</div>
            </div>
        </div>
    </div>

    <div
        class="bg-linear-to-br from-primary to-chart-2 text-primary-foreground flex items-center justify-center order-1 lg:order-2"
    >
        <div class="w-full h-full relative">
            <enhanced:img
                src="/static/images/login-unsplash.jpg"
                alt="Welcome to Atlanize"
                class="object-cover w-full h-full absolute"
            />

            <div
                class="flex items-center justify-center h-full p-8 lg:p-16 relative bg-gradient-to-br from-black/40 to-black/10"
            >
                <h3
                    class="max-w-lg text-center text-xl md:text-3xl text-white font-bold leading-9 italic text-shadow-sm"
                >
                    "Results! Why, man, I have gotten a lot of results! I know
                    several thousand things that won't work." <br />
                    <cite class="text-lg font-normal">— Thomas Edison</cite>
                </h3>
            </div>
        </div>
    </div>
</div>
