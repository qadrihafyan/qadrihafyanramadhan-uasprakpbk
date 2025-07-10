import { defineStore } from 'pinia'
import axios from 'axios'

export const useMobilStore = defineStore('mobil', {
  state: () => ({
    daftarMobil: [],
    loading: false,
  }),

  actions: {
    async fetchMobil() {
      this.loading = true
      const res = await axios.get('http://localhost:3000/mobil')
      this.daftarMobil = res.data
      this.loading = false
    },
    async tambahMobil(mobil) {
      await axios.post('http://localhost:3000/mobil', mobil)
      this.fetchMobil()
    }
  }
})
