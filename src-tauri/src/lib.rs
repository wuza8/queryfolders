use std::fs;

use serde::Serialize;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FileNode {
    name: String,
    path: String,
    file_type: String,
}

#[tauri::command]
fn read_directory_tree(path: String) -> Result<Vec<FileNode>, String> {
    let mut result = Vec::new();
    let entries = fs::read_dir(&path).map_err(|e| e.to_string())?;

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let path_buf = entry.path();
        let name = entry.file_name().into_string().unwrap_or_default();
        let path_str = path_buf.to_string_lossy().to_string();

        if path_buf.is_dir() {
            result.push(FileNode {
                name,
                path: path_str,
                file_type: "directory".into(),
            });
        } else {
            result.push(FileNode {
                name,
                path: path_str,
                file_type: "file".into(),
            });
        }
    }

    Ok(result)
}

#[tauri::command]
async fn check_if_project(prompt: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let res = client.post("http://192.168.1.210:1234/v1/chat/completions")
        .json(&serde_json::json!({
            "messages": [{ "role": "system", "content": prompt }],
            "max_tokens": 1
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let body = res.text().await.map_err(|e| e.to_string())?;
    Ok(body)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![read_directory_tree,check_if_project])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
