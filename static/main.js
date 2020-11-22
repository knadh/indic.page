function filterList (values, typ, itemSelector) {
	// List of attribute selector queries for each value. eg:
	// #items li[data-language*=malayalam|], #items li[data-language*=kannada|] ...
	const q = values.map(v => `${itemSelector}[data-${typ}*='${v}|']`);

	// Hide all items.
	document.querySelectorAll(itemSelector).forEach(e => {
		e.style.display = "none";
	});

	// Show the matched items.
	console.log(q.join(", "));
	document.querySelectorAll(q.join(", ")).forEach(e => {
		e.style.display = "block";
	});
}

const reClean = new RegExp(/[^a-z0-9\s]+/g);
const reSpaces = new RegExp(/\s+/g);
function tokenize(str) {
	return str.toLowerCase().replace(reClean, "").replace(reSpaces, " ").split(" ").filter((c) => c !== "");
}

// UI hooks.
(function() {
	// Mobile burger menu.
	document.querySelector("#burger").onclick = (e) => {
		e.preventDefault();

		const f = document.querySelector("#sidebar");
		f.style.display = f.style.display === "block" ? "none" : "block";
	};


	// Text search.
	let isSearching = false;
	document.querySelector("#search").oninput = function(e) {
		if (isSearching) {
			return true;
		}

		isSearching = true;
		window.setTimeout(() => {
			isSearching = false;
		}, 100);

		if (e.target.value.length < 3) {
			document.querySelectorAll("#items .item").forEach(e => e.style.display = 'block')
			return;
		}
		const search = tokenize(e.target.value);

		document.querySelectorAll("#items .item").forEach(e => {
			// Tokenize the text title and description of all the items.
			let txt = tokenize(e.querySelector(".title").innerText + " " + e.querySelector(".description").innerText);

			// Search input against the item tokens. Every token in the search input should match.
			let has = 0;
			for (let i = 0; i < search.length; i++) {
				for (let j = 0; j < txt.length; j++) {
					if (txt[j].indexOf(search[i]) > -1) {
						has++;
						break;
					}
				}
			}

			e.style.display = has === search.length ? "block" : "none";
		});
	};


	// Filter toggle link.
	document.querySelector("#toggle-filters").onclick = (e) => {
		e.preventDefault();

		const f = document.querySelector("#filters");
		f.style.display = f.style.display === "block" ? "none" : "block";
	};


	// Language filter.
	document.querySelectorAll(".filter-language").forEach(el => {
		el.onchange = () => {
			// Get the list of all selected languages.
			const langs = Array.from(document.querySelectorAll(".filter-language:checked")).map(e => e.value);
			filterList(langs, "languages", "#items .item");
		};
	});


	// Tags filter.
	document.querySelectorAll(".filter-tag").forEach(el => {
		el.onchange = () => {
			// Get the list of all selected tags.
			const langs = Array.from(document.querySelectorAll(".filter-tag:checked")).map(e => e.value);
			filterList(langs, "tags", "#items .item");
		};
	});
})();
