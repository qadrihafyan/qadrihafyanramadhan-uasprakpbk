<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Mobil -->
      <div class="bg-white rounded-xl shadow p-4 border border-gray-200">
        <div class="text-gray-500">Total Mobil</div>
        <div class="text-3xl font-bold text-purple-700">{{ totalMobil }}</div>
      </div>

      <div class="bg-white rounded-xl shadow p-4 border border-gray-200">
        <div class="text-gray-500">Mobil Tersedia</div>
        <div class="text-3xl font-bold text-green-600">{{ mobilTersedia }}</div>
      </div>

      <div class="bg-white rounded-xl shadow p-4 border border-gray-200">
        <div class="text-gray-500">Mobil Disewa</div>
        <div class="text-3xl font-bold text-red-600">{{ mobilDisewa }}</div>
      </div>

      <!-- Pelanggan -->
      <div class="bg-white rounded-xl shadow p-4 border border-gray-200">
        <div class="text-gray-500">Total Pelanggan</div>
        <div class="text-3xl font-bold text-blue-600">{{ totalPelanggan }}</div>
      </div>

      <!-- Transaksi -->
      <div class="bg-white rounded-xl shadow p-4 border border-gray-200">
        <div class="text-gray-500">Total Transaksi</div>
        <div class="text-3xl font-bold text-indigo-600">{{ totalTransaksi }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useMobilStore } from '@/stores/mobilStore'
import { usePelangganStore } from '@/stores/pelangganStore'
import { useTransaksiStore } from '@/stores/transaksiStore'

const mobilStore = useMobilStore()
const pelangganStore = usePelangganStore()
const transaksiStore = useTransaksiStore()

onMounted(() => {
  mobilStore.fetchMobil()
  pelangganStore.fetchPelanggan()
  transaksiStore.fetchTransaksi()
})

const totalMobil = computed(() => mobilStore.daftarMobil.length)
const mobilTersedia = computed(() => mobilStore.daftarMobil.filter(m => !m.disewa).length)
const mobilDisewa = computed(() => mobilStore.daftarMobil.filter(m => m.disewa).length)

const totalPelanggan = computed(() => pelangganStore.pelangganList.length)
const totalTransaksi = computed(() => transaksiStore.transaksiList.length)
</script>
