import * as path from 'path';
import * as vscode from 'vscode';
import * as yaml from 'js-yaml';

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
				data: JSON.stringify(data)
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
			panel.webview.html = getWebviewContent(vscode.Uri.file(path.join(context.extensionPath, "assets", "mindyaml.js")).with({ scheme: "vscode-resource" }));
			wpanel = panel;
		})
	);
}

export function getWebviewContent(js: vscode.Uri) {
	console.log(js);
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
		<p id="debug">hoge</p>
		<svg id="mindmap"></svg>
		<script src="${js}"></script>
	</body>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
