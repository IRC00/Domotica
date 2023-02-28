<template>
  <div
    v-if="abrirModalModificarSensor"
    class="fixed z-0 inset-0 bg-black opacity-50"
  ></div>
  <div
    @click="ir()"
    class="w-64 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize"
    >
      {{ nombre }}
    </h5>
    <div class="flex items-center">
      <p class="h-fit font-normal text-gray-700 dark:text-gray-400">
        El ejecutor esta
      </p>
      <button
        @click.stop="cambiarEstado()"
        class="ml-2 px-3 py-2 text-sm font-medium text-center text-white info==='activo' ? bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {{ info }}
      </button>
    </div>
    <button
      @click.stop="modificarSensor()"
      class="mt-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Modificar
    </button>
    <button
      @click.stop="eliminarSensor()"
      class="ml-3 px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Eliminar
    </button>
  </div>
  <ModalModifySensor
    v-if="abrirModalModificarSensor"
    :idSensor="id"
    @cerrar="abrirModalModificarSensor = false"
  />
</template>
<script setup>
import { modificaInfo, eliminaSensor } from "@/firebase.js";
import { ref } from "vue";
import ModalModifySensor from "@/components/ModalModifySensor.vue";
const props = defineProps({
  nombre: String,
  informacion: String,
  id: String,
});

let abrirModalModificarSensor = ref(false);

let info = ref(props.informacion);

const cambiarEstado = () => {
  if (info.value === "activo") {
    info.value = "apagado";
    modificar(info.value);
  } else {
    info.value = "activo";
    modificar(info.value);
  }
};

const modificar = async (estado) => {
  await modificaInfo("sensores", props.id, {
    informacion: estado,
  });
};

const eliminarSensor = () => {
  alert(`Se ha eliminado el sensor ${props.nombre}`);
  eliminaSensor("sensores", props.id);
};

const modificarSensor = () => {
  abrirModalModificarSensor.value = true;
};
const ir = () => window.open(`http://localhost:5174/${props.id}`, "_blank");
</script>
