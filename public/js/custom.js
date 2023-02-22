//script to create sticky header 
jQuery(function(){
    createSticky(jQuery("#sticky-wrap"));
});

function createSticky(sticky) {
    if (typeof sticky != "undefined") {

        var pos = sticky.offset().top ,
            win = jQuery(window);

        win.on("scroll", function() {

            if( win.scrollTop() > pos ) {
                sticky.addClass("stickyhead");
            } else {
                sticky.removeClass("stickyhead");
            }           
        });         
    }
}

$(function () {
    $(window).on('popstate', function () {
        //$('.modal').modal('hide');
        $(".modal-backdrop").remove();
        //$(".in").remove();
        body.style.overflow = "auto";
    });
});
const modal = document.querySelector("#transcription_modal");
        const body = document.querySelector("body");
        const showModal = function (e) {
            modal.classList.toggle("hidden");
            if (!modal.classList.contains("hidden")) {
                // Disable scroll
                body.style.overflow = "hidden";
            } else {
                // Enable scroll
                body.style.overflow = "auto";
            }
        };

