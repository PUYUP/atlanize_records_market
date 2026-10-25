<script lang="ts">
    import { scaleUtc } from "d3-scale";
    import { curveNatural } from "d3-shape";
    import { Area, AreaChart, Axis, ChartClipPath } from "layerchart";
    import { cubicInOut } from "svelte/easing";
    import * as Card from "#lib/components/ui/card/index.js";
    import * as Chart from "#lib/components/ui/chart/index.js";
    import * as Select from "#lib/components/ui/select/index.js";
    import { Bot, UserSearch } from "lucide-svelte";
    import { CpuAi } from "@lucide/svelte";
    import Separator from "#lib/components/ui/separator/separator.svelte";

    const chartData = [
        { date: new Date("2024-04-01"), mcp: 222, direct: 150 },
        { date: new Date("2024-04-02"), mcp: 97, direct: 180 },
        { date: new Date("2024-04-03"), mcp: 167, direct: 120 },
        { date: new Date("2024-04-04"), mcp: 242, direct: 260 },
        { date: new Date("2024-04-05"), mcp: 373, direct: 290 },
        { date: new Date("2024-04-06"), mcp: 301, direct: 340 },
        { date: new Date("2024-04-07"), mcp: 245, direct: 180 },
        { date: new Date("2024-04-08"), mcp: 409, direct: 320 },
        { date: new Date("2024-04-09"), mcp: 59, direct: 110 },
        { date: new Date("2024-04-10"), mcp: 261, direct: 190 },
        { date: new Date("2024-04-11"), mcp: 327, direct: 350 },
        { date: new Date("2024-04-12"), mcp: 292, direct: 210 },
        { date: new Date("2024-04-13"), mcp: 342, direct: 380 },
        { date: new Date("2024-04-14"), mcp: 137, direct: 220 },
        { date: new Date("2024-04-15"), mcp: 120, direct: 170 },
        { date: new Date("2024-04-16"), mcp: 138, direct: 190 },
        { date: new Date("2024-04-17"), mcp: 446, direct: 360 },
        { date: new Date("2024-04-18"), mcp: 364, direct: 410 },
        { date: new Date("2024-04-19"), mcp: 243, direct: 180 },
        { date: new Date("2024-04-20"), mcp: 89, direct: 150 },
        { date: new Date("2024-04-21"), mcp: 137, direct: 200 },
        { date: new Date("2024-04-22"), mcp: 224, direct: 170 },
        { date: new Date("2024-04-23"), mcp: 138, direct: 230 },
        { date: new Date("2024-04-24"), mcp: 387, direct: 290 },
        { date: new Date("2024-04-25"), mcp: 215, direct: 250 },
        { date: new Date("2024-04-26"), mcp: 75, direct: 130 },
        { date: new Date("2024-04-27"), mcp: 383, direct: 420 },
        { date: new Date("2024-04-28"), mcp: 122, direct: 180 },
        { date: new Date("2024-04-29"), mcp: 315, direct: 240 },
        { date: new Date("2024-04-30"), mcp: 454, direct: 380 },
        { date: new Date("2024-05-01"), mcp: 165, direct: 220 },
        { date: new Date("2024-05-02"), mcp: 293, direct: 310 },
        { date: new Date("2024-05-03"), mcp: 247, direct: 190 },
        { date: new Date("2024-05-04"), mcp: 385, direct: 420 },
        { date: new Date("2024-05-05"), mcp: 481, direct: 390 },
        { date: new Date("2024-05-06"), mcp: 498, direct: 520 },
        { date: new Date("2024-05-07"), mcp: 388, direct: 300 },
        { date: new Date("2024-05-08"), mcp: 149, direct: 210 },
        { date: new Date("2024-05-09"), mcp: 227, direct: 180 },
        { date: new Date("2024-05-10"), mcp: 293, direct: 330 },
        { date: new Date("2024-05-11"), mcp: 335, direct: 270 },
        { date: new Date("2024-05-12"), mcp: 197, direct: 240 },
        { date: new Date("2024-05-13"), mcp: 197, direct: 160 },
        { date: new Date("2024-05-14"), mcp: 448, direct: 490 },
        { date: new Date("2024-05-15"), mcp: 473, direct: 380 },
        { date: new Date("2024-05-16"), mcp: 338, direct: 400 },
        { date: new Date("2024-05-17"), mcp: 499, direct: 420 },
        { date: new Date("2024-05-18"), mcp: 315, direct: 350 },
        { date: new Date("2024-05-19"), mcp: 235, direct: 180 },
        { date: new Date("2024-05-20"), mcp: 177, direct: 230 },
        { date: new Date("2024-05-21"), mcp: 82, direct: 140 },
        { date: new Date("2024-05-22"), mcp: 81, direct: 120 },
        { date: new Date("2024-05-23"), mcp: 252, direct: 290 },
        { date: new Date("2024-05-24"), mcp: 294, direct: 220 },
        { date: new Date("2024-05-25"), mcp: 201, direct: 250 },
        { date: new Date("2024-05-26"), mcp: 213, direct: 170 },
        { date: new Date("2024-05-27"), mcp: 420, direct: 460 },
        { date: new Date("2024-05-28"), mcp: 233, direct: 190 },
        { date: new Date("2024-05-29"), mcp: 78, direct: 130 },
        { date: new Date("2024-05-30"), mcp: 340, direct: 280 },
        { date: new Date("2024-05-31"), mcp: 178, direct: 230 },
        { date: new Date("2024-06-01"), mcp: 178, direct: 200 },
        { date: new Date("2024-06-02"), mcp: 470, direct: 410 },
        { date: new Date("2024-06-03"), mcp: 103, direct: 160 },
        { date: new Date("2024-06-04"), mcp: 439, direct: 380 },
        { date: new Date("2024-06-05"), mcp: 88, direct: 140 },
        { date: new Date("2024-06-06"), mcp: 294, direct: 250 },
        { date: new Date("2024-06-07"), mcp: 323, direct: 370 },
        { date: new Date("2024-06-08"), mcp: 385, direct: 320 },
        { date: new Date("2024-06-09"), mcp: 438, direct: 480 },
        { date: new Date("2024-06-10"), mcp: 155, direct: 200 },
        { date: new Date("2024-06-11"), mcp: 92, direct: 150 },
        { date: new Date("2024-06-12"), mcp: 492, direct: 420 },
        { date: new Date("2024-06-13"), mcp: 81, direct: 130 },
        { date: new Date("2024-06-14"), mcp: 426, direct: 380 },
        { date: new Date("2024-06-15"), mcp: 307, direct: 350 },
        { date: new Date("2024-06-16"), mcp: 371, direct: 310 },
        { date: new Date("2024-06-17"), mcp: 475, direct: 520 },
        { date: new Date("2024-06-18"), mcp: 107, direct: 170 },
        { date: new Date("2024-06-19"), mcp: 341, direct: 290 },
        { date: new Date("2024-06-20"), mcp: 408, direct: 450 },
        { date: new Date("2024-06-21"), mcp: 169, direct: 210 },
        { date: new Date("2024-06-22"), mcp: 317, direct: 270 },
        { date: new Date("2024-06-23"), mcp: 480, direct: 530 },
        { date: new Date("2024-06-24"), mcp: 132, direct: 180 },
        { date: new Date("2024-06-25"), mcp: 141, direct: 190 },
        { date: new Date("2024-06-26"), mcp: 434, direct: 380 },
        { date: new Date("2024-06-27"), mcp: 448, direct: 490 },
        { date: new Date("2024-06-28"), mcp: 149, direct: 200 },
        { date: new Date("2024-06-29"), mcp: 103, direct: 160 },
        { date: new Date("2024-06-30"), mcp: 446, direct: 400 },
    ];
    let timeRange = $state("90d");
    const selectedLabel = $derived.by(() => {
        switch (timeRange) {
            case "90d":
                return "Last 3 months";
            case "30d":
                return "Last 30 days";
            case "7d":
                return "Last 7 days";
            default:
                return "Last 3 months";
        }
    });
    const filteredData = $derived(
        chartData.filter((item) => {
            // eslint-disable-next-line svelte/prefer-svelte-reactivity
            const referenceDate = new Date("2024-06-30");
            let daysToSubtract = 90;
            if (timeRange === "30d") {
                daysToSubtract = 30;
            } else if (timeRange === "7d") {
                daysToSubtract = 7;
            }
            referenceDate.setDate(referenceDate.getDate() - daysToSubtract);
            return item.date >= referenceDate;
        }),
    );
    const chartConfig = {
        mcp: { label: "MCP", color: "var(--chart-1)" },
        direct: { label: "Direct", color: "var(--chart-2)" },
    } satisfies Chart.ChartConfig;
</script>

<div class="flex items-center gap-2">
    <div class="grid flex-1 gap-1 text-center">
        <Card.Title class="mb-3 text-left">
            Records accessed by source
        </Card.Title>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div class="flex flex-col gap-1">
                <div class="text-2xl font-bold text-left">3.459</div>
                <div class="flex items-center gap-1">
                    <UserSearch class="size-5 text-neutral-400" />
                    <div class="text-neutral-400">Direct</div>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <div class="text-2xl font-bold text-left">5.129</div>
                <div class="flex items-center gap-1">
                    <CpuAi class="size-5 text-neutral-400" />
                    <div class="text-neutral-400">MCP</div>
                </div>
            </div>
        </div>
    </div>
    <Select.Root type="single" bind:value={timeRange}>
        <Select.Trigger
            class="w-40 rounded-lg sm:ms-auto"
            aria-label="Select a value"
        >
            {selectedLabel}
        </Select.Trigger>
        <Select.Content class="rounded-xl">
            <Select.Item value="90d" class="rounded-lg">
                Last 3 months
            </Select.Item>
            <Select.Item value="30d" class="rounded-lg">
                Last 30 days
            </Select.Item>
            <Select.Item value="7d" class="rounded-lg">Last 7 days</Select.Item>
        </Select.Content>
    </Select.Root>
</div>

<div class="mt-12">
    <Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
        <AreaChart
            legend
            data={filteredData}
            x="date"
            xScale={scaleUtc()}
            series={[
                {
                    key: "direct",
                    label: "Direct",
                    color: chartConfig.direct.color,
                },
                {
                    key: "mcp",
                    label: "MCP",
                    color: chartConfig.mcp.color,
                },
            ]}
            seriesLayout="stack"
            props={{
                xAxis: {
                    ticks: timeRange === "7d" ? 7 : undefined,
                    format: (v) => {
                        return v.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                    },
                },
                yAxis: {
                    ticks: 4,
                    format: (v) => v.toLocaleString("id-ID"),
                },
            }}
            padding={{ left: 24, right: 24, bottom: 54, top: 8 }}
        >
            {#snippet axis()}
                <Axis
                    placement="left"
                    grid
                    rule
                    ticks={5}
                    format={(v) => v.toLocaleString("id-ID")}
                />
                <Axis
                    placement="right"
                    ticks={5}
                    format={(v) => v.toLocaleString("id-ID")}
                />
                <Axis
                    placement="bottom"
                    ticks={timeRange === "7d" ? 7 : undefined}
                    format={(v) =>
                        v.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })}
                />
            {/snippet}

            {#snippet marks({ context })}
                <defs>
                    <linearGradient id="fillMCP" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stop-color="var(--color-mcp)"
                            stop-opacity={1.0}
                        />
                        <stop
                            offset="95%"
                            stop-color="var(--color-mcp)"
                            stop-opacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient id="fillDirect" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stop-color="var(--color-direct)"
                            stop-opacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stop-color="var(--color-direct)"
                            stop-opacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <ChartClipPath
                    initialWidth={0}
                    motion={{
                        width: {
                            type: "tween",
                            duration: 1000,
                            easing: cubicInOut,
                        },
                    }}
                >
                    {#each context.series.visibleSeries as s (s.key)}
                        <Area
                            seriesKey={s.key}
                            curve={curveNatural}
                            fillOpacity={0.4}
                            line={{ class: "stroke-1" }}
                            motion="tween"
                            {...s.props}
                            fill={s.key === "mcp"
                                ? "url(#fillMCP)"
                                : "url(#fillDirect)"}
                        />
                    {/each}
                </ChartClipPath>
            {/snippet}
            {#snippet tooltip()}
                <Chart.Tooltip
                    labelFormatter={(v: Date) => {
                        return v.toLocaleDateString("en-US", {
                            month: "long",
                        });
                    }}
                    indicator="line"
                />
            {/snippet}
        </AreaChart>
    </Chart.Container>
</div>
