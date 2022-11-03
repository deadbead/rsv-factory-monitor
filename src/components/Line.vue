<script setup lang="ts">
import { provide, inject, Ref, computed } from 'vue'
import Unit from './Unit.vue'
import { IUnit } from '../types'

interface ILine {
    code: string
    name: string
    units: IUnit[]
}
const line = defineProps<ILine>()

const factoryData = inject<Ref>('factoryData')

provide('getSensorValue', (sensorCode: string) =>
    factoryData &&
    Object.keys(factoryData.value).includes('lines') &&
    Object.keys(factoryData.value.lines).includes(line.code) &&
    Object.keys(factoryData.value.lines[line.code]).includes(sensorCode)
        ? {
              time: factoryData.value.time,
              value: factoryData.value.lines[line.code][sensorCode],
          }
        : {}
)
</script>

<template>
    <div class="line">
        <div class="title">{{ name }}</div>
        <div class="units">
            <Unit v-for="unit in units" :key="unit.code" v-bind="unit" />
        </div>
    </div>
</template>

<style scoped>
.line {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: calc(0.15 * var(--aspect));
    box-shadow: 0 0 0.5em #3e3e3e;
}

.title {
    font-size: calc(0.6 * var(--aspect));
    padding: calc(0.2 * var(--aspect));
}

.units {
    flex: 1;
    padding: calc(0.3 * var(--aspect));
    padding-top: 0;
    display: flex;
    gap: calc(0.5 * var(--aspect));
    justify-content: space-around;
}
</style>
