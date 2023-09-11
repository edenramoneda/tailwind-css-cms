<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted,ref, computed,reactive } from 'vue'
import { loginData,fetchData } from '@/plugins/axiosUtils'; 
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import axios from 'axios';


const router = useRouter()

const initForm = {
    identifier: "",
    password: "",
}
let formData = reactive({...initForm})

const schema = yup.object({
    identifier: yup.string()
      .required('Username is required'),
    password: yup.string().required('Password is required'),
})


async function login(e) {

   await loginData(`api/auth/local`,e).then((result) => {
        
      let timerInterval

      const { jwt, user} = result.data
      localStorage.setItem('userToken', jwt)
      localStorage.setItem('userData', JSON.stringify({username: user.username, emai: user.email}))
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      Swal.fire({
        title: 'Logging in',
        text: 'Please wait!',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          // const b = Swal.getHtmlContainer().querySelector('b')
          // timerInterval = setInterval(() => {
          //   b.textContent = Swal.getTimerLeft()
          // }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            router.push('/home')
          }
      })
        
   }).catch(err => {

      if(err.response.status === 500){
          Swal.fire('Error',
            err.response.statusText,
          'error')
      }else if(err.response.status === 400)
      {
          Swal.fire('Error',
          'Invalid Credentials',
          'error')
      }
      else {
          Swal.fire('Error',
          'Something went wrong',
          'error')
      }
        
  
   })
  }


</script>

<template>
 
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div class=" bg-white rounded-lg shadow dark:border dark:border-gray-100 w-auto">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class=" mr-2" src="" alt="logo">
                </a>
                <Form class="w-full" @submit="login" :validation-schema="schema" v-slot="{ errors }">
                  <div>
                      <label for="identifier" class="block mb-2 font-medium text-gray-900">Username</label>
                      <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :class="{ 'is-invalid': errors.identifier }" name="identifier"
                        type="text" v-model="formData.identifier" placeholder="Username">
                        </Field>
                            <small class="text-red-500">{{ errors.identifier }}</small>
                  </div>
                  <div>
                      <label for="password" class="block mt-5 mb-2 font-medium text-gray-900">Password</label>
                      <Field class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    :class="{ 'is-invalid': errors.password }" name="password"
                    type="text" v-model="formData.password" placeholder="Password">
                    </Field>
                        <small class="text-red-500">{{ errors.password }}</small>
                  </div>

                  <button 
                  type="submit" 
                  class="w-full mt-5 text-white bg-amber-600 hover:bg-orange-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center">Login</button>
                </Form>
          </div>
      </div>
  </div>
</template>

