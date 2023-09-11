<script setup>
import Home from '@/components/Home.vue'
import {  useActivitiesStore } from '@/stores/activities'
import { onMounted,ref, computed,reactive } from 'vue'
import Swal from 'sweetalert2'

import { updateData } from '@/plugins/axiosUtils'; 
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const storeActivities = useActivitiesStore();

const getActivities = computed(() => {
  return storeActivities.activities;
});

function toogleVisibility(event, id){
  
  Swal.fire({
     title: `Are you sure you want to ${event.target.checked ? 'enable' : 'disable'} this activity?`,
     showDenyButton: true,
     confirmButtonText: 'Yes',
     denyButtonText: `No`,
   }).then((result) => {
     if (result.isConfirmed) {
       updateData(`/api/subcategories/${id}`, { isEnabled: event.target.checked}).then((result) => {
      
           if (!result.status == 200) {
               throw new Error(response.status)
           }
               Swal.fire('Success',
               'Data Successfully Updated',
               'success')

       }).catch(err => {})

     } else if (result.isDenied) {
       Swal.fire('Changes are not saved', '', 'info')
       storeActivities.fetchActivities();
     }
   })
}

function addActivity(){
    router.push('/activity/add')
}

function deleteActivity(id){
    Swal.fire({
      title: 'Do you want to delete this data?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateData(`api/subcategories/${id}`, { isDeleted: true}).then((result) => {
        if (!result.status == 200) {
          throw new Error(response.status)
        }
          Swal.fire('Success',
          'Data Successfully Deleted',
          'success')

          storeActivities.fetchActivities();
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
}
onMounted(() => {
    storeActivities.fetchActivities();

})
</script>
<template>
     <Home>
        <div>
            <p class="text-2xl font-semibold pb-6 text-gray-700">Activity Management</p>
            <button 
                @click="addActivity"
                class="px-3 py-2 mr-3 mb-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                <font-awesome-icon icon="fa-solid fa-plus" size="xs"/>
                Add Activity
            </button>
        </div>
      

        <div class="relative overflow-x-auto sm:rounded-lg border border-gray-200">
          
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-base text-white uppercase app-name-bg-blue">
                    <tr>
                        <th scope="col" class="px-6 py-3 w-40">
                           Category
                        </th>
                        <th scope="col" class="px-6 py-3 w-40">
                           Activity
                        </th>
                        <th scope="col" class="px-6 py-3 w-96">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3 w-72">
                            Thumbnail
                        </th>
                        <th scope="col" class="px-6 py-3 w-28">
                            Visibility
                        </th>
                        
                        <th scope="col" class="px-6 py-3 w-80">
                            <span>Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 dark:text-gray-500" 
                    v-for="activity in getActivities" :key="activity">
                    <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            {{ activity.category.category_name}}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            {{ activity.sub_category_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ activity.sub_category_description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ }}
                            <img
                            :src="activity.sub_category_img_url"
                            class="h-auto w-full"
                            alt="Error Image" />
                        </td>
                        <td class="px-6 py-4">

                            <label :for="`toggleVisibility-${activity.id}`" class="flex items-center cursor-pointer">
                            <!-- toggle -->
                            <div class="relative">
                              <!-- input -->
                              <input type="checkbox" 
                                :id="`toggleVisibility-${activity.id}`" 
                                :class="`sr-only id-${activity.id}`" 
                                @change="toogleVisibility($event, activity.id)"
                                :checked="activity.isEnabled" />
                              <!-- line -->
                              <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                              <!-- dot -->
                              <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                          </label>

                        </td>

                        <td class="px-6 py-4">
                          
                            <button 
                            @click="router.push(`/activity/images/${activity.id}`)"
                            class="w-24 px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-cyan-600 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none" type="button">
                                <font-awesome-icon icon="fa-solid fa-images" size="xs"/>
                                Images
                            </button>
                            <button 
                            @click="router.push(`/activity/itinerary/${activity.id}`)"
                            class="w-24 px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-slate-600 focus:ring-4 focus:outline-none" type="button">
                            
                                <font-awesome-icon icon="fa-solid fa-clipboard-list" size="sm"/>
                                Itinerary
                            </button>
                            <br><br>

                            <button 
                                @click="router.push(`/activity/edit/${activity.id}`)"
                                class="w-24 px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                <font-awesome-icon icon="fa-solid fa-pencil" size="xs"/>
                                Edit
                            </button>
                            <button 
                            @click="deleteActivity(activity.id)"
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