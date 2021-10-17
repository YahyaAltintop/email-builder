let lastImg;

let mutation = new MutationObserver(m => {
    if (m[0].target.childElementCount == 0) {
        $("#dvBody").append("<div>&nbsp;</div>")
    }
    let node = m[0].addedNodes?.[0];
    
    if (node?.firstChild?.nodeType == 1) {
        if (!node.firstChild.matches("img") && node.className == "imgParentDiv") {
            node.className = "";
        }
    }
})

$(document).ready(() => {

    mutation.observe(document.getElementById("dvBody"), {
        childList: true
    })

    $("#fontStylePopover").popover({
        placement: 'top',
        html: true,
        content: `
            <li class="list-group-item list-group-item-action">Arial</li>
            <li class="list-group-item list-group-item-action">Calibri</li>
            <li class="list-group-item list-group-item-action">Corbel</li>
            <li class="list-group-item list-group-item-action">Consolas</li>
            <li class="list-group-item list-group-item-action">Georgia</li>
            <li class="list-group-item list-group-item-action">Times New Roman</li>
        `,
        template: '<div class="popover border-0 fontStylePopover" role="tooltip"><div class="arrow"></div><div class="popover-body p-0"></div></div>'
    });

    $("#textAlignPopover").popover({
        placement: 'top',
        html: true,
        content: `
            <li class="list-group-item list-group-item-action"><span class="fa fa-align-left mr-1"></span> Left</li>
            <li class="list-group-item list-group-item-action"><span class="fa fa-align-center mr-1"></span> Center</li>
            <li class="list-group-item list-group-item-action"><span class="fa fa-align-right mr-1"></span> Right</li>
        `,
        template: '<div class="popover border-0" role="tooltip"><div class="arrow"></div><div class="popover-body p-0"></div></div>'
    });

    $("#textSizePopover").popover({
        placement: 'top',
        html: true,
        content: `
            <li class="list-group-item list-group-item-action" id="1">x-small</li>
            <li class="list-group-item list-group-item-action" id="2">small</li>
            <li class="list-group-item list-group-item-action" id="3">medium</li>
            <li class="list-group-item list-group-item-action" id="4">large</li>
            <li class="list-group-item list-group-item-action" id="5">x-large</li>
            <li class="list-group-item list-group-item-action" id="5">xx-large</li>
            <li class="list-group-item list-group-item-action" id="7">3x-large</li>
        `,
        template: '<div class="popover border-0" role="tooltip"><div class="arrow"></div><div class="popover-body p-0"></div></div>'
    });
})

$('#fontStylePopover').on("show.bs.popover", () => {

    $('#fontStylePopover').ready(() => {
        $(".list-group-item").on("click", function (e) {
            e.stopPropagation();
            document.execCommand("fontName", false, this.textContent);
        })

        document.onclick = () => {
            $("#fontStylePopover").popover("hide");
            document.onclick = null;
        };
    })

});

$("#textAlignPopover").on("show.bs.popover", () => {

    $('#textAlignPopover').ready(() => {

        document.onclick = (e) => {

            if (e.target.classList.contains("list-group-item")) {
                document.execCommand("justify" + e.target.textContent.trim())
            }

            $("#textAlignPopover").popover("hide");
            document.onclick = null;
        };
    })

})

$("#textSizePopover").on("show.bs.popover", () => {

    $('#textSizePopover').ready(() => {

        document.onclick = (e) => {

            if (e.target.classList.contains("list-group-item")) {
                document.execCommand("fontSize", false, e.target.id);
            }

            $("#textSizePopover").popover("hide");
            document.onclick = null;
        };
    })

})

function ImageClick(imgElement) {

    lastImg = imgElement;

    document.onclick = (e) => {

        if (e.target.matches("img")) {

            $("#btnRemovePhoto").removeClass("d-none");

            $("#btnRemovePhoto").on("click", function (e) {
                lastImg.parentElement.remove();
                $("#btnRemovePhoto").addClass("d-none");
            })

            document.onkeydown = function (e) {
                if (e.keyCode == 46 || e.keyCode == 8) {
                lastImg.parentElement.remove();
                $("#btnRemovePhoto").addClass("d-none");
                }
            }
        }
        else {
            $("#btnRemovePhoto").addClass("d-none");
            lastImg = null;
            document.onclick = null;
            document.onkeydown = null;
        }
    }

}

function AddLink() {

    const regex = /[-a-zA-Z0-9@@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@@:%_\+.~#?&//=]*)?/gi;

    if (regex.test($("#txtURL").val())) {

        $('#dvBody').append(`<div><a href=${$("#txtURL").val()} target="_blank">${$("#txtBaslik").val() || "link"}</a></div>`);

        $('#LinkModal').modal("hide");
    }
    else {
        $("#txtURL").css("border", "1px solid red");
    }
}

function ColorChange(target) {

    document.execCommand('foreColor', false, target.value);

    target.nextElementSibling.style.color = target.value;
}

function RemoveFormats() {

    $('#colorPalette').val('#000000').trigger("input");

    document.execCommand("removeFormat");
}

function ReviewTemplate(){

    $("#ReviewModalBody").html($("#dvBody").html());

    $("#ReviewTemplateModal").modal("show");
}

function ShowTemplateHTML(){

    $("#TemplateHTMLBody").text($("#dvBody").html());
    
    $("#TemplateHTMLModal").modal("show");
}

$('#LinkModal').on("hidden.bs.modal", () => $('#LinkModal input').val('').css("border", ""));
