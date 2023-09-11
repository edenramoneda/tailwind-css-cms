<script setup>
import Home from '@/components/Home.vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted,ref, computed,reactive } from 'vue'
import { useInquiriesStore } from '@/stores/inquiries'

let modal = ref(false)

const storeInquiries = useInquiriesStore();
const isModalVisible = computed(() => modal.value)

const getInquiries = computed(() => {
    return storeInquiries.inquiries.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));

});

const getInquiryData = computed(() => {
  return storeInquiries.inquiryData;
});


async function viewInquiry(id){
    modal.value = !modal.value;
    storeInquiries.fetchInquiryData(id)


}

function closeModal(){
    modal.value = !modal.value
}
onMounted(() => {
    storeInquiries.fetchInquiries();
   
})

</script>

<template>
    <Home>
        <p class="text-2xl font-semibold pb-6 text-gray-700">Inquiries</p>
        <div class="relative overflow-x-auto sm:rounded-lg border border-gray-200">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-base text-white uppercase app-name-bg-blue">
                    <tr>
                        <th scope="col" class="px-6 py-3 w-48">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3 w-48">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3 xs:w-52">
                            Message
                        </th>
                        
                        <th scope="col" class="px-6 py-3 w-72">
                            <span>Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
                    v-for="inquiry in getInquiries" :key="inquiry">
                        <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            {{  inquiry.attributes.name }}
                        </td>
                        <td class="px-6 py-4">
                            <a :href="`mailto:${inquiry.attributes.email}`" class="text-primary">{{ inquiry.attributes.email }}</a>
                        </td>
                        <td class="px-6 py-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                            {{ inquiry.attributes.message }}
                        </td>
                    
                        <td class="px-6 py-4">
                            <button 
                                @click="viewInquiry(inquiry.id)"
                                class="px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                View Inquiry
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
                     <p class="text-gray-500 text-xl">{{  getInquiryData.attributes.name }}</p>
                     <p class="text-blue-500 text-sm">{{  getInquiryData.attributes.email }}</p>
                  </h1>
              </div>
              <hr>
              <div class="p-5">
                <div class="container border border-gray-300 p-5 bg-gray-200 rounded-md">
                    <p class="text-sm">{{  getInquiryData.attributes.message }}</p>
                </div>
               
              </div>
              <div class="p-3 mt-2 text-center space-x-4 md:block mb-3">
                  <button
                    type="button"
                    class="mb-2 md:mb-0 bg-blue-700 border border-blue-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-blue-800"
                  >
                    <font-awesome-icon icon="fa-solid fa-reply"/>&ensp;
                     <a :href="`mailto:${getInquiryData.attributes.email}`">Respond to {{ getInquiryData.attributes.email  }}</a>
                  </button>
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

