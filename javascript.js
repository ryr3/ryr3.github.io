var i=1;
function type() {
    var name = "Yashhwanth Ram";
    var shown=name.slice(0,i++);
    document.getElementById('title').innerHTML=shown;
    if (shown==name)
        return;
    setTimeout(type, 300);
};
type();
