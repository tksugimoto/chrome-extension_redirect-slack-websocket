
// 「windowオブジェクト・flashのメソッド」にアクセスする場合これが必要
((fn) => {
	const scriptElement = document.createElement('script');
	const script = fn.toString();
	scriptElement.appendChild(document.createTextNode(`(${script})()`));

	const parent = document.head || document.body || document.documentElement;
	parent.appendChild(scriptElement);
	parent.removeChild(scriptElement);
})(() => {
	(() => {
		class CustomizedWebSocket extends window.WebSocket {
			constructor(...args) {
				const url = new URL(args[0]);
				if (url.hostname === 'wss-primary.slack.com') {
					url.hostname = 'everything.lb.slack-msgs.com';
					args[0] = url.href;
				}
				super(...args);
			}
		}
		window.WebSocket = CustomizedWebSocket;
	})();
});
