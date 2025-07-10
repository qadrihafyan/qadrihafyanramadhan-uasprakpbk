import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { usePelangganStore } from '@/stores/pelangganStore'

// Mock axios
vi.mock('axios')

describe('usePelangganStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetchPelanggan should populate pelangganList', async () => {
    const store = usePelangganStore()
    const dummyData = [
      { id: 1, nama: 'Andi', no_hp: '08123456789', alamat: 'Jl. ABC' }
    ]

    axios.get.mockResolvedValue({ data: dummyData })

    await store.fetchPelanggan()

    expect(store.pelangganList).toEqual(dummyData)
    expect(store.loading).toBe(false)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/pelanggan')
  })

  it('tambahPelanggan should call axios.post and refresh list', async () => {
    const store = usePelangganStore()

    axios.post.mockResolvedValue({})
    axios.get.mockResolvedValue({ data: [] })

    await store.tambahPelanggan({ nama: 'Budi', no_hp: '0812', alamat: 'Jl. XYZ' })

    expect(axios.post).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalled()
  })

  it('hapusPelanggan should call axios.delete and refresh list', async () => {
    const store = usePelangganStore()

    axios.delete.mockResolvedValue({})
    axios.get.mockResolvedValue({ data: [] })

    await store.hapusPelanggan(1)

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/pelanggan/1')
    expect(axios.get).toHaveBeenCalled()
  })

  it('updatePelanggan should call axios.put and refresh list', async () => {
    const store = usePelangganStore()

    axios.put.mockResolvedValue({})
    axios.get.mockResolvedValue({ data: [] })

    const updated = { nama: 'Update', no_hp: '0812', alamat: 'Jl. Update' }

    await store.updatePelanggan(2, updated)

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/pelanggan/2', updated)
    expect(axios.get).toHaveBeenCalled()
  })

  it('should handle error during fetch', async () => {
    const store = usePelangganStore()
    const error = new Error('Fetch failed')
    axios.get.mockRejectedValue(error)

    await store.fetchPelanggan()

    expect(store.error).toBe(error)
    expect(store.pelangganList).toEqual([])
  })
})
