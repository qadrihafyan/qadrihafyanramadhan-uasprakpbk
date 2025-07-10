import { defineStore } from 'pinia'
import axios from 'axios'

export const usePelangganStore = defineStore('pelanggan', {
  state: () => ({
    pelangganList: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPelanggan() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3000/pelanggan')
        this.pelangganList = res.data
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async tambahPelanggan(data) {
      try {
        await axios.post('http://localhost:3000/pelanggan', data)
        this.fetchPelanggan()
      } catch (err) {
        this.error = err
      }
    },

    async hapusPelanggan(id) {
      try {
        await axios.delete(`http://localhost:3000/pelanggan/${id}`)
        this.fetchPelanggan()
      } catch (err) {
        this.error = err
      }
    },

    async updatePelanggan(id, updatedData) {
      try {
        await axios.put(`http://localhost:3000/pelanggan/${id}`, updatedData)
        this.fetchPelanggan()
      } catch (err) {
        this.error = err
      }
    }
  }
})
