<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted,ref,computed } from 'vue'



const router = useRouter()
let sidebarOpen = ref(false)
let showMenu = ref(false)

const dropdownClass = computed(() => {
    return showMenu.value ? "transition ease-in h-32" : "h-0";
})

function logout(){
    window.localStorage.removeItem('userToken')
    window.localStorage.removeItem('userData')
    router.push('/')
}

function toggleSidebar(){
    sidebarOpen.value = !sidebarOpen.value


}

function toggleShow() {
    showMenu.value = !showMenu.value;
}




onMounted(() => {

})
</script>
<template>

    <!--navbar-->
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 z-[1040]">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                    <button 
                        @click="toggleSidebar"
                        class="border border-gray-200 p-3 rounded md:hidden"
                        type="button" >
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>

                    </button>
                    <img src="" class="h-14 xxs:h-12 ml-3" alt="App Logo" />
                </div>
            
            </div>
        </div>
    </nav>
    
    <!--sidebar-->
    <nav 
    id="logo-sidebar" 
    :class="sidebarOpen ? 'block' : 'transition xs:hidden sm:hidden md:block'"
    class="fixed left-0 top-0 z-[1035] h-screen transition w-64 bg-zinc-800
    
     border-r border-gray-200 app-name-bg-blue dark:border-gray-700"

    >
        <div class="h-full px-3 pb-4 overflow-y-auto app-name-bg-blue">
            <ul class="space-y-4 font-medium mt-28">
                <li>
                    <a href="/home" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-chart-pie" class="text-gray-500"/>
                    <span class="ml-3">Dashboard</span>
                    </a>
                </li>
                <li>
                    <button type="button" @click="toggleShow" class="flex items-center w-full p-2 text-base text-gray-700 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="page-dropdown" data-collapse-toggle="page-dropdown">
                        <font-awesome-icon icon="fa-solid fa-copy" class="text-gray-500"/>
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">Page Management</span>
                        <font-awesome-icon icon="fa-solid fa-chevron-right" :class="{'rotate-90' : showMenu}" class="text-white" size="sm"/>
                    </button>


                    <ul id="page-dropdown" :class="dropdownClass" class="ml-4 overflow-hidden dropdown-menu font-normal">
                        <li>
                            <a href="/categories" class="relative flex items-center w-full p-2 text-gray-700 transition duration-75 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Categories</a>
                        </li>
                        <li>
                            <a href="/about-company"  class="relative flex items-center w-full p-2 text-gray-700 transition duration-75 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">About Company</a>
                        </li>
                        <li>
                            <a href="/contact" class="relative flex items-center w-full p-2 text-gray-700 transition duration-75 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Contacts</a>
                        </li>
                      
                    </ul>
                </li>
                <li class="relative">
                    <a href="/activities" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-ship" class="text-gray-500" />
                    <span class="ml-3">Activity Management</span>
                    </a>
                </li>
                <li>
                    <a href="/packages" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-globe" class="text-gray-500" />
                    <span class="ml-3">Package Management</span>
                    </a>
                </li>
                <li>
                    <a href="/transfers-and-rentals" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-car-side" class="text-gray-500" />
                    <span class="ml-3">Transfers / Rentals Management</span>
                    </a>
                </li>
                <li>
                    <a href="/inquiries" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-envelope" class="text-gray-500" />
                    <span class="ml-3">Inquiries</span>
                    </a>
                </li>
                <li>
                    <a href="/account-settings" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-gear" class="text-gray-500" />
                    <span class="ml-3">Account Settings</span>
                    </a>
                </li>
                <li>
                    <p @click="logout" class="cursor-pointer flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="text-gray-500" />
                    <span class="ml-3">Logout</span>
                    </p>
                </li>
              
            </ul>
        </div>
    </nav>

    <div 
    class="p-4 mt-24 md:ml-72">
        
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 app-name-bg-blue opacity-50 z-[1034] cursor-pointer"
        ></div>

        <div class="container">
            <!-- Content Here-->
            <slot></slot>
        </div>
    </div>


</template>