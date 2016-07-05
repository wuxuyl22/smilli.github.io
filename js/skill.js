var skill = play||{};
var dropsumlv=0
var numofchoosing=0
var choosingCards=[]

skill.skills=[]
	skill.skills[1]={
	 dec:"当有己方的角色卡登场在这张卡周围十字1格的时候，抽一张卡" ,
	 timing:"summon",
	 eff:function(my,efid,objid){ 
	 var sumc=com.mans
	 if(sumc[objid].my==sumc[efid].my)
	 {if((sumc[objid].x+1==sumc[efid].x&&sumc[objid].y==sumc[efid].y)||
	 (sumc[objid].x-1==sumc[efid].x&&sumc[objid].y==sumc[efid].y)||
	 (sumc[objid].x==sumc[efid].x&&sumc[objid].y+1==sumc[efid].y)||
	 (sumc[objid].x==sumc[efid].x&&sumc[objid].y-1==sumc[efid].y))
	 play.dolo(my)
	 }	 
	 }
	}
	skill.skills[2]={
	 dec:"【欢、欢迎光临…】——这张卡登场时，双方抽一张卡" ,
	 timing:"summon",
	 eff:function(who,bid,obj){
		if(bid==obj)
		play.dolo(1)
	 }
	}
	skill.skills[3]={
	 dec:"【哦…死了么】场上有西法尔加的角色败退时，必杀气力+20" ,
	 timing:"dead",
	 eff:function(who,bid,obj){
		 if(obj.grain=="西法尔加"){
			 gagueCon(who,20)
		 }
	 }
	}
	
	skill.skills[4]={
	 dec:"登场后获得500的临时战力" ,
	 timing:"summon",
	 eff:function(who,bid,obj){
		 if(bid==obj){
		 com.mans[bid].damege-=500	 
		 
	 }
	}
}

	skill.skills[6]={
	 dec:"当有己方的星阶不高于自己的角色卡登场在这张卡周围十字1方向的时候，抽一张卡" ,
	 timing:"summon",
	 eff:function(my,efid,objid){ 
	 var sumc=com.mans
	 if(sumc[objid].my==sumc[efid].my&&sumc[objid].lv<=sumc[efid].lv)
	 {if((sumc[objid].x+1==sumc[efid].x&&sumc[objid].y==sumc[efid].y)||
	 (sumc[objid].x-1==sumc[efid].x&&sumc[objid].y==sumc[efid].y)||
	 (sumc[objid].x==sumc[efid].x&&sumc[objid].y+1==sumc[efid].y)||
	 (sumc[objid].x==sumc[efid].x&&sumc[objid].y-1==sumc[efid].y))
	 play.dolo(my)
	 }	 
	 }
	}
	
	skill.skills[7]={
	 dec:"无" ,
	 timing:"",
	 eff:function(who){
	 }
	}

	skill.skills[8]={
	 dec:"在手卡使用这张卡可以强制通常登场，但战力变成400，并在通常登场后需要丢弃两张星阶合计为5以上的角色手卡，否则这张卡登场后败退。(暂时有BUG，请确保手上足够2张合计星阶5以上的卡再使用这张卡，谢谢QAQ)" ,
	 timing:"summon",
	 eff:function(who,bid,obj){	
	
	 	 	if(bid==obj){
		 play.nowSkill=bid
		 com.get("tip").innerHTML='<h3>操作提示/小贴士：请从手卡选择两张合计星阶大于5的角色卡</h3>'	
		  play.mainState=5
		  		if(nowChooseCard>=0){
					  		
				 dropsumlv+=com.hands[nowChooseCard].lv				 		
				 numofchoosing ++
		 		 choosingCards[numofchoosing-1]	=	nowChooseCard
				 
		 			if(dropsumlv>=5&&numofchoosing==2){		
					 com.mans[bid].atk=400
					 play.drop(who, choosingCards[numofchoosing-2])
					 play.drop(who, choosingCards[numofchoosing-1])
					 play.nowSkill=-1
					 play.mainState=0
					 dropsumlv=0
					 numofchoosing=0
					 choosingCards=[]
					 nowChooseCard = -1
					 }
		 			 if(dropsumlv<5&&numofchoosing==2){
						 test(com.mans[bid].name)
						com.mans[bid].isShow=false
						delete play.map[com.mans[bid].y][com.mans[bid].x]
						com.show()
		 play.nowSkill=-1
		 play.mainState=0
		 dropsumlv=0		 
		 }		 
		  }
		  }
	 }
	}
	
	
	skill.skills[10]={
	 dec:"【影袭者】——这个角色从敌人的后方向攻击时，造成2倍伤害暴击" ,
	 timing:"attack",
	 eff:function(who,bid,obj){
		 if(who==1)
		 if(com.mans[obj].y>com.mans[bid].y){			 
			 com.mans[bid].exatk+=com.mans[bid].fatk()
			 cri=true
			
		 }	
		 if(who==2)
		 if(com.mans[obj].y<com.mans[bid].y){			 
			 com.mans[bid].exatk+=com.mans[bid].fatk()
			cri=true
		 }	  
	 }
	}

	skill.skills[11]={
	 dec:"【纹兽体质/暗器使】——这个角色受到的单次普通攻击伤害最多为200，这个角色可以攻击十字2格以内的目标" ,
	 timing:"",
	 eff:function(who,bid,obj){
		 if(com.mans[obj].y>com.mans[bid].y){
			 if(play.my!=com.mans[bid].my)
			 com.mans[bid].exatk+=com.mans[bid].atk+com.mans[bid].exatk
		 }	 
	 }
	}

	skill.skills[15]={
	 dec:"【修行】——这个角色登场时，自动变成休息状态，增加35必杀气力" ,
	 timing:"summon",
	 eff:function(who,bid,obj){
		 if(bid==obj)
		com.mans[bid].dormancy=true
		if(who==1)gauge+=35; 
	 play.stepControl() 
	 }
	}
	
	skill.skills[16]={
	 dec:"【你们一起上好了】——这个角色攻击和被攻击时，8方向周围每多一个敌方角色，战力+200" ,
	 timing:"attack",
	 eff:function(who,bid,obj){
		 var x=com.mans[bid].x
		 var y=com.mans[bid].y
	 	for(var i=x-1;i<x+2;i++)for(var j=y-1;j<y+2;j++){
		 if(typeof(play.map[j][i])!='undefined'&&(i!=x||j!=y))			 
			 if(com.mans[play.map[j][i]].my!=com.mans[bid].my)
			 com.mans[bid].exatk+=200	 
		 }
	 }
	}


	skill.skills[18]={
	 dec:"【炎纹连动】这个角色使用一个炎纹系行动卡之后，可以消耗35必杀技槽，使自己不进入休整状态" ,
	 timing:"",
	 eff:function(who,bid,obj){
			 
		 
	 }
	}

	skill.skills[25]={
	 dec:"【恶臭嘲讽】——备战状态的这个角色在对方的回合中开始时+1500临时战力，并嘲讽周围十字方向的敌方角色，使他们同时对自己发动攻击" ,
	 timing:"newT",
	 eff:function(who,bid,whoT){
		{
			if(whoT!=who&&!com.mans[bid].dormancy){
			var bc= com.mans
			com.mans[bid].damege+=-1500
			var x=com.mans[bid].x
			var y=com.mans[bid].y
			if(play.map[y-1][x]>=0){
				if(!bc[play.map[y-1][x]].dormancy){
				bc[play.map[y-1][x]].dormancy=true
				bc[bid].damege+=bc[play.map[y-1][x]].fatk()
				}				
			}
			if(play.map[y+1][x]>=0){
				if(!bc[play.map[y+1][x]].dormancy){
				bc[play.map[y+1][x]].dormancy=true
				bc[bid].damege+=bc[play.map[y+1][x]].fatk()
				}				
			}
			if(play.map[y][x-1]>=0){
				if(!bc[play.map[y][x-1]].dormancy){
				bc[play.map[y][x-1]].dormancy=true
				bc[bid].damege+=bc[play.map[y][x-1]].fatk()
				}				
			}
			if(play.map[y][x+1]>=0){
				if(!bc[play.map[y][x+1]].dormancy){
				bc[play.map[y][x+1]].dormancy=true
				bc[bid].damege+=bc[play.map[y][x+1]].fatk()
				}				
			}
			deadCheck()
	     	}
		}
	}
	}
	skill.skills[26]={
	 dec:"【异兽皆杀】——这个角色攻击阵营为 异兽 的角色时，造成额外500伤害的暴击",
	 timing:"attack",
	 eff:function(who,bid,obj){
		  test(com.mans[obj].grain)	
		 if(com.mans[obj].grain=="异兽"){		
		 
			 com.mans[bid].exatk+=500
			 cri=true
		 }
	 }
	}
	
	skill.skills[27]={
	 dec:"【凌虐本性】——这个角色攻击已经受到伤害的角色时，造成1.5倍暴击伤害",
	 timing:"attack",
	 eff:function(who,bid,obj){
		 if(com.mans[obj].damege>0){			 
			 com.mans[bid].exatk+=0.5*com.mans[bid].fatk()
			 cri=true
		 }
	 }
	}
	
	skill.skills[28]={
	 dec:"这个角色死亡时，对周围十字1格上的目标造成400伤害",
	 timing:"dead",
	 eff:function(who,bid,obj){
		 var x=com.mans[bid].x
		  var y=com.mans[bid].y
		  var bc=com.mans
		 if(obj==bid){			 
			 if(play.map[y-1][x]>=0){
				bc[play.map[y-1][x]].damege+=350			
			}
			if(play.map[y+1][x]>=0){
				bc[play.map[y+1][x]].damege+=350	
							
			}
			if(play.map[y][x-1]>=0){
				bc[play.map[y][x-1]].damege+=350				
			}
			if(play.map[y][x+1]>=0){
			bc[play.map[1][x+1]].damege+=350	
		 }
	 }}
	}
	skill.skills[30]={
	 dec:"这个角色可以攻击方形2格以内的目标",
	 timing:"",
	 eff:function(who,bid,obj){
		
	 }
	}
	skill.skills[31]={
	 dec:"这个角色每次进行攻击，获得随机一张lv1以下的格斗行动卡" ,
	 timing:"attack",
	 eff:function(who,bid,obj){
		  	var gdc=[]
			 for(var i=1;i<=com.argsCount;i++){
				 if(typeof(com.args[i])!='undefined') {
					 if(com.args[i].grain=="行")
				 if(com.args[i].spe[0]=="格斗lv1"){
					 gdc.push(i) 
			 }
				 }
			 }
			 var r = Math.random();   
			var index=  Math.round(r * (gdc.length-1))
			play.dolo(who,gdc[index],1)		
	 }
	}
	
	skill.skills[34]={
	 dec:"【微风态势】——这个角色可以攻击到菱形3以内的目标，这张卡被普通攻击时，不在自己近身范围内的伤害忽略不计" ,
	 timing:"hurt",
	 eff:function(who,bid,obj){
		  	var bc = com.mans
			if(!((bc[obj].x==bc[bid].x&&bc[obj].y==bc[bid].y+1)||
			(bc[obj].x==bc[bid].x&&bc[obj].y==bc[bid].y-1)||
			(bc[obj].x==bc[bid].x+1&&bc[obj].y==bc[bid].y)||
			(bc[obj].x==bc[bid].x-1&&bc[obj].y==bc[bid].y)))bc[bid].damege=0
	 }
	}
	
	skill.skills[35]={
	 dec:"【不可言状的恐怖】——这个角色登场时，对方场上的所有角色的战力永久减少800，战力低于500的角色直接败退。" ,
	 timing:"summon",
	 eff:function(who,bid,obj){
		 	if(bid!=obj)return
		  	var bc = com.mans
			for(var i =0 ;i<play.countOfBattleCards;i++){
				if(bc[i].my!=who){
			if(bc[i].atk<=500)bc[i].damege+=500+bc[i].asatk
			else bc[i].atk-=800
				}
			}
	 }
	}
	
	skill.skills[39]={
	 dec:"【肮脏交易】——这个角色登场时，自己的左右两边的己方3星阶以下的角色直接败退，并抽败退数量的卡" ,
	 timing:"summon",
	 eff:function(who,bid,obj){
		 	if(bid!=obj)return
		  	var bc = com.mans
			var num=0
			
			if(bc[bid].x<4)
			if(play.map[bc[bid].y][bc[bid].x+1]>=0)
			if(bc[play.map[bc[bid].y][bc[bid].x+1]].my==who)
			if(bc[play.map[bc[bid].y][bc[bid].x+1]].lv<=3)
			{bc[play.map[bc[bid].y][bc[bid].x+1]].isShow=false;
			delete play.map[bc[bid].y][bc[bid].x+1]
			num++}
			
			if(bc[bid].x>0)
			if(play.map[bc[bid].y][bc[bid].x-1]>=0)
			if(bc[play.map[bc[bid].y][bc[bid].x-1]].my==who)
			if(bc[play.map[bc[bid].y][bc[bid].x-1]].lv<=3)
			{bc[play.map[bc[bid].y][bc[bid].x-1]].isShow=false
			delete play.map[bc[bid].y][bc[bid].x-1]
			num++}
			
			for(var i=0;i<num;i++)
			play.dolo(who)
	 }
	}
	
	skill.skills[42]={
	 dec:"【麻痹之咬】——这个角色可以攻击菱形3格范围中目标,但不能攻击近身目标；并且普攻附带麻痹效果，使目标在下一个自己的回合结束前进入休整状态。" ,
	 timing:"attack",
	 eff:function(who,bid,obj){
		  	var oc=com.mans[obj]
			oc.dormancy=true
			oc.mabi+=2
				
			
	 }
	}
	
	skill.skills[44]={
	 dec:"【情报GET】——这个角色登场在敌人的8方向周围时，抽一张卡" ,
	 timing:"summon",
	 eff:function(who,bid,obj){
		  	if(bid!=obj)return
			var x=com.mans[bid].x
		 var y=com.mans[bid].y
	 for(var i=x-1;i<x+2;i++)for(var j=y-1;j<y+2;j++){
		 	 if(i>=0&&j>=0&&i<3&&j<5)
			 if(typeof(play.map[j][i])!='undefined'&&(i!=x||j!=y))			 
			 if(com.mans[play.map[j][i]].my!=com.mans[bid].my)
			 {
				 play.dolo(who)
				 break	 	
			 }	
		
		}								
	 }
	}
	
	skill.skills[45]={
	 dec:"【情报援护】——这个角色登场在敌人的8方向周围时，抽一张卡/这张卡提供全额的援护战力" ,
	 timing:"summon",
	 eff:function(who,bid,obj){
		  	if(bid!=obj)return
			var x=com.mans[bid].x
		 var y=com.mans[bid].y
	 for(var i=x-1;i<x+2;i++)for(var j=y-1;j<y+2;j++){
		 	 if(i>=0&&j>=0&&i<3&&j<5)
			 if(typeof(play.map[j][i])!='undefined'&&(i!=x||j!=y))			 
			 if(com.mans[play.map[j][i]].my!=com.mans[bid].my)
			 {
				 play.dolo(who)
				 break	 	
			 }	
		
		}								
	 }
	}
	
	skill.skills[47]={
	 dec:"【？？？】——这个角色保持反击架势，并且不会被麻痹" ,
	 timing:"summon",
	 eff:function(who,bid,obj){
		  com.mans[bid].mabi-=999
		  com.mans[bid].counter=999	
		
									
	 }
	}