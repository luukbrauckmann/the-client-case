window.addEventListener('load', (event) => init())

var items = null

/**
 * Initialize function
 * Runs when app loads.
 */
async function init() {
	await getItems()
	await initSidebar()
	initMap()
}

async function getItems() {
	return fetch('https://raw.githubusercontent.com/luukbrauckmann/coding-the-curbs/main/assets/smart-zones.json')
		.then((response) => response.json())
		.then((data) => items = data)
		.catch(() => undefined)
}


