<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Data Mobil</h1>

    <!-- Form Tambah Mobil -->
    <form @submit.prevent="tambahMobil"
      class="grid gap-4 mb-6 bg-white p-4 rounded-xl shadow border border-gray-200 sm:grid-cols-2">
      <div>
        <label class="block text-sm font-medium mb-1">Nama Mobil</label>
        <input type="text" v-model="form.nama" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Nomor Polisi</label>
        <input type="text" v-model="form.nomor_polisi" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Tarif per Hari</label>
        <input type="number" v-model.number="form.tarif_per_hari" class="w-full p-2 border rounded" required />
      </div>
      <div class="sm:col-span-2">
        <button type="submit" class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
          Tambah Mobil
        </button>
      </div>
    </form>

    <!-- Tabel Data Mobil -->
    <div class="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="bg-purple-700 text-white">
          <tr>
            <th class="p-3">Nama</th>
            <th class="p-3">Nomor Polisi</th>
            <th class="p-3">Tarif per Hari</th>
            <th class="p-3">Status</th>
            <th class="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in mobilList" :key="m.id" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ m.nama }}</td>
            <td class="p-3">{{ m.nomor_polisi }}</td>
            <td class="p-3">Rp {{ m.tarif_per_hari.toLocaleString() }}</td>
            <td class="p-3">
              <span
                :class="[
                  'px-2 py-1 text-xs rounded font-medium',
                  m.disewa ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                ]"
              >
                {{ m.disewa ? 'Disewa' : 'Tersedia' }}
              </span>
            </td>
            <td class="p-3">
              <button
                @click="hapusMobil(m.id)"
                class="text-red-600 hover:underline text-sm"
                :disabled="m.disewa"
                :title="m.disewa ? 'Tidak bisa hapus mobil yang sedang disewa' : ''"
              >
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="mobilList.length === 0">
            <td colspan="5" class="p-3 text-center text-gray-500">Belum ada data mobil</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMobilStore } from '@/stores/mobilStore'

const mobilStore = useMobilStore()

onMounted(() => {
  mobilStore.fetchMobil()
})

const mobilList = computed(() => mobilStore.daftarMobil)

const form = ref({
  nama: '',
  nomor_polisi: '',
  tarif_per_hari: 0
})

const tambahMobil = async () => {
  await mobilStore.tambahMobil({
    ...form.value,
    disewa: false
  })
  form.value = { nama: '', nomor_polisi: '', tarif_per_hari: 0 }
}

const hapusMobil = async (id) => {
  const mobil = mobilStore.daftarMobil.find(m => m.id === id)
  if (mobil?.disewa) {
    alert('Tidak bisa menghapus mobil yang sedang disewa.')
    return
  }
  await mobilStore.hapusMobil(id)
}
</script>
