// queue.ts

export enum JobType{
    RetrieveTree, QueueDirectory
}

class Job{
    jobType : JobType = JobType.RetrieveTree
    directory : String = ""
    directoryDeepness : number = 1
}

// tablica jako storage kolejki
export var queue: Job[] = []

// pointer na początek kolejki
export let pointer = 0

// funkcja dodająca element do kolejki
export function addJob(item: Job) {
  queue.push(item)
}

// funkcja pobierająca element z kolejki (FIFO)
export function takeJob(): Job | undefined {
  if (pointer >= queue.length) return undefined
  const item = queue[pointer]
  pointer++
  return item
}

// funkcja sprawdzająca, czy kolejka jest pusta
export function areJobsEmpty(): boolean {
  return pointer >= queue.length
}

export function clearJobs() {
    queue = []
    pointer = 0
}