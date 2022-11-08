<script setup lang="ts">
import { provide, ref } from 'vue'
import Sensor from './Sensor.vue'
import { ISensor } from '../types'
import UnitHistory from './charts/UnitHistory.vue'

interface IUnit {
    code: string
    name: string
    sensors: ISensor[]
}

const unit = defineProps<IUnit>()

const sensorsBefore = unit.sensors.filter((s) => s.place === 'before')
const sensorsInner = unit.sensors.filter((s) => s.place === 'inner')
const sensorsAfter = unit.sensors.filter((s) => s.place === 'after')

const history = ref()
provide('history', history)

</script>

<template>
    <div class="unit">
        <div class="title">{{ name }}</div>
        <div class="sensors">
            <div class="before">
                <Sensor
                    v-for="sensor in sensorsBefore"
                    :key="sensor.code"
                    v-bind="sensor"
                />
            </div>
            <div class="inner">
                <Sensor
                    v-for="sensor in sensorsInner"
                    :key="sensor.code"
                    v-bind="sensor"
                />
            </div>
            <div class="after">
                <Sensor
                    v-for="sensor in sensorsAfter"
                    :key="sensor.code"
                    v-bind="sensor"
                />
            </div>
        </div>
        <div class="history">
            <UnitHistory />
        </div>
    </div>
</template>

<style scoped>
.unit {
    flex: 1;
    box-shadow: 0 0 0.3em black;
    border-radius: calc(0.1 * var(--aspect));
    min-width: 100px;
}

.title {
    font-size: calc(0.5 * var(--aspect));
    padding: calc(0.1 * var(--aspect));
}

.sensors {
    display: flex;
    justify-content: space-between;
}
.history {
}
</style>
