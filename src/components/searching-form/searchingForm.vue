<script setup lang="ts">
    import folder from '../../assets/folder.svg'
    import { open } from '@tauri-apps/plugin-dialog';
    import { ref } from 'vue'
    import { prompt_option, startSearch } from '../../logic/mainLogic';

    const selectedFile = ref("")
    const custom_prompt = ref("")
    const errors_folder = ref(false)
    const errors_prompt = ref(false)

    const chooseFile = async () => {
        const filePath = await open({
            multiple: false,
            directory: true,
        })

        if (typeof filePath === 'string') {
            console.log(filePath)
            selectedFile.value = filePath
        }
    }

    function formSubmit(){
        errors_folder.value = selectedFile.value == ""
        errors_prompt.value = prompt_option.value == "custom" ? custom_prompt.value == "" : false

        if(prompt_option.value != "custom") custom_prompt.value = ""

        if(!errors_folder.value && !errors_prompt.value)
            startSearch(selectedFile.value, custom_prompt.value);
    }

</script>

<template>
    <div class="w-[300px] float-left h-[calc(100vh-30px)] bg-fourth shadow-[inset_0_5px_5px_-5px_rgba(0,0,0,0.2)] border-l border-accent overflow-y-auto">
        <div class="text-[10px] text-tcolor ml-2 mt-2">Root folder</div>
        <input :value="selectedFile" placeholder="Choose entry folder" class="text-[12px] w-[calc(100%-48px)] bg-primary text-tcolor rounded border border-accent p-[5px] ml-2 mt-[2px] hover:bg-secondary hover:cursor-pointer"/>
        <img @click="chooseFile()" class="float-right mt-[4px] p-1 mr-3 z-0 relative w-[25px] hover:bg-primary rounded hover:cursor-pointer" :src="folder">
        <div v-if="errors_folder" class="text-[10px] text-[#ee2222] ml-2 mt-[3px]">Choose the search folder!</div>

        <div class="text-[10px] text-tcolor ml-2 mt-2">Mask</div>
        <select class="pl-0 text-[12px] w-[calc(100%-18px)] bg-primary text-tcolor rounded border border-accent p-[5px] ml-2 mt-[2px] hover:bg-secondary hover:cursor-pointer">
            <option>None</option>
        </select>

        <div class="text-[10px] text-tcolor ml-2 mt-2">Prompt type</div>
        <select v-model="prompt_option" class="pl-0 text-[12px] w-[calc(100%-18px)] bg-primary text-tcolor rounded border border-accent p-[5px] ml-2 mt-[2px] hover:bg-secondary hover:cursor-pointer">
            <option value="code">Source code</option>
            <option value="custom">Custom prompt</option>
        </select>

        <div v-if='prompt_option=="custom"' class="text-[10px] text-tcolor ml-2 mt-2">Prompt</div>
        <textarea v-if='prompt_option=="custom"' v-model="custom_prompt" placeholder="Write custom prompt here..." class="flex text-[12px] w-[calc(100%-18px)] bg-primary text-tcolor rounded border border-accent p-[5px] ml-2 mt-[2px] mb-0 hover:bg-secondary hover:cursor-pointer"></textarea>
        <div v-if='prompt_option=="custom" && errors_prompt' class="text-[10px] text-[#ee2222] ml-2 mt-[0px]">Write the custom prompt or select different prompt type!</div>
        <div @click="formSubmit()" class="float-left w-[90px] h-[25px] bg-primary border border-accent rounded ml-[8px] mb-4 mt-[12px] text-tcolor text-center text-[12px] leading-[23px] hover:cursor-pointer hover:bg-secondary">
            Start
        </div>
        
    </div>
</template>