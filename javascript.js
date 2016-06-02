var name = "Yashhwanth Ram",i=0;

function type() {
    var text = name.slice(0, ++i);


    document.getElementById('title').innerHTML = text;
    if (text==name)
        return;
    setTimeout(type, 100);
};
type();
