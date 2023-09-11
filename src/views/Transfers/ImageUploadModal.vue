<script setup>
import Home from '@/components/Home.vue'
import { onMounted,ref, computed,reactive,defineProps,defineEmits } from 'vue'
import { Form, Field } from 'vee-validate';
import { RouterLink, RouterView, useRouter,useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import { postData } from '@/plugins/axiosUtils'; 

const router = useRouter()
const route = useRoute()

const imageFields = reactive([{
        subcategory : '',
        image: '',
    }])

const props = defineProps(['vehicleId'])
const emit = defineEmits(['closeModal'])



function addNewField(){
    const newField = {
        subcategory: '',
        image: '',
        error: true
    };
    imageFields.push(newField);
}

function removeField(index){
    if(index > 0){
        this.imageFields.splice(index, 1);
    }
  
}

async function submitImages(){
    // Reset error properties for all fields
    imageFields.forEach(field => {
        field.error = false;
    });

    // Check for fields with empty images and set error properties
    imageFields.forEach(field => {
        if (!field.image) {
        field.error = true;
        }
    });

    // Check for any fields with empty images
    const hasEmptyImage = imageFields.some(field => field.error);

    if (hasEmptyImage) {
        Swal.fire('Error',
        'Some fields are empty',
        'error')

        return; // Prevent submission
    }

        // Proceed with submission logic
        const dataNoErrorField = []

        for (const data of imageFields) {
            const entryData = {
                transfers_rental: { id: props.vehicleId },
                image: data.image,
            };

            await postData('api/transfer-images', entryData).then((result) => {
                if (!result.status == 200) {
                throw new Error(response.status)
            }
                Swal.fire('Success',
                'Data Successfully Added',
                'success').then(()=> {
                    emit('closeModal')
                location.reload();
                })

              
            }).catch(err => {})
        }

}

</script>


<template>

        <div class="relative overflow-x-auto border border-gray-200">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-base text-white uppercase app-name-bg-blue  text-center">
                <tr>
                    <th scope="col" class="px-6 py-3 w-72">Image Link</th>                            
                    <th scope="col" class="px-6 py-3 w-40">Image</th>
                    <th scope="col" class="px-6 py-3 w-40">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                    class="text-center border-b" 
                    v-for="(field, index) in imageFields" :key="index">
                    <td class="px-2 py-3">
                        <textarea
                        v-model="field.image"
                        @input="field.error = !field.image"
                        class="border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400"
                        type="text"
                        />
                        <span v-if="field.error" class="text-red-500">Image link is required.</span>
                    </td>
                    <td class="px-2 py-3">
                       <span v-if="field.image"><img :src="field.image" /></span> 
                       <span v-else>No Image yet</span> 
                    </td>
                    <td>
                        <button 
                            type="button" 
                            class="text-white bg-red-600 hover:bg-danger-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
                            @click="removeField(index)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="xs"/>
                        </button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button type="button" 
            class="text-white m-5 bg-amber-600 hover:bg-orange-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-3"
            @click="addNewField()">
            <font-awesome-icon icon="fa-solid fa-plus" size="xs"/>
            Add Image
        </button>
        <button type="button" 
            class="text-white mr-5 bg-sky-900 hover:bg-sky-950 mt-5 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-7 py-3"
            @click="submitImages()">
            <font-awesome-icon icon="fa-solid fa-location-arrow" size="xs"/>
            Submit
        </button>
        <button type="button" 
            class="text-white bg-slate-700 hover:bg-slate-600 mt-5 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-7 py-3"
            @click="emit('closeModal')">
            Close
        </button>
      

</template>