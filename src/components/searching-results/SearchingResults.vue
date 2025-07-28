<script setup lang="ts">
import loading from '../../assets/loading.svg'
import folder from '../../assets/folder.svg'
import FolderRenderer from './FolderRenderer.vue'
import { folderScheme, openFolder, right_side_status_string, running } from '../../logic/mainLogic'


</script>

<template>
    <div class="w-[calc(100%-300px)] float-left h-[calc(100vh-30px)] bg-third">
        <div class="float-left mt-[12px] ml-[12px] text-[12px] text-tcolor">
            <img class="float-left z-0 relative" :src="folder"> <div class="float-left ml-[7px] mt-[1px]">C:\Users\user</div>
        </div>
        <!-- <div class="float-right w-[90px] h-[25px] bg-primary border border-accent rounded mr-[10px] mt-[10px] text-tcolor text-center text-[12px] leading-[23px] hover:cursor-pointer hover:bg-secondary">
            Log view
        </div> -->
        <div class="float-right mt-[12px] mr-[10px] text-[12px] text-tcolor">
            <img v-if="running" class="animate-spin float-left mt-[4px] z-0 relative" :src="loading"> <div class="float-left ml-[7px]">{{ right_side_status_string }}</div>
        </div>
        <div class="w-[100vw] float-left text-tcolor text-[14px] mt-[10px] overflow-x-clip overflow-y-scroll h-[calc(100vh-80px)]">
            <FolderRenderer :folderScheme="folderScheme.subfolders" :openFolder="openFolder"/>
        </div> 
    </div>
</template>