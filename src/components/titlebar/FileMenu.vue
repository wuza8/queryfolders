<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {openSettings} from '../settings/SettingsAPI.ts'
const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
        isDark.value = true
    }
})

watch(isDark, (newVal) => {
  localStorage.setItem('theme', newVal ? 'dark' : 'light')
})
</script> 

<template>
    <div class="text-[12px] text-tcolor absolute left-[115px] w-[150px] bg-primary border-b border-l border-r border-accent z-10">
        <div @click="openSettings()" class="pl-[5px] pt-[2px] pb-[2px] hover:bg-secondary hover:cursor-pointer">Settings</div> 
        <div class="pl-[5px] pt-[2px] pb-[2px] hover:bg-secondary hover:cursor-pointer" @click="toggleDarkMode()">Dark mode
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="dropdown-2 size-3 inline ml-[65px] mb-[4px] mr-[2px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg></div> 
        <div class="pl-[5px] pt-[2px] pb-[2px] hover:bg-secondary hover:cursor-pointer">Exit</div>
    </div>
</template>

