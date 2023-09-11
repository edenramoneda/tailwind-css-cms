import { defineStore } from 'pinia'
import { fetchData} from '@/plugins/axiosUtils'; 

export const useActivitiesStore = defineStore("activities", {
    state: () => ({
        activities: [],
        activityData: {}
    }),
    getters: {
      getActivities(state){
          return state.activities
        }
    },
    actions: {
      async fetchActivities() {
        try {
          const data = await fetchData('api/subcategories/Activities')
            this.activities = data
            
          }
          catch (error) {
           // console.log(error)
        }
      },
      async fetchCategoryData(id) {
        try {
          const data = await fetchData(`api/subcategories/data/${id}`)
            this.activityData = data
            
          }
          catch (error) {
           // console.log(error)
        }
      }
    },
})