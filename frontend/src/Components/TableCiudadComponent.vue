<script setup lang="ts">
import { type PropType } from 'vue'; 
import type { Ciudad } from '@/Types/Ciudad';

const props = defineProps({
    Ciudades: {
        type: Array as PropType<Ciudad[]|[]>, 
        required: true,
    }
});
</script>


<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        
        <h2 class="text-center mb-4 text-info">Ciudades Registradas</h2>
        
        <div class="list-group shadow-lg rounded-3">

          <div class="list-group-item list-group-item-dark fw-bold d-flex justify-content-between">
            <span>Nombre de la Ciudad</span>
            <span class="badge bg-secondary rounded-pill">{{ Ciudades.length }}</span>
          </div>

          <a
            href="#" 
            v-for="(ciudad, index) in Ciudades" 
            :key="index"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <span class="fw-medium text-dark">{{ ciudad.nombre }}</span>
            
            <small class="text-muted">{{ index + 1 }}</small>
          </a>

          <div v-if="Ciudades.length === 0" class="list-group-item list-group-item-light text-center py-3">
            <span class="text-secondary">No hay ciudades cargadas.</span>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>