<template>
  <div class="fixed z-50 inset-0 overflow-y-auto" x-show="showModal">
    <div class="flex items-center justify-center min-h-screen">
      <div class="bg-white rounded-lg shadow-lg w-1/2">
        <div class="p-4">
          <form @submit.prevent="modificarSensor()">
            <label for="sala">Nombre:</label>
            <br />
            <input
              v-model="nuevoNombre"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="sala"
            />
            <br />

            <p>Sala:</p>
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
            />
            <select
              v-model="sala"
              v-if="tipoSala === 'existente'"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              id="modificar_sala"
            >
              Modificar
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
import { modificaInfo } from "@/firebase.js";

const props = defineProps({
  idSensor: String,
  listaSalas: Array,
});

const emits = defineEmits(["cerrar"]);

const tipoSala = ref("nuevo");

const sala = ref("");
const nuevoNombre = ref("");

const modificarSensor = () => {
  if (sala.value === "" && nuevoNombre.value != "") {
    alert("Se ha modificado el sensor");
    modificaInfo("sensores", props.idSensor, { nombre: nuevoNombre.value });
    emits("cerrar");
  } else if (sala.value != "" && nuevoNombre.value === "") {
    alert("Se ha modificado el sensor");
    modificaInfo("sensores", props.idSensor, { sala: sala.value });
    emits("cerrar");
  } else if (sala.value != "" && nuevoNombre.value != "") {
    alert("Se ha modificado el sensor");
    modificaInfo("sensores", props.idSensor, {
      nombre: nuevoNombre.value,
      sala: sala.value,
    });
    emits("cerrar");
  } else {
    alert("No se han rellenado los campos");
  }
};
</script>
