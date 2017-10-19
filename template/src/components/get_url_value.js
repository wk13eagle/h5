function getUrlValue(key) {
	const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")

	let search = window.location.search

	search = search.substring(1)

	const r = search.match(reg)

	if (r !== null) {
		return decodeURIComponent(r[2]);
	}

	return null;
}

export { getUrlValue as default }
