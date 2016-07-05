var message = message||{};

message.init = function (){
	mesbox=[]
	nowshow=""
	maxmes = 8
	com.get("message").innerHTML="欢迎来到纹特牌，这个区域为你显示场上的操作情况"
}

//   alert( sad);

message.mpush = function(mes,who){
	if (mesbox.length<8){mesbox.push(mes)}
	else {
		mesbox.shift();
		mesbox.push(mes)
	}
	nowshow=""
	var w
	if(who==1)w="  你"
	else w="  对方"
	
	for(var i =0 ;i<mesbox.length;i++){
  		nowshow+='<b>'+w+""+mesbox[i]+'<b><br>'
	}
	com.get("message").innerHTML=nowshow
}