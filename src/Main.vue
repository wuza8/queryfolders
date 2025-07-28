<script setup lang="ts">
  import { onMounted } from 'vue';
  import TitleBar from './components/titlebar/TitleBar.vue';
import SearchingResults from './components/searching-results/SearchingResults.vue';
import SearchingForm from './components/searching-form/searchingForm.vue';
import MainWindowInstructions from './components/searching-results/MainWindowInstructions.vue';
import { started } from './logic/mainLogic';

  onMounted(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
    }
  })

</script>

<template>
  <TitleBar />
  <SearchingResults v-if="started" />
  <MainWindowInstructions v-if="!started"/>
  <SearchingForm />
</template>