<template>
  <div class="dashboard-layout">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="/logo.svg" alt="Muqabala" height="40" />
        </a>

        <!-- Mobile toggle -->
        <button class="navbar-toggler" type="button" @click="toggleSidebar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar right -->
        <div class="navbar-nav ms-auto d-flex flex-row align-items-center">
          <!-- Notifications -->
          <div class="nav-item dropdown me-3">
            <a class="nav-link position-relative" href="#" role="button" data-bs-toggle="dropdown">
              <i class="ri-notification-3-line ri-lg"></i>
              <span v-if="unreadCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ unreadCount }}
              </span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><h6 class="dropdown-header">Notifications</h6></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Aucune notification</a></li>
            </ul>
          </div>

          <!-- User menu -->
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
              <img :src="user?.picture || '/default-avatar.png'" alt="Avatar" class="rounded-circle me-2" width="32" height="32">
              <span class="d-none d-md-inline">{{ user?.name }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><router-link class="dropdown-item" to="/candidate/profile"><i class="ri-user-line me-2"></i>Mon Profil</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="#" @click.prevent="handleLogout"><i class="ri-logout-box-line me-2"></i>Déconnexion</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside :class="['sidebar', { 'sidebar-open': sidebarOpen }]">
      <div class="sidebar-content">
        <nav class="nav flex-column">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: isActive(item.path) }"
          >
            <i :class="`${item.icon} me-2`"></i>
            {{ item.label }}
          </router-link>
        </nav>
      </div>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <div class="container-fluid py-4">
        <slot></slot>
      </div>
    </main>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const sidebarOpen = ref(false)
const unreadCount = ref(0)

const user = computed(() => authStore.user)

const menuItems = computed(() => {
  const role = user.value?.role || 'candidate'
  
  if (role === 'candidate') {
    return [
      { path: '/candidate/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
      { path: '/candidate/profile', label: 'Mon Profil', icon: 'ri-user-line' },
      { path: '/candidate/candidates', label: 'Recherche', icon: 'ri-search-line' },
      { path: '/candidate/requests', label: 'Mes Demandes', icon: 'ri-mail-line' },
      { path: '/candidate/favorites', label: 'Favoris', icon: 'ri-heart-line' },
      { path: '/candidate/media', label: 'Médias', icon: 'ri-image-line' }
    ]
  } else if (role === 'moderator') {
    return [
      { path: '/moderator/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
      { path: '/moderator/candidates', label: 'Candidats', icon: 'ri-user-line' },
      { path: '/moderator/requests', label: 'Demandes', icon: 'ri-mail-line' },
      { path: '/moderator/photos', label: 'Photos', icon: 'ri-image-line' }
    ]
  } else if (role === 'admin') {
    return [
      { path: '/admin/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
      { path: '/admin/users', label: 'Utilisateurs', icon: 'ri-user-line' },
      { path: '/admin/settings', label: 'Paramètres', icon: 'ri-settings-line' },
      { path: '/admin/logs', label: 'Logs', icon: 'ri-file-list-line' }
    ]
  }
  
  return []
})

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  padding-top: 76px; /* Navbar height */
}

.navbar {
  z-index: 1030;
}

.sidebar {
  position: fixed;
  top: 76px;
  left: 0;
  bottom: 0;
  width: 260px;
  background: #ffffff;
  border-right: 1px solid var(--bs-border-color);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease;
  z-index: 1020;
  overflow-y: auto;
}

.sidebar-content {
  padding: 1.5rem 0;
}

.sidebar .nav-link {
  padding: 0.75rem 1.5rem;
  color: #64748b;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.sidebar .nav-link:hover {
  background-color: #f8fafc;
  color: #6366f1;
}

.sidebar .nav-link.active {
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
  color: #6366f1;
  border-left-color: #6366f1;
}

.main-content {
  margin-left: 260px;
  min-height: calc(100vh - 76px);
  background: #f8fafc;
  transition: margin-left 0.3s ease;
}

.sidebar-overlay {
  display: none;
}

/* Mobile */
@media (max-width: 991px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 76px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1010;
  }
}
</style>
