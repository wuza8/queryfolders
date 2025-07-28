<script setup lang="ts">
import { getCurrentWindow } from '@tauri-apps/api/window'
import ModelMenu from './ModelMenu.vue'
import FileMenu from './FileMenu.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const minimize = () => getCurrentWindow().minimize()
const maximize = () => getCurrentWindow().toggleMaximize()
const close = () => getCurrentWindow().close()

const fileMenuOpen = ref(false)
const modelMenuOpen = ref(false)

const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as HTMLElement

  if (!target.closest('.dropdown-1') || target.closest('.dropdown-1-close')) {
    fileMenuOpen.value = false
  }

  if (!target.closest('.dropdown-2') || target.closest('.dropdown-2-close')) {
    modelMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="font-lato flex text-tcolor justify-between text-sm h-[30px] bg-secondary select-none shadow-lg z-10">
    <div class="flex-1 h-full drag-region">
        <div class="float-left h-[30px] leading-[30px] ml-[15px]">
          Query<span class="text-[#515885]">Folders</span>
        </div>
        <div @click="fileMenuOpen = !fileMenuOpen" class="dropdown-1 nodrag-region float-left border-accent border-t border-l border-r ml-[15px] mt-[4px] h-[26px] pl-[5px] pr-[5px] bg-primary pt-[3px] text-[12px] rounded-t-md hover:bg-secondary">
          File
        </div>
    </div>
    <div class="dropdown-2 flex bg-primary border-accent rounded-t-md border-t border-l border-r mt-[4px] mr-[15px] text-[12px] pl-[6px] pt-[3px] w-[170px] h-[26px] nodrag-region hover:bg-secondary">
      <div @click="modelMenuOpen = !modelMenuOpen"  class="w-[140px]">LM Studio</div>
      <div class="float-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mt-[2px]">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
    <div class="flex nodrag-region">
      <div class="pl-[16px] pr-[16px] pt-[5px] pb-[3px] hover:bg-[#666] b-solid-[#414141]" @click="minimize">—</div>
      <div class="pl-[16px] pr-[17px] pt-[5px] pb-[5px] hover:bg-[#666]" @click="maximize">☐</div>
      <div class="pl-[16px] pr-[17px] pt-[5px] pb-[5px] hover:bg-danger" @click="close">✕</div>
    </div>
    
  </div>
  <FileMenu v-if="fileMenuOpen" />
  <ModelMenu v-if="modelMenuOpen" />
</template>

