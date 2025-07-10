<template>
  <aside class="w-64 h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white fixed left-0 top-0 flex flex-col shadow-2xl z-50">
    <!-- Header/Brand -->
    <div class="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <span class="text-3xl drop-shadow-lg"><Car /></span>
        Car System
      </h2>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 py-6">
      <ul class="space-y-2 px-4">
        <li v-for="item in menu" :key="item.name">
          <RouterLink
            :to="item.path"
            class="flex items-center gap-4 px-6 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium group"
            active-class="bg-white/20 text-white shadow-lg backdrop-blur-sm"
            exact
          >
            <component :is="item.icon" class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span class="group-hover:translate-x-1 transition-transform duration-300">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="p-6 border-t border-white/10 bg-white/5">
      <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm">
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">👤</div>
        <span class="font-medium">Admin</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'

// Import ikon dari lucide-vue-next
import { BarChart, Car, Users, CreditCard } from 'lucide-vue-next'

const menu = [
  { name: "Dashboard", path: "/", icon: BarChart },
  { name: "Mobil", path: "/mobil", icon: Car },
  { name: "Pelanggan", path: "/pelanggan", icon: Users },
  { name: "Transaksi", path: "/transaksi", icon: CreditCard },
]
</script>

<style scoped>
/* Opsional efek animasi tambahan */
.nav-link:hover {
  animation: pulse 0.3s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
</style>
