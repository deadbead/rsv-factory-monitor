<script setup lang="ts">
import Sensor from "./Sensor.vue"
import {ISensor} from "../types"

interface IUnit {
    code: string
    name: string
    sensors: ISensor[]
}

const unit = defineProps<IUnit>()

const sensorsBefore = unit.sensors.filter(s => s.place === 'before')
const sensorsInner = unit.sensors.filter(s => s.place === 'inner')
const sensorsAfter = unit.sensors.filter(s => s.place === 'after')
</script>

<template>
    <div class="unit">
        <div class="title">{{name}}</div>
        <div class="sensors">
            <div class="before"><Sensor v-for="sensor in sensorsBefore" :key="sensor.code" v-bind="sensor" /></div>
            <div class="inner"><Sensor v-for="sensor in sensorsInner" :key="sensor.code" v-bind="sensor" /></div>
            <div class="after"><Sensor v-for="sensor in sensorsAfter" :key="sensor.code" v-bind="sensor" /></div>
        </div>
    </div>
</template>

<style scoped>
.unit {
  flex: 1;
  box-shadow: 0 0 .3em black;
  border-radius: .3em;
  min-width: 100px;
}

.title {
    line-height: 3em;
}
.sensors {
    display: flex;
    justify-content: space-between;
}
</style>