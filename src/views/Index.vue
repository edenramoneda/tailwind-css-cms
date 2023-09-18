<script setup>
import { ref  } from 'vue'
let open = ref(false)
</script>
<template>
  <div class="flex flex-col items-center justify-center mt-32">
    <div class="flex flex-col">
        <!-- Page Scroll Progress -->


        <!-- Navbar -->
        <nav class="flex justify-around py-4 bg-white/80
            backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10 h-24">

            <!-- Logo Container -->
            <div class="flex items-center">
                <!-- Logo -->
                <a class="cursor-pointer">
                    <h1 class="text-5xl tourista-title text-teal-500">
                        TOURISTA
                    </h1>
                </a>
            </div>

            <!-- Links Section -->
            <div class="items-center hidden space-x-8 lg:flex text-lg">
                <a class="flex text-gray-600 hover:text-teal-600
                    cursor-pointer transition-colors duration-300">
                    Home
                </a>

                <a class="flex text-gray-600 
                    cursor-pointer transition-colors duration-300 hover:text-teal-600
                    ">
                    About Us
                </a>

                <div class="relative">
                    <button @click="open = !open" class="px-4 py-2 flex flex-row items-center bg-transparent">
                    <span class="text-gray-600 cursor-pointer transition-colors duration-300 hover:text-teal-600">Offers</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    
                    <div :class="open ? 'absolute w-56 mt-2 origin-top-right rounded-md shadow-lg' : 'hidden'">
                        <div class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                            <a class="text-base block px-4 py-2 mt-2 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark:text-gray-600 md:mt-0 hover:text-teal-600 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Travel Package</a>
                            <a class="text-base whitespace-nowrap block px-4 py-2 mt-2 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark:text-gray-600 md:mt-0 hover:text-teal-600 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Transfers and Rentals</a>
                        </div>
                    </div>
                </div>   

                
                <a class="flex text-gray-600 hover:text-blue-500 hover:text-teal-600
                    cursor-pointer transition-colors duration-300">
                    Contact Us
                </a>

                <button class="rounded-full bg-teal-800 p-3 px-8">
                    <a class="flex text-gray-600 hover:text-blue-okiokieeok500
                        cursor-pointer transition-colors duration-300 text-white">
                        Book Now
                    </a>
                </button>
            </div>
        </nav>
    </div>

    <!-- Dummy Scrollable Content -->
    <div class="flex flex-wrap" style="width: 1000px;">
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
        <div class="bg-orange-200 h-52 w-52 m-5"></div>
    </div>
</div>
</template>