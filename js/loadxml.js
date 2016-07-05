var loadxml = loadxml||{};

loadxml.init = function (){
var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");

xmlDoc.async="false";
xmlDoc.load("myfile.xml");
root = xmlDoc.documentElement;
//nodes = xmlDoc.documentElement.childNodes;
alert( root.childNodes.item(0).text);

}

//   alert( sad);



