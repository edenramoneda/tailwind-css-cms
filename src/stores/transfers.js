import { defineStore } from 'pinia'
import { fetchData} from '@/plugins/axiosUtils'; 

export const useTransfersStore = defineStore("transfers", {
    state: () => ({
        transfers: [],
        transferData: {}
    }),
    getters: {
      getTransfers(state){
          return state.transfers
        }
    },
    actions: {
      async fetchTransfers() {
        try {
          const data = await fetchData('api/transfers-rentals')
            this.transfers = data
            
          }
          catch (error) {
           // console.log(error)
        }
      },
      async fetchTransferData(id) {
        try {
          const data = await fetchData(`api/transfers-rentals/${id}`)
            this.transferData = data
            
          }
          catch (error) {
           // console.log(error)
        }
      }
    },
})