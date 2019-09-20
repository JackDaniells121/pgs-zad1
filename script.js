var service_error = false;

var d = new Date();
var month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
var strDate = d.getDate() + "-" + month + "-" + d.getFullYear();
console.log(strDate);
$(".cur_date_label").append("<p>" + strDate + "</p>");

window.onload = function() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);

      //console.log(this.responseText);
      //console.log(obj[1].name);
      //console.log(obj[1].cams);

      getCamImages(obj, 1);
      getCamImages(obj, 4);
      getCamImages(obj, 3);

      service_error = false;
    }
    //if (this.status == 401)
    else {
      console.log("Sorry livecam service is currently unavaible");
      service_error = true;
      getCamImages(obj, 1);
      getCamImages(obj, 4);
      getCamImages(obj, 3);
    }
  };

  request.open("GET", "https://makevoid-skicams.p.mashape.com/cams.json", true);
  request.setRequestHeader(
    "X-Mashape-Key",
    "xSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw"
  );

  request.send();
};

function getCamImages(object, nr) {
  //(8) ["1", "2", "3", "4", "904", "905", "906", "929"]
  if (!service_error) {
    var camids = Object.keys(object[nr].cams);

    //console.log(Object.keys(object[1].cams[camids[0]]));
    $("#object_card" + nr).append("<h4>" + object[nr].name + "</h4>");

    for (i = 0; i < camids.length; i++) {
      // cam image url
      console.log(object[nr].cams[camids[i]].url);

      var imageid = "object" + nr + "cam" + i;
      var img = $('<img id="' + imageid + '" onerror="imgError(this);">');

      img.attr("src", object[nr].cams[camids[i]].url);
      img.attr("class", "card-img-top");

      img.appendTo("#object_card" + nr);
    }
  } else {
    $("#object_card" + nr).append(
      "<h4>" + "Sorry livecam service is currently unavaible" + "</h4>"
    );
  }
}

function imgError(image) {
  console.log(image.id);
  image.onerror = "";
  image.src = "/images/noimage.gif";
  image.remove();
  return true;
}
