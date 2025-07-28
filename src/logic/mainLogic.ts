import { invoke } from "@tauri-apps/api/core";
import { addJob, JobType, takeJob } from "./jobQueue";
import { ref } from "vue";

export class Folder{
    public name: String = ""
    public status: String = ""
    public path: String = ""
    public opened: boolean = false
    public subfolders: any[] = []
}

export class FileNode {
    public name: String = ""
    public path: String = ""
    public fileType: String = ""
}

export var folderScheme = ref({name: "root", opened: true, path: "", status:"",subfolders: []} as Folder)

export var started = ref(false)
export var running = ref(false)
//TODO: 
export var prompt_option = ref("code")

export var searchPath = String("")

export var api_url = "http://localhost:1234/v1/chat/completions"

export var right_side_status_string = ref("Waiting")

export var custom_prompt = String("")

var queried_folders = 0

async function queryLLM(folderPath: String, fileContents: Folder[]) : Promise<boolean> {
    let prompt = "Folder contents of "+folderPath+ ":\n"

    fileContents.forEach((node)=> {
        prompt += node.name + "\n"
    })
    if (prompt_option.value == "code"){
        prompt += "\nDoes this folder contains source code of some application/library? Answer only with one word: YES or NO. Don't add any comment or antything else."
    }
    else{
        prompt += "\n" + custom_prompt + "? Answer only with one word: YES or NO. Don't add any comment or antything else."
    }

    const response = await invoke('check_if_project', { prompt }) as string;

    try{
        const result = JSON.parse(response).choices[0].message.content
        return result == "YES";
    } catch(e){}

    return false;
}

function findFolder(folderPath: String) {
    console.log("Opening folder:", folderPath);

    if(folderPath == "" || folderPath == "\\")
        return folderScheme.value

    // Here you can implement the logic to open the folder, e.g., navigate to it or display its contents.
    const path_split = folderPath.split('\\');
    var lastPath = folderScheme.value.subfolders.find(f => f.name === path_split[0]) as Folder;
    if (!lastPath) {
        console.error("Folder not found in the current path:", path_split[0]);
        return; // Exit if the first part of the path is not found
    }

    for(let i = 1; i < path_split.length; i++) {
        const path = path_split[i];
        const folder = lastPath.subfolders.find(f => f.name === path);
        if (folder) {
            lastPath = folder;
        } else {
            console.error("Folder not found in the current path:", path);
            return; // Exit if any part of the path is not found
        }
    }
    
    return lastPath;
}

export function openFolder(folderPath: String){
    let lastPath = findFolder(folderPath.slice(searchPath.length + 1));

    if (lastPath) {
        if(lastPath.subfolders.length != 0)
            lastPath.opened = !lastPath.opened; // Toggle the opened state of the folder
    } else {
        console.error("Folder not found:", folderPath);
    }
}

export async function startSearch(path : String, customPrompt : String){
    folderScheme = ref({name: "root", opened: true, path: "", status:"",subfolders: []} as Folder)
    started.value = true
    running.value = true
    queried_folders = 0
    custom_prompt = String(customPrompt)
    searchPath = String(path)

    right_side_status_string.value = "Loading tree..."

    addJob({jobType: JobType.RetrieveTree, directory: path, directoryDeepness: 1})
    runNextJob();
}

function jobsDone(){
    running.value = false
    right_side_status_string.value = "Done. Checked "+queried_folders+" folders."
}

async function runNextJob(){
    let job = takeJob()

    if( job == undefined){
        jobsDone()
        return
    }

    if (job.jobType == JobType.QueueDirectory){
        await queueDirectoryJob(job.directory)
    } 
    else if(job.jobType == JobType.RetrieveTree){
        await retrieveTreeJob(job.directory, job.directoryDeepness)
    }

    runNextJob()
}

async function queueDirectoryJob(path: String){
    console.log("Queue directory: "+ path)

    let relativePath = path.slice(searchPath.length+1)
    let folderNode = findFolder(relativePath)

    if(folderNode == undefined)
        return;

    let result = await queryLLM(path, folderNode.subfolders).valueOf();

    folderNode.status = result ? "Positive" : "Negative"

    queried_folders += 1
    right_side_status_string.value = "Queried "+ queried_folders + " folders"
}

async function retrieveTreeJob(path: String, lastDeepness: number){
    try{
        let tree = await getTree(path);
        let relativePath = path.slice(searchPath.length+1)
        let folderNode = findFolder(relativePath)
        let deepness = lastDeepness + 1;

        if(folderNode == undefined)
            return;

        tree.forEach((node)=>{
            folderNode.subfolders.push({name: node.name, opened: false, path: node.path, status: node.fileType == "directory" ? "Not checked" : "File", subfolders: []})

            if(node.fileType == "directory" && deepness <= 2)
                addJob({directory: node.path, directoryDeepness: deepness, jobType: JobType.RetrieveTree})
        });

        addJob({directory: path, directoryDeepness: lastDeepness, jobType: JobType.QueueDirectory})
    }
    catch(ex){
        console.log(ex)
    }
}

async function getTree(path: String){
    console.log(path)
    let tree = await invoke('read_directory_tree', { path }) as FileNode[];
    return tree;
}