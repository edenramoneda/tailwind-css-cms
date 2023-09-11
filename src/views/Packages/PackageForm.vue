<script setup>
import Home from '@/components/Home.vue'
import {  usePackagesStore } from '@/stores/packages'
import { onMounted,ref, computed,reactive } from 'vue'
import Swal from 'sweetalert2'
import { RouterLink, RouterView, useRoute,useRouter } from 'vue-router'
import { postData, updateData } from '@/plugins/axiosUtils'; 
import { Form, Field } from 'vee-validate';

import * as yup from 'yup';
const router = useRouter()
const storePackages = usePackagesStore();

const getPackageData = computed(() => {
  return storePackages.packageData;
});

const initForm = {
    sub_category_name: "",
    sub_category_description: "",
    sub_category_img_url: "",
    isEnabled: true
}
let formData = reactive({...initForm})

const schema = yup.object({
    sub_category_name: yup.string()
      .required('Package is required'),
    sub_category_description: yup.string()
      .required('Description is required'),
    sub_category_img_url: yup.string()
      .required('Thumbnail is required'),
})

const route = useRoute()

const isEdit = computed(()=> {
   return (route.params.id) ? true : false
})


async function submitPackage(values){
    if(isEdit.value){
        await updateData(`api/subcategories/${route.params.id}`,values).then((result) => {
       
            if (!result.status == 200) {
                throw new Error(response.status)
            }
                Swal.fire('Success',
                'Data Successfully Updated',
                'success')

                router.push('/packages')
        }).catch(err => {})
    }else{

        const insertData = Object.assign(values,{ "category": {
                "connect": [2]
            }});

        await postData('api/subcategories',insertData).then((result) => {
       
            if (!result.status == 200) {
                throw new Error(response.status)
            }
                Swal.fire('Success',
                'Data Successfully Added',
                'success')

                router.push('/packages')
        }).catch(err => {})
    }
}
async function assignDataToForm(){
    if(isEdit.value){
        await storePackages.fetchPackageData(route.params.id);
        formData.sub_category_name = getPackageData.value.sub_category_name
        formData.sub_category_description = getPackageData.value.sub_category_description
        formData.sub_category_img_url = getPackageData.value.sub_category_img_url
    }
}

function GoBack(){
    Object.assign(formData, initForm);
    router.push('/packages')
}
onMounted(() => {
    assignDataToForm()
    console.log(isEdit.value)
})
</script>
<template>
    <Home>

        <p class="text-2xl font-semibold pb-6 text-gray-700">{{  isEdit ? 'Update' : 'Add' }} Package</p>
        <Form class="w-full" @submit="submitPackage" :validation-schema="schema" v-slot="{ errors }">
                <!--body-->
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                    <div class="grid grid-cols-1 gap-4">

                        <div class="field-section">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Package
                            </label>

                            <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            :class="{ 'is-invalid': errors.sub_category_name }" name="sub_category_name"
                            type="text" v-model="formData.sub_category_name">
                            </Field>
                            <small class="text-red-500">{{ errors.sub_category_name }}</small>
                        </div>
                        <div class="field-section">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Description
                            </label>

                            <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            :class="{ 'is-invalid': errors.sub_category_description }" name="sub_category_description"
                            type="text" v-model="formData.sub_category_description" as="textarea" rows="10">
                            </Field>
                            <small class="text-red-500">{{ errors.sub_category_description }}</small>
                        </div>
                        <div class="field-section">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Thumbnail
                            </label>

                            <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            :class="{ 'is-invalid': errors.sub_category_img_url }" name="sub_category_img_url"
                            type="text" v-model="formData.sub_category_img_url">
                            </Field>
                            <small class="text-red-500">{{ errors.sub_category_img_url }}</small>
                        </div>
                    </div>
                </div>
                <div class="p-3 mt-2 text-center space-x-4 md:block mb-3">
                    
                    <button
                        type="submit"
                        class="mb-2 md:mb-0 bg-blue-700 border border-blue-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-blue-800"
                    >
                        {{  isEdit ? 'Update' : 'Save' }}
                    </button>
                    <button
                        type="button"
                        @click="GoBack()"
                        class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
              </Form>
    </Home>
</template>