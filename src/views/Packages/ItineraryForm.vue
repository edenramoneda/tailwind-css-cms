<script setup>
import Home from '@/components/Home.vue'
import { onMounted,ref, computed,reactive } from 'vue'
import Swal from 'sweetalert2'
import { RouterLink, RouterView, useRoute,useRouter } from 'vue-router'
import { postData, updateData } from '@/plugins/axiosUtils'; 
import { Form, Field } from 'vee-validate';
import {  useItinerariesStore } from '@/stores/itineraries'
import * as yup from 'yup';
const router = useRouter()
const route = useRoute()


const initForm = {
    itinerary_name: "",
    description: "",
    language: "",
    dress_code: "",
    activity: "",
    departures: "",
    duration: "",
    estimated_departure_time: "",
    availability: "",
    transport: "",
    estimated_return_time: "",
    isEnabled: true
}
let formData = reactive({...initForm})
const storeItineraries = useItinerariesStore();

const schema = yup.object({
    itinerary_name: yup.string()
      .required('Itinerary Name is required'),
    description: yup.string()
      .required('Description is required'),
})

const getItineraryData = computed(() => {
  return storeItineraries.itineraryData;
});

const isEdit = computed(()=> {
   return (route.params.itineraryId) ? true : false
})

async function submitItinerary(values){
    if(isEdit.value){
        await updateData(`api/itineraryData/${route.params.itineraryId}`,values).then((result) => {
       
            if (!result.status == 200) {
                throw new Error(response.status)
            }
                Swal.fire('Success',
                'Data Successfully Updated',
                'success')

                router.push(`/package/itinerary/${route.params.subcat_id}`)
        }).catch(err => {})
    }else{

        const insertData = Object.assign(values,{ "subcategory": {
                "connect": [route.params.subcat_id]
            }});

        await postData('api/itineraryData',insertData).then((result) => {
       
            if (!result.status == 200) {
                throw new Error(response.status)
            }
                Swal.fire('Success',
                'Data Successfully Added',
                'success')

                router.push(`/package/itinerary/${route.params.subcat_id}`)
        }).catch(err => {})
    }

}
async function assignDataToForm(){
    if(isEdit.value){
        await storeItineraries.fetchItineraryData(route.params.itineraryId);
        formData.itinerary_name = getItineraryData.value.itinerary_name
        formData.description = getItineraryData.value.description,
        formData.language = getItineraryData.value.language,
        formData.dress_code =  getItineraryData.value.dress_code,
        formData.activity = getItineraryData.value.activity,
        formData.departures = getItineraryData.value.departures,
        formData.duration = getItineraryData.value.duration,
        formData.estimated_departure_time = getItineraryData.value.estimated_departure_time,
        formData.availability = getItineraryData.value.availability,
        formData.transport = getItineraryData.value.transport,
        formData.estimated_return_time = getItineraryData.value.estimated_return_time
    }
}

function GoBack(){
    Object.assign(formData, initForm);
    router.push(`/package/itinerary/${route.params.subcat_id}`)
}

onMounted(() => {
    assignDataToForm()
    storeItineraries.fetchItineraryData(route.params.itineraryId)
})

</script>
<template>
    <Home>
        <p class="text-2xl font-semibold pb-6 text-gray-700">   {{  isEdit ? 'Update' : 'Add' }} Itinerary</p>

        <Form class="w-full" @submit="submitItinerary" :validation-schema="schema" v-slot="{ errors }">
            <!--body-->
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                <div class="flex flex-wrap">

                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Itinerary name
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.itinerary_name }" name="itinerary_name"
                        type="text" v-model="formData.itinerary_name">
                        </Field>
                        <small class="text-red-500">{{ errors.itinerary_name }}</small>
                    </div>
                    <div class="field-section w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Language
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text" v-model="formData.language" name="language">
                        </Field>
                    </div>
                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Description
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.description }" name="description"
                        type="text" v-model="formData.description" as="textarea" rows="8">
                        </Field>
                        <small class="text-red-500">{{ errors.description }}</small>
                    </div>
                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Dress Code
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text" v-model="formData.dress_code" name="dress_code">
                        </Field>
                    </div>
                    <div class="field-section w-full md:w-1/2 px-3 mb-5">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Activity
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text" v-model="formData.activity" name="activity">
                        </Field>
                    </div>
                    <div class="field-section mb-5 w-full md:w-1/2 px-3 md:-mt-36">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Departures
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text" v-model="formData.departures" name="departures">
                        </Field>
                    </div>
                    <div class="field-section mb-5 w-full md:w-1/2 px-3 ">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Duration
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text" v-model="formData.duration" name="duration">
                        </Field>
                    </div>
                   
                    <div class="field-section mb-5 w-full md:w-1/2 px-3 md:-mt-36">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Estimated Departure Time
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                         name="estimated_departure_time"
                        type="text" v-model="formData.estimated_departure_time">
                        </Field>
                    </div>
                    
                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Availability
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                         name="availability"
                        type="text" v-model="formData.availability">
                        </Field>
                    </div>

                    <div class="field-section mb-5 w-full md:w-1/2 px-3 md:-mt-36">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Transport
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                         name="transport"
                        type="text" v-model="formData.transport">
                        </Field>
                    </div>

                    <div class="field-section mb-5 w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Estimated return time
                        </label>

                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                         name="estimated_return_time"
                        type="text" v-model="formData.estimated_return_time">
                        </Field>
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