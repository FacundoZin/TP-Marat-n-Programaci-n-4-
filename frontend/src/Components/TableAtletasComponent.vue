<script setup lang="ts">
import { type PropType } from 'vue';
import type { Atleta } from '@/Types/Atleta'; 

const props = defineProps({
    Atletas: {
        type: Array as PropType<Atleta[]|[]>, 
        required: true,
    }
});
</script>

<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center mb-4 text-primary">Resultados de Atletas</h2>
        
        <div class="table-responsive shadow-lg rounded">
          <table class="table table-hover table-striped table-borderless caption-top">
            <caption>Lista de Atletas registrados ({{ Atletas.length }} en total)</caption>

            <thead class="table-dark">
              <tr>
                <th scope="col" class="text-center">#</th>
                <th scope="col">DNI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Tiempo</th>
                <th scope="col" class="text-center">Acciones</th>
              </tr>
            </thead>
            
            <tbody>
              <tr 
                v-for="atleta in Atletas" 
                :key="atleta.dni"
                :class="{ 'table-success': atleta.posicion === 1, 'table-warning': atleta.posicion <= 3 && atleta.posicion > 1 }"
              >
                <th scope="row" class="text-center align-middle fs-5" :class="{ 'text-success': atleta.posicion === 1 }">
                    <span v-if="atleta.posicion === 1">🥇</span>
                    <span v-else-if="atleta.posicion === 2">🥈</span>
                    <span v-else-if="atleta.posicion === 3">🥉</span>
                    <span v-else>{{ atleta.posicion }}</span>
                </th>
                
                <td class="align-middle text-muted">{{ atleta.dni }}</td>
                
                <td class="align-middle fw-bold">{{ atleta.nombre }}</td>
                
                <td class="align-middle text-info">{{ atleta.tiempo }}</td>

                <td class="text-center align-middle">
                    <RouterLink 
                        :to="{ name: 'AtletaDetalle', params: { IdAtleta: atleta.id } }"
                        class="btn btn-sm btn-outline-primary"
                    >
                        Ver Perfil
                    </RouterLink>
                </td>
              </tr>

              <tr v-if="Atletas.length === 0">
                <td colspan="5" class="text-center text-secondary py-4">
                  Aún no hay atletas registrados. 🏃‍♂️
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>