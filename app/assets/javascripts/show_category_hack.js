
  function showCategory2(category) {
    if (category.length < 1)
      return;

    var pos = checkCtrl(__$("content"));

    if (__$("category")) {
        document.body.removeChild(__$("category"));
    }

    var cat = document.createElement("div");
    cat.id = "category";
    cat.style.position = "absolute";
    cat.style.right = "10px";
    cat.style.top = (pos[2] + 2) + "px";
    cat.style.fontSize = "26px";
    cat.style.padding = "10px";
    cat.style.backgroundColor = "#9e9";
    cat.style.borderColor = "#7c7";
    cat.style.color = "#000";
    cat.style.opacity = "0.95";
    cat.style.zIndex = 100;
    cat.style.textAlign = "center";
    cat.style.borderRadius = "30px";
    cat.innerHTML = category;

    document.body.appendChild(cat);
}


setTimeout(function () {showCategory2('')}, 500);

