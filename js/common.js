var com = com||{};

com.init = function (stype){

	com.nowStype= stype || com.getCookie("stype") ||"stype1";
	var stype = com.stype[com.nowStype];
	com.width			=	stype.width;		//画布宽度
	com.height			=	stype.height; 		//画布高度
	com.spaceX			=	stype.spaceX;		//着点X跨度
	com.spaceY			=	stype.spaceY;		//着点Y跨度
	com.pointStartX		=	stype.pointStartX;	//第一个着点X坐标;
	com.pointStartY		=	stype.pointStartY;	//第一个着点Y坐标;
	com.page			=	stype.page;			//图片目录

	com.get("box").style.width = com.width+130+"px";
	com.get("box").style.height =com.height+600+"px";
	com.canvas			=	document.getElementById("chess1"); //画布
	com.ct				=	com.canvas.getContext("2d") ; 
	
	//com.canvas2			=	document.getElementById("chess2"); //画布
	//com.ct2				=	com.canvas2.getContext("2d") ; 
	com.canvas.width	=	com.width
	com.canvas.height	=	com.height+230;
	
	com.childList		=	com.childList||[];
	com.handdd = []
	com.argsCount = 31
	
	com.loadImages(com.page);		//载入图片/图片目录
	//z(com.initMap.join())
}

//样式
com.stype = {
	stype1:{
		width:368,		//画布宽度
		height:520, 		//画布高度
		spaceX:118,		//着点X跨度
		spaceY:104,		//着点Y跨度
		pointStartX:32,		//第一个着点X坐标;
		pointStartY:4,		//第一个着点Y坐标;
		page:"stype_1"	//图片目录
	},
	stype2:{
		width:530,		//画布宽度
		height:567, 		//画布高度
		spaceX:57,		//着点X跨度
		spaceY:57,		//着点Y跨度
		pointStartX:-2,		//第一个着点X坐标;
		pointStartY:0,		//第一个着点Y坐标;
		page:"stype_2"	//图片目录
	}		
}
//获取ID
com.get = function (id){
	return document.getElementById(id)
}

window.onload = function(){  
	var d = document,
	w = window,
	p = parseInt,
	dd = d.documentElement,
	db = d.body,
	dc = d.compatMode == 'CSS1Compat',
	dx = dc ? dd: db,
	ec = encodeURIComponent;
	message.init()
	com.playerID=2
	
	com.socket = io.connect('http://127.0.0.1:3000');
	com.socket.on('PlayerID1', function(o){com.playerID=1;});
	
	com.socket.on('login', function(o){	
				if(o.onlineCount==2){
				com.createMans(com.initMap)	
				play.isPlay=true ;	
			com.get("chessRight").style.display = "none";
			com.get("moveInfo").style.display = "block";
			com.get("moveInfo").innerHTML=com.playerID;
			play.depth = 3;
			play.init();
				}
			});
			
	com.socket.emit('login', {userid:32, username:"ds"});


	com.bg=new com.class.Bg();
	com.dot = new com.class.Dot();
	com.pane=new com.class.Pane();
	com.pane.isShow=false;
	
	com.childList=[com.bg,com.pane];	
	com.mans	 ={};		//棋子集合
	com.hands ={};
		//生成棋子	
	//com.bg.show();
	com.get("bnBox").style.display = "block";
	com.get("bnCard").style.display = "block";
	com.initBlues();
	//play.init();
	 
	com.get("tyroPlay").addEventListener("click", function(e) {
		
			
			play.my=2;				
			com.get("superPlay").disabled=true;	
			com.socket.emit('changeMy', {change:1})
			play.newTurn()
		
		/*if (confirm("1")){
			com.init();
			com.get("chessRight").style.display = "block";
			com.get("moveInfo").style.display = "none";
			bill.init();
		}*/
	})
	com.get("superPlay").addEventListener("click", function(e) { 
		play.dolo(1,1,1)
			/*
			play.isPlay=true ;	
			com.get("chessRight").style.display = "none";
			com.get("moveInfo").style.display = "block";
			com.get("moveInfo").innerHTML="";
			*/
	})

	com.get("drop").addEventListener("click", function(e) {
		
		play.dolo(1,43,1)	
		
		
	})
	
	
	
	/*com.getData("js/gambit.all.js",
		function(data){
		com.gambit=data.split(" ");
		AI.historyBill = com.gambit;
	})*/
	
}

//载入图片
com.loadImages = function(stype){
	
	//绘制棋盘
	com.bgImg = new Image();
	com.bgImg.src  = "img/"+stype+"/chessBg3.png";
	//提示点
	com.dotImg = new Image();
	com.dotImg.src  = "img/"+stype+"/dot.png";
	
	//卡片所属光
	com.BlightImg = new Image();
	com.BlightImg.src  = "img/"+stype+"/card_blue.png";
	com.RlightImg = new Image();
	com.RlightImg.src  = "img/"+stype+"/card_red.png";
	
	com.invImg = new Image();
	com.invImg.src  = "img/"+stype+"/wudi.png";
	//棋子
	for (var i in com.args){
		com[i] = {};
		com[i].img = new Image();
		com[i].img.src = "img/"+stype+"/"+ com.args[i].img +".png";
	}
	
	//外框残影
	com.paneImg = new Image();
	com.paneImg.src  = "img/"+stype+"/r_box.png";
	
	document.getElementsByTagName("body")[0].style.background= "url(img/"+stype+"/bg.jpg)";
	
}

//显示列表
com.show = function (){
	//com.ct.clearRect(0, 0, com.width+200, com.height+200); 
	//com.ct2.clearRect(110, 110, 100, 100); 
	
	for (var i=0; i<com.childList.length ; i++){
		com.childList[i].show();
	}	
	com.dot.show();
	//test(333)
}

//显示移动的棋子外框
com.showPane  = function (x,y,newX,newY){
	com.pane.isShow=true;
	com.pane.x= x ;
	com.pane.y= y ;
	com.pane.newX= newX ;
	com.pane.newY= newY ;
}

//生成初始手牌------------------------------------------------------------------------------------------------------------------------------------
com.createMans = function(map){
	
}


//debug alert
com.alert = function (obj,f,n){
	if (typeof obj !== "object") {
		try{console.log(obj)} catch (e){}
		//return alert(obj);
	}
	var arr = [];
	for (var i in obj) arr.push(i+" = "+obj[i]);
	try{console.log(arr.join(n||"\n"))} catch (e){}
	//return alert(arr.join(n||"\n\r"));
}

//com.alert的简写，考虑z变量名最不常用
var z = com.alert;

//获取元素距离页面左侧的距离
com.getDomXY = function (dom){
	var left = dom.offsetLeft;
	var top = dom.offsetTop;
	var current = dom.offsetParent;
	while (current !== null){
		left += current.offsetLeft;
		top += current.offsetTop;
		current = current.offsetParent;
	}
	return {x:left,y:top};
}

//获得cookie
com.getCookie = function(name){
	if (document.cookie.length>0){
		start=document.cookie.indexOf(name + "=")
		if (start!=-1){ 
			start=start + name.length+1 
			end=document.cookie.indexOf(";",start)
		if (end==-1) end=document.cookie.length
			return unescape(document.cookie.substring(start,end))
		} 
	}
	return false;
}
//二维数组克隆
com.arr2Clone = function (arr){
	var newArr=[];
	for (var i=0; i<arr.length ; i++){	
		newArr[i] = arr[i].slice();
	}
	return newArr;
}

//ajax载入数据
com.getData = function (url,fun){
	var XMLHttpRequestObject=false;
	if(window.XMLHttpRequest){
		XMLHttpRequestObject=new XMLHttpRequest();
	}else if(window.ActiveXObject){
	XMLHttpRequestObject=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(XMLHttpRequestObject){
		XMLHttpRequestObject.open("GET",url);
		XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		XMLHttpRequestObject.onreadystatechange=function (){
			if(XMLHttpRequestObject.readyState==4 && XMLHttpRequestObject.status==200){
				fun (XMLHttpRequestObject.responseText)
				//return XMLHttpRequestObject.responseText;
			}
		}
	XMLHttpRequestObject.send(null);
	}
}

//把坐标生成着法
com.createMove = function (map,x,y,newX,newY){
	var h="";
	var man = com.mans[map[y][x]];
	h+= man.text;
	map[newY][newX] = map[y][x];
	delete map[y][x];
	if (man.my===1){
		var mumTo=["一","二","三","四","五","六","七","八","九","十"];	
		newX=8-newX;
		h+= mumTo[8-x];
		if (newY > y) {
			h+= "退";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y -1];
			}
		}else if (newY < y) {
			h+= "进";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY -1];
			}
		}else {
			h+= "平";
			h+= mumTo[newX];
		}
	}else{
		var mumTo=["１","２","３","４","５","６","７","８","９","10"];
		h+= mumTo[x];
		if (newY > y) {
			h+= "进";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y-1];
			}
		}else if (newY < y) {
			h+= "退";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY-1];
			}
		}else {
			h+= "平";
			h+= mumTo[newX];
		}
	}
	return h;
}

/*com.initMap = [
	['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,'P0',    ,    ,    ,    ,    ,'P1',    ],
	['Z0',    ,'Z1',    ,'Z2',    ,'Z3',    ,'Z4'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['z0',    ,'z1',    ,'z2',    ,'z3',    ,'z4'],
	[    ,'p0',    ,    ,    ,    ,    ,'p1',    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['c0','m0','x0','s0','j0','s1','x1','m1','c1']
];
*/
com.initMap = [	
	[,,],
	[,,],
	[,,],
	[,,],
	[,,]	
];

com.handCard = []

com.bule=[]

com.initBlues = function(){
	var a=[1,1,1,1,1,3,3,2,2,2];
	function changePosition(size,arr) {   
        for(index=size-1; index>=0; index--) {   
            //从0到index处之间随机取一个值，跟index处的元素交换   
            exchange(parseInt(Math.random()*size), index,arr);   
        }   
}   
     
function exchange(p1, p2,arr){   
        temp = arr[p1];   
        arr[p1] = arr[p2];   
        arr[p2] = temp;   
}  
changePosition(a.length,a);


}
com.initMap1 = [
	[    ,    ,    ,, "J0"   ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    , ,    ,    ,    ],
	[    ,    ,    ,    ,    ,"z0",    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,	  ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    , "j0"   ,,    ,    ,    ]
];

com.keys = {
	"1":"c","2":"c",
	"m0":"m","m1":"m",
	"x0":"x","x1":"x",
	"s0":"s","s1":"s",
	"j0":"j",
	"p0":"p","p1":"p",
	"z0":"z","z1":"z","z2":"z","z3":"z","z4":"z","z5":"z",
	
	"C0":"c","C1":"C",
	"M0":"M","M1":"M",
	"X0":"X","X1":"X",
	"S0":"S","S1":"S",
	"J0":"J",
	"P0":"P","P1":"P",
	"Z0":"Z","Z1":"Z","Z2":"Z","Z3":"Z","Z4":"Z","Z5":"Z",
}

//棋子能走的着点
com.bylaw ={}
//车
com.bylaw.c = function (x,y,map,my,move,selet){
	var d=[];
	se=selet?selet:0

	
	//左侧检索
	for (var i=x-1; i>= 0; i--){
		if(i>= x-move) {
			
			if (map[y][i]>=0) {
				
			if (com.mans[map[y][i]].my!=my) {d.push([i,y]);};
			break
		}else{
			d.push([i,y])	
		}
		}
		
	}
	//右侧检索
	for (var i=x+1; i <= 2; i++){
		
		
		if(i<= x+move){			
		if (map[y][i]>=0) {
			if (com.mans[map[y][i]].my!=my) d.push([i,y]);
			break
		}else{
			d.push([i,y])	
		}
		}
	}
	//上检索
	for (var i = y-1 ; i >= 0; i--){
		if(i>= y-move){
		if (map[i][x]>=0) {
			if (com.mans[map[i][x]].my!=my) d.push([x,i]);
			break
		}else{
			d.push([x,i])	
		}
		}
	}
	//下检索
	for (var i = y+1 ; i<= 4; i++){
		if(i<= y+move){
		if (map[i][x]>=0) {
			if (com.mans[map[i][x]].my!=my) d.push([x,i]);
			break
		}else{
			d.push([x,i])	
		}
		}
	}
	return d;
}


com.bylaw.t = function (x,y,map,my,move,selet){
	var d=[];
	var se=selet?selet:0
	//左侧检索
	for (var i=x-1; i>= 0; i--){
		if(i>= x-move) {
			
			if (se==0) d.push([i,y]);
			if (se==1) if(!(play.map[y][i]>=0)){d.push([i,y]);}
			if (se==2) if(play.map[y][i]>=0&&bc[play.map[y][i]].my!=my){d.push([i,y]);break}
			if (se==3)if(play.map[y][i]>=0&&bc[play.map[y][i]].my==my){d.push([i,y]);break}
		
		
		}
		
	}

	for (var i=x+1; i <= 2; i++){
		if(i<= x+move){
		
		 if (se==0) d.push([i,y]);
			if (se==1) if(!(play.map[y][i]>=0)){d.push([i,y]);}
			if (se==2) if(play.map[y][i]>=0&&bc[play.map[y][i]].my!=my){d.push([i,y]);break}
			if (se==3)if(play.map[y][i]>=0&&bc[play.map[y][i]].my==my){d.push([i,y]);break}
		
		}
	}
	//上检索
	for (var i = y-1 ; i >= 0; i--){
		if(i>= y-move){

		 if (se==0) d.push([x,i]);
			if (se==1) if(!(play.map[i][x]>=0)){d.push([x,i]);}
			if (se==2) if(play.map[i][x]>=0&&bc[play.map[i][x]].my!=my){d.push([x,i]);break}
			if (se==3)if(play.map[i][x]>=0&&bc[play.map[i][x]].my==my){d.push([x,i]);break}
		}
		
	}
	//下检索
	for (var i = y+1 ; i<= 4; i++){
		if(i<= y+move){
		
		 if (se==0) d.push([x,i]);
			if (se==1) if(!(play.map[i][x]>=0)){d.push([x,i]);}
			if (se==2) if(play.map[i][x]>=0&&bc[play.map[i][x]].my!=my){d.push([x,i]);break}
			if (se==3)if(play.map[i][x]>=0&&bc[play.map[i][x]].my==my){d.push([x,i]);break}
		}
		
	}
	return d;
}
//马
com.bylaw.m = function (x,y,map,my){
	var d=[];
		//1点
		if ( y-2>= 0 && x+1<= 8 && !play.map[y-1][x] &&(!com.mans[map[y-2][x+1]] || com.mans[map[y-2][x+1]].my!=my)) d.push([x+1,y-2]);
		//2点
		if ( y-1>= 0 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y-1][x+2]] || com.mans[map[y-1][x+2]].my!=my)) d.push([x+2,y-1]);
		//4点
		if ( y+1<= 9 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y+1][x+2]] || com.mans[map[y+1][x+2]].my!=my)) d.push([x+2,y+1]);
		//5点
		if ( y+2<= 9 && x+1<= 8 && !play.map[y+1][x] &&(!com.mans[map[y+2][x+1]] || com.mans[map[y+2][x+1]].my!=my)) d.push([x+1,y+2]);
		//7点
		if ( y+2<= 9 && x-1>= 0 && !play.map[y+1][x] &&(!com.mans[map[y+2][x-1]] || com.mans[map[y+2][x-1]].my!=my)) d.push([x-1,y+2]);
		//8点
		if ( y+1<= 9 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y+1][x-2]] || com.mans[map[y+1][x-2]].my!=my)) d.push([x-2,y+1]);
		//10点
		if ( y-1>= 0 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y-1][x-2]] || com.mans[map[y-1][x-2]].my!=my)) d.push([x-2,y-1]);
		//11点
		if ( y-2>= 0 && x-1>= 0 && !play.map[y-1][x] &&(!com.mans[map[y-2][x-1]] || com.mans[map[y-2][x-1]].my!=my)) d.push([x-1,y-2]);

	return d;
}

//相
com.bylaw.x = function (x,y,map,my){
	var d=[];
	if (my===1){ //红方
		//4点半
		if ( y+2<= 9 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//7点半
		if ( y+2<= 9 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//1点半
		if ( y-2>= 5 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//10点半
		if ( y-2>= 5 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}else{
		//4点半
		if ( y+2<= 4 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//7点半
		if ( y+2<= 4 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//1点半
		if ( y-2>= 0 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//10点半
		if ( y-2>= 0 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}
	return d;
}

//菱形
com.bylaw.l = function (x,y,map,my,move,se){
	var d=[];
	var selet=se?se:0
		var i,j
		var bc=com.mans
		for(i =x-move;i<=x+move;i++)for(j=y-move;j<=y+move;j++){
		if (i<0||j<0||i>2||j>4){}
		else {
			if(Math.abs(x-i)+Math.abs(y-j)<=move){
				switch(selet){
				case 0: {if((i!=x)||(j!=y))d.push([i,j]);;break}
				case 1: if(!(play.map[j][i]>=0))if((i!=x)||(j!=y)){d.push([i,j]);break}
				case 2: if(play.map[j][i]>=0&&bc[play.map[j][i]].my!=my)if((i!=x)||(j!=y)){d.push([i,j]);break}
				case 3: if(play.map[j][i]>=0&&bc[play.map[j][i]].my==my){d.push([i,j]);break}
			}
			}
		}
		}
		return d;
}

//不能近战
com.bylaw.k = function (x,y,map,my,move,se){
	var d=[];
	var selet=se?se:0
		var i,j
		var bc=com.mans
		for(i =x-move;i<=x+move;i++)for(j=y-move;j<=y+move;j++){
		if (i<0||j<0||i>2||j>4){}
		else {
			if(Math.abs(x-i)+Math.abs(y-j)<=move&&Math.abs(x-i)+Math.abs(y-j)>1){
				switch(selet){
				case 0: if((i!=x)||(j!=y))d.push([i,j]);break
				case 1: if(!(play.map[j][i]>=0))if((i!=x)||(j!=y))d.push([i,j]);break
				case 2: if(play.map[j][i]>=0&&bc[play.map[j][i]].my!=my)if((i!=x)||(j!=y))d.push([i,j]);break
				case 3: if(play.map[j][i]>=0&&bc[play.map[j][i]].my==my)d.push([i,j]);break
			}
			}
		}
		}
		return d;
}


//炮
com.bylaw.p = function (x,y,map,my){
	var d=[];
	//左侧检索
	var n=0;
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[y][i]].my!=my) d.push([i,y]);
				break	
			}
		}else{
			if(n==0) d.push([i,y])	
		}
	}
	//右侧检索
	var n=0;
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[y][i]].my!=my) d.push([i,y]);
				break	
			}
		}else{
			if(n==0) d.push([i,y])	
		}
	}
	//上检索
	var n=0;
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[i][x]].my!=my) d.push([x,i]);
				break	
			}
		}else{
			if(n==0) d.push([x,i])	
		}
	}
	//下检索
	var n=0;
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[i][x]].my!=my) d.push([x,i]);
				break	
			}
		}else{
			if(n==0) d.push([x,i])	
		}
	}
	return d;
}

//大方形
com.bylaw.f = function (x,y,map,my,move,sele){
	var d=[];
	var bc=com.mans
	var se=sele?sele:0
	for(var i=x-move;i<x+1+move;i++)for(var j=y-move;j<y+1+move;j++){
		 	 if(i>=0&&j>=0&&i<3&&j<5)
			 if(i!=x||j!=y)	{
			 if	(!se)	 
				d.push([i,j])
			else
			if (se==2&&play.map[j][i]>=0){if(bc[play.map[j][i]].my!=my)d.push([i,j])}
	}}
	return d;
}



//黑子为红字价值位置的倒置


//卡的数据
com.args={
	 
	1:{ img:'card01' ,bl:"c", move:1,pre:"事件中心",name:"梵埃鲁",grain:"无",lv:3,atk:300,direc:"7",spe:["策略lv2"]},
	2:{ img:'card02' ,bl:"c", move:1,name:"杂货商蝶蝶丸",grain:"无",lv:1,atk:100,direc:"46",spe:[""]},
	3:{ img:'card03' ,bl:"c", move:4,pre:"薄暮婚纱主唱歌姬",name:"艾德蕾拉",grain:"西法尔加",lv:3,atk:4000,direc:"1",spe:["策略lv1"]},
	4:{ img:'card04' ,bl:"t", move:3,name:"失败型禁药教士",grain:"宵星教会",lv:2,atk:100,direc:"8",spe:["军械使用lv1"]},
	5:{ img:'card05' ,bl:"c", move:2,name:"便携手雷",grain:"行",lv:2,atk:400,direc:"8",spe:["军械使用lv1"]},
	6:{ img:'card06' ,bl:"f", move:4,pre:"削风",name:"蒂琪",grain:"无",lv:3,atk:6000,direc:"1",spe:["炎纹lv1","风纹lv1"]},
	7:{ img:'card07' ,bl:"f", move:4,pre:"战略∞",name:"梵埃鲁",grain:"无",lv:3,atk:5000,direc:"1",spe:["策略lv2"]},
	8:{ img:'card08' ,bl:"c", move:1,pre:"霜狼",name:"希夫特",grain:"异兽",lv:5,atk:1280,tip:"很猛的，必杀打乱阵形",spe:["格斗lv1"]},
	9:{ img:'card08' ,bl:"c", move:1,name:"万宝槌",grain:"行",spe:["通用"],tip:"卡手了就来一发"},
	10:{ img:'card01' ,bl:"c", move:1,pre:"漆黑之影",name:"杰西瓦",grain:"无",lv:3,atk:440,direc:"7",spe:["军械使用lv1"]},
	11:{ img:'card01' ,bl:"c", move:2,pre:"典狱长",name:"弗莱彻",grain:"西法尔加",lv:4,atk:620,direc:"7",skill:1,spe:["策略lv1"]},
	12:{ img:'card01' ,bl:"c", move:1,pre:"宵星教会的修道士少年",name:"雷吉",grain:"宵星教会",lv:4,atk:700,direc:"7",skill:1,spe:["圣纹"]},
	13:{ img:'card04' ,bl:"c", move:1,pre:"诅咒之纹",name:"席德",grain:"谍报局",lv:6,atk:1200,direc:"7",spe:["格斗lv3"]},
	14:{ img:'card08' ,bl:"c", move:1,name:"过肩摔",grain:"行",spe:["格斗lv1"],tip:"把麻烦的敌人扔开"},
	15:{ img:'card08' ,bl:"c", move:1,pre:"修行狂魔",name:"威尔",grain:"谍报局",lv:4,atk:660,direc:"7",spe:["格斗lv2"]},
	16:{ img:'card08' ,bl:"c", move:1,pre:"极限之拳",name:"威尔",grain:"谍报局",lv:9,atk:2360,direc:"7",spe:["格斗lv3","炎纹lv2"]},
	17:{ img:'card05' ,bl:"c", move:1,name:"趁虚而入",grain:"行",spe:["策略lv1"],tip:"看着用呗"},
	18:{ img:'card06' ,bl:"c", move:1,pre:"背德之炎",name:"穆塔",grain:"谍报局",lv:7,atk:680,direc:"7",spe:["炎纹lv3","策略lv2"]},
	19:{ img:'card05' ,bl:"l", move:2,name:"十字炽焰",grain:"行",spe:["炎纹lv3"],tip:"AOE"},
	20:{ img:'card05' ,bl:"c", move:4,name:"迷你炎拳",grain:"行",spe:["炎纹lv1"],tip:"随便用用"},
	21:{ img:'card09' ,bl:"f", move:1,name:"怒火焚身",grain:"行",spe:["炎纹lv2"],tip:"可以用在敌我双方，达到不同目的"},
	22:{ img:'card09' ,bl:"f", move:1,name:"升阶特训",grain:"行",spe:["通用"],tip:"缺气就用，注意负面效果了"},
	23:{ img:'card09' ,bl:"f", move:1,name:"弱者至下",grain:"行",spe:["通用"],tip:"卡手了吗"},
	24:{ img:'card09' ,bl:"f", move:1,name:"撤退指令",grain:"行",spe:["通用"],tip:"好卡撤离危险区域"},
	25:{ img:'card06' ,bl:"c", move:1,name:"恶臭泥鳅兽",grain:"异兽",lv:3,atk:200,direc:"7",spe:[]},
	26:{ img:'card06' ,bl:"c", move:1,pre:"臻零煌闪",name:"雷吉",grain:"宵星教会",lv:8,atk:1620,direc:"7",spe:["圣纹lv2"]},
	27:{ img:'card06' ,bl:"c", move:1,pre:"宵星教会的痴女修女",name:"黛莎",grain:"宵星教会",lv:7,atk:1820,direc:"7",spe:["圣纹lv2","格斗lv2"]},
	28:{ img:'card04' ,bl:"c", move:1,name:"死身教士",grain:"宵星教会",lv:1,atk:240,direc:"7",spe:["圣纹lv1"]},
	29:{ img:'card04' ,bl:"c", move:1,name:"熔甲蜥兽",grain:"异兽",lv:1,atk:8000,direc:"7",spe:["炎纹lv1"]},
	30:{ img:'card04' ,bl:"f", move:2,name:"配枪强化士兵",grain:"西法尔加",lv:2,atk:240,direc:"7",spe:["军械使用lv1"]},
	31:{ img:'card04' ,bl:"c", move:1,name:"年迈的武术师范",grain:"西法尔加",lv:2,atk:220,direc:"7",spe:["格斗lv1"]},
	32:{ img:'card08' ,bl:"c", move:1,name:"弓身弹影",grain:"行",spe:["格斗lv1"],tip:"移动技兼备攻击，并且可以触发普攻特效"},
	33:{ img:'card08' ,bl:"c", move:1,name:"反击架势",grain:"行",spe:["格斗lv1"],tip:""},
	34:{ img:'card06' ,bl:"l", move:3,pre:"热岚的剑士",name:"蒂琪",grain:"无",lv:8,atk:1800,direc:"7",spe:["炎纹lv3","风纹lv3"]},
	35:{ img:'card07' ,bl:"c", move:1,pre:"颤栗之源",name:"麦加",grain:"西法尔加",lv:9,atk:2300,direc:"7",spe:["格斗lv3","水纹lv3"]},
	36:{ img:'card08' ,bl:"c", move:1,name:"英雄模范",grain:"行",spe:["策略lv1"],tip:""},
	37:{ img:'card04' ,bl:"c", move:1,name:"一般强化士兵",grain:"西法尔加",lv:1,atk:240,direc:"7",spe:["军械使用lv1","格斗lv1"]},
	38:{ img:'card04' ,bl:"c", move:1,name:"利齿兽",grain:"异兽",lv:1,atk:320,direc:"7",spe:[]},
	39:{ img:'card07' ,bl:"c", move:1,name:"秃头的人贩",grain:"西法尔加",lv:1,atk:160,direc:"7",spe:[]},
	40:{ img:'card07' ,bl:"c", move:1,name:"薄暮婚纱的舞姬",grain:"西法尔加",lv:1,atk:160,direc:"7",spe:[]},
	41:{ img:'card08' ,bl:"c", move:1,name:"闪瓮",grain:"行",spe:["圣纹lv1"],tip:""},
	42:{ img:'card06' ,bl:"k", move:3,pre:"无形避役",name:"里斯尔德",grain:"谍报局",lv:6,atk:760,direc:"7",spe:["策略lv2","光纹lv2"]},
	43:{ img:'card08' ,bl:"c", move:1,name:"风刃",grain:"行",spe:["风纹lv1"],tip:""},
	44:{ img:'card06' ,bl:"c", move:1,pre:"混入敌后",name:"涅古莉",grain:"谍报局",lv:2,atk:220,direc:"7",spe:["策略lv1"]},
	45:{ img:'card06' ,bl:"l", move:3,pre:"武装",name:"涅古莉",grain:"谍报局",lv:5,atk:650,direc:"7",spe:["策略lv2"]},
	46:{ img:'card06' ,bl:"l", move:1,pre:"善良的",name:"哈米",grain:"无",lv:2,atk:150,direc:"7",spe:[""]},
	47:{ img:'card06' ,bl:"l", move:1,pre:"迷茫的女仆",name:"奥菲丽娅",grain:"西法尔加",lv:10,atk:3000,direc:"7",spe:["格斗lv3"]},
}
	



com.class = com.class || {} //类

	
			
	
 
com.class.Bg = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	
	this.show = function (){
		
		if (this.isShow) com.ct.drawImage(com.bgImg, com.spaceX * this.x,com.spaceY *  this.y);
	}
}
com.class.Pane = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.newX = x||0; 
    this.newY = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) {
			com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX , com.spaceY *  this.y + com.pointStartY)
			com.ct.drawImage(com.paneImg, com.spaceX * this.newX + com.pointStartX  , com.spaceY *  this.newY + com.pointStartY)
		}
	}
}

com.class.Dot = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	this.dots=[]
	
	this.show = function (){
		for (var i=0; i<this.dots.length;i++){
			if (this.isShow) {com.ct.drawImage(com.dotImg, com.spaceX * this.dots[i][0]+10  + com.pointStartX ,com.spaceY *  this.dots[i][1]+10 + com.pointStartY);
			//com.dotImg.play2();
			}
		}
	}
}
com.init();

if ('getContext' in document.createElement('canvas')) {
    HTMLImageElement.prototype.play2 = function() {
        if (this.storeCanvas) {
            // 移除存储的canvas
            this.storeCanvas.parentElement.removeChild(this.storeCanvas);
            this.storeCanvas = null;
            // 透明度还原
            image.style.opacity = '';
        }
        if (this.storeUrl) {
            this.src = this.storeUrl;    
        }
    };
    HTMLImageElement.prototype.stop = function() {
        var canvas = document.createElement('canvas');
        // 尺寸
        var width = this.width, height = this.height;
        if (width & height) {
            // 存储之前的地址
            if (!this.storeUrl) {
                this.storeUrl = this.src;
            }
            // canvas大小
            canvas.width = width;
            canvas.height = height;
            // 绘制图片帧（第一帧）
            canvas.getContext('2d').drawImage(this, 0, 0, width, height);
            // 重置当前图片
            try {
                this.src = canvas.toDataURL("image/gif");
            } catch(e) {
                // 跨域
                this.removeAttribute('src');
                // 载入canvas元素
                canvas.style.position = 'absolute';
                // 前面插入图片
                this.parentElement.insertBefore(canvas, this);
                // 隐藏原图
                this.style.opacity = '0';
                // 存储canvas
                this.storeCanvas = canvas;
				
            }
        }
    };
}