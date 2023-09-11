<script setup>
import Home from '@/components/Home.vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted,ref, computed,reactive } from 'vue'
import { fetchData, postData, updateData, deleteData } from '@/plugins/axiosUtils'; 
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import { useContactStore } from "@/stores/contact";

const router = useRouter()
const contactList = ref([])
let modal = ref(false)
const isEdit = ref(false)
const contactId = ref("")
const initForm = {
  label: "",
  contact: ""
}
const store = useContactStore();
let formData = reactive({...initForm})

const isModalVisible = computed(() => modal.value)

const getContacts = computed(() => {
  return store.contacts;
});

function addContact(){
  modal.value = !modal.value;
  isEdit.value = false
}

async function editContact(id){
  modal.value = !modal.value;
  isEdit.value = true
  contactId.value = id
  await fetchData(`api/company-contacts/${id}`).then(data => {
    formData.label = data.data.attributes.label
    formData.contact = data.data.attributes.contact

   

  }).catch(err => {});
}

//validations
// const { values, errors, defineInputBinds } = useForm({
//   validationSchema: yup.object({
//     contactLabel: yup.string().required(),
//     contact:yup.string().required(),
//   }),
// });

// const contactLabelError = defineInputBinds('ContactLabel');
// const contactError = defineInputBinds('Contact');
const schema = yup.object({
  label: yup.string()
      .required('Label is required'),
  contact: yup.string()
      .required('Contact is required'),
})

async function saveContact(values){
    if(isEdit.value){
      await updateData(`/api/company-contacts/${contactId.value}`, values).then((result) => {
       
          if (!result.status == 200) {
            throw new Error(response.status)
          }
            Swal.fire('Success',
            'Data Successfully Updated',
            'success')

            closeModal()
            store.fetchContacts();
      }).catch(err => {})
    }else{
      await postData('api/company-contacts',values).then((result) => {
       
          if (!result.status == 200) {
            throw new Error(response.status)
          }
            Swal.fire('Success',
            'Data Successfully Added',
            'success')

            closeModal()
            store.fetchContacts();
      }).catch(err => {})
    }
}

async function deleteContact(id){

    Swal.fire({
      title: 'Do you want to delete this data?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(`api/company-contacts/${id}`).then((result) => {
        if (!result.status == 200) {
          throw new Error(response.status)
        }
          Swal.fire('Success',
          'Data Successfully Deleted',
          'success')
        }).then(() =>{
          store.fetchContacts();
        })
       

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
   
}


function closeModal(){
  modal.value = !modal.value;
  Object.assign(formData, initForm);
}


onMounted(() => {
    store.fetchContacts();
   
})



</script>
<template>
    <Home>
      <p class="text-2xl font-semibold pb-6 text-gray-700">Contacts</p>
        <button 
            @click="addContact"
            class="px-3 py-2 mr-3 mb-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            <font-awesome-icon icon="fa-solid fa-plus" size="xs"/>
             Add Contact
        </button>
        <div class="relative overflow-x-auto sm:rounded-lg border border-gray-200">
          
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                <thead class="text-base text-white uppercase app-name-bg-blue">
                    <tr>
                        <th scope="col" class="px-6 py-3 w-48">
                            Label
                        </th>
                        <th scope="col" class="px-6 py-3 w-48">
                            Contact
                        </th>
                        
                        <th scope="col" class="px-6 py-3 w-56">
                            <span>Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 dark:text-gray-500" 
                    v-for="getContacts in getContacts" :key="getContacts">
                        <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            {{ getContacts.attributes.label }}
                        </td>
                        <td class="px-6 py-4">
                            {{ getContacts.attributes.contact }}
                        </td>
                     
                        <td class="px-6 py-4">
                            <button 
                                @click="editContact(getContacts.id)"
                                class="px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                <font-awesome-icon icon="fa-solid fa-pencil" size="xs"/>
                                Edit
                            </button>
                            <button 
                            @click="deleteContact(getContacts.id)"
                            class="px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none" type="button">
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
                    class="block uppercase tracking-wide dark:text-neutral-800">
                    {{ isEdit ? 'Edit' : 'Add' }} Contact
                  </h1>
              </div>
              <hr>
              <Form class="w-full" @submit="saveContact" :validation-schema="schema" v-slot="{ errors }">
                <!--body-->
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                      Label
                    </label>
                    <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      :class="{ 'is-invalid': errors.label }" name="label"
                      type="text" v-model=formData.label >
                    </Field>
                      <small class="text-red-500">{{ errors.label }}</small>

                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-8" for="grid-last-name">
                          Contact
                        </label>
                        <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          :class="{ 'is-invalid': errors.contact }" name="contact"
                          type="text" v-model=formData.contact>
                        </Field>
                        <small class="text-red-500">{{ errors.contact }}</small>
                </div>
                <div class="p-3 mt-2 text-center space-x-4 md:block mb-3">
                    <button
                      type="submit"
                      class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
                    >
                      Save
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
