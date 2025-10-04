<script setup lang="ts">
import { ApiService } from '@/ExternalServices/ApiServices';
import type { InsertAtletaDto } from '@/Types/InsertAtletaDto';
import { ref } from 'vue';

const ErrorMessage = ref<string|null>(null);
const successToast = ref(false); 

// Datos del formulario para el nuevo atleta
const nuevoAtleta = ref<InsertAtletaDto>({
  dni: null as any,
  nombre: '',
  tiempo: '',
  posicion: null as any,
  ciudadId: null as any,
});

// Array de ciudades MOCKEADO (se asume que se cargaría de alguna forma real)
const ciudadesDisponibles = ref([
  { id: 1, nombre: 'Buenos Aires' },
  { id: 2, nombre: 'Córdoba' },
  { id: 3, nombre: 'Rosario' },
  { id: 4, nombre: 'Mendoza' },
  { id: 5, nombre: 'Salta' },
]);


const createAtleta = async () => {
  ErrorMessage.value = null; // Resetear mensaje de error

  let Result;
  
  // Asegúrate de enviar los datos en el formato correcto (ej: números)
  const atletaToSend: InsertAtletaDto = {
    ...nuevoAtleta.value,
    dni: Number(nuevoAtleta.value.dni),
    posicion: Number(nuevoAtleta.value.posicion),
    ciudadId: Number(nuevoAtleta.value.ciudadId),
  };

  Result = await ApiService.createAtleta(atletaToSend);

  if (!Result.isSuccess) {
    // Si el backend devuelve un error, lo mostramos
    ErrorMessage.value = Result.error.message;
  } else {
    // Éxito: Mostrar Toast y reiniciar formulario
    successToast.value = true;
    setTimeout(() => { successToast.value = false; }, 3000); 

    // Reiniciar formulario
    nuevoAtleta.value = {
      dni: null as any,
      nombre: '',
      tiempo: '',
      posicion: null as any,
      ciudadId: null as any,
    };
  }
};
</script>

<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-7 col-xl-6">
        <div class="card shadow-lg border-0 rounded-4">
          <div class="card-header bg-primary text-white text-center py-3 rounded-top-4">
            <h2 class="card-title mb-0 fs-4">Registrar Nuevo Atleta 🏃‍♂️</h2>
          </div>
          <div class="card-body p-4">
            
            <form @submit.prevent="createAtleta">
              
              <div class="mb-3">
                <label for="dni" class="form-label fw-semibold">DNI</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="dni" 
                  v-model.number="nuevoAtleta.dni" 
                  placeholder="Ej: 12345678"
                >
                <div class="form-text">Ingresa el DNI sin puntos ni guiones.</div>
              </div>

              <div class="mb-3">
                <label for="nombre" class="form-label fw-semibold">Nombre Completo</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="nombre" 
                  v-model="nuevoAtleta.nombre" 
                  placeholder="Ej: Juan Pérez"
                >
              </div>

              <div class="mb-3">
                <label for="tiempo" class="form-label fw-semibold">Tiempo (hh:mm:ss)</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="tiempo" 
                  v-model="nuevoAtleta.tiempo" 
                  placeholder="Ej: 01:30:15"
                >
                <div class="form-text">
                  Formato: HH:MM:SS
                </div>
              </div>

              <div class="mb-3">
                <label for="posicion" class="form-label fw-semibold">Posición</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="posicion" 
                  v-model.number="nuevoAtleta.posicion" 
                  min="1"
                  placeholder="Ej: 1"
                >
              </div>

              <div class="mb-4">
                <label for="ciudadId" class="form-label fw-semibold">Ciudad</label>
                <select 
                  class="form-select" 
                  id="ciudadId" 
                  v-model.number="nuevoAtleta.ciudadId" 
                >
                  <option :value="null" disabled selected>Selecciona una ciudad</option>
                  <option v-for="ciudad in ciudadesDisponibles" :key="ciudad.id" :value="ciudad.id">
                    {{ ciudad.nombre }}
                  </option>
                </select>
              </div>

              <div v-if="ErrorMessage" class="alert alert-danger mb-4 shadow-sm" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ ErrorMessage }}
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg">
                  <i class="bi bi-plus-circle me-2"></i> Crear Atleta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div 
      class="toast align-items-center text-white bg-success border-0" 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
      :class="{ 'show': successToast }"
    >
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle-fill me-2"></i> ¡Atleta creado con éxito!
        </div>
        <button 
          type="button" 
          class="btn-close btn-close-white me-2 m-auto" 
          aria-label="Close"
          @click="successToast = false"
        ></button>
      </div>
    </div>
  </div>
</template>