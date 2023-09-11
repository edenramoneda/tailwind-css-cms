<script setup>
import Home from '@/components/Home.vue'
import { onMounted,ref, computed,reactive } from 'vue'
import Swal from 'sweetalert2'
import { RouterLink, RouterView, useRoute,useRouter } from 'vue-router'
import { postData, updateData } from '@/plugins/axiosUtils'; 
import { Form, Field } from 'vee-validate';
import {  useTransfersStore } from '@/stores/transfers'
import * as yup from 'yup';

const router = useRouter()
const route = useRoute()
const isEdit = computed(()=> {
   return (route.params.id) ? true : false
})
const storeTransfers = useTransfersStore();

const initForm = {
    vehicle_type: "",
    model: "",
    capacity: "",
    rental_price: 0,
    thumbnail: "",
    isEnabled: true
}
let formData = reactive({...initForm})

const schema = yup.object({
    vehicle_type: yup.string()
      .required('Vehicle Type is required'),
      model: yup.string()
      .required('Model is required'),
      capacity: yup.string()
      .required('Capacity is required'),
      rental_price: yup.string()
      .required('Rental Price is required'),
      thumbnail: yup.string()
      .required('Thumbnail is required'),
})

const getTransferData = computed(() => {
  return storeTransfers.transferData;
});

function GoBack(){
    Object.assign(formData, initForm);
    router.push(`/transfers-and-rentals`)
}

async function assignDataToForm(){
    if(isEdit.value){
        await storeTransfers.fetchTransferData(route.params.id);
        formData.vehicle_type = getTransferData.value.vehicle_type
        formData.model = getTransferData.value.model,
        formData.capacity = getTransferData.value.capacity,
        formData.rental_price =  getTransferData.value.rental_price,
        formData.thumbnail = getTransferData.value.thumbnail
    }
}

async function submitTransfer(values){
    if(isEdit.value){
        await updateData(`api/transfers-rentals/${route.params.id}`,values).then((result) => {
       
            if (!result.status == 200) {
                throw new Error(response.status)
            }
                Swal.fire('Success',
                'Data Successfully Updated',
                'success')

                router.push(`/transfers-and-rentals`)
        }).catch(err => {})
    }else{

        await postData('api/transfers-rentals',values).then((result) => {
       
            if (!result.status == 200) {
                throw new Error(response.status)
            }
                Swal.fire('Success',
                'Data Successfully Added',
                'success')

                router.push(`/transfers-and-rentals`)
        }).catch(err => {})

    
    }

}

onMounted(() => {
    assignDataToForm()
})


</script>
<template>
    <Home>
        <p class="text-2xl font-semibold pb-6 text-gray-700">   {{  isEdit ? 'Update' : 'Add' }} Itinerary</p>
        <Form class="w-full" @submit="submitTransfer" :validation-schema="schema" v-slot="{ errors }">

            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                <div class="flex flex-wrap">

                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Vehicle Type
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.vehicle_type }" name="vehicle_type"
                        type="text" v-model="formData.vehicle_type">
                        </Field>
                        <small class="text-red-500">{{ errors.vehicle_type }}</small>
                    </div>

                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Model
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.model }" name="model"
                        type="text" v-model="formData.model">
                        </Field>
                        <small class="text-red-500">{{ errors.model }}</small>
                    </div>

                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Capacity
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.capacity }" name="capacity"
                        type="text" v-model="formData.capacity">
                        </Field>
                        <small class="text-red-500">{{ errors.capacity }}</small>
                    </div>

                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Rental Price
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.rental_price }" name="rental_price"
                        type="number" v-model="formData.rental_price">
                        </Field>
                        <small class="text-red-500">{{ errors.rental_price }}</small>
                    </div>

                    <div class="field-section mb-5 w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Thumbnail
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.thumbnail }" name="thumbnail"
                        type="text" v-model="formData.thumbnail">
                        </Field>
                        <small class="text-red-500">{{ errors.thumbnail }}</small>
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
            </div>

        </Form>
    </Home>
</template>