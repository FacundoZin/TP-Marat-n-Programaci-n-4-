<script setup lang="ts">
import TableComponent from '@/Components/TableComponent.vue';
import { ApiService } from '@/ExternalServices/ApiServices';
import type { Atleta } from '@/Types/Atleta';
import type { Ciudad } from '@/Types/Ciudad';
import { onMounted, ref } from 'vue';

const items = ref<Ciudad[] | Atleta[]>([])
const currentResource = ref('Atletas');
const isLoading = ref(false);
const errorMessage = ref<String | null>(null);



const fetchResource = async (resourceType: string) => {
    isLoading.value = true;
    currentResource.value = resourceType;
    errorMessage.value = null

    let Result;

    if (resourceType === 'Ciudades') {

        Result = await ApiService.findAllCiudades();
    } else if (resourceType === 'Atletas') {

        Result = await ApiService.findAllAtletas();
    } else {

        isLoading.value = false;
        errorMessage.value = "Tipo de recurso no valido";
        return;
    }

    if (!Result.isSuccess) {
        errorMessage.value = Result.error.message;
        items.value = [];
    } else {
        items.value = Result.value;
    }

    isLoading.value = false;
};

onMounted(() => {
    fetchResource('Atletas');
});
</script>

<template>
    <div class="container my-5">
        <h1 class="text-center mb-4 text-secondary">Dashboard ({{ currentResource }})</h1>

        <div class="d-flex justify-content-center mb-5">
            <button @click="fetchResource('Atletas')"
                :class="['btn me-3', currentResource === 'Atletas' ? 'btn-primary' : 'btn-outline-primary']"
                :disabled="isLoading">
                <i class="bi bi-person-fill"></i> Buscar Atletas
            </button>

            <button @click="fetchResource('Ciudades')"
                :class="['btn', currentResource === 'Ciudades' ? 'btn-primary' : 'btn-outline-primary']"
                :disabled="isLoading">
                <i class="bi bi-building"></i> Buscar Ciudades
            </button>
        </div>

        <hr class="mb-5">

        <TableComponent :items="items" :resourceName="currentResource" :isLoading="isLoading"
            :errorMessage="errorMessage" />

    </div>
</template>

<style scoped>
/* Asegúrate de que los íconos de Bootstrap (si los usas) estén disponibles */
</style>