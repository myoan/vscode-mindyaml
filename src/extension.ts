import * as path from 'path';
import * as vscode from 'vscode';

let wpanel: vscode.WebviewPanel;
let editor: vscode.TextEditor;

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-mindyaml" is now active!');

	vscode.window.onDidChangeActiveTextEditor(
		editor => {
			if (editor === undefined) {
				return;
			}
		
			if (editor) {
				editor = editor;
			}
			wpanel.webview.postMessage({
				command: "text",
				text: editor.document.getText()
			});
			vscode.window.showInformationMessage("post message to " + wpanel.title);
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
			panel.webview.html = getWebviewContent();

			panel.webview.onDidReceiveMessage(
				message => {
					vscode.window.showInformationMessage('receive message');
				},
				null);
			wpanel = panel;
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
		<p id="text">hello world</p>
		<script>
		const text = document.getElementById('text');

		// Handle the message inside the webview
		window.addEventListener('message', event => {
			const message = event.data; // The JSON data our extension sent
			switch (message.command) {
				case 'text':
					text.textContent = message.text;
					break;
			}
		});
		</script>
	</body>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
