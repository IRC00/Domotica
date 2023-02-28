<template>
  <div class="fixed z-50 inset-0 overflow-y-auto" x-show="showModal">
    <div class="flex items-center justify-center min-h-screen">
      <div class="bg-white rounded-lg shadow-lg w-1/2">
        <div class="p-4">
          <form @submit.prevent="anadirSensor()">
            <p class="text-2xl">Tipo:</p>
            <label for="sensor">Sensor:</label>
            <input
              v-model="tipo"
              type="radio"
              id="sensor"
              value="sensor"
              name="sensor"
              checked
            />
            <label for="ejecutor" class="ml-3">Ejecutor:</label>
            <input
              v-model="tipo"
              type="radio"
              id="ejecutor"
              value="ejecutor"
              name="ejecutor"
            />
            <br />
            <p class="text-2xl">Informacion</p>
            <div v-if="tipo === 'sensor'">
              <input
                v-model="informacion"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                id="informacion"
                required
              />
            </div>
            <select
              v-model="informacion"
              v-if="tipo === 'ejecutor'"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option>activo</option>
              <option>apagado</option>
            </select>
            <br v-if="tipo === ''" />
            <p class="text-2xl">Nombre</p>
            <input
              v-model="nombre"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="nombre"
              required
            />
            <p class="text-2xl">Sala:</p>
            <label for="nuevo">Nuevo:</label>
            <input
              v-model="tipoSala"
              type="radio"
              id="nuevo"
              value="nuevo"
              name="nuevo"
              checked
            />
            <label for="existente" class="ml-3">Existente:</label>
            <input
              v-model="tipoSala"
              type="radio"
              id="existente"
              value="existente"
              name="existente"
            />
            <br />
            <input
              v-if="tipoSala === 'nuevo'"
              v-model="sala"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="sala"
              required
            />
            <select
              v-model="sala"
              v-if="tipoSala === 'existente'"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option
                v-for="(sala, index) in listaSalas"
                :key="index"
                :value="sala.nombre"
              >
                {{ sala.nombre }}
              </option>
            </select>
            <br />
            <button
              type="submit"
              class="px-3 py-2 text-sm font-medium text-center text-white info==='activo' ? bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              id="anadir_sensor"
            >
              Añadir sensor
            </button>
            <button
              @click="emits('cerrar')"
              class="ml-2 px-3 py-2 text-sm font-medium text-center text-white info==='activo' ? bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              id="cancelar"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { anadeReserva } from "@/firebase.js";

const props = defineProps({
  listaSalas: Array,
});

const emits = defineEmits(["cerrar"]);

const tipoSala = ref("nuevo");

const informacion = ref("");
const nombre = ref("");
const tipo = ref("sensor");
const sala = ref("");

const anadirSensor = () => {
  anadeReserva("sensores", {
    informacion: informacion.value,
    nombre: nombre.value,
    sala: sala.value,
    tipo: tipo.value,
  });
  emits("cerrar");
};
</script>
