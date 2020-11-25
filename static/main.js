function filterList(values, typ, itemSelector) {
	// Hide all items.
	document.querySelectorAll(itemSelector).forEach(e => {
		e.style.display = "none";
	});

	if (values.length === 0) {
		return;
	}

	// List of attribute selector queries for each value. eg:
	// #items li[data-language*=malayalam|], #items li[data-language*=kannada|] ...
	const q = values.map(v => `${itemSelector}[data-${typ}*='${v}|']`);

	// Show the matched items.
	document.querySelectorAll(q.join(", ")).forEach(e => {
		e.style.display = "block";
	});
}

function onFilterClick(typ, checkboxTyp) {
	const sel = Array.from(document.querySelectorAll(`.filter-${checkboxTyp}:checked`)).map(e => e.value);
	filterList(sel, typ, "#items .item");
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


	// Filter display toggle.
	document.querySelector("#toggle-filters").onclick = (e) => {
		e.preventDefault();

		const f = document.querySelector("#filters");
		f.style.display = f.style.display === "block" ? "none" : "block";
	};

	// Toggle filter checkbox selections.
	document.querySelectorAll(".toggle-filters").forEach(el => {
		el.onclick = (e) => {
			e.preventDefault();

			const typ = e.target.dataset.target;
			let selector = "";

			if (typ === "language") {
				selector = ".filter-language";
			} else if(typ === "tag") {
				selector = ".filter-tag";
			}

			// Value of the data-target attribute is the class to target.
			document.querySelectorAll(selector).forEach(chk => {
				chk.checked = e.target.dataset.state === "on" ? false : true;
			});

			e.target.dataset.state = e.target.dataset.state === "on" ? "off" : "on";

			// Trigger the filter.
			if (typ === "language") {
				onFilterClick("languages", "language");
			} else if (typ === "tag") {
				onFilterClick("tags", "tag");
			}
		};
	});


	// Language filter.
	document.querySelectorAll(".filter-language").forEach(el => {
		el.onchange = () => {
			onFilterClick("languages", "language");
		};
	});

	// Tags filter.
	document.querySelectorAll(".filter-tag").forEach(el => {
		el.onchange = () => {
			onFilterClick("tags", "tag");
		};
	});

	// 'View all' link on 5+ languages.
	document.querySelectorAll(".reveal").forEach(el => {
		el.onclick = (e) => {
			e.preventDefault();

			if (e.target.parentNode.classList.contains("visible")) {
				e.target.parentNode.classList.remove("visible");
			} else {
				e.target.parentNode.classList.add("visible");
			}
		};
	});

})();
