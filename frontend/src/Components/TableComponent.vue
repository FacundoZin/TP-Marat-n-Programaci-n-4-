<script setup>
import { computed } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    resourceName: {
        type: String,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: true,
    },
    errorMessage: {
        type: String,
        default: null,
    },
});


const tableHeaders = computed(() => {
    if (props.items.length === 0) return [];
    return Object.keys(props.items[0]);
});

const showEmptyState = computed(() => {
    return !props.isLoading && props.items.length === 0 && !props.errorMessage;
});
</script>

<template>
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Listado de {{ resourceName }}</h5>
        </div>
        <div class="card-body">
            <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-3 text-primary fw-bold">Buscando {{ resourceName.toLowerCase() }} </p>
            </div>

            <div v-else-if="errorMessage" class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error al cargar {{ resourceName }}</h4>
                <p>{{ errorMessage }}</p>
                <hr>
            </div>

            <div v-else-if="showEmptyState" class="p-4 bg-light border rounded text-center">
                <h5 class="text-secondary">No hay {{ resourceName.toLowerCase() }} registradas.</h5>
                <p class="text-muted">Utiliza el formulario de creación para agregar el primer elemento.</p>
                <i class="bi bi-info-circle text-secondary fs-4"></i>
            </div>

            <div v-else class="table-responsive">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col" v-for="header in tableHeaders" :key="header">
                                {{ header.toUpperCase() }}
                            </th>
                            <th scope="col" class="text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" :key="index">
                            <td v-for="(value, key) in item" :key="key">
                                <span v-if="typeof value === 'object' && value !== null">
                                    [Object: {{ value.nombre || value.id }}]
                                </span>
                                <span v-else>
                                    {{ value }}
                                </span>
                            </td>
                            <td class="text-center">
                                <div class="btn-group" role="group">
                                    <button class="btn btn-sm btn-info me-2">Ver Detalle</button>
                                    <button class="btn btn-sm btn-warning">Editar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.spinner-border {
    border-color: currentColor;
    border-right-color: transparent;
}
</style>