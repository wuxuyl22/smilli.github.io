var but = but||{};

but.init = function (){
	
}

//   alert( sad);

but.creatCardButton = function(x){
	but.removeCardButton();
	var mydiv=document.getElementById("bnCard");	
	for(i=1;i<5;i++){	
	var getBtId="cardBn"+i
	
		 var input =document.createElement("input");
	  	 input.type="button";
 	 	 input.id=getBtId;
 	 	 	switch (i){
		 		case 1:	input.value="登场";break
				case 2:	input.value="替身";break
		 		case 3:	input.value="使用";break
		 		case 4:	input.value="暂无";break
		 
			 }
	//||!play.comSumon
		 if ((com.hands[x].lv>play.lvCan||com.hands[x].grain=="行")&&i==1){input.disabled=true;}
		  if ((com.hands[x].lv>=play.lvCount<=play.lvCan)&&i==2){input.disabled=true;}
		  if ((com.hands[x].grain!="行"&&i==3)&&(com.hands[x].key!=8)){input.disabled=true;}
		 if (i==4)input.disabled=true;
		 
		 
			mydiv.appendChild(input) 
			
		
	}
}

but.removeCardButton = function(){
	var mydiv=document.getElementById("bnCard");
	for(i=1;i<5;i++){	
	var getBtId="cardBn"+i
	var getIss=document.getElementById(getBtId);
		if(getIss != null){
		
		mydiv.removeChild(getIss)
		}
	}
}