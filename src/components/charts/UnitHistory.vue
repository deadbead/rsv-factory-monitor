<script setup lang="ts">
import { ref, watch } from 'vue'

const sensor = defineProps<{
    drop: any
}>()

const chart = ref({
    series: [
        {
            name: sensor.drop.sensorCode,
            data: [],
        },
    ],
    options: {
        chart: {
            height: 250,
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
    },
})

watch(
    () => sensor.drop,
    (prop) => {
        const time = prop.delta.value ? prop.time - prop.delta.time : prop.time
        chart.value.series[0].data.push(prop.delta.value)

        chart.value.options.xaxis.categories.push(time)
    }
)
</script>

<template>
    <div>
        <small>{{ sensor }}</small>
        <div class="chart">
            <apexchart
                :type="chart.options.chart.type"
                :height="chart.options.chart.height"
                v-bind="chart"
            ></apexchart>
        </div>
    </div>
</template>

<style scoped>
.chart {
    border: 1px solid blue;
}
</style>
