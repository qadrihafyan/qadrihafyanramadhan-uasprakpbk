<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Transaksi Berjalan</h1>

        <!-- Form Tambah Transaksi -->
        <form @submit.prevent="handleSubmit"
            class="grid gap-4 mb-6 bg-white p-4 rounded-xl shadow border border-gray-200">
            <div class="grid sm:grid-cols-2 gap-4">
                <!-- Pelanggan -->
                <div>
                    <label class="block text-sm font-medium mb-1">Pelanggan</label>
                    <select v-model="form.pelangganId" class="w-full p-2 border rounded">
                        <option disabled value="">Pilih Pelanggan</option>
                        <option v-for="p in pelangganList" :key="p.id" :value="p.id">{{ p.nama }}</option>
                    </select>
                </div>

                <!-- Mobil -->
                <div>
                    <label class="block text-sm font-medium mb-1">Mobil</label>
                    <select v-model="form.mobilId" class="w-full p-2 border rounded">
                        <option disabled value="">Pilih Mobil</option>
                        <option v-for="m in mobilTersedia" :key="m.id" :value="m.id">{{ m.nama }} - {{ m.nomor_polisi }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
                <!-- Tanggal Sewa -->
                <div>
                    <label class="block text-sm font-medium mb-1">Tanggal Sewa</label>
                    <input type="date" v-model="form.tanggal_sewa" class="w-full p-2 border rounded" />
                </div>

                <!-- Tanggal Kembali -->
                <div>
                    <label class="block text-sm font-medium mb-1">Tanggal Kembali</label>
                    <input type="date" v-model="form.tanggal_kembali" class="w-full p-2 border rounded" />
                </div>
            </div>

            <!-- Submit -->
            <button type="submit" class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 w-fit">
                Tambah Transaksi
            </button>
        </form>

        <!-- Tabel Transaksi Berjalan -->
        <div class="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
            <table class="w-full text-left text-sm">
                <thead class="bg-purple-700 text-white">
                    <tr>
                        <th class="p-3">Pelanggan</th>
                        <th class="p-3">Mobil</th>
                        <th class="p-3">Tanggal Sewa</th>
                        <th class="p-3">Tanggal Kembali</th>
                        <th class="p-3">Total</th>
                        <th class="p-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="trx in transaksiBerjalan" :key="trx.id" class="border-b hover:bg-gray-50">
                        <td class="p-3">{{ getPelangganName(trx.pelangganId) }}</td>
                        <td class="p-3">{{ getMobilName(trx.mobilId) }}</td>
                        <td class="p-3">{{ trx.tanggal_sewa }}</td>
                        <td class="p-3">{{ trx.tanggal_kembali }}</td>
                        <td class="p-3">Rp {{ trx.total.toLocaleString() }}</td>
                        <td class="p-3 flex gap-2">
                            <button @click="konfirmasiSelesai(trx)"
                                class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
                                Selesai
                            </button>
                            <button @click="hapus(trx.id)" class="text-red-600 hover:underline text-sm">
                                Hapus
                            </button>
                        </td>
                    </tr>
                    <tr v-if="transaksiBerjalan.length === 0">
                        <td colspan="6" class="p-3 text-center text-gray-500">Tidak ada transaksi berjalan</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMobilStore } from '@/stores/mobilStore'
import { usePelangganStore } from '@/stores/pelangganStore'
import { useTransaksiStore } from '@/stores/transaksiStore'

const mobilStore = useMobilStore()
const pelangganStore = usePelangganStore()
const transaksiStore = useTransaksiStore()

onMounted(async () => {
    await mobilStore.fetchMobil()
    console.log('Mobil dari server:', mobilStore.daftarMobil)

    await pelangganStore.fetchPelanggan()
    await transaksiStore.fetchTransaksi()
})

// Form transaksi
const form = ref({
    pelangganId: '',
    mobilId: '',
    tanggal_sewa: '',
    tanggal_kembali: '',
})

// List data
const pelangganList = computed(() => pelangganStore.pelangganList)
const mobilTersedia = computed(() => mobilStore.mobilTersedia)
const transaksiBerjalan = computed(() => transaksiStore.transaksiList.filter(t => t.status === 'berjalan'))

// Helper tampil nama
const getPelangganName = (id) => pelangganList.value.find(p => p.id === id)?.nama || '-'
const getMobilName = (id) => {
    const m = mobilStore.daftarMobil.find(m => m.id === id)
    return m ? `${m.nama} (${m.nomor_polisi})` : '-'
}

// Hitung total berdasarkan tanggal
const hitungTotal = (tgl1, tgl2, tarifPerHari) => {
    const date1 = new Date(tgl1)
    const date2 = new Date(tgl2)
    const diffDays = Math.max(Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24)), 1)
    return diffDays * tarifPerHari
}

// Tambah transaksi
const handleSubmit = async () => {
    const mobil = mobilStore.daftarMobil.find(m => m.id === form.value.mobilId)
    if (!mobil) return

    const total = hitungTotal(form.value.tanggal_sewa, form.value.tanggal_kembali, mobil.tarif_per_hari)

    await transaksiStore.tambahTransaksi({
        ...form.value,
        total,
        status: 'berjalan'
    })

    await mobilStore.updateMobil(mobil.id, { ...mobil, disewa: true })

    // Reset form
    form.value = {
        pelangganId: '',
        mobilId: '',
        tanggal_sewa: '',
        tanggal_kembali: '',
    }
}

// Hapus transaksi
const hapus = async (id) => {
    const trx = transaksiStore.transaksiList.find(t => t.id === id)
    const mobil = mobilStore.daftarMobil.find(m => m.id === trx?.mobilId)

    await transaksiStore.hapusTransaksi(id)

    if (mobil) {
        await mobilStore.updateMobil(mobil.id, { ...mobil, disewa: false })
        await mobilStore.fetchMobil()

    }
}

// Konfirmasi selesai
const konfirmasiSelesai = async (trx) => {
    await transaksiStore.updateTransaksi(trx.id, {
        ...trx,
        status: 'selesai'
    })

    const mobil = mobilStore.daftarMobil.find(m => m.id === trx.mobilId)
    if (mobil) {
        await mobilStore.updateMobil(mobil.id, { ...mobil, disewa: false })
        await mobilStore.fetchMobil()

    }
}
</script>
