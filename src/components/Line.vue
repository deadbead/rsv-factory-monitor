<script setup lang="ts">
import { provide, inject, Ref } from "vue"
import Unit from "./Unit.vue"
import {IUnit} from "../types"

interface ILine {
    code: string
    name: string
    units: IUnit[]
}
const line = defineProps<ILine>()

const factoryData = inject<Ref>('factoryData')

provide('getSensorValue', (sensorCode: string) => factoryData 
    && Object.keys(factoryData.value).includes('lines')
    && Object.keys(factoryData.value.lines).includes(line.code)
    && Object.keys(factoryData.value.lines[line.code]).includes(sensorCode)
        ? {time: factoryData.value.time, value: factoryData.value.lines[line.code][sensorCode]}
        : {}
)
</script>

<template>
    <div class="line">
        <div class="title">{{name}}</div>
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
    border-radius: .5em;
    box-shadow: 0 0 .5em black;
}
.title {
    font-size: calc(.6 * var(--aspect));
    padding: calc(.2 * var(--aspect));
}
.units {
    flex: 1;
    padding: calc(.3 * var(--aspect));
    padding-top: 0;
    display: flex;
    gap: calc(.7 * var(--aspect));
    justify-content: space-around;
}
</style>