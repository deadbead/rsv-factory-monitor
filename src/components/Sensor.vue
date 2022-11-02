<script setup lang="ts">
import { inject, computed, ref } from "vue"

interface ISensor {
  code: string
  name: string
  place: string
}

const outdateLimit = 10000

const firstUpdate = ref<{
  time?: string
  value?: number
}>(new Object())

const lastUpdate = ref<{
  time?: string
  value?: number
}>(new Object())

const sensor = defineProps<ISensor>()
const sensorClass = ref<{
  fresh?: boolean
  outdate?: boolean
  init?: boolean
}>(new Object())

const getSensorValue = inject("getSensorValue")

const sens = computed(() => {
  const data = getSensorValue(sensor.code)

  const isInitialHook = !firstUpdate.value.time
  const deltaTime = isInitialHook
    ? -1
    : parseInt(data.time) - parseInt(lastUpdate.value.time)
  const deltaValue = isInitialHook
    ? -1
    : parseInt(data.value) - parseInt(lastUpdate.value.value)
  const isOutdate = deltaTime > outdateLimit
  const isInitialValue =
    !isInitialHook &&
    parseInt(data.value) === parseInt(firstUpdate.value.value)

  if (isInitialHook) {
    firstUpdate.value = data
  }

  if (isInitialHook || deltaValue > 0) {
    lastUpdate.value = data
  }

  if (deltaValue > 0) {
    sensorClass.value.fresh = true
  }

  if (isOutdate) {
    sensorClass.value.fresh = false
    if (data.value > 0) {
      sensorClass.value.outdate = !isInitialValue
      sensorClass.value.init = isInitialValue
    }
  }

  return data
});
</script>

<template>
  <div class="sensor" :class="sensorClass" :title="name">{{ sens.value }}</div>
</template>

<style scoped>
.sensor {
  font-size: calc(.4 * var(--aspect));
}
.before .sensor {
  margin-left: -.7em;
}
.after .sensor {
  margin-right: -.7em;
}
.before .sensor::before {
  content: "⚫";
}
.after .sensor::after {
  content: "⚫";
}
.before .sensor.outdate::before {
  content: "🔴";
}
.after .sensor.outdate::after {
  content: "🔴";
}
.before .sensor.init::before {
  content: "🟠";
}
.after .sensor.init::after {
  content: "🟠";
}
.before .sensor.fresh::before {
  content: "🟢";
}
.after .sensor.fresh::after {
  content: "🟢";
}
</style>