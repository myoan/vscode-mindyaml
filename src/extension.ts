import * as path from 'path';
import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import {Model} from './model';

let wpanel: vscode.WebviewPanel;
let editor: vscode.TextEditor;

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-mindyaml" is now active!');

	vscode.workspace.onDidChangeTextDocument(
		editor => {
			if (editor === undefined) {
				return;
			}
			if (editor.document.languageId !== "yaml") {
				return;
			}
			const data = yaml.safeLoad(editor.document.getText());
			wpanel.webview.postMessage({
				command: 'mindmap',
				data: JSON.stringify(new Model(data).export())
			});
		},
		null,
		context.subscriptions
	);

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
			const onDiskPath = vscode.Uri.file(
				path.join(context.extensionPath, "assets", "mindyaml.js")
			);
			const jsFile = panel.webview.asWebviewUri(onDiskPath);
			// vscode.window.showInformationMessage(jsFile);
			panel.webview.html = getWebviewContent(jsFile);
			wpanel = panel;
		})
	);
}

export function getWebviewContent(js: vscode.Uri) {
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
        <meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<style>
			.link {
			  fill: none;
			  stroke: #555;
			  stroke-opacity: 0.4;
			  stroke-width: 1.5px;
			}
		</style>
	</head>
	<body>
		<p id="debug"></p>
		<svg width="800" height="600"></svg>
		<script src="https://d3js.org/d3.v5.min.js"></script>
		<script src="${js}"></script>
	</body>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}