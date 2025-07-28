# QueryFolders
A desktop program written in Vue and Typescript, to search through folder tree for finding exact types of folders, by using LLM's prompt engineering.

At this moment none other option except LM Studio as provider is implemented, if you want least resistance, run LM Studio with only one model loaded (tested on Phi 3.5) and default port on localhost. 

This project is in development, to run it as dev, use:

```bash
    pnpm install
    pnpm tauri dev
```

WARNING! It requires rust nighly and node.js.