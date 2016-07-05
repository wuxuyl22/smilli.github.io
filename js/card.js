var Card = { 
createNew: function (key){ 
var card = {}; 
//alert(key)
	var o=com.args[key]
	card.key = key ;				//编号，对应卡的数据的唯一编号
	card.my = 1; 	
	card.grain=o.grain;				//所属
	
	card.name=o.name;				//名字
	card.pre=o.pre?o.pre+"·":" "	//前缀
	if(card.grain!="行")
	{
	card.lv=o.lv;
	card.atk = o.atk;
	card.move=o.move;	
		
		}
	
	card.spe=o.spe?o.spe:"无";
	card.text = o.text;
	
	
	card.isShow = true;
	card.alpha = 1;
	card.ps = []; //着点
	card.dormancy=false
	card.sdec=skill.skills[key]?skill.skills[key].dec:"无技能"
	card.skt=skill.skills[key]?skill.skills[key].timing:""
	card.udec=unique.uniques[key]?unique.uniques[key].dec:"无必杀"
	card.cost=unique.uniques[key]?"消耗 "+unique.uniques[key].cost:""
	card.tip=o.tip?o.tip:" "
	 
	/*card.direc=function(){
	if(card.my==1)	
	return o.direc	
	if(card.my==2){
		var d=[]
		for(var i=0;i<o.direc.length;i++){
			d.push(10-Number(o.direc[i]))
		}
		return d
		}	
	}*/
	
	
	
return card
}
} 

var CardHand = { 
 
createNew: function (key,hid){ 
	var cardh = Card.createNew(key); 
	cardh.hid=hid
	cardh.order=0
	
	cardh.show = function (){	
		if (cardh.isShow) {
			com.ct.save();
			com.ct.globalAlpha = cardh.alpha;
			
			if(cardh.order<6)
			com.ct.drawImage(com[key].img,4+cardh.order*60, 560);
			if(cardh.order>=6){	
			com.ct.drawImage(com[key].img,4+(cardh.order-6)*60, 655);
			}
			com.ct.restore(); 
			
			}
		
	}	
	cardh.skillef=function(timing,obj){
		
		var sk=skill.skills[key]
		if (typeof(sk.dec)!= 'undefined'){
		if(sk.timing!=timing)return
		sk.eff(cardh.my,cardh.bid,obj);
		}
		else return
		
	}	
	
	return cardh
	}
}

var CardBattle = { 
createNew: function (key,x,y,bid){ 
	var cardb = Card.createNew(key); 
	cardb.bid=bid
	cardb.damege=0
	cardb.blv=0
	cardb.counter=0   //反击状态
	cardb.invincible=0//无敌状态
	cardb.mabi=0//麻痹状态
	
	cardb.exas=false  //强力援护
	
	cardb.noAs = 0	
	cardb.asatk=0
	cardb.exatk=0
	cardb.asdamege=0
	
	//cardb.fatk=cardb.atk
	cardb.x = x||0;   
    cardb.y = y||0;
	cardb.show = function (){
		//alert(cardb.key+""+cardb.isShow);		
		if (cardb.isShow) {	
			com.ct.save();
			
			if(cardb.dormancy){
				
				var xpos = com.spaceX * cardb.x + com.pointStartX+com[cardb.key].img.width/2
     	 		var ypos =com.spaceY *  cardb.y +com.pointStartY+com[cardb.key].img.height/2  
				com.ct.translate(xpos, ypos);			 
    		  	com.ct.rotate(90 * Math.PI / 180);
    	 		com.ct.translate(-xpos, -ypos);									
			}
			com.ct.globalAlpha = cardb.alpha;
					
			com.ct.drawImage(com[cardb.key].img,com.spaceX * cardb.x + com.pointStartX , com.spaceY *  cardb.y +com.pointStartY);
	
			if(cardb.my==1)com.ct.drawImage(com.BlightImg,com.spaceX * cardb.x + com.pointStartX , com.spaceY *  cardb.y +com.pointStartY);		
			if(cardb.my==2)com.ct.drawImage(com.RlightImg,com.spaceX * cardb.x + com.pointStartX , com.spaceY *  cardb.y +com.pointStartY);	
				
			com.ct.restore(); 
			com.ct.strokeStyle = '#D8F1C8';
			com.ct.font = '20px arial';
			com.ct.font ='20px Times New Roman'
			
			//cardb.fatk= cardb.atk+cardb.batk+cardb.asatk
       		com.ct.strokeText(cardb.fatk(), com.spaceX * cardb.x + com.pointStartX+22, com.spaceY *  cardb.y +com.pointStartY+10);
        	com.ct.strokeText(cardb.flv()+"★", com.spaceX * cardb.x + com.pointStartX+22, com.spaceY *  cardb.y +com.pointStartY+100);
			if(cardb.invincible)com.ct.drawImage(com.invImg,com.spaceX * cardb.x + com.pointStartX+40 , com.spaceY *  cardb.y +com.pointStartY+70);
			com.ct.save();
		}
	}
	
	cardb.fatk=function(){
		cardb.atk=Math.max(0,cardb.atk)
	var fatk=cardb.atk+cardb.asatk+cardb.exatk-cardb.damege
		return fatk
	}
	
	cardb.flv=function(){
		cardb.lv=Math.max(0,cardb.lv)
		var flv=cardb.lv+cardb.blv
		return flv
	}	
	
	
	cardb.skillef=function(timing,obj){
		
		var sk=skill.skills[key]
		if (cardb.sdec!="无技能"){
		if(cardb.skt!=timing&&timing!="force")return
		sk.eff(cardb.my,cardb.bid,obj);
		}
		else return
		
	}	
	
	cardb.unief=function(x,y){
		
		var sk=unique.uniques[key]
		if (typeof(sk.dec)!= 'undefined'){
		
		sk.eff(cardb.my,cardb.bid,x,y);
		}
		else return
		
	}		
	
	cardb.bl = function (skey){
		var skey=skey || key
		var move=com.args[skey].move || cardb.move
		var map = map || play.map
	//	alert(com.args[skey].name)
		return com.bylaw[com.args[skey].bl](cardb.x,cardb.y,map,cardb.my,move)
	}
	return cardb
	}
}