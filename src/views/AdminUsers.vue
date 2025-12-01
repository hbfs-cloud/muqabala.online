<template>
  <DashboardLayout>
    <div class="admin-users">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-1"><i class="ri-user-line me-2"></i>Utilisateurs</h2>
          <p class="text-muted">Gestion des utilisateurs de la plateforme</p>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <div class="input-group">
                <span class="input-group-text"><i class="ri-search-line"></i></span>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Rechercher par nom ou email..." 
                  v-model="searchQuery"
                  @input="handleSearch"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Users Table -->
      <div v-else class="card">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light">
              <tr>
                <th style="width: 30%">Utilisateur</th>
                <th style="width: 20%">Rôles</th>
                <th style="width: 20%">Date d'inscription</th>
                <th style="width: 15%">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="users.length === 0">
                <td colspan="4" class="text-center py-4 text-muted">
                  Aucun utilisateur trouvé
                </td>
              </tr>
              <tr v-for="user in users" :key="user.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="avatar-initial rounded-circle bg-label-primary me-3">
                      {{ getInitials(user.name) }}
                    </div>
                    <div>
                      <h6 class="mb-0">{{ user.name }}</h6>
                      <small class="text-muted">{{ user.email }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex gap-1 flex-wrap">
                    <span 
                      v-for="role in user.roles" 
                      :key="role" 
                      class="badge"
                      :class="{
                        'bg-primary': role === 'admin',
                        'bg-warning text-dark': role === 'moderator',
                        'bg-info text-dark': role === 'candidate'
                      }"
                    >
                      {{ role }}
                    </span>
                  </div>
                </td>
                <td>
                  {{ formatDate(user.createdAt) }}
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-1" @click="viewUser(user)">
                    <i class="ri-eye-line"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="card-footer d-flex justify-content-between align-items-center">
          <small class="text-muted">
            Affichage de {{ (currentPage - 1) * limit + 1 }} à {{ Math.min(currentPage * limit, totalUsers) }} sur {{ totalUsers }} utilisateurs
          </small>
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="changePage(currentPage - 1)">Précédent</button>
              </li>
              <li class="page-item active">
                <span class="page-link">{{ currentPage }}</span>
              </li>
              <li class="page-item" :class="{ disabled: currentPage * limit >= totalUsers }">
                <button class="page-link" @click="changePage(currentPage + 1)">Suivant</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../components/DashboardLayout.vue'
import apiClient from '../api/client'
import { debounce } from 'lodash'

const router = useRouter()
const loading = ref(true)
const users = ref([])
const totalUsers = ref(0)
const currentPage = ref(1)
const limit = 20
const searchQuery = ref('')

onMounted(() => {
  loadUsers()
})

const handleSearch = debounce(() => {
  currentPage.value = 1
  loadUsers()
}, 300)

async function loadUsers() {
  try {
    loading.value = true
    const response = await apiClient.get('/admin/users', {
      params: {
        page: currentPage.value,
        limit: limit,
        search: searchQuery.value
      }
    })
    
    users.value = response.data.users
    totalUsers.value = response.data.total
  } catch (error) {
    console.error('Error loading users:', error)
    // alert('Erreur lors du chargement des utilisateurs')
  } finally {
    loading.value = false
  }
}

function changePage(page) {
  if (page < 1 || (page - 1) * limit >= totalUsers.value) return
  currentPage.value = page
  loadUsers()
}

function viewUser(user) {
  // Navigation to user details (to be implemented)
  // router.push(`/admin/users/${user.uuid}`)
  alert('Détails utilisateur à implémenter dans la SPA')
}

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateString) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.avatar-initial {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #fff;
}

.bg-label-primary {
  background-color: #e7e7ff;
  color: #696cff;
}
</style>
