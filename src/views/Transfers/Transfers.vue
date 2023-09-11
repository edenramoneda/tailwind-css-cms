<script setup>
import Home from '@/components/Home.vue'
import {  useTransfersStore } from '@/stores/transfers'
import { onMounted,ref, computed,reactive } from 'vue'
import Swal from 'sweetalert2'

import { updateData } from '@/plugins/axiosUtils'; 
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const storeTransfers = useTransfersStore();

const getTransfers = computed(() => {
  return storeTransfers.transfers;
});

function toogleVisibility(event, id){
  
  Swal.fire({
     title: `Are you sure you want to ${event.target.checked ? 'enable' : 'disable'} this vehicle data?`,
     showDenyButton: true,
     confirmButtonText: 'Yes',
     denyButtonText: `No`,
   }).then((result) => {
     if (result.isConfirmed) {
       updateData(`/api/transfers-rentals/${id}`, { isEnabled: event.target.checked}).then((result) => {
      
           if (!result.status == 200) {
               throw new Error(response.status)
           }
               Swal.fire('Success',
               'Data Successfully Updated',
               'success')

       }).catch(err => {})

     } else if (result.isDenied) {
       Swal.fire('Changes are not saved', '', 'info')
       storeTransfers.fetchTransfers();
     }
   })
}

function addTransfer(){
    router.push('/transfers-rentals/add')
}

function deleteTransfer(id){
    Swal.fire({
      title: 'Do you want to delete this data?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateData(`api/transfers-rentals/${id}`, { isDeleted: true}).then((result) => {
        if (!result.status == 200) {
          throw new Error(response.status)
        }
          Swal.fire('Success',
          'Data Successfully Deleted',
          'success')

          storeTransfers.fetchTransfers();
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
}
onMounted(() => {
    storeTransfers.fetchTransfers();

})
</script>
<template>
     <Home>
        <div>
            <p class="text-2xl font-semibold pb-6 text-gray-700">Transfers & Rentals Management</p>
            <button 
                @click="addTransfer"
                class="px-3 py-2 mr-3 mb-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                <font-awesome-icon icon="fa-solid fa-plus" size="xs"/>
                Add Transfer
            </button>
        </div>
      
        <div class="relative overflow-x-auto sm:rounded-lg border border-gray-200">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-base text-white uppercase app-name-bg-blue">
                    <tr>
                        <th scope="col" class="px-6 py-3 w-40">
                           Vehicle Type
                        </th>
                        <th scope="col" class="px-6 py-3 w-40">
                           Model
                        </th>
                        <th scope="col" class="px-6 py-3 w-40">
                            Capacity
                        </th>
                        <th scope="col" class="px-6 py-3 w-52">
                            Rental Price
                        </th>
                        <th scope="col" class="px-6 py-3 w-72">
                            Thumbnail
                        </th>
                        <th scope="col" class="px-6 py-3 w-40">
                            Visibility
                        </th>
                        
                        <th scope="col" class="px-6 py-3 w-96">
                            <span>Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 dark:text-gray-500" 
                    v-for="v in getTransfers" :key="v">
                    <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            {{ v.vehicle_type}}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            {{ v.model}}
                        </td>
                        <td class="px-6 py-4">
                            {{ v.capacity}}
                        </td>
                        <td class="px-6 py-4">
                            {{ v.rental_price}}
                        </td>
                        <td class="px-6 py-4">
                            <img
                            :src="v.thumbnail"
                            class="h-auto w-full"
                            alt="Error Image" />
                        </td>
                        <td class="px-6 py-4">
                            <label :for="`toggleVisibility-${v.id}`"  class="flex items-center cursor-pointer">
                            <!-- toggle -->
                            <div class="relative">
                              <!-- input -->
                              <input type="checkbox" 
                                :id="`toggleVisibility-${v.id}`" 
                                class="sr-only" 
                                @change="toogleVisibility($event, v.id)"
                                :checked="v.isEnabled" />
                              <!-- line -->
                              <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                              <!-- dot -->
                              <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                          </label>
                        </td>

                        <td class="px-6 py-4">
                          <button 
                            @click="router.push(`/transfers-rentals/images/${v.id}`)"
                            class="w-24 px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-cyan-600 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none" type="button">
                                <font-awesome-icon icon="fa-solid fa-images" size="xs"/>
                                Images
                            </button>
                         
                            <button 
                                @click="router.push(`/transfers-rentals/edit/${v.id}`)"
                                class="w-24 px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                <font-awesome-icon icon="fa-solid fa-pencil" size="xs"/>
                                Edit
                            </button>
                          
                            <button 
                            @click="deleteTransfer(v.id)"
                            class="w-24 px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none" type="button">
                                <font-awesome-icon icon="fa-solid fa-trash" size="xs"/>
                                Delete
                            </button>
                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Home>
</template>