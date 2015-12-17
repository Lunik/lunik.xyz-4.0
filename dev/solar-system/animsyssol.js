function visibilite(thingId) {
    var targetElement;
    targetElement = document.getElementById(thingId);
    if (targetElement.style.display == "none") {
        targetElement.style.display = "";
    } else {
        targetElement.style.display = "none";
    }
}

function cg_class(thingId) {
    var targetElement;
    targetElement = document.getElementById(thingId);
    if (targetElement.className == "t") {
        targetElement.className = "f";
    } else {
        targetElement.className = "t";
    }
}

function zoomator(val) {
    var targetElement;
    targetElement = document.getElementById("systeme_solaire");
    if (val > 1 && val < 100) {
        targetElement.style.zoom = val + '%';
        document.getElementById("val_zoom").innerHTML = val + '%';
    }
}
$('#but_sun').hover(
    function() {
        $(".info_sys").css('display', 'none');
        $(".info_soleil").css('display', '');
    },
    function() {
        $(".info_sys").css('display', '');
        $(".info_soleil").css('display', 'none');
    }
);
$('#but_mercure').hover(
    function() {
        $("#mercure-orbit").css('border', '10px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_mercure").css('display', '');
    },
    function() {
        $("#mercure-orbit").css('border', '2px dotted white');
        $(".info_sys").css('display', '');
        $(".info_mercure").css('display', 'none');
    }
);
$('#but_venus').hover(
    function() {
        $("#venus-orbit").css('border', '10px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_venus").css('display', '');
    },
    function() {
        $("#venus-orbit").css('border', '2px dotted white');
        $(".info_sys").css('display', '');
        $(".info_venus").css('display', 'none');
    }
);
$('#but_earth').hover(
    function() {
        $("#earth-orbit").css('border', '10px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_earth").css('display', '');
    },
    function() {
        $("#earth-orbit").css('border', '2px dotted white');
        $(".info_sys").css('display', '');
        $(".info_earth").css('display', 'none');
    }
);
$('#but_lune').hover(
    function() {
        $("#lune-orbit").css('border', '10px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_lune").css('display', '');
    },
    function() {
        $("#lune-orbit").css('border', '2px dotted white');
        $(".info_sys").css('display', '');
        $(".info_lune").css('display', 'none');
    }
);
$('#but_mars').hover(
    function() {
        $("#mars-orbit").css('border', '10px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_mars").css('display', '');
    },
    function() {
        $("#mars-orbit").css('border', '2px dotted white');
        $(".info_sys").css('display', '');
        $(".info_mars").css('display', 'none');
    }
);
$('#but_jupiter').hover(
    function() {
        $("#jupiter-orbit").css('border', '20px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_jupiter").css('display', '');
    },
    function() {
        $("#jupiter-orbit").css('border', '2px dotted white');
        $(".info_sys").css('display', '');
        $(".info_jupiter").css('display', 'none');
    }
);
$('#but_saturne').hover(
    function() {
        $("#saturne-orbit").css('border', '20px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_saturne").css('display', '');
    },
    function() {
        $("#saturne-orbit").css('border', '2px dotted white');
        $(".info_sys").css('display', '');
        $(".info_saturne").css('display', 'none');
    }
);
$('#but_uranus').hover(
    function() {
        $("#uranus-orbit").css('border', '20px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_uranus").css('display', '');
    },
    function() {
        $("#uranus-orbit").css('border', '3px dotted white');
        $(".info_sys").css('display', '');
        $(".info_uranus").css('display', 'none');
    }
);
$('#but_neptune').hover(
    function() {
        $("#neptune-orbit").css('border', '20px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_neptune").css('display', '');
    },
    function() {
        $("#neptune-orbit").css('border', '4px dotted white');
        $(".info_sys").css('display', '');
        $(".info_neptune").css('display', 'none');
    }
);
$('#but_asteroid').hover(
    function() {
        $("#asteroid1").css('border', '80px solid white');
        $("#asteroid2").css('border', '40px solid white');
        $("#asteroid3").css('border', '70px solid white');
        $(".info_sys").css('display', 'none');
        $(".info_asteroide").css('display', '');
    },
    function() {
        $("#asteroid1").css('border', '80px dotted grey');
        $("#asteroid2").css('border', '40px dotted #1C1C1C');
        $("#asteroid3").css('border', '70px dotted #424242');
        $(".info_sys").css('display', '');
        $(".info_asteroide").css('display', 'none');
    }
);

$('#but_aide').hover(
    function() {
        $(".info_sys").css('display', 'none');
        $(".info_aide").css('display', '');
    },
    function() {
        $(".info_sys").css('display', '');
        $(".info_aide").css('display', 'none');
    }
);

$('#but_menu').hover(
    function() {
        $(".menu_arbo").css('display', '');
    },
    function() {
        $(".menu_arbo").css('display', 'none');
    }
);

$(".menu_arbo").hover(
    function() {
        $(".menu_arbo").css('display', '');
    },
    function() {
        $(".menu_arbo").css('display', 'none');
    }
);

$(function() {
    $("#drag").draggable();
});