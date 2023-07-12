function initTabs(headers, tabs) {
	const tabsHeader = document.querySelectorAll(headers),
		  tabsContent = document.querySelectorAll(tabs),
	      headerParent = tabsHeader[0].parentElement;

	function hideTabContent() {
		tabsContent.forEach((tab) => {
			tab.classList.add("hide");
			tab.classList.remove("show", "fade");
		});
		tabsHeader.forEach((header) => {
			header.classList.remove("tabheader__item_active");
		});
	}
	
	function showTabContent(i = 0) {
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");
		tabsHeader[i].classList.add("tabheader__item_active");
	}
	
	hideTabContent();
	showTabContent();
	headerParent.addEventListener("click", (event) => {
		const {target} = event;
		
		if (target && target.classList.contains("tabheader__item")) {
			tabsHeader.forEach((item, i) => {
				if (target === item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

export default initTabs;
