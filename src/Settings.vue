<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GeneralSettings from './components/settings/generalSettings.vue';
import ModelsSettings from './components/settings/modelsSettings.vue';
import PromptSettings from './components/settings/promptSettings.vue';
import PromptTemplatesSettings from './components/settings/promptTemplatesSettings.vue';
import MasksSettings from './components/settings/masksSettings.vue';

onMounted(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
    }
  })

  const options = [
    {name: "General", tem: GeneralSettings},
    {name: "Models", tem: ModelsSettings},
    {name: "Prompt settings", tem: PromptSettings},
    {name: "Prompts", tem: PromptTemplatesSettings},
    {name: "Masks", tem: MasksSettings}
  ]

  const selected = ref(options[0])

  
</script>

<template>
  <div class="float-left w-[200px] bg-primary h-[100vh] shadow-md">
    <div class="w-full text-tcolor text-sm p-2" 
        v-for="option in options"
        :class="{ 'hover:cursor-pointer hover:bg-secondary': selected.name != option.name, 'bg-fourth': selected.name == option.name}"
        @click="selected = option"
        >{{option.name}}</div>
  </div>

  <component :is="selected.tem" />
  
</template>