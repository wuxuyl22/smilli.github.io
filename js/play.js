

var play = play||{};

play.init = function (){
	
	play.my				=	3-com.playerID;				//��ҷ�
	play.map 			=	com.arr2Clone (com.initMap);		//��ʼ������
	play.nowManKey		=	-1;			
	nowChooseCard	=	-1
	play.pace 			=	[];				//��¼ÿһ��
	play.isPlay 		=	true ;			//�Ƿ�������
	play.mans 			=	com.mans;
	play.hands 			=	com.hands;
	play.bylaw 			= 	com.bylaw;
	play.show 			= 	com.show;
	play.showPane 		= 	com.showPane;
	play.isOffensive	=	true;			//�Ƿ�����
	play.depth			=	play.depth || 3;				//�������
	play.nowSumingCardKey 	= 	false
	play.nowUserCard	=	false
	play.nowActionCard	=	false
	play.mainState 	= 	0   //0:ͨ�� 1��ͨ���ǳ�  2������ǳ�  3��ʹ�õ���
	play.isNowStanding 	= 	false
	play.isNowMoving 	= 	false
	play.isNowUni =false
	play.nowSkill 	= false
	isNowChosing	=	false
	play.isFoul			=	false;	//�Ƿ񷸹泤��
	play.nowCard = ""
	play.countOfBattleCards = 	0
	play.countOfHandCards	=	0
	play.allOfHandCards	=	0
	play.step			=	0
	play.lvCount		=	0 //���������ǽ׺ϼ�
	play.lvCan		=	10	//��ǰ�����ٻ����ǽ�
	play.sacrifice	=[]
	comSumon 	=	true
	play.opponentHandCount	= 	3
	play.seleOfHand = -1
	summfrom = ""
	play.deck=[]
	turnCount = 0
	//�����ٻ����
	play.standbox = []
	play.standLv =0
	play.lvc=0
	com.pane.isShow		=	 false;			//���ط���
	
	
	
	//ս�����
	gauge = 70
	opponentGauge = 70
	ifSkip = false
	combo=0
	lastHit=-1
	cri=false
	
	
	//����������
	playerHP = 5000
	opponentHP = 5000
	//play.show();,.
	
	//��ɱ��
	killer= false
	
	
	//�󶨵���¼�
com.socket.on('move', function(obj){var x =2-obj.cardX,y=4-obj.cardY;obj;play.doPoint(x,y,obj.key);infoRefresh()});
com.socket.on('summon', function(obj){var x =2-obj.cardX,y=4-obj.cardY;play.cardSum(obj.key,x,y,2);infoRefresh()});
com.socket.on('changeMy', function(obj){play.my=1;comSumon=true;play.step=0;play.newTurn();infoRefresh()})
com.socket.on('battle', function(obj){play.battle(obj.akey,obj.hkey);infoRefresh()})
com.socket.on('action', function(obj){actionEffect(obj.user,obj.action,2-obj.x,4-obj.y);infoRefresh()})
com.socket.on('uni', function(obj){uniEffect(obj.user,2-obj.x,4-obj.y);infoRefresh()})
com.canvas.addEventListener("click",play.clickCanvas)
initHandCards()
	deckInit();
	centerInit()
	play.show();
	play.stepControl();

if(play.my!=1)com.get("superPlay").disabled=true;	

	//clearInterval(play.timer);
	//com.get("autoPlay").addEventListener("click", function(e) {
		//clearInterval(play.timer);
		//play.timer = setInterval("play.AIPlay()",1000);
	//	play.AIPlay()
	//})
	/*
	com.get("offensivePlay").addEventListener("click", function(e) {
		play.isOffensive=true;
		play.isPlay=true ;	
		com.get("chessRight").style.display = "none";
		play.init();
	})
	
	com.get("defensivePlay").addEventListener("click", function(e) {
		play.isOffensive=false;
		play.isPlay=true ;	
		com.get("chessRight").style.display = "none";
		play.init();
	})
	*/
	
	
	//com.get("regretBn").addEventListener("click", function(e) {
	//	play.regret();
	//})
	
	
	
}




//��������¼�
play.clickCanvas = function (e){

	var user=key
	
	if (!play.isPlay) return false;
	
	var point = play.getClickPoint(e);
	var key = play.getClickMan(e);   //�����KEY��BID����HID
	
	//ȡ��key
	var sumcard=play.nowSumingCardKey   
	var user=play.nowUserCard
	var action
	if(play.seleOfHand>=0)action=com.hands[play.seleOfHand].key
	var x = point.x;
	var y = point.y;
	var point2 = play.getClickPoint2(e).x;
	switch(play.mainState){
	case 0:
		
		if(point.y<5){
			if (typeof(key) != 'undefined'){
			but.removeCardButton();
			play.clickMan(key,x,y);	
			}
			else {
				
			but.removeCardButton();
			com.get("moveInfo").innerHTML=''
			if(play.nowManKey>=0){
			com.mans[play.nowManKey].alpha = 1;
			com.dot.dots = [];
			play.nowManKey=-1
			}
		
			//play.clickPoint(x,y);	
			}
	
		}
		else {
			if (typeof(key) != 'undefined'){
			but.removeCardButton();
			com.get("moveInfo").innerHTML=''
			}
			if(play.nowManKey>=0){
			com.mans[play.nowManKey].alpha = 1;
			com.dot.dots = [];
			play.nowManKey=-1
			}
			play.clickCanvas2(key)
		}
	break
	
	case 1: {    //���ս���ǳ���Ƭ
		if(!(key>=0)){
		play.cardSum(sumcard,x,y)
		comSumon =false
		}
		else {
			play.mainState=0
			test("ֻ���ڿ�����ǳ���")
			comSumon =false
			sumcard=-1
		}
		break
	}
	case 2: {
		
		play.standbox.push(key)
		play.lvc+=com.mans[key].lv
	
			if(play.lvc>=play.standLv)
			{play.cardSum(sumcard,0,0)
			for(var i=0;i<play.standbox.length;i++)
			play.bdelete(com.mans[play.standbox[i]].x,com.mans[play.standbox[i]].y,true)
			}
	break
	}
	
	case 3: {
		if(!(key>=0)){
		play.mainState=0
		test("��Ӧ��ѡ�����Լ���һ����ɫ��Ϊʹ����")
		play.seleOfHand=-1;
		play.mainState=0;	
		break
		}
		if(com.mans[key].my!=1){
		play.mainState=0
		test("��Ӧ��ѡ�����Լ���һ����ɫ��Ϊʹ����")
		play.seleOfHand=-1;
		play.mainState=0;	
		break
		}
		
		var handid=play.seleOfHand
		var Aspe=com.hands[handid].spe[0].split("lv")[0]
		var Aspelv=com.hands[handid].spe[0].split("lv")[1]
		var Uspe=[]
		var Uspelv=[]
		var gg=false
		for(var i =0;i<com.mans[key].spe.length;i++)
		{
			Uspe[i]=com.mans[key].spe[i].split("lv")[0]
			Uspelv[i]=com.mans[key].spe[i].split("lv")[1]
			if(Uspe[i]==Aspe&&Aspelv<=Uspelv[i]){gg=true;break}
			}
				
		if(gg||com.hands[handid].spe[0]=="ͨ��"){
		action=sumcard	
		play.nowUserCard=key
		play.nowActionCard=action			
		play.useE(action,key)					
		}
		else{
			test("��ѡ��Ľ�ɫû������ж���Ҫ��ļ���")
			play.seleOfHand=-1;play.mainState=0;  
		but.removeCardButton();
		}
		break
	}
	case 4: 
	  if (play.indexOfPs(com.mans[play.nowManKey].ps,[x,y])){
		 if(!play.isNowUni){
		 
		 unique.uniques[action].eff(play.my,play.nowUserCard,x,y)
			 
		 com.socket.emit('action', {user:user,action:action,x:x,y:y})	 
		 play.nowUserCard=false
		 play.nowActionCard=false
		 com.mans[user].alpha=1.0
		 com.mans[user].dormancy=true
		 com.hands[play.seleOfHand].isShow=false
		 play.seleOfHand=-1
		 play.handArrange()		
		 play.mainState=0
		 play.nowManKey=-1;
		 com.dot.dots = [];
		 var acsp=com.args[action].spe[0].split("lv")[0]
		 	if(com.mans[user].key==18&&com.mans[user].my==1&&gauge>=35&&acsp=="��֮�Ƽ�"){  //�����������
				if (confirm("���������ɫ�ı�ɱ��")){
			gauge-=35
			
			com.mans[user].dormancy=false	
			com.show() 
				}
			 }
		 play.stepControl()
		 com.show()
		 
		 
	 	 }
		 else {
			  gauge-=unique.uniques[com.mans[play.nowManKey].key].cost
			  com.mans[play.nowManKey].unief(x,y)
			  play.mainState=0
			  play.isNowUni=false			  
			  com.socket.emit('uni', {user:play.nowManKey,x:x,y:y})	
			  com.mans[play.nowManKey].alpha = 1;		  
			  play.nowManKey=-1;
			  play.mainState=0
		 	  com.dot.dots = [];
		 }
		
	  }	
	  else {
		 play.nowUserCard=false
		 play.nowActionCard=false
		 com.mans[play.nowManKey].alpha=1.0
		 play.mainState=0
		 com.dot.dots = [];
		 play.nowManKey=-1 
	  }
	  break
	
	case 5: {
	  if(point.y>=5){
		 if (typeof(key) != 'undefined'){
		nowChooseCard=key
		if(play.nowSkill>=0)	
		com.mans[play.nowSkill].skillef("force",play.nowSkill)
		 }
	  }	
	  break
	}
}
	infoRefresh()
	
}

//  һ�п�Ƭ�ǳ���ս��
play.cardSum =	function(sumcard,x,y,my){
	var cardbid=play.countOfBattleCards ;
	play.countOfBattleCards++;
	
	com.mans[cardbid] =	CardBattle.createNew(sumcard,x,y,cardbid)	
	com.mans[cardbid].my=my||1
	play.map[y][x] = cardbid;
	//com.get("clickAudio").play();
	if(com.mans[cardbid].my==1)
	{
		com.socket.emit('summon', {cardX:x, cardY:y,key:sumcard})
		play.lvCount+=com.mans[cardbid].lv
		if(summfrom=="hand"){
		com.hands[play.seleOfHand].isShow=false
		play.handArrange()}
	}
	else{
	play.opponentHandCount--
	play.stepControl()
	}
	com.childList.push(com.mans[cardbid])
	message.mpush("�� "+com.mans[cardbid].pre+com.mans[cardbid].name+" ͨ���ǳ��ˣ�",com.mans[cardbid].my)
	checkSkill("summon",cardbid)
	com.show();	
	play.mainState = 0
	
	
}


//���ս����Ƭ��Ϊ��ѡ�л��߹�����һ�ſ�
play.clickMan = function (key,x,y){	
	var man = com.mans[key];
	var name=com.mans[key].name
	var pre=com.mans[key].pre
	var keyy=com.mans[key].key
	var spe=com.mans[key].spe
	var spes=[]
	for(var i =0;i<spe.length;i++){
		spes.push("-"+spe[i]+"-")
	}
	com.get("moveInfo").innerHTML='<h3>������Ϣ</h3><h3>������'+pre+name+'<br>��Ӫ��'+man.grain+'<br>�ǽף�'+man.lv+'+'+man.blv+'<br>ս����'+man.atk+' + '+man.asatk+' - ('+man.damege+')<br>�������ԣ�'+man.sdec+'<br><br>��ɱ��_'+man.cost+man.udec+'<br><br>���ܣ�'+spes+'</h3>'							
	//����
	if (play.nowManKey>=0&&play.nowManKey != key && man.my != com.mans[play.nowManKey ].my){
		//manΪ�������Ŀ�		
		if (play.indexOfPs(com.mans[play.nowManKey].ps,[x,y])&&play.map[y][x]!=com.mans[play.nowManKey]){
			com.socket.emit('battle', {akey:play.nowManKey,hkey:key})
			play.battle(play.nowManKey,key)		
				
		}
		
		
			
	// ѡ�г��ϵĿ�
	}
	if(play.nowManKey==key&&isNowChosing){
		var conf=false
		if(com.mans[key].udec!="�ޱ�ɱ"&&gauge>=unique.uniques[keyy].cost)
		if (confirm("���������ɫ�ı�ɱ��")){
			conf=true
			if(unique.uniques[keyy].type[0]==0){
			gauge-=unique.uniques[com.mans[key].key].cost
			com.mans[key].unief(key)
			com.socket.emit('uni', {user:play.nowManKey,x:x,y:y})	
			
			 com.mans[key].alpha = 1;
		play.nowManKey=-1;
		com.dot.dots = [];
		play.mainState=0
			}
			else{						
		 com.mans[key].ps = com.bylaw[unique.uniques[keyy].type[2]](com.mans[key].x,com.mans[key].y,play.map,com.mans[key].my,unique.uniques[keyy].type[1],unique.uniques[keyy].type[3])
		 //����������ŵ�
		com.dot.dots = com.mans[key].ps	
		if(com.dot.dots.length==0){test("û�п�ѡ���Ŀ��");conf=false;}
		play.isNowUni=true
		play.mainState=4
	
			}
		}
		if(!conf){
		com.mans[key].alpha=1.0
		play.nowManKey=-1;
		play.mainState=0
		com.pane.isShow = false;
		com.dot.dots = [];		
		isNowChosing	= false
		}
			}
	else{
		if (man.my===1&&!man.dormancy&&play.my==1){    //���2���鿴��Ƭ��Ϣ��������Χ
			if (com.mans[play.nowManKey]) com.mans[play.nowManKey].alpha = 1 ;
			man.alpha = 0.6;
			com.pane.isShow = false;
			play.nowManKey = key;
			isNowChosing = true
			com.mans[key].ps =  com.bylaw[com.args[keyy].bl](com.mans[key].x,com.mans[key].y,play.map,com.mans[key].my,com.mans[key].move,2)//����������ŵ�
			com.dot.dots = com.mans[key].ps
			com.show();
			//com.get("selectAudio").start(0);
			//com.get("selectAudio").play();
		}
		
	}
	
}

//��ս����
play.battle = function (akey,hkey){  
			if(!(akey>=0)||!(hkey>=0)) return
			var man = com.mans[hkey];	
			var aman=com.mans[akey]
			
			if(lastHit==hkey||lastHit==-1)combo++
			else combo=1
			lastHit = hkey
			if(com.mans[akey].skt=="attack")
				skill.skills[com.mans[akey].key].eff(com.mans[akey].my,akey,hkey)
			//checkSkill("battle",hkey)	
			
					
			if(!ifSkip)	{
			man.damege+=com.mans[akey].fatk()			
			if(man.key.skt=="hurt")skill.skills[man.key].eff(man.my,hkey,akey)
			if(man.invincible)man.damege=0
			if(man.fatk()<=0&&man.damege>0)
			{aman.blv++;}
			message.mpush("�� "+com.mans[akey].pre+com.mans[akey].name+" �� "+man.pre+man.name+" ������ͨ������������� "+com.mans[akey].fatk()+" �˺�",com.mans[akey].my)
			if(man.counter)aman.damege+=man.atk
			if(man.key==11)man.damege=(man.damege>400)?400:man.damege
	
			
			
			  //�ָ����⹥��
			com.mans[akey].alpha=1.0
			play.nowManKey=-1;
			com.pane.isShow = false;
			com.dot.dots = [];	
			com.mans[akey].dormancy=true	
			com.mans[akey].exatk=0
			}
			var comb=Math.max(0,combo-1)
			var crib=0
			if(cri) crib=8
			var gp= 2+crib+2*(comb*0.5)+(Math.max(1,crib-4)*comb)
			if(man.my==1){				
			gagueCon(1,5)
			gagueCon(2,gp)			
			}
			if(man.my==2){
			gagueCon(2,5)
			gagueCon(1,gp)
			}
			//com.get("clickAudio").play();						
			
			
			ifSkip=false
			
			
		//	setTimeout("play.AIPlay()",500);
	
	
			//��λ����� (����)
			/*
			play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x]=play.map[y][x]
			play.map[y][x]=play.nowManKey
			
			man.x=com.mans[play.nowManKey].x
			man.y=com.mans[play.nowManKey].y
			com.mans[play.nowManKey].x = x;
			com.mans[play.nowManKey].y = y;
			com.showPane(com.mans[play.nowManKey].x ,com.mans[play.nowManKey].y,x,y)
			com.mans[play.nowManKey].alpha=1.0
			play.nowManKey=-1;
			com.pane.isShow = false;
			com.dot.dots = [];

			com.show()*/
}

play.useE = function (action,user){  //�ü��ܿ���ʹ�÷�Χ
	man=com.mans[user]
	hand=com.hands[action]
	if (unique.uniques[action].type[0]!=0){
		if (com.mans[play.nowManKey]) com.mans[play.nowManKey].alpha = 1 ;
			man.alpha = 0.6;
			com.pane.isShow = false;
			play.nowManKey = user;
			com.mans[user].ps = com.bylaw[unique.uniques[action].type[2]](com.mans[user].x,com.mans[user].y,play.map,com.mans[user].my,unique.uniques[action].type[1],unique.uniques[action].type[3])
			
			com.dot.dots = com.mans[user].ps
			if(com.dot.dots.length==0){
				test("û�п�ѡ���Ŀ��");
				play.seleOfHand=-1
			play.mainState = 0}
			play.mainState = 4	
		
	}
	else{
		unique.uniques[action].eff(play.my,user)
		com.socket.emit('action', {user:user,action:action})
		message.mpush("�� ��"+man.pre+man.name+" ʹ���� "+com.args[action].name+"[Ч����"+unique.uniques[action].dec+"]",man.my)
		man.dormancy=true
		com.hands[play.seleOfHand].isShow=false
		play.seleOfHand=-1
		play.handArrange()	
		play.mainState = 0
	}
	com.show()
}

actionEffect=function(user,action,x,y){
	//if(unique.uniques[key].type[0]==0){
			//com.mans[key].unief(key)
	if(!(x>=0))x=-1
	if(!(y>=0))y=-1
	
	var man=com.mans[user]
	var obj="������"
	if(x>=0)if(play.map[y][x]>=0)obj=com.mans[play.map[y][x]].pre+com.mans[play.map[y][x]].name
	 unique.uniques[action].eff(play.my,user,x,y) 
		 play.nowUserCard=false
		 play.nowActionCard=false
		 com.mans[user].dormancy=true
		 
		 if(x!=-1)message.mpush("�ġ�"+man.pre+man.name+"���Գ���������"+(x+1)+"��"+(y+1)+"]��Ŀ�꡾"+obj+"��ʹ�����ж�����"+com.args[action].name+"��[Ч����<i>"+unique.uniques[action].dec+"</i> ]",man.my)
		 else message.mpush("�ġ�"+man.pre+man.name+"��ʹ�����ж�����"+com.args[action].name+"��[Ч����<i>"+unique.uniques[action].dec+"</i> ]",man.my)
		 deadCheck()
		 com.show()
	
	
}

uniEffect=function(user,x,y){
	//if(unique.uniques[key].type[0]==0){
			//com.mans[key].unief(key)
	var x= x?x:0
	var y= y?y:0
	  com.mans[user].unief(x,y)	 
	   	
	  deadCheck()
	  com.show()
	  
	  
	
}


//����ŵ�
play.clickPoint = function (x,y){

	var key=play.nowManKey;
	var man=com.mans[key];
	if (play.nowManKey>=0){
		if (play.indexOfPs(com.mans[key].ps,[x,y])){
			com.socket.emit('move', {cardX:x, cardY:y,key:key})
			play.doPoint(x,y,key)
		}
		
		
	}
	
}


//�������
play.doPoint = function (x,y,key){
	var man=com.mans[key];
	
	var pace=man.x+""+man.y
			//z(bill.createMove(play.map,man.x,man.y,x,y))
			delete play.map[man.y][man.x];
			
			play.map[y][x] = key;
			com.showPane(man.x ,man.y,x,y)
			man.x = x;
			man.y = y;
			man.alpha = 1;
			
			play.nowManKey=-1;
			com.dot.dots = [];
			
			com.show();
			
			//com.get("clickAudio").play();
}



play.indexOfPs = function (ps,xy){
	for (var i=0; i<ps.length; i++){
		if (ps[i][0]==xy[0]&&ps[i][1]==xy[1]) return true;
	}
	return false;
	
}

//��õ�����ŵ�
play.getClickPoint = function (e){
	var domXY = com.getDomXY(com.canvas);
	var x=Math.round((e.pageX-domXY.x-com.pointStartX-30)/com.spaceX)
	var y=Math.round((e.pageY-domXY.y-com.pointStartY-40)/com.spaceY)
	return {"x":x,"y":y}
}

//��ȡ��Ƭ
play.getClickMan = function (e){
	var clickXY=play.getClickPoint(e);
	var x=clickXY.x;
	var y=clickXY.y;
	var domXY = com.getDomXY(com.canvas);
	var x2=Math.round((e.pageX-domXY.x-4-32)/58)
	var y2=Math.floor((e.pageY-570)/97)
	
	if (x < 0 || x>8 || y < 0 || y > 9) return false;
	if (y<5&&typeof(play.map[y][x])!='undefined'){ 		
		
		//return (play.map[y][x]) ? play.map[y][x] : false;
		return play.map[y][x]
	}
	if (e.pageY>=570) {
		if(x2<0)return false;
		return com.handdd[x2+y2*6]
	}
	//return play.map[0][0];
}


//����ֿ�
play.getClickPoint2 = function (e){
	var domXY = com.getDomXY(com.canvas);
	var x=Math.round((e.pageX-domXY.x+4)/60)

	var y=Math.round(50)
	return {"x":x,"y":y}
}


play.clickCanvas2 = function(x){
	
	if (x>=0&&x<=play.countOfHandCards){		
	var hid=x
	var name=com.hands[hid].name
	var key=com.hands[hid].key
	var pre=com.hands[hid].pre
	 play.standLv = com.hands[hid].lv
	var spe=com.hands[hid].spe
	var spes=[]
	for(var i =0;i<spe.length;i++){
		spes.push("-"+spe[i]+"-")
	}
	
	play.seleOfHand = hid
	if(com.hands[hid].grain!="��")
	com.get("moveInfo").innerHTML='<h3>������Ϣ</h3><h3>������'+pre+name+'<br>��Ӫ��'+com.hands[hid].grain+'<br>�ǽף�'+com.hands[hid].lv+'<br>ս����'+com.hands[hid].atk+'<br>�������ԣ�'+com.hands[hid].sdec+'<br><br>��ɱ��_'+com.hands[hid].cost+com.hands[hid].udec+'<br><br>���ܣ�'+spes+'</h3>'
	else
	com.get("moveInfo").innerHTML='<h3>������Ϣ</h3><h3>������'+name+'<br>Ч����'+com.hands[hid].udec+'<br><br>Ҫ���ܣ�'+spes+'</h3>'
	
	com.get("tip").innerHTML='������ʾ/С��ʿ��<br>'+com.hands[hid].tip
	
	//sklv=checkSkill("hand",hid)
	//test(sklv)
	//if(typeof(sklv)=='int')
	//var nowlv=com.hands[hid].lv+sklv
		if(play.my==1){
		but.creatCardButton(hid) 	
		play.nowSumingCardKey = com.hands[hid].key
		com.get("cardBn1").addEventListener("click", function(e){play.mainState = 1;com.get("tip").innerHTML='������ʾ/С��ʿ��<br>ѡ����һ����λ�õǳ�';but.removeCardButton();	})	
		com.get("cardBn2").addEventListener("click", function(e){play.mainState = 2;but.removeCardButton();	})	
		com.get("cardBn3").addEventListener("click", function(e){
			play.mainState = 3;
			but.removeCardButton();	
			if(key==8&&wolfCheck(hid)){
			play.mainState = 1;
			com.get("tip").innerHTML='<h3>������ʾ/С��ʿ��<br>ѡ����һ����λ�õǳ�</h3>'	
			checkSkill("hand")
			}			
			})	
			
		com.show();
		}

	}
}

wolfCheck=function(without){   //����  ���˼���
	var hand=com.hands
	var lvc=1.0
for(var i=0;i<com.handdd.length;i++){
	if(i=without)lvc+=hand[i].lv
	}

	if(lvc<5)return false
	else return true
}


play.ifCardBn =function(e){
	var point = play.getClickPoint2(e);
if (com.hands[point.x].lv!=1)
	{
		 document.createElement("input").disabled=true;
	}
}



 
 
 
play.dolo=function(who,key,from){           //�鿨��Ϊ
	if(com.handdd.length<10){
	if(typeof(key)=='undefined'){
	var who =who||1
		if(who==1){		
	//alert("play.countOfHandCards="+play.countOfHandCards)

	com.hands[play.countOfHandCards]=CardHand.createNew(play.deck[play.deck.length-1],play.countOfHandCards);	
	play.deck.pop()
	com.hands[play.countOfHandCards].order=com.handdd.length
	com.childList.push(com.hands[play.countOfHandCards])
	com.handdd[com.handdd.length]=com.hands[play.countOfHandCards].hid			
	com.show();
	play.countOfHandCards++	
		}
		else{
	play.opponentHandCount++
	play.stepControl()
		}
	}
	else{
		if(typeof(from)=='undefined'){
			for(var i=0;i<play.deck.length;i++){
				if(play.deck[i]==key){
				play.deck.splice(i,1)		
				com.hands[play.countOfHandCards]=CardHand.createNew(key,play.countOfHandCards);	
				com.hands[play.countOfHandCards].order=com.handdd.length
				com.childList.push(com.hands[play.countOfHandCards])
				com.handdd[com.handdd.length]=com.hands[play.countOfHandCards].hid			
				com.show();
				play.countOfHandCards++	
				break
				}
			if(i==play.deck.length)test("��Ŀ�����û��Ҫ������ſ���")
			}
		}
		else{
			com.hands[play.countOfHandCards]=CardHand.createNew(key,play.countOfHandCards);	
				com.hands[play.countOfHandCards].order=com.handdd.length
				com.childList.push(com.hands[play.countOfHandCards])
				com.handdd[com.handdd.length]=com.hands[play.countOfHandCards].hid			
				com.show();
				play.countOfHandCards++	
			}
	}
	}
	else{test("���Ѿ��ﵽ�������ޣ�10�ţ������Բ����ٳ鿨��")}
	
}
play.drop=function(who,hid){           //�鿨��Ϊ
	var who =who||1
	if(who==1){		
	com.hands[hid].isShow=false
	play.handArrange()
	
	}
	else {play.opponentHandCount--}
	
}


play.handArrange=function(){
	
	if(com.handdd.length>0){
		
		var z=0
		for(var i=0;i<com.handdd.length;i++){
			
		if(com.hands[com.handdd[i]].isShow==false){
		z++
		
			for(var j=i;j<com.handdd.length;j++){
						
			com.hands[com.handdd[j]].order-=1
			com.handdd[j]=com.handdd[j+1]
			
			}
			break
		}
	}		
	}
	
	com.handdd.pop()
	com.show();

}

play.stepControl=function(){		
		if(gauge>=100)gauge=100	
			com.get("stateInfo").innerHTML='<h2>��Ļغ�</h2>' + '<b>'+'<br>��ǰ���ͨ���ǳ�������ǽף� '+	play.lvCan+ '<br>��ɱ���ۣ� '+ gauge+ '/100<br> '+ combo+ ' COMBO!! '+'</b> '+'<b><br><br>�Է���������'+play.opponentHandCount+'</b> '
}

play.newTurn =function(){
	combo=0
	lastHit=-1
	turnCount ++
	comSumon=true
	for(var i=0;i<play.countOfBattleCards;i++)	{
	if(com.mans[i].isShow){
		var c=com.mans[i]
		if(c.counter)c.counter--  //����״̬
		if(c.invincible)c.invincible--
		if(c.mabi)c.mabi--
		if(c.noAs)c.noAs--
		if(c.my==play.my){
			if(c.mabi==0){c.dormancy=false;}
			else c.mabi--
		c.damege=0
		
		}	
	}
	
}
	checkSkill("newT",play.my)
	assistCheck()
	
	com.show()	
}
play.bdelete=function(x,y,sta){
	
	var sta1=sta?sta:false
	if (!sta1)
	com.mans[play.map[y][x]].skillef("dead")
	com.mans[play.map[y][x]].isShow=false
	
	com.show()
	delete play.map[y][x]
	delete play.map[y][x]
	delete com.mans[play.map[y][x]]
	//bpush()
}

play.battleStep=function(){
	for(var i=1;i<play.countOfBattleCards+1;i++){
		if((com.mans[i].my==1&&play.my==1)||(com.mans[i].my==2&&play.my==2)){
			var direc=new Array
			var xx=com.mans[i].x
			var yy=com.mans[i].y
			direc=com.mans[i].direc()
		
			for(var j=0;j<direc.length;j++){
				var x=xx,y=yy
					switch(Number(direc[j])){
					case 1:
					x=xx-1;y=yy+1	
					break;
					case 2:
					y=yy-1	
					break;
					case 3:
					x=xx+1;y=yy+1	
					break;
					case 4:
					x=xx-1	
					break;
					case 6:
					x=xx+1	
					break;
					case 7:
					x=xx+1;y=yy-1	
					break;
					case 8:
					y=yy+1	
					break;
					case 9:
					x=xx+1;y=yy-1	
					break;
					}
					
					if(typeof(play.map[y][x]) != 'undefined'&&com.mans[play.map[y][x]].my!=com.mans[i].my)atack(com.mans[i],com.mans[play.map[y][x]])
					
			}
			
		}
	}
}




bpush=function(){
	for(var i=0;i<com.mans.length;i++){
    	if(typeof(com.mans[i])=='undefined'){
        com.mans.push(com.mans[i+1]);
		
    	}
	}

}

assistCheck=function(){
	
	for(var i=0;i<play.countOfBattleCards;i++){	
		var c=com.mans[i]
		if(c.noAs){
			c.asatk=0
		}
		else{
		c.asatk=0;
		
		if(c.my!=play.my){	
			if(c.y<4)
			if(typeof(play.map[c.y+1][c.x])!='undefined')
			{  //����	
			if(com.mans[play.map[c.y+1][c.x]].my==c.my)
			c.asatk += com.mans[play.map[c.y+1][c.x]].atk*0.5
			c.asatk=Math.max(0,c.asatk-c.asdamege)
			}
			if(c.y>0)
			if(typeof(play.map[c.y-1][c.x])!='undefined')
			{  //����	
			if(com.mans[play.map[c.y-1][c.x]].my==c.my)
			c.asatk += com.mans[play.map[c.y-1][c.x]].atk*0.5
			c.asatk=Math.max(0,c.asatk-c.asdamege)
			}
			if(c.x<2)
			if(typeof(play.map[c.y][c.x+1])!='undefined')
			{  //����	
			if(com.mans[play.map[c.y][c.x+1]].my==c.my)
			c.asatk += com.mans[play.map[c.y][c.x+1]].atk*0.5
			c.asatk=Math.max(0,c.asatk-c.asdamege)
			}
			if(c.x>0)
			if(typeof(play.map[c.y][c.x-1])!='undefined')
			{  //����	
			if(com.mans[play.map[c.y][c.x-1]].my==c.my)
			c.asatk += com.mans[play.map[c.y][c.x-1]].atk*0.5
			c.asatk=Math.max(0,c.asatk-c.asdamege)
			}
			
		}
		else{
			
			c.asatk=0
			}
		}
		
	}
}

test=function(){
	if(play.my==1){
	    var n = arguments.length;
                alert(n);
                var t = '';
                for (var i = 0; i < arguments.length; i++) {
                    t = t + arguments[i];
                }
                alert("Test:"+t);
	}
}

 GetRandomNum=function(Min,Max)
{   
var Range = Max - Min;   
var Rand = Math.random();   
return(Min + Math.round(Rand * Range));   
}   


deckInit=function(){
	for(var i=0;i<50;i++)
	{
		var key= GetRandomNum(1,18)
		play.deck.push(key)
	}

}

centerInit=function(){
	if(play.my==1){
	com.mans[0]=CardBattle.createNew(6,1,4,0)	
	com.mans[1]=CardBattle.createNew(7,1,0,1)	
	play.map[4][1] = 0;
	play.map[0][1] = 1;
	}
	
	
	
	if(play.my==2){
	com.mans[0]=CardBattle.createNew(6,1,0,0)		
	com.mans[1]=CardBattle.createNew(7,1,4,1)
	play.map[0][1] = 0;
	play.map[4][1] = 1;	
	}
	
	com.mans[0].my=play.my	
	com.mans[1].my=3-play.my
	com.childList.push(com.mans[0])
	com.childList.push(com.mans[1])
	play.countOfBattleCards+=2
	summfrom="hand"
	
}

deadCheck=function(){
	var i
	for(i=0;i<play.countOfBattleCards;i++){
		var dc=com.mans[i]
	if(com.mans[i].isShow){
		if(com.mans[i].fatk()<=0&&dc.damege>0){
			for(var j=0;j<play.countOfBattleCards;j++){	
				if(com.mans[j].isShow)
				com.mans[j].skillef("dead",i)		
			}
			com.mans[i].isShow=false
			delete play.map[dc.y][dc.x]
				
		}
	}
	}
}

gagueCon=function(who,num){	
	if(who==1){
		gauge+=num
	}
	else{
		opponentGauge+=num
	}
}


checkSkill=function(timing,obj){

	
	for(var i=0;i<play.countOfBattleCards;i++)
	{	
		if(timing!="battle"&&com.mans[i].isShow)
		com.mans[i].skillef(timing,obj)		
		}
		deadCheck()
}

initHandCards=function(){
for (var k=0;k<8;k++){
					
	if(k!=1)com.hands[k]=CardHand.createNew(k+40,k);
	else com.hands[k]=CardHand.createNew(1,k);
	com.hands[k].order=k
	com.childList.push(com.hands[k]);
	com.handdd[k]=com.hands[k].hid	
	play.countOfHandCards++
	}
}

infoRefresh=function(){
	play.stepControl()
	deadCheck()
	assistCheck()
	com.show()
}