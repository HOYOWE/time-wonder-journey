new CozeWebSDK.WebChatClient({
	config: {
		type: 'bot',
		bot_id: '7554327149734920207',
		isIframe: false,
	},

	auth: {
		type: 'token',
		token: 'pat_3jMHPKLksXOfr95Bwq31XzEgUJswgyxFN4b88aAtuFn0BKN0hXbOCnLWBkeNOeDK',
		onRefreshToken: async () => 'token'
	},

	userInfo: {
		id: 'user',
		url: 'img/logo.jpg',
		nickname: '旅客',
	},
	ui: {
		base: {
			icon: 'img/beijing.png',
			layout: 'pc',
			lang: 'zh-CN',
			zIndex: 1000
		},

		header: {
			isShow: true,
			isNeedClose: true,
		},

		asstBtn: {
			isNeed: true
		},

		footer: {
			isShow: true,
			expressionText: 'Powered by HOYOWE',
		},
		conversations: {
			isNeed: true,
		},

		chatBot: {
			title: '小旅智能助手',
			uploadable: true,
			width: 390,
			isNeedAudio: true,
			isNeedFunctionCallMessage: false,
			isNeedAddNewConversation: true,
			isNeedQuote: true
		},
	},
});


// 保存按钮位置的变量
let savedButtonPosition = {
	left: null,
	top: null
};

// 初始化拖拽功能
function initDragFunctionality() {
	document.addEventListener('mousedown', (e) => {
		if (e.target.closest('.ab1ac9d9bab12da47298')) {
			e.preventDefault();
			startDrag(e);
		}
	});

	// 尝试获取初始位置（如果存在）
	const dragButton = document.querySelector('.ab1ac9d9bab12da47298');
	if (dragButton) {
		// 检查是否有保存的位置
		if (savedButtonPosition.left !== null && savedButtonPosition.top !== null) {
			dragButton.style.left = savedButtonPosition.left + 'px';
			dragButton.style.top = savedButtonPosition.top + 'px';
		}
	}
}

// 拖拽功能实现
let isDragging = false;
let currentDragElement = null;
let offsetX, offsetY;

function startDrag(e) {
	isDragging = true;
	currentDragElement = e.target.closest('.ab1ac9d9bab12da47298');

	// 计算鼠标位置与元素位置的偏移量
	const rect = currentDragElement.getBoundingClientRect();
	offsetX = e.clientX - rect.left;
	offsetY = e.clientY - rect.top;

	// 改变光标样式
	currentDragElement.style.cursor = 'grabbing';

	// 添加全局事件监听
	document.addEventListener('mousemove', onDragMove);
	document.addEventListener('mouseup', endDrag);
}

function onDragMove(e) {
	if (!isDragging) return;

	// 计算新位置
	let x = e.clientX - offsetX;
	let y = e.clientY - offsetY;

	// 边界检测 - 确保按钮不会移出窗口可视区域
	const buttonWidth = currentDragElement.offsetWidth;
	const buttonHeight = currentDragElement.offsetHeight;

	// 左右边界检测
	if (x < 0) {
		x = 0;
	} else if (x > document.documentElement.clientWidth - buttonWidth) {
		x = document.documentElement.clientWidth - buttonWidth;
	}

	// 上下边界检测
	if (y < 0) {
		y = 0;
	} else if (y > document.documentElement.clientHeight - buttonHeight) {
		y = document.documentElement.clientHeight - buttonHeight;
	}

	// 应用新位置
	currentDragElement.style.left = x + 'px';
	currentDragElement.style.top = y + 'px';

	// 保存位置
	savedButtonPosition.left = x;
	savedButtonPosition.top = y;
}

function endDrag() {
	isDragging = false;
	if (currentDragElement) {
		currentDragElement.style.cursor = 'grab';
	}

	// 移除全局事件监听
	document.removeEventListener('mousemove', onDragMove);
	document.removeEventListener('mouseup', endDrag);
}

// 监听元素创建事件（使用MutationObserver）
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (mutation.addedNodes.length) {
			mutation.addedNodes.forEach((node) => {
				// 检查新添加的节点是否是我们关心的按钮
				if (node.nodeType === 1 && node.classList.contains('ab1ac9d9bab12da47298')) {

					// 创建指针元素
					const needle = document.createElement('img');
					needle.alt = "指针";
					needle.src = "img/needle.png";
					needle.className = "needle";
					node.appendChild(needle);
					let currentAngle = 0; // 记录当前指针角度
					function animateNeedle() {
						// 生成 -10° 到 10° 之间的随机角度增量（小幅度变化更细腻）
						const angleIncrement = Math.floor(Math.random() * 21) - 10;
						currentAngle += angleIncrement;
						// 应用旋转（CSS 过渡会自动让旋转平滑）
						needle.style.transform =
							`translate(-50%, -50%) rotate(${currentAngle}deg) scale(1.3)`;
						window.requestAnimationFrame(animateNeedle);
					}
					animateNeedle();

					// 应用保存的位置
					if (savedButtonPosition.left !== null && savedButtonPosition.top !==
						null) {
						node.style.left = savedButtonPosition.left + 'px';
						node.style.top = savedButtonPosition.top + 'px';
					}
					node.style.cursor = 'grab';
				}
			});
		}
	});
});

// 开始观察DOM变化
observer.observe(document.body, {
	childList: true,
	subtree: true
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initDragFunctionality);