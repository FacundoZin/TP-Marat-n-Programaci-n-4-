<script setup lang="ts">
import { ApiService } from '@/ExternalServices/ApiServices';
import type { Atleta } from '@/Types/Atleta';
import type { InsertAtletaDto } from '@/Types/InsertAtletaDto';
import { ref, watch } from 'vue';

const props = defineProps<{
    atleta: Atleta
}>();



const ErrorMessage = ref<string | null>(null);
const successToast = ref(false);
const isSubmitting = ref(false);

const atletaEditado = ref<Atleta>({ ...props.atleta });

watch(() => props.atleta, (nuevoAtleta) => {
    atletaEditado.value = { ...nuevoAtleta };
});


const updateAtleta = async () => {
    ErrorMessage.value = null;
    isSubmitting.value = true;
    let Result;

    const atletaToSend: InsertAtletaDto = {
        dni: Number(atletaEditado.value.dni),
        nombre: atletaEditado.value.nombre.trim(),
        tiempo: atletaEditado.value.tiempo.trim(),
        posicion: Number(atletaEditado.value.posicion),
        ciudadId: atletaEditado.value.ciudadId,
    };

    try {
        Result = await ApiService.updateAtleta(props.atleta.id, atletaToSend);

        if (!Result.isSuccess) {
            ErrorMessage.value = Result.error.message;
        } else {
            successToast.value = true;
            setTimeout(() => { successToast.value = false; }, 3000);
        }
    } catch (error) {
        ErrorMessage.value = "Ocurrió un error inesperado al comunicarse con el servidor.";
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-7 col-xl-6">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-header bg-warning text-dark text-center py-3 rounded-top-4">
                        <h2 class="card-title mb-0 fs-4">Actualizar Atleta ✏️</h2>
                        <p class="mb-0 small fw-semibold">ID: {{ atletaEditado.id }} | Ciudad ID: {{
                            atletaEditado.ciudadId }}</p>
                    </div>
                    <div class="card-body p-4">

                        <form @submit.prevent="updateAtleta">

                            <div class="mb-3">
                                <label for="dni" class="form-label fw-semibold">DNI</label>
                                <input type="number" class="form-control" id="dni" v-model.number="atletaEditado.dni"
                                    placeholder="DNI" required>
                            </div>

                            <div class="mb-3">
                                <label for="nombre" class="form-label fw-semibold">Nombre Completo</label>
                                <input type="text" class="form-control" id="nombre" v-model="atletaEditado.nombre"
                                    placeholder="Ej: Juan Pérez" required>
                            </div>

                            <div class="mb-3">
                                <label for="tiempo" class="form-label fw-semibold">Tiempo (hh:mm:ss)</label>
                                <input type="text" class="form-control" id="tiempo" v-model="atletaEditado.tiempo"
                                    placeholder="Ej: 01:30:15" required>
                            </div>

                            <div class="mb-4">
                                <label for="posicion" class="form-label fw-semibold">Posición</label>
                                <input type="number" class="form-control" id="posicion"
                                    v-model.number="atletaEditado.posicion" min="1" placeholder="Ej: 1" required>
                            </div>

                            <div v-if="ErrorMessage" class="alert alert-danger mb-4 shadow-sm" role="alert">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ ErrorMessage }}
                            </div>

                            <div class="d-grid">
                                <button type="submit" class="btn btn-warning btn-lg text-dark fw-bold"
                                    :disabled="isSubmitting">
                                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"
                                        role="status" aria-hidden="true"></span>
                                    <i v-else class="bi bi-arrow-clockwise me-2"></i>
                                    {{ isSubmitting ? 'Actualizando...' : 'Guardar Cambios' }}
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
                    <i class="bi bi-check-circle-fill me-2"></i> ¡Atleta actualizado con éxito!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"
                    @click="successToast = false"></button>
            </div>
        </div>
    </div>
</template>