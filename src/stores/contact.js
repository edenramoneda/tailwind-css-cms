import { defineStore } from 'pinia'

import { fetchData} from '@/plugins/axiosUtils'; 

export const useContactStore = defineStore("contacts", {
    state: () => ({
        contacts: [],
    }),
    getters: {
      getContacts(state){
          return state.contacts
        }
    },
    actions: {
      async fetchContacts() {
        try {
          const data = await fetchData('api/company-contacts')
            this.contacts = data.data
          }
          catch (error) {
           // console.log(error)
        }
      }
    },
})