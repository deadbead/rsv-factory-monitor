<script setup lang="ts">
import { Ref, ref, watch, inject } from 'vue'

const history = inject<Ref>('history')

const local = ref()

const chart = ref({
    series: [
        {
            name: history?.value?.sensorCode ?? 's1',
            data: [],
        },
    ],
    options: {
        chart: {
            height: 150,
            type: 'area',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: [],
        },
        tooltip: {
            enabled: false,
        },
    },
})

const randData = (val: number) => {
    const max = 5
    const min = 0

    return val > 0 ?? Math.floor(Math.random() * (max - min + 1)) + min
}

watch(
    () => history?.value,
    (prop) => {
        const m = prop.time - (prop.time % 60)

        local.value = {
            ...local.value,
            [m]:
                local?.value && Object.keys(local.value).includes(m)
                    ? local.value[m]
                    : 0,
        }

        local.value[m] += prop.delta?.value ?? 0
        //local.value[m] += randData(prop.delta?.value)

        chart.value.options.xaxis.categories = Object.keys(local.value).map(
            (k) => parseInt(k)
        )
        chart.value.series[0].data = Object.values(local.value).map((k) =>
            k === 0 ? null : k
        )
    }
)
</script>

<template>
    <div class="chart">
        <apexchart
            :type="chart.options.chart.type"
            :height="chart.options.chart.height"
            v-bind="chart"
            v-if="0"
        ></apexchart>
        <small>{{ history }}</small>
        <div>
            <small>{{ local }}</small>
        </div>
    </div>
</template>

<style scoped>
.chart {
}
</style>
