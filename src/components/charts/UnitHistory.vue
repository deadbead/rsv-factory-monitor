<script setup lang="ts">
import { Ref, inject } from 'vue'

const sensor = defineProps<{
    drop: any
}>()
</script>

<template>
    <div class="chart">{{ sensor }}</div>
</template>

<style scoped>
.chart {
    border: 1px solid blue;
}
</style>
