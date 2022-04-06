const wandA = { Description: "Wand of Yew, core of phoenix tail feather, 10 and three quarters inches", ImageUrl: "../img/1.png" }
const wandB = { Description: "Wand of Dogwood, core of dragon heart string, 12 inches", ImageUrl: "../img/2.png" }
const wandC = { Description: "Wand of Maple, core of unicorn hair, 9 and half inches", ImageUrl: "../img/.png" }
const wandD = { Description: "Wand of Mahogany, core of basilisk horn, 11 inches", ImageUrl: "../img/4.png" }

$("#choose-wand").click(function () {
  $("#wand-quiz").removeClass("hide");
});

$("#wand-quiz").submit(function (event) {
  event.preventDefault();
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;

  $("input:checked").each(function () {
    switch ($(this).val()) {
      case "a":
        a++;
        break;
      case "b":
        b++;
        break;
      case "c":
        c++;
        break;
      case "d":
        d++;
        break;
    }
  });
  let results = { a, b, c, d };
  const maxVal = Math.max(...Object.values(results));
  const key = Object.keys(results).find((key) => results[key] === maxVal);

  let wand = { Description: "", ImageUrl: " " }
  switch (key) {
    case "a":
      wand.Description = wandA.Description;
      wand.Url = wandA.ImageUrl;
      break;
    case "b":
      wand.Description = wandB.Description;
      wand.Url = wandB.ImageUrl;
      break;
    case "c":
      wand.Description = wandC.Description;
      wand.Url = wandC.ImageUrl;
      break;
    case "d":
      wand.Description = wandD.Description;
      wand.Url = wandD.ImageUrl;
      break;
  }

  // alert($("#studentId-hidden").val());
  $.ajax({
    type: "POST",
    url: "../../Students/BuyWand",
    data: { 'studentId': $("#studentId-hidden").val(), 'wand': wand.Description, 'wandURL': wand.ImageUrl },
    success: function (response) {
      alert(response)
      console.log("success");
      $("#wand-description").text(wand.Description);
      $("#wand-img-tag").attr("src", wand.ImageUrl);
      $("#show-wand").removeClass("hide");
      $("#wand-quiz").addClass("hide");
    },
    error: function () {
      alert(`Error while fetching patrons`);
    },
  });

});
