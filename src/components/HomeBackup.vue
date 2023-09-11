<script setup>

</script>
<template>

    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <img src="https://media.discordapp.net/attachments/1140497452512845885/1140497478488166461/Logo.png?width=870&height=182" class="h-14 ml-3" alt="FlowBite Logo" />
        </div>
        
        </div>
    </div>
    </nav>

    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-28 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-chart-pie" class="text-gray-500"/>
                    <span class="ml-3">Dashboard</span>
                    </a>
                </li>
                <li>
                    <button type="button" class="flex items-center w-full p-2 text-base text-gray-700 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="page-dropdown" data-collapse-toggle="page-dropdown">
                        <font-awesome-icon icon="fa-solid fa-copy" class="text-gray-500"/>
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">Page Management</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <ul id="page-dropdown" class="hidden py-2 space-y-2">
                        <li>
                            <a href="/about-company" class="flex items-center w-full p-2 text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">About Company</a>
                        </li>
                        <li>
                            <a href="/contact" class="flex items-center w-full p-2 text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Contact</a>
                        </li>
                      
                    </ul>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-ship" class="text-gray-500" />
                    <span class="ml-3">Activity Management</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-globe" class="text-gray-500" />
                    <span class="ml-3">Package Management</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-car-side" class="text-gray-500" />
                    <span class="ml-3">Transfers / Rentals Management</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="text-gray-500" />
                    <span class="ml-3">Logout</span>
                    </a>
                </li>
              
            </ul>
        </div>
    </aside>

    <div class="p-4 sm:ml-64">
    <div class="p-4 mt-24 ml-12">
        <slot></slot>
    </div>
    </div>


</template>