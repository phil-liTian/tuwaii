import { upperFirst } from 'lodash';

export interface ViewportOffsetResult {
	/**
	 * 内容高度 + 计算后的bottom
	 */
	bottomIncludeBody: number;
}

// 去除空格
export const trim = (str: string) => {
	return str.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export const hasClass = (el: Element, className: string): boolean => {
	if (!el || !className) {
		return false;
	}
	if (className.indexOf(' ') !== -1) {
		throw new Error('className not allow contain space');
	}
	if (el.classList) {
		return el.classList.contains(className);
	} else {
		return el.className.indexOf(className) !== -1;
	}
};

export const addClass = (el: Element, cls: string) => {
	if (!el) {
		return;
	}
	let curClass = el.className;

	const classes = (cls || '').split(' ');

	for (let i = 0; i < classes.length; i++) {
		const clsName = classes[i];
		if (!clsName) {
			continue;
		}
		if (el.classList) {
			el.classList.add(clsName);
		} else if (!hasClass(el, clsName)) {
			curClass += ' ' + clsName;
		}
	}
	if (!el.classList) {
		el.className = curClass;
	}
};

export const removeClass = (el: Element, cls: string) => {
	if (!el) {
		return;
	}
	let curClass = el.className;
	const classes = cls.split(' ');

	for (let i = 0; i < classes.length; i++) {
		const className = classes[i];
		if (!className) {
			continue;
		}
		if (el.classList) {
			el.classList.remove(className);
		} else if (hasClass(el, className)) {
			curClass = curClass.replace(` ${className} `, ' ');
		}
	}

	if (!el.classList) {
		el.className = trim(curClass);
	}
};

export function getBoundingClientRect(element: Element) {
	return element.getBoundingClientRect();
}

/**
 *
 * @param element
 * @returns
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
	// 可见高度
	const clientHeight = window.document.documentElement.clientHeight;
	// 文档内容在浏览器窗口中可见部分的宽度，不包括滚动条、边框和工具栏等
	// const clientWidth = window.document.documentElement.clientWidth

	// const doc = document.documentElement
	// 表示页面在水平方向上已经滚动的像素数
	// const pageXOffset = window.pageXOffset
	// 表示页面在竖直方向上已经滚动的像素数
	const pageYOffset = window.pageYOffset;

	const box = getBoundingClientRect(element);

	const {
		// left: rectLeft,
		top: rectTop
		// width: rectWidth,
		// height: rectHeight,
	} = box;

	// 当前el 距离顶部偏移的高度
	const offsetTop = rectTop + pageYOffset;

	const top = offsetTop - 0;

	return {
		bottomIncludeBody: clientHeight - top
	};
}

export function on(
	element: HTMLElement | Window | Document | Element,
	event: string,
	handler
): void {
	if (element && event && handler) {
		element.addEventListener(event, handler, false);
	}
}

export function hackCss(attr: string, value: string) {
	const prefix: string[] = ['webkit', 'moz', 'ms'];
	const styleObj = {};
	prefix.map((item) => {
		styleObj[`${item}${upperFirst(attr)}`] = value;
	});

	return {
		...styleObj,
		[attr]: value
	};
}
