import { createRouter, createWebHistory } from "vue-router"
import store from "../store"
import Login from "../views/Login.vue"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("../views/Home.vue"),
		meta: { needsLogin: true }
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { needsLogin: true, needsRole: 'Admin' }
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { needsLogin: true, needsRole: 'Editor' }
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const user = store.state.user
	
	if (to.meta.needsLogin && !user) {
		next('/')
		return
	}
	
	if (to.meta.needsRole) {
		const hasRole = user?.roles?.includes(to.meta.needsRole)
		const isAdmin = user?.roles?.includes('Admin')
		
		if (!hasRole && !isAdmin) {
			next('/home')
			return
		}
	}
	
	next()
})

export default router
