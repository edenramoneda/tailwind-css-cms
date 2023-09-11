import { defineStore } from 'pinia'
import { fetchData} from '@/plugins/axiosUtils'; 

export const useCategoriesStore = defineStore("categories", {
    state: () => ({
        categories: [],
        categoryData: {}
    }),
    getters: {
      getCategories(state){
          return state.categories
        }
    },
    actions: {
      async fetchCategories() {
        try {
          const data = await fetchData('api/categories')
            this.categories = data.data
            
          }
          catch (error) {
           // console.log(error)
        }
      },
      async fetchCategoryData(id) {
        try {
          const data = await fetchData(`api/categories/${id}`)
            this.categoryData = data.data
            
          }
          catch (error) {
           // console.log(error)
        }
      }
    },
})