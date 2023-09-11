<script setup>
import {  useItinerariesStore } from '@/stores/itineraries'
import { onMounted,ref, computed,reactive } from 'vue'
import Swal from 'sweetalert2'
import { fetchData,updateData } from '@/plugins/axiosUtils'; 
import { RouterLink, RouterView, useRouter,useRoute } from 'vue-router'
import Home from '@/components/Home.vue'

const route = useRoute()
const router = useRouter()
const storeItineraries = useItinerariesStore();
let subCategoryName = ref("")
let modal = ref(false)

const getItineraries = computed(() => {
  return storeItineraries.itineraries;
});

const isModalVisible = computed(() => modal.value)

const getItineraryData = computed(() => {
  return storeItineraries.itineraryData;
});


async function viewItinerary(itineraryId){

    modal.value = !modal.value;
    storeItineraries.fetchItineraryData(itineraryId)

}

function addItinerary(){
    router.push(`/activity/itinerary/add/${route.params.subcat_id}`)
}

async function getSubCatName(){

await fetchData(`/api/subcategories/data/${route.params.subcat_id}`).then(res => {
    subCategoryName.value = res.sub_category_name

}).catch(err => {})

}

function toogleVisibility(event, id){
  
  Swal.fire({
     title: `Are you sure you want to ${event.target.checked ? 'enable' : 'disable'} this itinerary?`,
     showDenyButton: true,
     confirmButtonText: 'Yes',
     denyButtonText: `No`,
   }).then((result) => {
     if (result.isConfirmed) {
       updateData(`/api/itineraryData/${id}`, { isEnabled: event.target.checked}).then((result) => {
      
           if (!result.status == 200) {
               throw new Error(response.status)
           }
               Swal.fire('Success',
               'Data Successfully Updated',
               'success')

       }).catch(err => {})

     } else if (result.isDenied) {
       Swal.fire('Changes are not saved', '', 'info')
       storeItineraries.fetchItineraries(route.params.subcat_id)
     }
   })
}

function deleteItinerary(id){
    Swal.fire({
      title: 'Do you want to delete this data?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateData(`api/itineraryData/${id}`, { isDeleted: true}).then((result) => {
        if (!result.status == 200) {
          throw new Error(response.status)
        }
          Swal.fire('Success',
          'Data Successfully Deleted',
          'success')

          storeItineraries.fetchItineraries(route.params.subcat_id)
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
}

function closeModal(){
    modal.value = !modal.value
}

onMounted(() => {
    storeItineraries.fetchItineraries(route.params.subcat_id)
    
    getSubCatName()
})

</script>
<template>
    <Home>
        <div>
            <p class="text-2xl font-semibold pb-6 text-gray-700">Itineraries for {{  subCategoryName }}</p>
            <button 
                @click="addItinerary"
                class="px-3 py-2 mr-3 mb-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700" type="button">
                <font-awesome-icon icon="fa-solid fa-plus" size="xs"/>
                Add Itinerary
            </button>
            <button type="button" 
                class="sm:text-xs xs:text-xs px-3 py-2  md:text-sm text-white bg-slate-700 hover:bg-slate-600 md:mt-5 focus:ring-4 focus:outline-none font-medium rounded-lg"
                @click="router.push('/activities')">
                <font-awesome-icon icon="fa-solid fa-angles-left" size="xs"/>
                Go Back
            </button>
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg border border-gray-200">
          
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
              <thead class="text-base text-white uppercase app-name-bg-blue">
                  <tr>
                      <th scope="col" class="px-6 py-3 w-36">
                         Subcategory
                      </th>
                      <th scope="col" class="px-6 py-3 w-40">
                         Itinerary Name
                      </th>
                      <th scope="col" class="px-6 py-3 w-96">
                         Description
                      </th>
                      <th scope="col" class="px-6 py-3 w-48">
                          Itineraries
                      </th>
                      <th scope="col" class="px-6 py-3 w-48">
                          Visibility
                      </th>
                      
                      <th scope="col" class="px-6 py-3 w-64">
                          <span>Action</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 dark:text-gray-500" v-if="!getItineraries.length > 0">
                        <td colspan="6"  class="text-center text-lg py-5">No Data</td>
                  </tr>
                  <tr class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 dark:text-gray-500" 
                  v-for="itinerary in getItineraries" :key="itinerary">
                  <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                          {{ itinerary.subcategory.sub_category_name}}
                      </td>
                      <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                          {{ itinerary.itinerary_name }}
                      </td>
                      <td class="px-6 py-4">
                        {{ itinerary.description }}
                      </td>
                      <td class="px-6 py-4">
                        <button 
                          @click="viewItinerary(itinerary.id)"
                          class="w-24 px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-slate-600 focus:ring-4 focus:outline-none" type="button">
                          
                              <font-awesome-icon icon="fa-solid fa-clipboard-list" size="sm"/>
                              Itinerary
                          </button>
                      </td>
                        <td class="px-6 py-4">

                            <label :for="`toggleVisibility-${itinerary.id}`" class="flex items-center cursor-pointer">
                            <!-- toggle -->
                            <div class="relative">
                            <!-- input -->
                            <input type="checkbox" 
                                :id="`toggleVisibility-${itinerary.id}`" 
                                class="sr-only" 
                                @change="toogleVisibility($event, itinerary.id)"
                                :checked="itinerary.isEnabled" />
                            <!-- line -->
                            <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                            <!-- dot -->
                            <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                            </label>

                        </td>
                      <td class="px-6 py-4">
                          <button 
                              @click="router.push(`/activity/itinerary/edit/${route.params.subcat_id}/${itinerary.id}`)"
                              class="w-24 px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                              <font-awesome-icon icon="fa-solid fa-pencil" size="xs"/>
                              Edit
                          </button>
                        
                          <button 
                          @click="deleteItinerary(itinerary.id)"
                          class="w-24 px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none" type="button">
                              <font-awesome-icon icon="fa-solid fa-trash" size="xs"/>
                              Delete
                          </button>
                        
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal" v-if="isModalVisible">
          <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <!-- Opacity-->
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>

            <span class="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              
              <div class="p-3 flex-auto leading-6">
                  <h1
                    class="block tracking-wide text-neutral-800 dark:text-neutral-200">
                     <p class="text-gray-500 text-2xl">{{  getItineraryData.itinerary_name }}</p>
                  </h1>
              </div>
              <hr>
                <div class="flex flex-wrap">
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Language</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.language }}</p>
                        </div>
                    </div>
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Dress Code</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.dress_code }}</p>
                        </div>
                    </div>
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Activity</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.activity }}</p>
                        </div>
                    </div>
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Departures</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.departures }}</p>
                        </div>
                    </div>
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Duration</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.duration }}</p>
                        </div>
                    </div>
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Estimated departure time</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.estimated_departure_time }}</p>
                        </div>
                    </div>
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Availability</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.availability }}</p>
                        </div>
                    </div>
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Transport</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.transport }}</p>
                        </div>
                    </div>
                    <div class="p-5 w-full md:w-1/2 px-3">
                        <p class="font-medium text-md uppercase mb-1">Estimated return time</p>
                        <div class="container border border-gray-300 p-3 bg-gray-200 rounded-md">
                            <p class="text-sm">{{  getItineraryData.estimated_return_time }}</p>
                        </div>
                    </div>
                </div>
              <div class="p-3 mt-2 text-center space-x-4 md:block mb-3">
                
                  <button
                    @click="closeModal"
                    class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
                  >
                    Close
                  </button>
                </div>
            </div>
          </div>
        </div>

    </Home>

</template>