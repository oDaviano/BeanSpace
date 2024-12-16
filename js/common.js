let _device = {};

const publish = (function () {
	const common = {
		init: function () {
			common.setCommon();
		},

	
		setCommon: function () {
			let currentPage = window.location.pathname; // 현재 페이지 경로
			let basePath = currentPage.includes("index.html") ? "pages/" : "../pages/"; // 경로 설정
			let url = basePath + "common.html"; // 최종 경로
			let selector = [".header-pc1", ".header-pc2", ".footer-pc"];
			let identifier = "load";
			$.ajax({
				type: "GET",
				url: url,
				dataType: "html",
				// async: false,
				cache: false,
				success: function (html, textStatus) {
					for (let i = 0; i < selector.length; i++) {
						let take = $(html).find(selector[i]).html();
						$(selector[i] + "." + identifier)
							.html(take)
							.removeClass(identifier);
					}
                    console.log("ajax loaded");
				},
				error: function (xhr, textStatus, errorThrown) {
					if (window.console !== undefined) {
						console.log(errorThrown ? errorThrown : xhr.status);
					}
					return false;
				},
			});
		},
	};
	return common;
})();

$(function () {
	publish.init();
});
