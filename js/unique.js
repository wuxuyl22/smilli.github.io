var unique = play||{};
var dropsumlv=0
var numofchoosing=0
var choosingCards=[]

unique.uniques=[]
	 unique.uniques[1]={
	 dec:"【恶魔低语】——选择场上一个敌方，让其在这个回合失去当前所有的援护战力" ,
	 type:[1,4,"f",2],
	 cost:40,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		var  obj=com.mans[play.map[y][x]]
			obj.noAs+=1
		
		 		 
	 }
}

	

	unique.uniques[2]={
	 dec:"【獠星狼牙】朝十字方向3格以内的某一目标点冲撞，将途径上的角色全部击飞向自己的起始点方向1格，并造成当前战力伤害" ,
	 type:[1,3,"t"],
	 cost:0,
	 eff:function(who,bid,x,y){com.mans[bid].dormancy=true	
		xx=com.mans[bid].x  //发动者的原坐标
		yy=com.mans[bid].y
		delete play.map[yy][xx] 
		for(var i=0;i<=Math.abs(xx-x);i++)	for(var j=0;j<=Math.abs(yy-y);j++)
		{
			
			if(xx<x)if(typeof(play.map[yy][xx+i])!='undefined'&&i!=0){
			
			var hitid=play.map[yy][xx+i]
			delete play.map[com.mans[hitid].y][com.mans[hitid].x];
			com.mans[hitid].x-=1;
			play.map[com.mans[hitid].y][com.mans[hitid].x]=hitid
			com.mans[hitid].damege+=com.mans[bid].fatk()
			}			
			
			if(xx>x)if(typeof(play.map[yy][xx-i])!='undefined'&&i!=0){		//左检索					
			var hitid=play.map[yy][xx-i]			
			delete play.map[com.mans[hitid].y][com.mans[hitid].x];
			com.mans[hitid].x+=1;
			play.map[com.mans[hitid].y][com.mans[hitid].x]=hitid
			com.mans[hitid].damege+=com.mans[bid].fatk()			
			}
			if(yy>y)if(typeof(play.map[yy-j][xx])!='undefined'&&j!=0){		//上检索						
			var hitid=play.map[yy-j][xx]			
			delete play.map[com.mans[hitid].y][com.mans[hitid].x];
			com.mans[hitid].y+=1;
			play.map[com.mans[hitid].y][com.mans[hitid].x]=hitid
			com.mans[hitid].damege+=com.mans[bid].fatk()			
			}
			if(yy<y)if(typeof(play.map[yy+j][xx])!='undefined'&&j!=0){		//下检索						
			var hitid=play.map[yy+j][xx]			
			delete play.map[com.mans[hitid].y][com.mans[hitid].x];
			com.mans[hitid].y-=1;
			play.map[com.mans[hitid].y][com.mans[hitid].x]=hitid
			com.mans[hitid].damege+=com.mans[bid].fatk()			
			}
					
		}
		
		
		com.mans[bid].x=x
		com.mans[bid].y=y
		play.map[y][x] = bid;
		
		com.mans[bid].dormancy = true;
		
		com.dot.dots = [];
		
			
		
		
		 
		
	}
	}

unique.uniques[3]={ 
	
	 dec:"【痕】——选择菱形2格以内的己方角色，自己和那个角色变成无敌状态持续到对方回合结束" ,
	 type:[1,2,"l",3],
	 cost:40,
	 eff:function(my,user,x,y){com.mans[user].dormancy=true
			 com.mans[play.map[y][x]].invincible+=2
			 com.mans[user].invincible+=2	
	 } 
	}

unique.uniques[5]={ 
	
	 dec:"十字方向距离2以内的第一个单体，造成380伤害" ,
	 type:[1,2,"c"],
	 cost:0,
	 eff:function(my,user,x,y){com.mans[bid].dormancy=true
			 com.mans[play.map[y][x]].damege+=380	
	 } 
	}
	
unique.uniques[6]={ 
	
	 dec:"【袭风斩】——菱形3格以内的第一个目标，造成500伤害" ,
	 type:[1,3,"l"],
	 cost:15,
	 eff:function(my,user,x,y){com.mans[bid].dormancy=true
	 		if(play.map[y][x]>=0)
			 com.mans[play.map[y][x]].damege+=500	
	 } 
	}	

unique.uniques[9]={
	 dec:"使用后所有手上的卡都返回卡组，并在卡组洗切之后抽出这个数量的卡并额外多抽1张" ,
	 type:[0],
	 cost:0,
	 eff:function(who,user){com.mans[user].dormancy=true
		 var numHand=com.handdd.length
		 for(var i=0;i<numHand;i++){
		var hid=com.handdd[0]
			play.drop(who,hid) 	
		var r = Math.random();   
	var index=  Math.round(r * play.deck.length)
		play.deck.splice(index, 0,com.hands[hid].key);		 
		}
		 for(var i=0;i<numHand+1;i++){
		var hid=com.handdd[i]
			play.dolo(who) 			 
		}	
	 }
	}
	
unique.uniques[12]={
	 dec:"【圆月】——对周围8方向的敌人造成额外600伤害" ,
	 type:[0],
	 cost:0,
	 eff:function(who,user){com.mans[user].dormancy=true
		 var x=com.mans[user].x
		 var y=com.mans[user].y
	 for(var i=x-1;i<x+2;i++)for(var j=y-1;j<y+2;j++){
		 	 if(i>=0&&j>=0&&i<3&&j<5)
			 if(typeof(play.map[j][i])!='undefined'&&(i!=x||j!=y))			 
			 if(com.mans[play.map[j][i]].my!=com.mans[user].my)
			 {
				 com.mans[play.map[j][i]].damege+=com.mans[user].fatk()+600	 	
			 }	
		
		}	
	
	 }
}

unique.uniques[13]={
	 dec:"【螺旋投掷】——向前方投掷长枪，对2格以内的第一个敌方造成400伤害并击退2格，如果目标被击退过程撞到边界或其他角色，那么目标和被撞到的对象再受到当前战力+800伤害。但那之后这个角色战力永久减少300" ,
	 type:[0],
	 cost:0,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 var hitY
		 bc=com.mans[user]
	if(who==1){
		 for(var i =bc.y-1;i>=0;i--){	
		 if(i>=bc.y-2)
		 if (play.map[i][bc.x]>=0&&com.mans[play.map[i][bc.x]].my!=bc.my){
			 com.mans[play.map[i][bc.x]].damege+=400
			 hitY=i
			 break
		 }
		 }
		
		for(var i =hitY-1;i>=-1;i--){
			
		 if(i>=hitY-1){
		 if(i==-1) {
		
		 com.mans[play.map[i+1][bc.x]].damege+=bc.fatk()+800
		  break
		 }
		 if (play.map[i][bc.x]>=0){
		 com.mans[play.map[i][bc.x]].damege+=bc.fatk()+800
		 com.mans[play.map[i+1][bc.x]].damege+=bc.fatk()+800
		  break
		 } 
	 	}}
			
		 com.mans[play.map[hitY][bc.x]].y-=1
		  play.map[hitY-1][bc.x]= play.map[hitY][bc.x]
		 delete play.map[hitY][bc.x]
			 		
		 }
		 
		  
else{	
 		for(var i =bc.y+1;i<=4;i++){	
		 if(i<=bc.y+2)
		 if (play.map[i][bc.x]>=0&&com.mans[play.map[i][bc.x]].my!=bc.my){
			 com.mans[play.map[i][bc.x]].damege+=400
			 hitY=i
			 break
		 }
		 }
		
		for(var i =hitY+1;i<=5;i++){
			
		 if(i<=hitY+1){
		 if(i==5) {
		
		 com.mans[play.map[i-1][bc.x]].damege+=bc.fatk()+800
		  break
		 }
		 if (play.map[i][bc.x]>=0){
			 
		 com.mans[play.map[i][bc.x]].damege+=bc.fatk()+800
		 com.mans[play.map[i-1][bc.x]].damege+=bc.fatk()+800
		  break
		 } 
	 }	}
	  com.mans[play.map[hitY][bc.x]].y+=1
	  	alert(play.map[hitY][bc.x])
		  play.map[hitY+1][bc.x]= play.map[hitY][bc.x]
		 delete play.map[hitY][bc.x]
}
	
	 bc.atk-=300
	 
	 }
}

unique.uniques[14]={
	 dec:"选择十字范围1格内的敌人造成一半的战力伤害,如果自己身后是空位且对方原战力不高出使用者400的话，将目标扔向身后。" ,
	 type:[1,1,"c"],
	 cost:0,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 var u= com.mans[user]
		 var o=play.map[y][x]
		 var ctr=true
		 if(ctr)
		 if(x>u.x&&u.x!=0&&!(play.map[u.y][u.x-1]>=0)&&u.atk- com.mans[play.map[y][x]].atk>=400){
			 
			 play.map[y][x-2]= play.map[y][x]
			  com.mans[play.map[y][x]].x-=2
			  o=play.map[y][x-2]
			 delete play.map[y][x]	
			 ctr=false		
		}	
		if(ctr)
		 if(x>u.x&&u.x!=2&&!(play.map[u.y][u.x+1]>=0)&&u.atk- com.mans[play.map[y][x]].atk>=400){
			 play.map[y][x+2]= play.map[y][x]
			  com.mans[play.map[y][x]].x+=2
			  o=play.map[y][x+2]
			 delete play.map[y][x]	
			 ctr=false		
		}
		if(ctr)	
		 if(y>u.y&&u.y!=0&&!(play.map[u.y-1][u.x]>=0)&&u.atk- com.mans[play.map[y][x]].atk>=400){
			 play.map[y-2][x]= play.map[y][x]
			  com.mans[play.map[y][x]].y-=2
			  o=play.map[y-2][x]
			 delete play.map[y][x]	
			 ctr=false		
		}
		if(ctr)	
		 if(y>u.y&&u.y!=0&&!(play.map[u.y+1][u.x]>=0)&&u.atk- com.mans[play.map[y][x]].atk>=400){
			 play.map[y+2][x]= play.map[y][x]
			  com.mans[play.map[y][x]].y+=2
			  o=play.map[y+2][x]
			 delete play.map[y][x]	
			 ctr=false		
		}	
		com.mans[o].damege+=0.5*u.fatk()
	 }
}

unique.uniques[15]={
	 dec:"使用后所有手上的卡都返回卡组，并在卡组洗切之后抽出这个数量的卡并额外多抽1张" ,
	 type:[0],
	 cost:0,
	 eff:function(who,user){com.mans[user].dormancy=true
		 var numHand=com.handdd.length
		 for(var i=0;i<numHand;i++){
		var hid=com.handdd[0]
			play.drop(who,hid) 	
		var r = Math.random();   
	var index=  Math.round(r * play.deck)
		play.deck.splice(index, 0,com.hands[hid].key);		 
		}
		 for(var i=0;i<numHand+1;i++){
		var hid=com.handdd[i]
			play.dolo(who) 			 
		}	
	 }
	}

unique.uniques[17]={
	 dec:"对一个已经进入休整状态的角色造成480伤害" ,
	 type:[1,1,"c"],
	 cost:0,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 if(com.mans[play.map[y][x]].dormancy)
		 com.mans[play.map[y][x]].damege+=480
	 }
}			

unique.uniques[18]={
	 dec:"【终末烬火】焚烧掉自己所有手卡，抽取随机一张炎纹技能卡，每焚烧掉2张手卡，就多额外抽一张。如果发动技能时，自己是场上唯一的角色卡，那么必杀气力+75,使用这个必杀不会让自己进入休整状态" ,
	 type:[0],
	 cost:25,
	 eff:function(who,user,x,y){
		 
		 var gdc=[]
		 var numHand=com.handdd.length
			 for(var i=1;i<=com.argsCount;i++){
				 if(typeof(com.args[i])!='undefined') {
					 if(com.args[i].grain=="行")
				 if(com.args[i].spe[0].split("lv")[0]=="炎纹"){
					 gdc.push(i) 
				 }
				 }
			 }		
			 test(gdc)	 		 
		  for(var i=0;i<numHand;i++){
			var hid=com.handdd[0]
			play.drop(who,hid) 	
		  }
		  for(var i=0;i<Math.floor(numHand/2);i++){
			var r = Math.random();   
			var index=  Math.round(r * (gdc.length-1))
			test("ind"+index)
			play.dolo(who,gdc[index],1)	
		  }
		  
	 }
}

unique.uniques[19]={ 
	
	 dec:"焚烧方形3格以内的1个角色，造成400/700/1000伤害，目标周围十字的角色也会受到一半的波及伤害" ,
	 type:[1,2,"f"],
	 cost:0,
	 eff:function(my,user,x,y){com.mans[bid].dormancy=true

		 if(play.map[y][x]>=0){
			 for(var i=0;i<com.mans[user].spe.length;i++)
			 {
				 var uspe=com.mans[user].spe[i].split("lv")
			 if(uspe[0]=="炎纹"){
			 com.mans[play.map[y][x]].damege+=100+300*uspe[1]
			if(y!=4) if(play.map[y+1][x]>=0)com.mans[play.map[y+1][x]].damege+=(100+300*uspe[1])*0.5
			 if(y!=0) if(play.map[y-1][x]>=0)com.mans[play.map[y-1][x]].damege+=(100+300*uspe[1])*0.5
			  if(x!=2)if(play.map[y][x+1]>=0)com.mans[play.map[y][x+1]].damege+=(100+300*uspe[1])*0.5
			 if(x!=0)if(play.map[y][x-1]>=0)com.mans[play.map[y][x-1]].damege+=(100+300*uspe[1])*0.5
			 
		 	}}
		 }
	 } 
	}
unique.uniques[20]={ 
	
	 dec:"对十字距离4以内的单体发射火球造成技能级×250伤害，并且自己战力永久增加100" ,
	 type:[1,4,"c"],
	 cost:0,
	 eff:function(my,user,x,y){com.mans[bid].dormancy=true

		 if(play.map[y][x]>=0){
			 for(var i=0;i<com.mans[user].spe.length;i++)
			 {
				 var uspe=com.mans[user].spe[i].split("lv")
			 if(uspe[0]=="炎纹"){
			 com.mans[play.map[y][x]].damege+=250*uspe[1]
			  com.mans[user].atk+=100
		
		 	}}
		 }
	 } 
	}

unique.uniques[21]={ 
	
	 dec:"选择全场1个目标，使其受到自身战力一半的伤害，这个伤害每多100那一方就增加 8 点必杀气力" ,	 
	 type:[1,2,"l"],
	 cost:0,
	 eff:function(my,user,x,y){com.mans[bid].dormancy=true

		 if(play.map[y][x]>=0){
			
			 com.mans[play.map[y][x]].damege+= com.mans[play.map[y][x]].atk*0.5
			 if( com.mans[play.map[y][x]].my==1)gauge+=8* Math.floor(com.mans[play.map[y][x]].damege/100) 			
			 if( com.mans[play.map[y][x]].my==2)opponentGauge+=8* Math.floor(com.mans[play.map[y][x]].damege/100) 
			 play.stepControl()
		
		 	
		 }
	 } 
	}		
	
unique.uniques[22]={ 
	
	 dec:"使用者星阶升2" ,
	 type:[0,2,"c"],
	 cost:0,
	 eff:function(my,user,x,y){com.mans[bid].dormancy=true
		 com.mans[user].lv+=2	 
	 } 
}

unique.uniques[23]={ 
	
	 dec:"若使用者星阶为3以下，从卡组随机抽到一张1星的角色卡；若为4以上，抽一张4星的卡" ,
	 type:[0,2,"c"],
	 cost:0,
	 eff:function(my,user,x,y){com.mans[bid].dormancy=true
		 var us=com.mans[user]
		 if(us.lv<=3){
			 for(var i=0;i<play.deck.length;i++){
				 if(com.args[play.deck[i]].lv==1){
					 play.dolo(my,play.deck[i])
					 break
				 }	 
			 }
		 }
		 else{
		 for(var i=0;i<play.deck.length;i++){
				 if(com.args[play.deck[i]].lv==4){
					 play.dolo(my,play.deck[i])
					 break
				 }}
		 }
	 } 
}	

unique.uniques[24]={ 
	
	 dec:"选择方形3格以内一个己方角色卡，使他尽可能地后退到空区域上" ,
	 type:[1,4,"f"],
	 cost:0,
	 eff:function(my,user,x,y){com.mans[bid].dormancy=true
		 if (!(play.map[y][x]>=0)) return
		 var obj=com.mans[play.map[y][x]]
		 test(obj.my)
		 if (obj.my!=my) return
		 if(play.my==1){
			 for(var i =4;i>obj.y;i--){
				 if(!(play.map[i][obj.x]>=0)){
				 obj.y=i
				 play.map[i][x]=play.map[y][x]
				 delete play.map[y][x]
				 }	 
			 }
		 }
		 else{
			for(var i =0;i<obj.y;i++){
				 if(!(play.map[i][obj.x]>=0)){
				 obj.y=i
				 play.map[i][x]=play.map[y][x]
				 delete play.map[y][x]
				 }	 
			 } 
		 }
	 } 
}

unique.uniques[26]={
	 dec:"【煌闪】——闪现到菱形范围2格以内，对周围8方向的敌人造成额外600伤害" ,
	 type:[1,2,"l",1],
	 cost:20,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 
		 delete play.map[com.mans[user].y][com.mans[user].x]
		 com.mans[user].x=x
		 com.mans[user].y=y
		play.map[com.mans[user].y][com.mans[user].x]=user
		 
	 for(var i=x-1;i<x+2;i++)for(var j=y-1;j<y+2;j++){
		 	 if(i>=0&&j>=0&&i<3&&j<5)
			 if(typeof(play.map[j][i])!='undefined'&&(i!=x||j!=y))			 
			 if(com.mans[play.map[j][i]].my!=com.mans[user].my)
			 {
				 com.mans[play.map[j][i]].damege+=com.mans[user].fatk()+600	 	
			 }		
		}	
	 }
}

unique.uniques[27]={
	 dec:"【乖乖接受姐姐的疼爱嘛♥】——将方形3格内一个战力+援护力低于自己的角色卡拉回到自己的身后,如果对象是名为雷吉的角色，自己增加200战力（保证自己身后是空区域并且对方显示的战力总和低于自己，否则无效）" ,
	 type:[1,3,"f",0],
	 cost:20,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
	 var uc=com.mans
		 if(who==1){ 
			if(uc[user].y<4){
				if((play.map[uc[user].y+1][uc[user].x]>=0)||((uc[play.map[y][x]].asatk+uc[play.map[y][x]].atk)>=uc[user].atk))return
				uc[play.map[y][x]].y=uc[user].y+1
				uc[play.map[y][x]].x=uc[user].x
				play.map[uc[user].y+1][uc[user].x]=play.map[y][x]
				if(uc[play.map[y][x]].name=="雷吉")uc[user].atk+=300
				delete play.map[y][x]				
			}
		
		}	
		else{
			if(uc[user].y>0){
				if((play.map[uc[user].y-1][uc[user].x]>=0)||((uc[play.map[y][x]].asatk+uc[play.map[y][x]].atk)>=uc[user].atk))return
				uc[play.map[y][x]].y=uc[user].y-1
				uc[play.map[y][x]].x=uc[user].x
				play.map[uc[user].y-1][uc[user].x]=play.map[y][x]
				if(uc[play.map[y][x]].name=="雷吉")uc[user].atk+=300
				delete play.map[y][x]	
			}
		}
	 }
}

unique.uniques[32]={
	 dec:"让使用者十字方向移动一格并对移动方向前方敌人发起一次通常攻击" ,
	 type:[1,2,"c",1],
	 cost:0,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 
		 delete play.map[com.mans[user].y][com.mans[user].x]
		 var oldx=com.mans[user].x
		 var oldy=com.mans[user].y
		 com.mans[user].x=x
		 com.mans[user].y=y
		play.map[com.mans[user].y][com.mans[user].x]=user
		if(oldx>x&&x>=0)play.battle(user,play.map[y][x-1]) 
		if(oldx<x&&x<=2)play.battle(user,play.map[y][x+1])
		if(oldy>y&&y>=0)play.battle(user,play.map[y-1][x])
		if(oldy<y&&y<=4)play.battle(user,play.map[y+1][x])	
	 }
}

unique.uniques[33]={
	 dec:"让使用者进入反击架势，之后每次被攻击都会反击攻击者" ,
	 type:[0,2,"c",1],
	 cost:0,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 com.mans[user].counter=true		 
	 }
}

unique.uniques[34]={
	 dec:"【大岚旋】吹飞一个十字3格以内的6星以下角色回到手卡" ,
	 type:[1,3,"c"],
	 cost:40,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		var pm=play.map[y][x]
		var bc=com.mans[pm]	 
		if(bc.lv<=6){
			bc.isShow=false			
			play.dolo(2-who,bc.key,1)
			delete play.map[y][x]
		}
		
	 }
}

unique.uniques[36]={
	 dec:"让手卡中星阶最高的卡回到卡组，抽一张卡，并让自己场上所有角色增加自身星阶×100的临时战力" ,
	 type:[0,3,"c"],
	 cost:0,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 var numHand=com.handdd.length
		 var maxlv=0
		 var dropcard
		 for(var i=0;i<numHand;i++){
		var hid=com.handdd[i]
			if(com.hands[hid].lv>maxlv){maxlv=com.hands[hid].lv;dropcard=com.handdd[i];test(dropcard)}			
		 }
		 
		 play.drop(who,dropcard)
		var r = Math.random();   
		var index=  Math.round(r * play.deck.length)
		play.deck.splice(index, 0,com.hands[dropcard].key);		 
			play.dolo(who) 			 
		
		for(var i=0;i<play.countOfBattleCards;i++)
	{	
		if(com.mans[i].isShow&&com.mans[i].my==who)
		com.mans[i].damege-=com.mans[i].lv*100	
		}
		
	 }
}

unique.uniques[40]={
	 dec:"【迷惑把戏】——使用后与菱形3格范围内的己方角色交换位置" ,
	 type:[1,3,"l",3],
	 cost:5,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 var obj=com.mans[play.map[y][x]]
		 var bc=com.mans[user]
		 var xx=obj.x
		 var yy=obj.y
		 obj.x=bc.x
		 obj.y=bc.y
		 bc.x=xx
		 bc.y=yy
		
		 play.map[obj.y][obj.x]=play.map[y][x]
		 play.map[yy][xx]=user
		
	 }
}

unique.uniques[41]={
	 dec:"对十字1格的敌方目标使用，造成技能300/600/900伤害，如果目标为异兽，附加震退一格的效果" ,
	 type:[1,1,"c"],
	 cost:5,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 var obj=com.mans[play.map[y][x]]
		 var bc=com.mans[user]
		  for(var i=0;i<com.mans[user].spe.length;i++)
			 {
			var uspe=com.mans[user].spe[i].split("lv")
			 if(uspe[0]=="圣纹"){
			 com.mans[play.map[y][x]].damege+=300*uspe[1]		
			 }
			 }
			 if(obj.grain=="异兽"){
			 if(x>0&&x<bc.x)if(!(play.map[y][x-1]>=0)){obj.x-=1;play.map[y][x-1]=play.map[y][x];delete play.map[y][x]}
			 if(x<2&&x>bc.x)if(!(play.map[y][x+1]>=0)){obj.x+=1;play.map[y][x+1]=play.map[y][x];delete play.map[y][x]}
			 if(y>0&&y<bc.y)if(!(play.map[y-1][x]>=0)){obj.y-=1;play.map[y-1][x]=play.map[y][x];delete play.map[y][x]}
			 if(y<4&&y>bc.y)if(!(play.map[y+1][x]>=0)){obj.y+=1;play.map[y+1][x]=play.map[y][x];delete play.map[y][x]}
			
	 }}
}

unique.uniques[42]={ 
	
	 dec:"【折光】——使用后，自身周围十字1格内所有备战状态的己方角色变成无敌状态，并进入休整，持续到对方回合结束" ,
	 type:[0,2,"l",3],
	 cost:30,
	 eff:function(my,user){
		 com.mans[user].dormancy=true
		 var x= com.mans[user].x
		 var y = com.mans[user].y
		 com.mans[user].invincible+=2
		for(var i=x-1;i<x+2;i++)for(var j=y-1;j<y+2;j++){			
		 	 if(i>=0&&j>=0&&i<3&&j<5)
			 if(typeof(play.map[j][i])!='undefined')	
			 if(!(i!=x&&j!=y))		
			 { 
			 if(com.mans[play.map[j][i]].my==com.mans[user].my)
			 if(!com.mans[play.map[j][i]].dormancy)
			// if(!(i==x&&j==y))
			 {
				 
				 com.mans[play.map[j][i]].invincible+=2
			 com.mans[play.map[j][i]].dormancy=true
			 }
			 }
			 
	 } }
	}
	
	unique.uniques[43]={
	 dec:"选择一个己方角色，让其攻击范围增加1/2/3格数" ,
	 type:[1,6,"l",3],
	 cost:5,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		  for(var i=0;i<com.mans[user].spe.length;i++)
			 {
				 var uspe=com.mans[user].spe[i].split("lv")
			 if(uspe[0]=="风纹"){
			 com.mans[play.map[y][x]].move+=uspe[1]
			 }
			 }
		
	 }
}

unique.uniques[45]={
	 dec:"【临别礼物】选择一个十字方向2格以内的目标区域发射一枚烟幕弹，使周围3X3格内所有角色的援护战力下降800，并且自身向发射反方向后退1格" ,
	 type:[1,2,"t",0],
	 cost:25,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		 for(var i=x-1;i<x+2;i++)for(var j=y-1;j<y+2;j++){
		 	 if(i>=0&&j>=0&&i<3&&j<5)
			 if(typeof(play.map[j][i])!='undefined')			 
			 {
				 com.mans[play.map[j][i]].asdamege+=800	 	
			 }	
		 }
		 var ux=com.mans[user].x
		 var uy=com.mans[user].y
		 var tx=com.mans[user].x-x
		 var ty=com.mans[user].y-y
		 if(tx>0&&com.mans[user].x<2){com.mans[user].x++;play.map[uy][ux+1]=user;delete play.map[uy][ux]}
		 if(tx<0&&com.mans[user].x>0){com.mans[user].x--;play.map[uy][ux-1]=user;delete play.map[uy][ux]}
		 if(ty>0&&com.mans[user].y<4){com.mans[user].y++;play.map[uy+1][ux]=user;delete play.map[uy][ux]}
		 if(ty<0&&com.mans[user].y>0){com.mans[user].y--;play.map[uy-1][ux]=user;delete play.map[uy][ux]}
	 }
}

unique.uniques[46]={
	 dec:"【善意】选择一个菱形3格以内的己方角色，使其星阶增加1，战力增加100，使用者自身战力减少50，战力已经为0的情况发动无效" ,
	 type:[1,3,"l",3],
	 cost:0,
	 eff:function(who,user,x,y){com.mans[user].dormancy=true
		if(com.mans[user].atk>0){
			com.mans[user].atk-=50
			com.mans[play.map[y][x]].lv++
			com.mans[play.map[y][x]].atk+=100
		}
	 }
}