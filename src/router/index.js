import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LandingPage from '../views/LandingPage.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandingPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },

        // Candidate Routes
        {
            path: '/candidate',
            redirect: '/candidate/dashboard',
            meta: { requiresAuth: true, role: 'candidate' }
        },
        {
            path: '/candidate/dashboard',
            name: 'candidate-dashboard',
            component: () => import('../views/CandidateDashboard.vue'),
            meta: { requiresAuth: true, role: 'candidate' }
        },
        {
            path: '/candidate/profile',
            name: 'candidate-profile',
            component: () => import('../views/CandidateProfile.vue'),
            meta: { requiresAuth: true, role: 'candidate' }
        },
        {
            path: '/candidate/candidates',
            name: 'candidate-search',
            component: () => import('../views/CandidateSearch.vue'),
            meta: { requiresAuth: true, role: 'candidate' }
        },
        {
            path: '/candidate/requests',
            name: 'candidate-requests',
            component: () => import('../views/CandidateRequests.vue'),
            meta: { requiresAuth: true, role: 'candidate' }
        },
        {
            path: '/candidate/favorites',
            name: 'candidate-favorites',
            component: () => import('../views/CandidateFavorites.vue'),
            meta: { requiresAuth: true, role: 'candidate' }
        },
        {
            path: '/candidate/media',
            name: 'candidate-media',
            component: () => import('../views/CandidateMedia.vue'),
            meta: { requiresAuth: true, role: 'candidate' }
        },

        // Moderator Routes
        {
            path: '/moderator',
            redirect: '/moderator/dashboard',
            meta: { requiresAuth: true, role: 'moderator' }
        },
        {
            path: '/moderator/dashboard',
            name: 'moderator-dashboard',
            component: () => import('../views/ModeratorDashboard.vue'),
            meta: { requiresAuth: true, role: 'moderator' }
        },
        {
            path: '/moderator/system',
            name: 'moderator-system',
            component: () => import('../views/ModeratorSystem.vue'),
            meta: { requiresAuth: true, role: 'moderator' }
        },

        // Admin Routes
        {
            path: '/admin',
            redirect: '/admin/dashboard',
            meta: { requiresAuth: true, role: 'admin' }
        },
        {
            path: '/admin/dashboard',
            name: 'admin-dashboard',
            component: () => import('../views/AdminDashboard.vue'),
            meta: { requiresAuth: true, role: 'admin' }
        },
        {
            path: '/admin/features',
            name: 'admin-features',
            component: () => import('../views/AdminFeatureFlags.vue'),
            meta: { requiresAuth: true, role: 'admin' }
        },

        // 404
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFound.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
        return
    }

    // Check role if specified
    if (to.meta.role && authStore.user?.role !== to.meta.role) {
        // Redirect to appropriate dashboard based on role
        const role = authStore.user?.role
        if (role === 'candidate') next('/candidate/dashboard')
        else if (role === 'moderator') next('/moderator/dashboard')
        else if (role === 'admin') next('/admin/dashboard')
        else next('/login')
        return
    }

    next()
})

export default router
