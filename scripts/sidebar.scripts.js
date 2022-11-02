/**
 * Initializes the sidebar,
 */
async function initSidebar() {
	buildList()
}

/**
 * Toggles the sidebar class.
 * Class visible sets top to 0.
 */
function toggleSidebar() {
	const sidebar = document.getElementById('sidebar')
	sidebar.classList.toggle('visible')
	const sidebarButton = document.getElementById('sidebar-button')
	sidebarButton.innerText = sidebar.classList.contains('visible') ? 'Lijst verbergen' : 'Lijst weergeven'
}

function closeSidebar() {
	const sidebar = document.getElementById('sidebar')
	sidebar.classList.remove('visible')
	const sidebarButton = document.getElementById('sidebar-button')
	sidebarButton.innerText = 'Lijst weergeven'
}

/**
 * Builds HTML for the list
 * Adds items
 */
function buildList() {
	if (!items) return
	const itemCountElement = document.getElementById('item-count')
	itemCountElement.innerText = `${items.length} Smart Zones`
	const listElement = document.getElementById('zone-list')
	items.forEach((item) => {
		const li = document.createElement('li')
		li.id = `smart-zone-${item.smartzoneId}`
		const html = `
			<h3>${item.name}</h3>
			<p>Adres: ${item.location}, ${item.town}</p>
			<p>Grootte: ${item.size}</p>
			<p>Beschikbaar: Ja</p>
		`
		li.insertAdjacentHTML('beforeend', html)
		li.onclick = function () { toggleItem(item) }
		listElement.appendChild(li)
	})
}

function toggleItem(item) {
	const li = document.getElementById(`smart-zone-${item.smartzoneId}`)
	if (li.classList.contains('highlight')) unselectItem(item)
	else selectItem(item)
}

function selectItem(item) {
	const ul = document.getElementById('zone-list')
	const ulItems = Array.from(ul.getElementsByTagName('li'))
	ulItems.forEach((ulItem) => ulItem.classList.remove('highlight'))
	const li = document.getElementById(`smart-zone-${item.smartzoneId}`)
	li.classList.add('highlight')
	closeSidebar()
	zoomInOnSelectedItem(item)
}

function unselectItem(item) {
	const li = document.getElementById(`smart-zone-${item.smartzoneId}`)
	li.classList.remove('highlight')
	initMap()
}