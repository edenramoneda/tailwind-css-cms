<script setup>
import Home from '@/components/Home.vue'
import { onMounted,ref, computed,reactive } from 'vue'
import { Form, Field } from 'vee-validate';
import { RouterLink, RouterView, useRouter,useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import { deleteData,fetchData } from '@/plugins/axiosUtils'; 
import  UploadImageModal from './UploadImageModal.vue';
const router = useRouter()
const route = useRoute()

let images = ref([])
let modal = ref(false)
let subCategoryName = ref("")
const isModalVisible = computed(() => modal.value)

async function getSubCatName(){

    await fetchData(`/api/subcategories/data/${route.params.subcat_id}`).then(res => {
        subCategoryName.value = res.sub_category_name

    }).catch(err => {})
    
}

async function getImages(){

    await fetchData(`/api/subcategory-images/${route.params.subcat_id}`).then(res =>{
        images.value = res
    }).catch(err => {})

        
}

function addImageModal(){
    modal.value = !modal.value;
}
         
function closeModal(){
    modal.value = !modal.value
}

function deleteImage(imageId){
    Swal.fire({
      title: 'Do you want to delete this image?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(`api/subcategory-images/${imageId}`).then((result) => {
        if (!result.status == 200) {
          throw new Error(response.status)
        }
          Swal.fire('Success',
          'Data Successfully Deleted',
          'success')
        }).then(() =>{
            getImages()
        })
       

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
}
onMounted(() => {
    getSubCatName()
    getImages()
})
</script>


<template>
    <Home>
        <div>
            <p class="text-2xl font-semibold pb-6 text-gray-700">Add Images for {{  subCategoryName }}</p>
            <button 
            @click="addImageModal()"
            class="sm:text-xs xs:text-xs md:text-base px-7 py-3 mb-5 mr-3 font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none" type="button">
                Add Image
            </button>
            <button type="button" 
                class="sm:text-xs xs:text-xs md:text-base text-white bg-slate-700 hover:bg-slate-600 md:mt-5 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-7 py-3"
                @click="router.push('/activities')">
                <font-awesome-icon icon="fa-solid fa-angles-left" size="xs"/>
                Go Back
            </button>
        </div>
        <div class="container-fluid mx-auto">

                <div class="-m-1 flex flex-wrap md:-m-2" v-if="images.length > 0">
                    <div class="lg:w-1/3 md:w-1/2"  v-for="(image,i) in images">
                        <div class="w-full p-1 md:p-2">
                            <div
                                class="block bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                                    <img
                                    class="w-full md:h-80 sm:h-fit object-cover"
                                    :key="i"
                                    :src="image.image"
                                    alt="" />
                                <div class="p-4">
                                    <button 
                                    @click="deleteImage(image.id)"
                                    class="px-3 py-2 text-xs font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none" type="button">
                                        <font-awesome-icon icon="fa-solid fa-trash" size="xs"/>
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                    <p class="text-2xl pb-6 text-gray-700">No Images yet</p>
                </div>
   
        </div>

        <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal" v-if="isModalVisible">
          <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <!-- Opacity-->
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>

            <span class="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-1/2" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              
              <div class="p-3 flex-auto leading-6">
                  <h1
                    class="block uppercase tracking-wide dark:text-neutral-800">
                    Add Images
                  </h1>
              </div>
              <hr>
              <upload-image-modal :subCatId="route.params.subcat_id" @closeModal="closeModal"></upload-image-modal>
            </div>
        </div>
        </div>
      
    </Home>
</template>