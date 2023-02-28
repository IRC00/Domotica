<template>
  <div
    class="mr-3 w-72 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center capitalize"
    >
      {{ nombre }}
    </h5>
    <component
      v-for="(dispositivo, index) in listaDispositivos"
      :key="index"
      :is="tipoDispositivo(dispositivo.info.tipo)"
      :nombre="dispositivo.info.nombre"
      :informacion="dispositivo.info.informacion"
      :id="dispositivo.id"
      :listaSalas="listaSalas"
    />
    <button
      @click.stop="modificarSala()"
      class="mt-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Modificar
    </button>
    <button
      @click.stop="eliminarSala()"
      class="mt-3 ml-3 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Eliminar
    </button>
  </div>
</template>
<script setup>
import { eliminaSensor } from "@/firebase.js";
import TargetSensor from "@/components/TargetSensor.vue";
import TargetExecutor from "@/components/TargetExecutor.vue";

const props = defineProps({
  nombre: String,
  listaDispositivos: Array,
  listaSalas: Array,
});

const emits = defineEmits(["nombre"]);

const tipoDispositivo = (tipo) => {
  if (tipo === "sensor") {
    return TargetSensor;
  } else if (tipo === "ejecutor") {
    return TargetExecutor;
  }
};

const eliminarSala = () => {
  alert(`Se ha eliminado la sala ${props.nombre}`);
  props.listaDispositivos.forEach((dispositivo) => {
    eliminaSensor("sensores", dispositivo.id);
  });
};

const modificarSala = () => {
  emits("listaSensores", props.listaDispositivos);
};
</script>
