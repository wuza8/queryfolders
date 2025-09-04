<div align="center">
    <img src="images/queryfolders-logo.png" alt="Logo" width="200" style="text-align:center"/><br>
    A desktop app that helps finding specific folder types using LLM prompt engineering
</div>

## Overview
At this moment none other option except LM Studio as provider is implemented, if you want least resistance, run LM Studio with only one model loaded (tested on Phi 3.5) and default port on localhost. 


## Running

This project is in development, to run it as dev, use:

```bash
    pnpm install
    pnpm tauri dev
```

WARNING! It requires rust nighly and node.js.

## Backlog
 - implementation of LLM multi-providers using LangChain
 - test-set for standarized prompts
 - prompt-refinement for custom queries
 - first downloadable release

