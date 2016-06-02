var i=0;
function type() {
    var name = "Yashhwanth Ram";
    var shown=name.slice(0, ++i);
    document.getElementById('title').innerHTML=shown;
    if (shown==name)
        return;
    setTimeout(type, 100);
};
type();

function fadeIn(){
    document.getElementById("para").style.opacity+=0.1;
}