<template>
  <div class="flex justify-center items-center h-screen bg-blue-500">
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <!--Sensor-->
        <div v-if="tipoSen == 'sensor'">
          <h1 class="text-center text-3xl" id="nombre_sensor">
            Nombre: {{ nombreSen }}
          </h1>
          <p class="capitalize text-center text-3xl" if="informacion">
            {{ infoOriginal }} grados
          </p>
          <br />
          <label for="informacion">Nuevo valor:</label>
          <br />
          <input
            v-model="informacionSen"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            id="informacion"
            name="informacion"
          />
          <button
            class="mt-3 px-3 py-2 text-sm font-medium text-center text-white info==='activo' ? bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            id="boton_modificar"
            @click="modificar"
          >
            Modificar
          </button>
        </div>
        <!--Ejecutor-->
        <div v-if="tipoSen == 'ejecutor'">
          <h1 class="text-center text-3xl" id="nombre_sensor">
            Nombre: {{ nombreSen }}
          </h1>
          <br />
          <p class="capitalize text-center text-3xl" if="informacion">
            Estado: {{ informacionSen }}
          </p>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onCambioDoc, modificaInfo } from "@/firebase.js";
import { onMounted, ref } from "vue";

const route = useRoute();
let nombreSen = ref("");
let informacionSen = ref("");
let tipoSen = ref("");
let infoOriginal = ref("");

onMounted(async () => {
  await onCambioDoc("sensores", route.params.id, (sensor) => {
    const { informacion, nombre, tipo } = sensor.data();
    informacionSen.value = informacion;
    nombreSen.value = nombre;
    tipoSen.value = tipo;
    infoOriginal.value = informacionSen.value;
  });
});

const modificar = async () => {
  infoOriginal.value = informacionSen.value;
  alert("Se ha modificado la informacion");
  await modificaInfo("sensores", route.params.id, {
    informacion: informacionSen.value.toString(),
  });
};
</script>
