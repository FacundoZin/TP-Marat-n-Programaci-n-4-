<script setup lang="ts">
import { ApiService } from '@/ExternalServices/ApiServices';
import type { InsertCiudadDto } from '@/Types/InsertCiudadDto';
import { ref } from 'vue';



const ErrorMessage = ref<string | null>(null);
const successToast = ref(false);

const nuevaCiudad = ref<InsertCiudadDto>({
    nombre: '',
});


const createCiudad = async () => {
    if (!nuevaCiudad.value.nombre.trim()) {
        ErrorMessage.value = "El nombre de la ciudad no puede estar vacío.";
        return;
    }

    ErrorMessage.value = null;
    let Result;

    const ciudadToSend: InsertCiudadDto = {
        nombre: nuevaCiudad.value.nombre.trim(),
    };

    Result = await ApiService.createCiudad(ciudadToSend);

    if (!Result.isSuccess) {
        ErrorMessage.value = Result.error.message;

    } else {
        successToast.value = true;
        setTimeout(() => { successToast.value = false; }, 3000);
        nuevaCiudad.value.nombre = '';
    }
};
</script>

<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-header bg-success text-white text-center py-3 rounded-top-4">
                        <h2 class="card-title mb-0 fs-4">Cargar Nueva Ciudad 📍</h2>
                    </div>
                    <div class="card-body p-4">

                        <form @submit.prevent="createCiudad">

                            <div class="mb-4">
                                <label for="nombreCiudad" class="form-label fw-semibold">Nombre de la Ciudad</label>
                                <input type="text" class="form-control form-control-lg" id="nombreCiudad"
                                    v-model.trim="nuevaCiudad.nombre" placeholder="Ej: Ushuaia" required>
                                <div class="form-text">Ingresa el nombre completo de la ciudad.</div>
                            </div>

                            <div v-if="ErrorMessage" class="alert alert-danger mb-4 shadow-sm" role="alert">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ ErrorMessage }}
                            </div>

                            <div class="d-grid">
                                <button type="submit" class="btn btn-success btn-lg">
                                    <i class="bi bi-plus-circle me-2"></i> Guardar Ciudad
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive"
            aria-atomic="true" :class="{ 'show': successToast }">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle-fill me-2"></i> ¡Ciudad creada con éxito!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"
                    @click="successToast = false"></button>
            </div>
        </div>
    </div>
</template>