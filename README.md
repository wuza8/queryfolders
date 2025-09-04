<div align="center">
    <img src="images/queryfolders-logo.png" alt="Logo" width="300" style="text-align:center"/><br>
    A desktop app that helps finding specific folder types using the power of AI
</div>

## Overview :book:
The main function this program does, is reading the structures of files on your local PC and prompt engineer single folders asking:

<div align="center">
   <h3>Is this folder an X? Does this folder contain a X? </h3> 
</div> 
<br>
That gives the user an intelligent search engine for messy folders such as <b>Downloads</b> or <b>Documents</b>. It gets bad especially in an age, where you measure storage in terabytes :chart_with_upwards_trend:

## Demo :desktop_computer:
Below you can see a sample video how the program works:

## Launching on your machine :rocket: 

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

