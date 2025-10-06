<script setup lang="ts">
import TableAtletasComponent from '@/Components/TableAtletasComponent.vue';
import TableCiudadComponent from '@/Components/TableCiudadComponent.vue';
import { ApiService } from '@/ExternalServices/ApiServices';
import type { Atleta } from '@/Types/Atleta';
import type { Ciudad } from '@/Types/Ciudad';
import { onMounted, ref } from 'vue';

const Ciudades = ref<Ciudad[]>([])
const atletas = ref<Atleta[]>([])
const isLoading = ref(true);
const errorMessage = ref<String | null>(null);
const BusquedaActual = ref<string>('Atletas');



const SearchAtleta = async () => {
    isLoading.value = true;
    errorMessage.value = null
    Ciudades.value = []

    let Result;

    Result = await ApiService.findAllAtletas();

    if (!Result.isSuccess) {
        errorMessage.value = Result.error.message;
        atletas.value = [];
    } else {
        atletas.value = Result.value;
    }

    isLoading.value = false;
};



const SearchCiudades= async () => {
    isLoading.value = true;
    errorMessage.value = null;
    atletas.value = [];

    let Result;

    Result = await ApiService.findAllAtletas();

    if (!Result.isSuccess) {
        errorMessage.value = Result.error.message;
        Ciudades.value = [];
    } else {
        Ciudades.value = Result.value;
    }

    isLoading.value = false;
};

onMounted(() => {
    SearchAtleta();
});

</script>



<template>
    <div class="container my-5">
        <h1 class="text-center mb-4 text-secondary">Lista de ({{ BusquedaActual }})</h1>

        <div class="d-flex justify-content-center mb-5">
            <button @click="SearchAtleta"
                :class="['btn me-3', BusquedaActual === 'Atletas' ? 'btn-primary' : 'btn-outline-primary']"
                :disabled="isLoading">
                <i class="bi bi-person-fill"></i> Buscar Atletas
            </button>

            <button @click="SearchCiudades()"
                :class="['btn', BusquedaActual === 'Ciudades' ? 'btn-primary' : 'btn-outline-primary']"
                :disabled="isLoading">
                <i class="bi bi-building"></i> Buscar Ciudades
            </button>
        </div>

        <TableAtletasComponent 
            v-if=" isLoading === false && BusquedaActual === 'Atletas'"
            :Atletas="atletas"
        />

        <TableCiudadComponent 
            v-else-if=" isLoading === false && BusquedaActual === 'Ciudades'"
            :Ciudades="Ciudades"
        />

        <div v-if="isLoading" class="text-center p-5 border rounded bg-light">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3 fs-5 text-muted">Cargando datos de {{ BusquedaActual }}...</p>
        </div>

        <div v-else-if="errorMessage" class="alert alert-danger mt-4 text-center">
            <strong>Error:</strong> {{ errorMessage }}
            <p class="mb-0">No se pudieron cargar los datos de {{ BusquedaActual }}.</p>
        </div>

        <hr class="mb-5">

    </div>
</template>

<style scoped>
/* Asegúrate de que los íconos de Bootstrap (si los usas) estén disponibles */
</style>