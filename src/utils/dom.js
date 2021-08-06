// 获取滚动的dom
export function getScrollContainer(el, vertical) {
	let parent = el;
	while (parent) {
		if ([window, document, document.documentElement].includes(parent)) {
			return window;
		}
		if (isScroll(parent, vertical)) {
			return parent;
		}
		parent = parent.parentNode;
	}
	return parent;
}
export function isScroll(el, vertical) {
	const determinedDirection = vertical !== null || vertical !== undefined;
	const overflow = determinedDirection ?
		vertical ?
		getComputedStyle(el)['overflow-y'] :
		getComputedStyle(el)['overflow-x'] :
		getComputedStyle(el)['overflow'];
	return overflow.match(/(scroll|auto)/);
}