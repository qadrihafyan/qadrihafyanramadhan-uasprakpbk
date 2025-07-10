<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Data Pelanggan</h1>

    <!-- Form Tambah Pelanggan -->
    <form @submit.prevent="tambahPelanggan" class="grid gap-4 mb-6 bg-white p-4 rounded-xl shadow border border-gray-200 sm:grid-cols-2">
      <div>
        <label class="block text-sm font-medium mb-1">Nama</label>
        <input type="text" v-model="form.nama" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">No HP</label>
        <input type="text" v-model="form.no_hp" class="w-full p-2 border rounded" required />
      </div>
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium mb-1">Alamat</label>
        <textarea v-model="form.alamat" class="w-full p-2 border rounded" required></textarea>
      </div>
      <div class="sm:col-span-2">
        <button type="submit" class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
          Tambah Pelanggan
        </button>
      </div>
    </form>

    <!-- Tabel Data Pelanggan -->
    <div class="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="bg-purple-700 text-white">
          <tr>
            <th class="p-3">Nama</th>
            <th class="p-3">No HP</th>
            <th class="p-3">Alamat</th>
            <th class="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pelangganList" :key="p.id" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ p.nama }}</td>
            <td class="p-3">{{ p.no_hp }}</td>
            <td class="p-3">{{ p.alamat }}</td>
            <td class="p-3">
              <button @click="hapusPelanggan(p.id)" class="text-red-600 hover:underline text-sm">
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="pelangganList.length === 0">
            <td colspan="4" class="p-3 text-center text-gray-500">Belum ada data pelanggan</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { usePelangganStore } from '@/stores/pelangganStore'

const pelangganStore = usePelangganStore()

onMounted(() => {
  pelangganStore.fetchPelanggan()
})

const pelangganList = computed(() => pelangganStore.pelangganList)

const form = ref({
  nama: '',
  no_hp: '',
  alamat: ''
})

const tambahPelanggan = async () => {
  await pelangganStore.tambahPelanggan({ ...form.value })
  form.value = { nama: '', no_hp: '', alamat: '' }
}

const hapusPelanggan = async (id) => {
  await pelangganStore.hapusPelanggan(id)
}
</script>
