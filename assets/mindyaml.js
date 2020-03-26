const dbg = document.getElementById('debug');
const mindmap = document.getElementById('mindmap');

window.addEventListener('message', event => {
	const message = event.data;
	switch (message.command) {
		case 'mindmap':
			dbg.textContent = message.data;
			break;
	}
});