<script setup lang="ts">
import { ApiService } from '@/ExternalServices/ApiServices';
import type { Atleta } from '@/Types/Atleta';
import { defineProps, ref, watch } from 'vue';

const atleta = ref<Atleta|null>(null);
const ErrorMessage = ref<string|null>(null);



const props = defineProps({
    IdAtleta: {
        type: Number,
        required: true,
    }
});

const SearchAtleta = async (id: number) => { 
    atleta.value = null; 
    ErrorMessage.value = null;

    const result = await ApiService.findOneAtleta(id);

    if (!result.isSuccess) {
        ErrorMessage.value = result.error.message
    } else {
        atleta.value = result.value
    }
}

watch(() => props.IdAtleta, (newId) => {
    if (newId !== undefined) {
        SearchAtleta(newId);
    }
}, { immediate: true }); 

</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4 text-primary">Detalle del Atleta</h1>

    <div v-if="ErrorMessage" class="alert alert-danger shadow-sm" role="alert">
      <strong>Error al cargar:</strong> {{ ErrorMessage }}
      <p class="mt-2 mb-0">No se pudo encontrar el atleta con ID: {{ props.IdAtleta }}</p>
    </div>

    <div v-else-if="!atleta" class="text-center p-5 border rounded bg-light">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 fs-5 text-muted">Buscando atleta</p>
    </div>

    <div v-else class="card shadow-lg">
      <div class="card-header bg-primary text-white">
        <h2 class="card-title mb-0">
          <i class="bi bi-person-fill me-2"></i>{{ atleta.nombre }}
        </h2>
      </div>
      <div class="card-body">
        <div class="row">
          
          <div class="col-md-6">
            <h5 class="text-secondary mb-3">Datos de Identificación</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>DNI:</strong>
                <span class="badge bg-info text-dark">{{ atleta.dni }}</span>
              </li>
            </ul>
          </div>
          
          <div class="col-md-6 mt-3 mt-md-0">
            <h5 class="text-secondary mb-3">Resultados de Carrera</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Posición:</strong>
                <span class="badge bg-success fs-5">{{ atleta.posicion }}º</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Tiempo:</strong>
                <span class="badge bg-warning text-dark fs-5">{{ atleta.tiempo }}</span>
              </li>
            </ul>
            
            <div v-if="atleta.posicion <= 3" class="mt-3 alert alert-success text-center">
              ¡Felicitaciones! Es un atleta de podio. 🥇🥈🥉
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
