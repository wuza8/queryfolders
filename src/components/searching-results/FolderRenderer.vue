<script setup lang="ts">
import folderleft from '../../assets/folderleft.svg'
import folderend from '../../assets/folderend.svg'
import arrowright from '../../assets/arrowright.svg'
import arrowdown from '../../assets/arrowdown.svg'

class Folder{
    public name: String = ""
    public status: String = ""
    public path: String = ""
    public opened: boolean = false
    public subfolders: any[] = []
}

defineProps<{
  folderScheme: Folder[],
  openFolder: (folderPath: String) => void
}>()
</script>

<template>
    <div v-if="folderScheme!=undefined" v-for="(folder, index) in folderScheme" class="h-[20px]">
        <div class="h-[20px] w-[calc(100vw-50px)] float-left">
            <img v-if="index != folderScheme.length-1 && !folder.opened" class="float-left mt-[0px] z-0 relative h-[20px] ml-[20px]" :src="folderleft">
            <img v-if="index == folderScheme.length-1 || folder.opened" class="float-left mt-[0px] z-0 relative h-[10px] ml-[20px] " :src="folderend">
            <div class="float-left ml-[10px] pt-[0px] h-[12px] leading-[20px] hover:cursor-pointer hover:underline" @click="openFolder(folder.path)">{{folder.name}}</div>
            <img v-if="folder.subfolders.length != 0" class="float-left mt-[5px] z-0 relative h-[10px] ml-[3px] " :src="folder.opened ? arrowdown : arrowright">
            <div :class="folder.status=='Positive' ? 'text-[#33ee33]' : folder.status=='Negative' ? 'text-[#ee3333]' : 'text-accent'" class="float-left ml-[10px] pt-[0px] h-[12px] leading-[20px] text-[12px]">{{folder.status}}</div>
        </div>
        <div v-if="folder.subfolders.length != 0 && folder.opened" class="ml-[15px] mb-[5px] w-100">
            <FolderRenderer :folderScheme="folder.subfolders" :openFolder="openFolder"/>
        </div>
    </div>
</template>