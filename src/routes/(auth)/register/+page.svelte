<script lang="ts">
    import * as Field from "#lib/components/ui/field/index.js";
    import * as InputOTP from "#lib/components/ui/input-otp/index.js";
    import { Button } from "#lib/components/ui/button/index.js";
    import { Separator } from "#lib/components/ui/separator/index.js";
    import * as InputGroup from "#lib/components/ui/input-group/index.js";
    import * as Accordion from "#lib/components/ui/accordion/index.js";
    import {
        KeyRound,
        RotateCcwKey,
        LogIn,
        IdCard,
        Landmark,
        RefreshCw,
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
                            <h1>Be part of Atlanize!</h1>
                        </Field.Legend>
                        <Field.Description>
                            Sign up for your account to manage your research
                            failure logs.
                        </Field.Description>

                        <Accordion.Root
                            type="single"
                            value="verify-email"
                            class="w-full"
                        >
                            <Accordion.Item value="verify-email">
                                <Accordion.Trigger>
                                    Verify your email address
                                </Accordion.Trigger>
                                <Accordion.Content class="p-1 pb-3">
                                    <Field.Group>
                                        <Field.Field class="gap-2">
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
                                    </Field.Group>

                                    <div class="!pt-4">
                                        <Button type="submit" class="w-full">
                                            Get Verification Code
                                        </Button>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>

                            <Accordion.Item value="verify-otp">
                                <Accordion.Trigger>
                                    Verification code
                                </Accordion.Trigger>
                                <Accordion.Content class="p-1 pb-3">
                                    <Field.Group>
                                        <Field.Field>
                                            <InputOTP.Root
                                                maxlength={6}
                                                id="otp-verification"
                                                class="flex justify-between"
                                                required
                                            >
                                                {#snippet children({ cells })}
                                                    <InputOTP.Group
                                                        class="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
                                                    >
                                                        {#each cells.slice(0, 3) as cell (cell)}
                                                            <InputOTP.Slot
                                                                {cell}
                                                            />
                                                        {/each}
                                                    </InputOTP.Group>
                                                    <InputOTP.Separator
                                                        class="mx-2"
                                                    />
                                                    <InputOTP.Group
                                                        class="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
                                                    >
                                                        {#each cells.slice(3, 6) as cell (cell)}
                                                            <InputOTP.Slot
                                                                {cell}
                                                            />
                                                        {/each}
                                                    </InputOTP.Group>
                                                {/snippet}
                                            </InputOTP.Root>
                                            <Field.Description>
                                                Check your email for the
                                                verification code. Also check
                                                your spam folder.
                                            </Field.Description>
                                        </Field.Field>
                                    </Field.Group>

                                    <div class="!pt-4 grid grid-cols-2 gap-4">
                                        <div class="block">
                                            <Button
                                                variant="ghost"
                                                class="w-full"
                                            >
                                                <RefreshCw />
                                                Resend Code
                                            </Button>
                                        </div>

                                        <div class="block">
                                            <Button
                                                type="submit"
                                                class="w-full"
                                            >
                                                Verify
                                            </Button>
                                        </div>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>

                            <Accordion.Item value="about-you" disabled>
                                <Accordion.Trigger>About you</Accordion.Trigger>
                                <Accordion.Content class="p-1 pb-3">
                                    <Field.Group class="gap-4 md:gap-5">
                                        <Field.Field class="gap-2">
                                            <InputGroup.Root class="w-full">
                                                <InputGroup.Input
                                                    id="full-name"
                                                    type="text"
                                                    placeholder="Your full name"
                                                    required
                                                />
                                                <InputGroup.Addon class="pr-1">
                                                    <IdCard />
                                                </InputGroup.Addon>
                                            </InputGroup.Root>
                                        </Field.Field>

                                        <Field.Field class="gap-2">
                                            <Field.Label for="institution">
                                                Institution
                                                <span
                                                    class="text-neutral-400 font-normal"
                                                >
                                                    (opsional)
                                                </span>
                                            </Field.Label>
                                            <InputGroup.Root class="w-full">
                                                <InputGroup.Input
                                                    id="institution"
                                                    type="text"
                                                    placeholder="Your institution"
                                                />
                                                <InputGroup.Addon class="pr-1">
                                                    <Landmark />
                                                </InputGroup.Addon>
                                            </InputGroup.Root>
                                        </Field.Field>
                                    </Field.Group>

                                    <div class="!pt-4">
                                        <Button type="submit" class="w-full">
                                            Save Profile
                                        </Button>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>

                            <Accordion.Item value="account-security">
                                <Accordion.Trigger>
                                    Create password
                                </Accordion.Trigger>
                                <Accordion.Content class="p-1 pb-3">
                                    <Field.Group class="gap-4 md:gap-5">
                                        <Field.Field class="gap-2">
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

                                        <Field.Field class="gap-2">
                                            <Field.Label for="password">
                                                Confirm Password
                                            </Field.Label>
                                            <InputGroup.Root class="w-full">
                                                <InputGroup.Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="Re-type your password"
                                                    required
                                                />
                                                <InputGroup.Addon class="pr-1">
                                                    <RotateCcwKey />
                                                </InputGroup.Addon>
                                            </InputGroup.Root>
                                        </Field.Field>
                                    </Field.Group>

                                    <div class="!pt-4">
                                        <Button type="submit" class="w-full">
                                            Finish Registration
                                        </Button>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion.Root>
                    </Field.Set>
                </Field.Group>
            </form>

            <Separator class="my-6" />

            <div class="flex justify-between items-center">
                Already have an account?
                <Button
                    variant="link"
                    class="!font-normal"
                    style="color: var(--primary)"
                    href="/login"
                >
                    <LogIn />
                    Log In
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
                    "The great tragedy of Science — the slaying of a beautiful
                    hypothesis by an ugly fact." <br />
                    <cite class="text-lg font-normal">
                        — Thomas Henry Huxley
                    </cite>
                </h3>
            </div>
        </div>
    </div>
</div>
