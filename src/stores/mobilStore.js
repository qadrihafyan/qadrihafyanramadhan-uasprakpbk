import { defineStore } from 'pinia'
import axios from 'axios'

export const useMobilStore = defineStore('mobil', {
    state: () => ({
        daftarMobil: [],
        loading: false,
    }),

    getters: {
        mobilTersedia(state) {
            return state.daftarMobil.filter(mobil => mobil.disewa === false)
        },
        mobilDisewa: (state) => state.daftarMobil.filter(m => m.disewa),
    },

    actions: {
        async fetchMobil() {
            this.loading = true
            try {
                const res = await axios.get('http://localhost:3000/mobil')
                this.daftarMobil = res.data
            } finally {
                this.loading = false
            }
        },

        async tambahMobil(mobil) {
            await axios.post('http://localhost:3000/mobil', mobil)
            await this.fetchMobil()
        },

        async updateMobil(id, updatedData) {
            await axios.put(`http://localhost:3000/mobil/${id}`, updatedData)
            await this.fetchMobil()
        }
    }
})
