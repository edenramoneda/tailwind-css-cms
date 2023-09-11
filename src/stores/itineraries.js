import { defineStore } from 'pinia'
import axios from "axios"
import { fetchData} from '@/plugins/axiosUtils'; 

export const useItinerariesStore = defineStore("itineraries", {
    state: () => ({
        itineraries: [],
        itineraryData: {}
    }),
    getters: {
      getItineraries(state){
          return state.itineraries
        }
    },
    actions: {
      async fetchItineraries(subcat_id) {
        try {
          const data = await fetchData(`api/itineraries/${subcat_id}`)
            this.itineraries = data
          }
          catch (error) {
           // console.log(error)
        }
      },
      async fetchItineraryData(id) {
        try {
          const data = await fetchData(`api/itineraryData/${id}`)
            this.itineraryData = data
            
          }
          catch (error) {
           // console.log(error)
        }
      }
    },
})