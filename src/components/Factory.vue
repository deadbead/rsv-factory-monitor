<script setup lang="ts">
import Line from "./Line.vue";
import { ILine } from "../types";
import { ref, provide } from "vue";
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
</script>

<template>
  <div class="factory" :class="factoryClass">
    <div
      class="title"
      :title="factoryClass.disconnected ? 'Соединение отсутсвует' : ''"
    >
      {{ name }} {{ factoryData.time }}
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
  padding: 0.7em;
  height: 100vh;
  justify-content: center;
}

.title {
  font-size: 1.5em;
  padding-bottom: 0.7em;
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
  gap: 3em;
}
</style>
