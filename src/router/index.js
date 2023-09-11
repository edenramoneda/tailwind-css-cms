import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import AboutCompany from '@/views/Page/AboutCompany.vue'
import Contact from '@/views/Page/Contact.vue'
import Inquiries from '@/views/Inquiries.vue'
import Categories from '@/views/Page/Categories.vue'
import Activities from '@/views/Activities/Activities.vue'
import ActivityForm from '@/views/Activities/Form.vue'
import ActivityImages from '@/views/Activities/Images.vue'
import Packages from '@/views/Packages/Packages.vue'
import PackageForm from '@/views/Packages/PackageForm.vue'
import PackageImages from '@/views/Packages/PackageImages.vue'
import Index from '@/views/Index.vue'
import ActivityItinerary from '@/views/Activities/Itinerary.vue'
import ActivityItineraryForm from '@/views/Activities/ItineraryForm.vue'
import PackageItinerary from '@/views/Packages/Itinerary.vue'
import PackageItineraryForm from '@/views/Packages/ItineraryForm.vue'
import axios from 'axios';
import Transfers from '@/views/Transfers/Transfers.vue'
import TransferForm from '@/views/Transfers/Form.vue'
import TransferImages from '@/views/Transfers/TransferImages.vue'
import AccountSettings from '@/views/AccountSettings.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/login',
      component: Index
    },
    {
      path: '/home',
      name: 'home',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/about-company',
      name: 'about-company',
      component: AboutCompany,
      meta: { requiresAuth: true },
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: { requiresAuth: true },
    },
    {
      path: '/inquiries',
      name: 'inquiries',
      component: Inquiries,
      meta: { requiresAuth: true },
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
      meta: { requiresAuth: true },
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities,
      meta: { requiresAuth: true },
    },
    {
      path: '/activity/add',
      name: 'activity/add',
      component: ActivityForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/activity/edit/:id',
      name: 'activity/edit',
      component: ActivityForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/activity/images/:subcat_id',
      name: 'activity/images',
      component: ActivityImages,
      meta: { requiresAuth: true },
    },
    {
      path: '/packages',
      name: 'packages',
      component: Packages,
      meta: { requiresAuth: true },
    },
    {
      path: '/packages/add',
      name: 'packages/add',
      component: PackageForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/packages/edit/:id',
      name: 'packages/edit',
      component: PackageForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/packages/images/:subcat_id',
      name: 'packages/images',
      component: PackageImages,
      meta: { requiresAuth: true },
    },
    {
      path: '/transfers-and-rentals',
      name: '/transfers-and-rentals',
      component: Transfers,
      meta: { requiresAuth: true },
    },
    {
      path: '/transfers-rentals/add',
      name: 'transfers-rentals/add',
      component: TransferForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/transfers-rentals/edit/:id',
      name: 'transfers-rentals/edit',
      component: TransferForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/transfers-rentals/images/:vehicleId',
      name: 'transfers-rentals/images',
      component: TransferImages,
      meta: { requiresAuth: true },
    },
    
    {
      path: '/activity/itinerary/:subcat_id',
      name: 'activity/itinerary',
      component: ActivityItinerary,
      meta: { requiresAuth: true },
    },
    {
      path: '/activity/itinerary/add/:subcat_id',
      name: 'activity/itinerary/add',
      component: ActivityItineraryForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/activity/itinerary/edit/:subcat_id:/:itineraryId',
      name: 'activity/itinerary/edit',
      component: ActivityItineraryForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/package/itinerary/:subcat_id',
      name: 'package/itinerary',
      component: PackageItinerary,
      meta: { requiresAuth: true },
    },
    {
      path: '/package/itinerary/add/:subcat_id',
      name: 'package/itinerary/add',
      component: PackageItineraryForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/package/itinerary/edit/:subcat_id:/:itineraryId',
      name: 'package/itinerary/edit',
      component: PackageItineraryForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/account-settings',
      name: 'account-settings',
      component: AccountSettings,
      meta: { requiresAuth: true },
    },
  ]
})
router.beforeEach((to, from, next) => {
    
  
  const isAuthenticated = localStorage.getItem("userToken") && localStorage.getItem('userData');

    if (to.path === '/' && isAuthenticated) {
      next('/home');
    }

    if(to.matched.some(record => record.meta.requiresAuth)){

      if(isAuthenticated){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("userToken")}`;
        next()
      }else{
        next({
            path: '/'
          })

      }
    }else{
        next();
    }

   
})
export default router
