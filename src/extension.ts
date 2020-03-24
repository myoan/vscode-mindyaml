import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-mindyaml" is now active!');
	let panel: vscode.WebviewPanel;
	let editor: vscode.TextEditor;

	context.subscriptions.push(
		vscode.commands.registerCommand("mindyaml.show", () => {
			const panel = vscode.window.createWebviewPanel(
				"viewType",
				"title",
				vscode.ViewColumn.Beside,
				{
					localResourceRoots: [
						vscode.Uri.file(path.join(context.extensionPath, "assets"))
					],
					enableScripts: true
				}
			);
			panel.webview.html = getWebviewContent();
		})
	);
}

export function getWebviewContent() {
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
        <div id="app"></div>
        <p>hello world</p>
	</body>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
