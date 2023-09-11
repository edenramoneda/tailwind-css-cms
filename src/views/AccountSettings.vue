<script setup>
import Home from '@/components/Home.vue'
import { onMounted,ref, computed,reactive } from 'vue'
import Swal from 'sweetalert2'
import { RouterLink, RouterView, useRoute,useRouter } from 'vue-router'
import { fetchData, updateAdminData } from '@/plugins/axiosUtils'; 
import { Form, Field } from 'vee-validate';

import * as yup from 'yup';
const router = useRouter()
const userId = ref()

const initForm = {
    username: "",
    email: "",
    password: ""
}
let formData = reactive({...initForm})

const schema = yup.object({
    username: yup.string()
      .required(),
      email: yup.string()
      .required().email(),
      password: yup.string().optional()
})

function updateAccount(values){
    updateAdminData(`/api/users/${userId.value}`,values).then(res => {
        if (!res.status == 200) {
            throw new Error(response.status)
        }
            Swal.fire('Success',
            'Data Successfully Updated',
            'success')

            router.push(`/account-settings`)
    })
}
onMounted(() => {
    fetchData('/api/users/me').then(res => {
        formData.username = res.username
        formData.email = res.email
        userId.value = res.id
    })
})
</script>
<template>
    <Home>
        <p class="text-2xl font-semibold pb-6 text-gray-700">Account Settings</p>
        <div class="container">
            <Form class="w-2/4" @submit="updateAccount" :validation-schema="schema" v-slot="{ errors }">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                    <div class="flex flex-wrap">

                        <div class="field-section mb-5 w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Username
                            </label>

                            <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            :class="{ 'is-invalid': errors.username }" name="username"
                            type="text" v-model="formData.username">
                            </Field>
                            <small class="text-red-500">{{ errors.username }}</small>
                        </div>
                        <div class="field-section mb-5 w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Email
                            </label>

                            <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            :class="{ 'is-invalid': errors.email }" name="email"
                            type="text" v-model="formData.email">
                            </Field>
                            <small class="text-red-500">{{ errors.email }}</small>
                        </div>
                        <button
                            type="submit"
                            class="ml-3 mb-2 bg-blue-700 border border-blue-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-blue-800"
                        >
                           Update
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    </Home>
</template>