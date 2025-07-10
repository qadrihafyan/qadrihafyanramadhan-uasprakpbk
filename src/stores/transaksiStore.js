import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    transaksiList: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTransaksi() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        this.transaksiList = res.data
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async tambahTransaksi(data) {
      try {
        await axios.post('http://localhost:3000/transaksi', data)
        this.fetchTransaksi()
      } catch (err) {
        this.error = err
      }
    },

    async hapusTransaksi(id) {
      try {
        await axios.delete(`http://localhost:3000/transaksi/${id}`)
        this.fetchTransaksi()
      } catch (err) {
        this.error = err
      }
    },

    async updateTransaksi(id, updatedData) {
      try {
        await axios.put(`http://localhost:3000/transaksi/${id}`, updatedData)
        this.fetchTransaksi()
      } catch (err) {
        this.error = err
      }
    }
  }
})
