<script setup>
import Home from '@/components/Home.vue'
import {  useCategoriesStore } from '@/stores/categories'
import { onMounted,ref, computed,reactive } from 'vue'
import { updateData } from '@/plugins/axiosUtils'; 
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2'

let modal = ref(false)
const storeCategories = useCategoriesStore();

const getCategories = computed(() => {
  return storeCategories.categories;
});

const isModalVisible = computed(() => modal.value)

const initForm = {
  category_name: "",
  category_description: "",
  category_img_url: "",
  order: 0
}

let formData = reactive({...initForm})

const getCategoryData = computed(() => {
  return storeCategories.categoryData;
});

const schema = yup.object({
    category_name: yup.string()
      .required('Category is required'),
    category_description: yup.string()
      .required('Description is required'),
    category_img_url: yup.string()
      .required('Image is required'),
    order: yup.string()
      .required('Order is required'),
})

const categoryId = ref("")

async function editCategory(id){
    modal.value = !modal.value;
    await storeCategories.fetchCategoryData(id)
    categoryId.value = id

    formData.category_name = getCategoryData.value.attributes.category_name
    formData.category_description = getCategoryData.value.attributes.category_description
    formData.category_img_url = getCategoryData.value.attributes.category_img_url
    formData.order = getCategoryData.value.attributes.order

}

function toogleVisibility(event, id){
  
   Swal.fire({
      title: `Are you sure you want to ${event.target.checked ? 'enable' : 'disable'} this category?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateData(`/api/categories/${id}`, { isEnabled: event.target.checked}).then((result) => {
       
            if (!result.status == 200) {
                throw new Error(response.status)
            }
                Swal.fire('Success',
                'Data Successfully Updated',
                'success')

        }).catch(err => {})

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
        storeCategories.fetchCategories();
      }
    })
}
function closeModal(){
  modal.value = !modal.value;
  Object.assign(formData, initForm);
}

async function updateCategory(values){

    await updateData(`/api/categories/${categoryId.value}`, values).then((result) => {
       
        if (!result.status == 200) {
            throw new Error(response.status)
        }
            Swal.fire('Success',
            'Data Successfully Updated',
            'success')
            closeModal()
            storeCategories.fetchCategories();
    }).catch(err => {})

}

onMounted(() => {
    storeCategories.fetchCategories();
   
})
</script>
<template>
    <Home>
      <p class="text-2xl font-semibold pb-6 text-gray-700">Categories</p>

        <div class="relative overflow-x-auto sm:rounded-lg border border-gray-200">
          
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-base text-white uppercase app-name-bg-blue">
                    <tr>
                        <th scope="col" class="px-6 py-3 w-40">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3 w-96">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3 w-72">
                            Image
                        </th>
                        <th scope="col" class="px-6 py-3 w-28">
                            Visibility
                        </th>
                        <th scope="col" class="px-6 py-3 w-28">
                            Order
                        </th>
                        
                        <th scope="col" class="px-6 py-3 w-32">
                            <span>Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 dark:text-gray-500" 
                    v-for="category in getCategories" :key="category">
                        <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            {{ category.attributes.category_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ category.attributes.category_description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ }}
                            <img
                            :src="category.attributes.category_img_url"
                            class="h-auto w-full"
                            alt="Error Image" />
                        </td>
                        <td class="px-6 py-4">
                          <label :for="`toggleVisibility-${category.id}`"  class="flex items-center cursor-pointer">
                            <!-- toggle -->
                            <div class="relative">
                              <!-- input -->
                              <input type="checkbox" 
                                :id="`toggleVisibility-${category.id}`" 
                                class="sr-only" 
                                @change="toogleVisibility($event, category.id)"
                                :checked="category.attributes.isEnabled"
                                >
                              <!-- line -->
                              <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                              <!-- dot -->
                              <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                          </label>
                        </td>
                        <td class="px-6 py-4">
                            {{ category.attributes.order }}
                        </td>
                        
                        <td class="px-6 py-4">
                            <button 
                                @click="editCategory(category.id)"
                                class="px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                <font-awesome-icon icon="fa-solid fa-pencil" size="xs"/>
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="fixed z-10 overflow-y-auto top-10 bottom-5 w-full left-0" id="modal" v-if="isModalVisible">
          <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <!-- Opacity-->
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>

            <span class="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              
              <div class="p-3 flex-auto leading-6">
                  <h1
                    class="block uppercase tracking-wide dark:text-neutral-800">
                      Edit Category
                  </h1>
              </div>
              <hr>
              <Form class="w-full" @submit="updateCategory" :validation-schema="schema" v-slot="{ errors }">
                <!--body-->
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                      Category
                    </label>

                    <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      :class="{ 'is-invalid': errors.category_name }" name="category_name"
                      type="text" v-model="formData.category_name">
                    </Field>
                      <small class="text-red-500">{{ errors.category_name }}</small>

                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-8" for="grid-last-name">
                        Description
                    </label>
                    <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.description }" name="category_description"
                        v-model="formData.category_description" as="textarea" rows="15">
                
                    </Field>
                    <small class="text-red-500">{{ errors.category_description }}</small>
                    
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-8" for="grid-last-name">
                        Image
                    </label>
                    <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.category_img_url }" name="category_img_url"
                        v-model="formData.category_img_url" type="text">
                    </Field>
                    <small class="text-red-500">{{ errors.category_img_url }}</small>

                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-8" for="grid-last-name">
                        Order
                    </label>
                    <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.order }" name="order"
                        v-model="formData.order" type="number">
                
                    </Field>
                    <small class="text-red-500">{{ errors.order }}</small>


                </div>
                <div class="p-3 mt-2 text-center space-x-4 md:block mb-3">
                    <button
                      type="submit"
                      class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      @click="closeModal"
                      class="mb-2 md:mb-0 bg-blue-700 border border-blue-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-blue-800"
                    >
                      Close
                    </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
    </Home>
</template>