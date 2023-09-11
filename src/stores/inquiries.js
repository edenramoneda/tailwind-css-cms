import { defineStore } from 'pinia'
import axios from "axios"
import { fetchData} from '@/plugins/axiosUtils'; 

export const useInquiriesStore = defineStore("inquiries", {
    state: () => ({
        inquiries: [],
        inquiryData: {}
    }),
    getters: {
      getInquiries(state){
          return state.inquiries
        }
    },
    actions: {
      async fetchInquiries() {
        try {
          const data = await fetchData('api/inquiries')
            this.inquiries = data.data
            
          }
          catch (error) {
           // console.log(error)
        }
      },
      async fetchInquiryData(id) {
        try {
          const data = await fetchData(`api/inquiries/${id}`)
            this.inquiryData = data.data
            
          }
          catch (error) {
           // console.log(error)
        }
      }
    },
})