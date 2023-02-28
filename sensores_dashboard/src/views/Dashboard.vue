<template>
  <div
    v-if="abrirModalSensor || abrirModalSala || abrirModalModificarSala"
    class="fixed z-0 inset-0 bg-black opacity-50"
  ></div>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <h1 class="font-medium text-4xl">Dashboard</h1>
      <div class="w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <button
              @click="mostrarModalSala()"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              id="anadir_sala"
            >
              Añadir sala
            </button>
          </li>
          <li>
            <button
              @click="mostrarModalSensor()"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              id="anadir_sensor"
            >
              Añadir sensor
            </button>
          </li>
          <li>
            <button
              @click="cerrarSesion()"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              id="cerrar_sesion"
            >
              Cerrar sesion
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="flex flex-row flex-wrap gap-5 justify-center pt-3">
    <TargetRoom
      v-for="(sala, index) in listaSalas"
      :key="index"
      :nombre="sala.nombre"
      :listaDispositivos="sala.dispositivos"
      :listaSalas="listaSalas"
      @listaSensores="mostrarModalModificarSala"
    />
  </div>

  <ModalAddSensor
    v-if="abrirModalSensor"
    @cerrar="abrirModalSensor = false"
    :listaSalas="listaSalas"
  />
  <ModalAddSala
    v-if="abrirModalSala"
    @cerrar="abrirModalSala = false"
    :listaSalas="listaSalas"
  />
  <ModalModifyRoom
    v-if="abrirModalModificarSala"
    :listaSensores="listaSensores"
    @cerrar="abrirModalModificarSala = false"
  />
</template>
<script setup>
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth, onDameDocumentos } from "@/firebase.js";
import TargetRoom from "@/components/TargetRoom.vue";
import ModalAddSensor from "@/components/ModalAddSensor.vue";
import ModalAddSala from "@/components/ModalAddSala.vue";
import ModalModifyRoom from "@/components/ModalModifyRoom.vue";

const router = useRouter();
const logueado = ref(false);
const listaSensores = ref([]);

/*Tarjetas*/
let listaSalas = ref([]);
let listaDispositivos = ref([]);

let abrirModalSensor = ref(false);
let abrirModalSala = ref(false);
let abrirModalModificarSala = ref(false);

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    user ? (logueado.value = true) : (logueado.value = false);
  });

  await onDameDocumentos("sensores", (sensor) => {
    listaSalas.value = [];
    listaDispositivos.value = [];
    const listaAux = [];
    sensor.forEach((doc) => {
      listaDispositivos.value.push({ info: doc.data(), id: doc.id });
      listaAux.push({ nombre: doc.data().sala, dispositivos: [] });
    });
    listaSalas.value = obtenerSalas(listaAux);
    listaSalas.value.forEach((sala) => {
      listaDispositivos.value.forEach((dispositivo) => {
        sala.nombre === dispositivo.info.sala
          ? sala.dispositivos.push(dispositivo)
          : "";
      });
    });
  });
});

const obtenerSalas = (sensores) => {
  const listaUnicos = {};
  const resultado = sensores.filter((sensor) => {
    if (!listaUnicos[sensor.nombre]) {
      listaUnicos[sensor.nombre] = true;
      return true;
    } else {
      return false;
    }
  });
  return resultado;
};

const cerrarSesion = async () => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
};

const mostrarModalSensor = () => {
  abrirModalSensor.value = true;
};

const mostrarModalSala = () => {
  abrirModalSala.value = true;
};

const mostrarModalModificarSala = (aux) => {
  listaSensores.value = aux;
  abrirModalModificarSala.value = true;
};
</script>
