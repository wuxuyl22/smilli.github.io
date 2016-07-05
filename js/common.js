var com = com||{};

com.init = function (stype){

	com.nowStype= stype || com.getCookie("stype") ||"stype1";
	var stype = com.stype[com.nowStype];
	com.width			=	stype.width;		//�������
	com.height			=	stype.height; 		//�����߶�
	com.spaceX			=	stype.spaceX;		//�ŵ�X���
	com.spaceY			=	stype.spaceY;		//�ŵ�Y���
	com.pointStartX		=	stype.pointStartX;	//��һ���ŵ�X����;
	com.pointStartY		=	stype.pointStartY;	//��һ���ŵ�Y����;
	com.page			=	stype.page;			//ͼƬĿ¼

	com.get("box").style.width = com.width+130+"px";
	com.get("box").style.height =com.height+600+"px";
	com.canvas			=	document.getElementById("chess1"); //����
	com.ct				=	com.canvas.getContext("2d") ; 
	
	//com.canvas2			=	document.getElementById("chess2"); //����
	//com.ct2				=	com.canvas2.getContext("2d") ; 
	com.canvas.width	=	com.width
	com.canvas.height	=	com.height+230;
	
	com.childList		=	com.childList||[];
	com.handdd = []
	com.argsCount = 31
	
	com.loadImages(com.page);		//����ͼƬ/ͼƬĿ¼
	//z(com.initMap.join())
}

//��ʽ
com.stype = {
	stype1:{
		width:368,		//�������
		height:520, 		//�����߶�
		spaceX:118,		//�ŵ�X���
		spaceY:104,		//�ŵ�Y���
		pointStartX:32,		//��һ���ŵ�X����;
		pointStartY:4,		//��һ���ŵ�Y����;
		page:"stype_1"	//ͼƬĿ¼
	},
	stype2:{
		width:530,		//�������
		height:567, 		//�����߶�
		spaceX:57,		//�ŵ�X���
		spaceY:57,		//�ŵ�Y���
		pointStartX:-2,		//��һ���ŵ�X����;
		pointStartY:0,		//��һ���ŵ�Y����;
		page:"stype_2"	//ͼƬĿ¼
	}		
}
//��ȡID
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
	com.mans	 ={};		//���Ӽ���
	com.hands ={};
		//��������	
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

//����ͼƬ
com.loadImages = function(stype){
	
	//��������
	com.bgImg = new Image();
	com.bgImg.src  = "img/"+stype+"/chessBg3.png";
	//��ʾ��
	com.dotImg = new Image();
	com.dotImg.src  = "img/"+stype+"/dot.png";
	
	//��Ƭ������
	com.BlightImg = new Image();
	com.BlightImg.src  = "img/"+stype+"/card_blue.png";
	com.RlightImg = new Image();
	com.RlightImg.src  = "img/"+stype+"/card_red.png";
	
	com.invImg = new Image();
	com.invImg.src  = "img/"+stype+"/wudi.png";
	//����
	for (var i in com.args){
		com[i] = {};
		com[i].img = new Image();
		com[i].img.src = "img/"+stype+"/"+ com.args[i].img +".png";
	}
	
	//����Ӱ
	com.paneImg = new Image();
	com.paneImg.src  = "img/"+stype+"/r_box.png";
	
	document.getElementsByTagName("body")[0].style.background= "url(img/"+stype+"/bg.jpg)";
	
}

//��ʾ�б�
com.show = function (){
	//com.ct.clearRect(0, 0, com.width+200, com.height+200); 
	//com.ct2.clearRect(110, 110, 100, 100); 
	
	for (var i=0; i<com.childList.length ; i++){
		com.childList[i].show();
	}	
	com.dot.show();
	//test(333)
}

//��ʾ�ƶ����������
com.showPane  = function (x,y,newX,newY){
	com.pane.isShow=true;
	com.pane.x= x ;
	com.pane.y= y ;
	com.pane.newX= newX ;
	com.pane.newY= newY ;
}

//���ɳ�ʼ����------------------------------------------------------------------------------------------------------------------------------------
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

//com.alert�ļ�д������z�����������
var z = com.alert;

//��ȡԪ�ؾ���ҳ�����ľ���
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

//���cookie
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
//��ά�����¡
com.arr2Clone = function (arr){
	var newArr=[];
	for (var i=0; i<arr.length ; i++){	
		newArr[i] = arr[i].slice();
	}
	return newArr;
}

//ajax��������
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

//�����������ŷ�
com.createMove = function (map,x,y,newX,newY){
	var h="";
	var man = com.mans[map[y][x]];
	h+= man.text;
	map[newY][newX] = map[y][x];
	delete map[y][x];
	if (man.my===1){
		var mumTo=["һ","��","��","��","��","��","��","��","��","ʮ"];	
		newX=8-newX;
		h+= mumTo[8-x];
		if (newY > y) {
			h+= "��";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y -1];
			}
		}else if (newY < y) {
			h+= "��";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY -1];
			}
		}else {
			h+= "ƽ";
			h+= mumTo[newX];
		}
	}else{
		var mumTo=["��","��","��","��","��","��","��","��","��","10"];
		h+= mumTo[x];
		if (newY > y) {
			h+= "��";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y-1];
			}
		}else if (newY < y) {
			h+= "��";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY-1];
			}
		}else {
			h+= "ƽ";
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
            //��0��index��֮�����ȡһ��ֵ����index����Ԫ�ؽ���   
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

//�������ߵ��ŵ�
com.bylaw ={}
//��
com.bylaw.c = function (x,y,map,my,move,selet){
	var d=[];
	se=selet?selet:0

	
	//������
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
	//�Ҳ����
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
	//�ϼ���
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
	//�¼���
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
	//������
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
	//�ϼ���
	for (var i = y-1 ; i >= 0; i--){
		if(i>= y-move){

		 if (se==0) d.push([x,i]);
			if (se==1) if(!(play.map[i][x]>=0)){d.push([x,i]);}
			if (se==2) if(play.map[i][x]>=0&&bc[play.map[i][x]].my!=my){d.push([x,i]);break}
			if (se==3)if(play.map[i][x]>=0&&bc[play.map[i][x]].my==my){d.push([x,i]);break}
		}
		
	}
	//�¼���
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
//��
com.bylaw.m = function (x,y,map,my){
	var d=[];
		//1��
		if ( y-2>= 0 && x+1<= 8 && !play.map[y-1][x] &&(!com.mans[map[y-2][x+1]] || com.mans[map[y-2][x+1]].my!=my)) d.push([x+1,y-2]);
		//2��
		if ( y-1>= 0 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y-1][x+2]] || com.mans[map[y-1][x+2]].my!=my)) d.push([x+2,y-1]);
		//4��
		if ( y+1<= 9 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y+1][x+2]] || com.mans[map[y+1][x+2]].my!=my)) d.push([x+2,y+1]);
		//5��
		if ( y+2<= 9 && x+1<= 8 && !play.map[y+1][x] &&(!com.mans[map[y+2][x+1]] || com.mans[map[y+2][x+1]].my!=my)) d.push([x+1,y+2]);
		//7��
		if ( y+2<= 9 && x-1>= 0 && !play.map[y+1][x] &&(!com.mans[map[y+2][x-1]] || com.mans[map[y+2][x-1]].my!=my)) d.push([x-1,y+2]);
		//8��
		if ( y+1<= 9 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y+1][x-2]] || com.mans[map[y+1][x-2]].my!=my)) d.push([x-2,y+1]);
		//10��
		if ( y-1>= 0 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y-1][x-2]] || com.mans[map[y-1][x-2]].my!=my)) d.push([x-2,y-1]);
		//11��
		if ( y-2>= 0 && x-1>= 0 && !play.map[y-1][x] &&(!com.mans[map[y-2][x-1]] || com.mans[map[y-2][x-1]].my!=my)) d.push([x-1,y-2]);

	return d;
}

//��
com.bylaw.x = function (x,y,map,my){
	var d=[];
	if (my===1){ //�췽
		//4���
		if ( y+2<= 9 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//7���
		if ( y+2<= 9 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//1���
		if ( y-2>= 5 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//10���
		if ( y-2>= 5 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}else{
		//4���
		if ( y+2<= 4 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//7���
		if ( y+2<= 4 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//1���
		if ( y-2>= 0 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//10���
		if ( y-2>= 0 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}
	return d;
}

//����
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

//���ܽ�ս
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


//��
com.bylaw.p = function (x,y,map,my){
	var d=[];
	//������
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
	//�Ҳ����
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
	//�ϼ���
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
	//�¼���
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

//����
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



//����Ϊ���ּ�ֵλ�õĵ���


//��������
com.args={
	 
	1:{ img:'card01' ,bl:"c", move:1,pre:"�¼�����",name:"��³",grain:"��",lv:3,atk:300,direc:"7",spe:["����lv2"]},
	2:{ img:'card02' ,bl:"c", move:1,name:"�ӻ��̵�����",grain:"��",lv:1,atk:100,direc:"46",spe:[""]},
	3:{ img:'card03' ,bl:"c", move:4,pre:"��ĺ��ɴ�����輧",name:"��������",grain:"��������",lv:3,atk:4000,direc:"1",spe:["����lv1"]},
	4:{ img:'card04' ,bl:"t", move:3,name:"ʧ���ͽ�ҩ��ʿ",grain:"���ǽ̻�",lv:2,atk:100,direc:"8",spe:["��еʹ��lv1"]},
	5:{ img:'card05' ,bl:"c", move:2,name:"��Я����",grain:"��",lv:2,atk:400,direc:"8",spe:["��еʹ��lv1"]},
	6:{ img:'card06' ,bl:"f", move:4,pre:"����",name:"����",grain:"��",lv:3,atk:6000,direc:"1",spe:["����lv1","����lv1"]},
	7:{ img:'card07' ,bl:"f", move:4,pre:"ս�ԡ�",name:"��³",grain:"��",lv:3,atk:5000,direc:"1",spe:["����lv2"]},
	8:{ img:'card08' ,bl:"c", move:1,pre:"˪��",name:"ϣ����",grain:"����",lv:5,atk:1280,tip:"���͵ģ���ɱ��������",spe:["��lv1"]},
	9:{ img:'card08' ,bl:"c", move:1,name:"���",grain:"��",spe:["ͨ��"],tip:"�����˾���һ��"},
	10:{ img:'card01' ,bl:"c", move:1,pre:"���֮Ӱ",name:"������",grain:"��",lv:3,atk:440,direc:"7",spe:["��еʹ��lv1"]},
	11:{ img:'card01' ,bl:"c", move:2,pre:"������",name:"������",grain:"��������",lv:4,atk:620,direc:"7",skill:1,spe:["����lv1"]},
	12:{ img:'card01' ,bl:"c", move:1,pre:"���ǽ̻���޵�ʿ����",name:"�׼�",grain:"���ǽ̻�",lv:4,atk:700,direc:"7",skill:1,spe:["ʥ��"]},
	13:{ img:'card04' ,bl:"c", move:1,pre:"����֮��",name:"ϯ��",grain:"������",lv:6,atk:1200,direc:"7",spe:["��lv3"]},
	14:{ img:'card08' ,bl:"c", move:1,name:"����ˤ",grain:"��",spe:["��lv1"],tip:"���鷳�ĵ����ӿ�"},
	15:{ img:'card08' ,bl:"c", move:1,pre:"���п�ħ",name:"����",grain:"������",lv:4,atk:660,direc:"7",spe:["��lv2"]},
	16:{ img:'card08' ,bl:"c", move:1,pre:"����֮ȭ",name:"����",grain:"������",lv:9,atk:2360,direc:"7",spe:["��lv3","����lv2"]},
	17:{ img:'card05' ,bl:"c", move:1,name:"�������",grain:"��",spe:["����lv1"],tip:"��������"},
	18:{ img:'card06' ,bl:"c", move:1,pre:"����֮��",name:"����",grain:"������",lv:7,atk:680,direc:"7",spe:["����lv3","����lv2"]},
	19:{ img:'card05' ,bl:"l", move:2,name:"ʮ�ֳ���",grain:"��",spe:["����lv3"],tip:"AOE"},
	20:{ img:'card05' ,bl:"c", move:4,name:"������ȭ",grain:"��",spe:["����lv1"],tip:"�������"},
	21:{ img:'card09' ,bl:"f", move:1,name:"ŭ�����",grain:"��",spe:["����lv2"],tip:"�������ڵ���˫�����ﵽ��ͬĿ��"},
	22:{ img:'card09' ,bl:"f", move:1,name:"������ѵ",grain:"��",spe:["ͨ��"],tip:"ȱ�����ã�ע�⸺��Ч����"},
	23:{ img:'card09' ,bl:"f", move:1,name:"��������",grain:"��",spe:["ͨ��"],tip:"��������"},
	24:{ img:'card09' ,bl:"f", move:1,name:"����ָ��",grain:"��",spe:["ͨ��"],tip:"�ÿ�����Σ������"},
	25:{ img:'card06' ,bl:"c", move:1,name:"���������",grain:"����",lv:3,atk:200,direc:"7",spe:[]},
	26:{ img:'card06' ,bl:"c", move:1,pre:"�������",name:"�׼�",grain:"���ǽ̻�",lv:8,atk:1620,direc:"7",spe:["ʥ��lv2"]},
	27:{ img:'card06' ,bl:"c", move:1,pre:"���ǽ̻�ĳ�Ů��Ů",name:"��ɯ",grain:"���ǽ̻�",lv:7,atk:1820,direc:"7",spe:["ʥ��lv2","��lv2"]},
	28:{ img:'card04' ,bl:"c", move:1,name:"�����ʿ",grain:"���ǽ̻�",lv:1,atk:240,direc:"7",spe:["ʥ��lv1"]},
	29:{ img:'card04' ,bl:"c", move:1,name:"�ۼ�����",grain:"����",lv:1,atk:8000,direc:"7",spe:["����lv1"]},
	30:{ img:'card04' ,bl:"f", move:2,name:"��ǹǿ��ʿ��",grain:"��������",lv:2,atk:240,direc:"7",spe:["��еʹ��lv1"]},
	31:{ img:'card04' ,bl:"c", move:1,name:"����������ʦ��",grain:"��������",lv:2,atk:220,direc:"7",spe:["��lv1"]},
	32:{ img:'card08' ,bl:"c", move:1,name:"����Ӱ",grain:"��",spe:["��lv1"],tip:"�ƶ����汸���������ҿ��Դ����չ���Ч"},
	33:{ img:'card08' ,bl:"c", move:1,name:"��������",grain:"��",spe:["��lv1"],tip:""},
	34:{ img:'card06' ,bl:"l", move:3,pre:"��ᰵĽ�ʿ",name:"����",grain:"��",lv:8,atk:1800,direc:"7",spe:["����lv3","����lv3"]},
	35:{ img:'card07' ,bl:"c", move:1,pre:"����֮Դ",name:"���",grain:"��������",lv:9,atk:2300,direc:"7",spe:["��lv3","ˮ��lv3"]},
	36:{ img:'card08' ,bl:"c", move:1,name:"Ӣ��ģ��",grain:"��",spe:["����lv1"],tip:""},
	37:{ img:'card04' ,bl:"c", move:1,name:"һ��ǿ��ʿ��",grain:"��������",lv:1,atk:240,direc:"7",spe:["��еʹ��lv1","��lv1"]},
	38:{ img:'card04' ,bl:"c", move:1,name:"������",grain:"����",lv:1,atk:320,direc:"7",spe:[]},
	39:{ img:'card07' ,bl:"c", move:1,name:"ͺͷ���˷�",grain:"��������",lv:1,atk:160,direc:"7",spe:[]},
	40:{ img:'card07' ,bl:"c", move:1,name:"��ĺ��ɴ���輧",grain:"��������",lv:1,atk:160,direc:"7",spe:[]},
	41:{ img:'card08' ,bl:"c", move:1,name:"����",grain:"��",spe:["ʥ��lv1"],tip:""},
	42:{ img:'card06' ,bl:"k", move:3,pre:"���α���",name:"��˹����",grain:"������",lv:6,atk:760,direc:"7",spe:["����lv2","����lv2"]},
	43:{ img:'card08' ,bl:"c", move:1,name:"����",grain:"��",spe:["����lv1"],tip:""},
	44:{ img:'card06' ,bl:"c", move:1,pre:"����к�",name:"������",grain:"������",lv:2,atk:220,direc:"7",spe:["����lv1"]},
	45:{ img:'card06' ,bl:"l", move:3,pre:"��װ",name:"������",grain:"������",lv:5,atk:650,direc:"7",spe:["����lv2"]},
	46:{ img:'card06' ,bl:"l", move:1,pre:"������",name:"����",grain:"��",lv:2,atk:150,direc:"7",spe:[""]},
	47:{ img:'card06' ,bl:"l", move:1,pre:"��ã��Ů��",name:"�·����",grain:"��������",lv:10,atk:3000,direc:"7",spe:["��lv3"]},
}
	



com.class = com.class || {} //��

	
			
	
 
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
            // �Ƴ��洢��canvas
            this.storeCanvas.parentElement.removeChild(this.storeCanvas);
            this.storeCanvas = null;
            // ͸���Ȼ�ԭ
            image.style.opacity = '';
        }
        if (this.storeUrl) {
            this.src = this.storeUrl;    
        }
    };
    HTMLImageElement.prototype.stop = function() {
        var canvas = document.createElement('canvas');
        // �ߴ�
        var width = this.width, height = this.height;
        if (width & height) {
            // �洢֮ǰ�ĵ�ַ
            if (!this.storeUrl) {
                this.storeUrl = this.src;
            }
            // canvas��С
            canvas.width = width;
            canvas.height = height;
            // ����ͼƬ֡����һ֡��
            canvas.getContext('2d').drawImage(this, 0, 0, width, height);
            // ���õ�ǰͼƬ
            try {
                this.src = canvas.toDataURL("image/gif");
            } catch(e) {
                // ����
                this.removeAttribute('src');
                // ����canvasԪ��
                canvas.style.position = 'absolute';
                // ǰ�����ͼƬ
                this.parentElement.insertBefore(canvas, this);
                // ����ԭͼ
                this.style.opacity = '0';
                // �洢canvas
                this.storeCanvas = canvas;
				
            }
        }
    };
}