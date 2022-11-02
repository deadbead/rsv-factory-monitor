<script setup lang="ts">
import Line from "./Line.vue";
import { ILine } from "../types";
import { ref, provide, computed } from "vue";
import { wsNodeRedRSVArapter } from "../adapters";

const factoryClass = ref<{
  disconnected?: boolean;
  connected?: boolean;
}>(new Object());

const factoryData = ref<{
  time?: string;
  lines?: [];
}>(new Object());

provide("factoryData", factoryData);

interface IFactory {
  code: string;
  name: string;
  wsSource: string;
  lines: ILine[];
}

const factory = defineProps<IFactory>();

const wsConnection = () => {
  let reconnectTimeout: NodeJS.Timeout;

  const ws = new WebSocket(factory.wsSource);
  ws.addEventListener("message", (event) =>
    event.data ? (factoryData.value = wsNodeRedRSVArapter(event.data)) : false
  );
  ws.addEventListener("open", () => {
    factoryClass.value["disconnected"] = false;
    factoryClass.value["connected"] = true;
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
  });
  ws.addEventListener("close", () => {
    factoryClass.value["connected"] = false;
    factoryClass.value["disconnected"] = true;
    reconnectTimeout = setTimeout(() => wsConnection(), 5000);
  });
};

wsConnection();

const factoryDataTime = computed(() => (new Date(factoryData.value.time)).toLocaleString())
</script>

<template>
  <div class="factory" :class="factoryClass">
    <div
      class="title"
      :title="factoryClass.connected ? 'Соединение установлено' : 'Соединение отсутсвует'"
    >
      {{ name }}, <small>{{factoryDataTime}}</small>
    </div>
    <div class="lines">
      <Line v-for="line in lines" :key="line.code" v-bind="line" />
    </div>
  </div>
</template>

<style scoped>
.factory {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
}

.title {
  font-size: calc(.7 * var(--aspect));
  padding-top: calc(.2 * var(--aspect));
}

.connected .title::before {
  content: "🟢";
}
.disconnected .title::before {
  content: "🔴";
}
.lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: calc(.3 * var(--aspect));
  gap: calc(.4 * var(--aspect));
}

.disconnected .lines {
  opacity: .3;
}
</style>
