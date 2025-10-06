<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid container-xl">
      
      <RouterLink :to="{ name: 'Dasboard' }" class="navbar-brand fw-bold fs-4 text-info">
        <i class="bi bi-speedometer2 me-2"></i> Gestión de Carreras
      </RouterLink>

      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          
          <li class="nav-item">
            <RouterLink 
              :to="{ name: 'Dasboard' }" 
              class="btn btn-outline-info me-2 my-1"
              active-class="active"
              aria-current="page"
            >
              <i class="bi bi-grid-fill me-1"></i> Dashboard
            </RouterLink>
          </li>
          
          <li class="nav-item">
            <RouterLink 
              :to="{ name: 'UploadAtleta' }" 
              class="btn btn-outline-success me-2 my-1"
              active-class="active"
            >
              <i class="bi bi-person-plus-fill me-1"></i> Cargar Atleta
            </RouterLink>
          </li>
          
          <li class="nav-item">
            <RouterLink 
              :to="{ name: 'UploadCiudad' }" 
              class="btn btn-outline-warning my-1"
              active-class="active"
            >
              <i class="bi bi-geo-alt-fill me-1"></i> Cargar Ciudad
            </RouterLink>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.btn.active {
  color: var(--bs-dark) !important;
  background-color: var(--bs-info) !important;
  border-color: var(--bs-info) !important;
}

.nav-item .btn-outline-success.active {
    color: white !important;
    background-color: var(--bs-success) !important;
}

.nav-item .btn-outline-warning.active {
    color: var(--bs-dark) !important;
    background-color: var(--bs-warning) !important;
}
</style>