export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export function isMobile(text) {
	return /^1[3-9]\d{9}$/.test(text)
}

export function isEmail(text) {
	return /^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/.test(text)
}

export function passwordRule(text) {
	return /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,}).{6,20}$/.test(text)
}
