<template>
  <div class="fixed z-50 inset-0 overflow-y-auto" x-show="showModal">
    <div class="flex items-center justify-center min-h-screen">
      <div class="bg-white rounded-lg shadow-lg w-1/2">
        <div class="p-4">
          <form @submit.prevent="modificarSala()">
            <label for="sala">Sala:</label>
            <br />
            <input
              v-model="sala"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="sala"
              required
            />
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
  listaSensores: Array,
});

const emits = defineEmits(["cerrar"]);

const sala = ref("");

const modificarSala = () => {
  alert("Se ha modificado la sala");
  props.listaSensores.forEach((dispositivo) => {
    console.log(dispositivo);
    modificaInfo("sensores", dispositivo.id, { sala: sala.value });
  });
  emits("cerrar");
};
</script>
