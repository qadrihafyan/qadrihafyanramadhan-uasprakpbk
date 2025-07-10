import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Mobil from "@/views/Mobil.vue";
import Pelanggan from "@/views/Pelanggan.vue";
import Transaksi from "@/views/Transaksi.vue";

const routes = [
    {path: '/', name: "Dashboard", component: Dashboard},
    {path: '/mobil', name: "Mobil", component: Mobil},
    {path: '/pelanggan', name: "Pelanggan", component: Pelanggan},
    {path: '/transaksi', name: "Transaksi", component: Transaksi},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;