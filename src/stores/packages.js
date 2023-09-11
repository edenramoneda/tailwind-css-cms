import { defineStore } from 'pinia'
import { fetchData} from '@/plugins/axiosUtils'; 

export const usePackagesStore = defineStore("packages", {
    state: () => ({
        packages: [],
        packageData: {}
    }),
    getters: {
      getPackages(state){
          return state.packages
        }
    },
    actions: {
      async fetchPackages() {
        try {
          const data = await fetchData('api/subcategories/Packages')
            this.packages = data
            
          }
          catch (error) {
           // console.log(error)
        }
      },
      async fetchPackageData(id) {
        try {
          const data = await fetchData(`api/subcategories/data/${id}`)
            this.packageData = data
            
          }
          catch (error) {
           // console.log(error)
        }
      }
    },
})