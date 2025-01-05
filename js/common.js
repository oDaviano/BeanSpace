let _device = {};

const publish = (function () {
  const common = {
    init: function () {
      common.setCommon();
    },

    setCommon: function () {
      let currentPage = window.location.pathname; // 현재 페이지 경로
      let basePath = currentPage.includes("index.html")
        ? "pages/"
        : "../pages/"; // 경로 설정
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
          common.setAside();
        },
        error: function (xhr, textStatus, errorThrown) {
          if (window.console !== undefined) {
            console.log(errorThrown ? errorThrown : xhr.status);
          }
          return false;
        },
      });
    },
    setAside: function () {
			// 모바일 전체메뉴 오픈
				const $body = $("body");
				const $raside = $("aside#rightside");
				const $buttonMenu = $(".button-menu");
        console.log($buttonMenu);
				$buttonMenu.on("click", function () {
					$body.toggleClass("ovy-hidden");
          $raside.toggleClass("active");
					// $aside.toggleClass("active", $(this).hasClass("open-menu"));
				});
			
		},
  };
  return common;
})();

$(function () {
  publish.init();
});
