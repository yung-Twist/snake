var LEFT=37;
var TOP=38;
var RIGHT=39;
var DOWN=40;
function Snake(options){
	this._init(options);
}
// 构建Snake的原型对象
Snake.prototype = {
	constructor:Snake,
	_init:function(options){
		// 初始化时，指定小蛇的长度为4，并设定小蛇的大小
		options = options || {};
		this.len = options.len || 4;
		this.wh = options.wh || 20;
		this.fillStyle = options.fillStyle || "#000";
		this.strokeStyle = options.strokeStyle || "#000";
		this.dir=options.dir|| RIGHT;
		this.allowChangeDir=options.allowChangeDir|| true;
		this.fps=options.fps||10;
		this.score=0;
		// 准备一个数组，用于保存所有的rect对象
		this.snakeBody = [];
		// 结合循环，来进行对应的rect对象的创建
		for(var i=0;i<this.len;i++){
			var rect = new Rect({
				x : i * this.wh,
				y : 0,
				w : this.wh,
				h : this.wh,
				fillStyle : randomColor(),
				strokeStyle: randomColor()
			});
			this.snakeBody.splice(0,0,rect);
		};
			this.head=this.snakeBody[0];
			this.head.fillStyle="red";
		// 食物
		this.createFood();
	},
	start:function(ctx,canvas){
		canvas.width = canvas.width;
		canvas.height = canvas.height;
		for(var i in this.snakeBody){
			this.snakeBody[i].render(ctx);
		} 
		this.food.render(ctx);
	},
	run:function(ctx,canvas,code){
		var that = this;

			
		this.timer=setInterval(function(){
			// 动起来 --> 往小蛇数组的最末尾去添加一个rect对象
			// var sn = that.snakeBody[that.snakeBody.length - 1];
			var x  = that.head.x;
			var y  = that.head.y; 
			var rect = new Rect({
				x : x,
				y : y,
				w : that.head.w,
				h : that.head.h,
				fillStyle : randomColor(),
				strokeStyle : randomColor()
			});
			if(that.dir==LEFT){
				that.head.x-=that.head.w;		 
			}else if(that.dir==TOP){
				that.head.y-=that.head.w;
			}else if(that.dir==RIGHT){
				that.head.x+=that.head.w;
			}else if(that.dir==DOWN){
				that.head.y+=that.head.w;
			};
			that.snakeBody.splice(1,0,rect);

			//判断方向
			if(that.head.x==that.food.x&&that.head.y==that.food.y){
				that.score++;
				if(that.score%10==0){
					that.fps+=5;
					clearInterval(that.timer);
					that.run(ctx,canvas);
				}
				that.createFood();
			}else{
				that.snakeBody.pop();
			}
			that.start(ctx,canvas);
			that.allowChangeDir=true;

			// 判断游戏是否结束

			var isOver=that.gameIsOver();
			if(isOver==true){
				clearInterval(that.timer);
				// alert("菜的抠脚"+that.score);
				if(confirm("得分:"+that.score+",是否重新开始")){
				location.reload();

				}
			}
			
		},1000/this.fps);
	},
	changeDirection:function(dir){
		if(
			(this.dir==LEFT&&dir==RIGHT)
			||(this.dir==RIGHT&&dir==LEFT)
			||(this.dir==TOP&&dir==DOWN)
			||(this.dir==DOWN&&dir==TOP)
		){
			return;
		}

		if(this.allowChangeDir){
			this.dir=dir;
			this.allowChangeDir=false;
		}
	},
	createFood:function(){
		//食物
		var maxHor=parseInt(canvas.width/this.wh);
		var maxVir=parseInt(canvas.height/this.wh);
		var isCover=true;
		while(isCover){
			isCover=false;
			var foodX=(parseInt(Math.random()*maxHor))*this.wh;
			var foodY=(parseInt(Math.random()*maxVir))*this.wh;
			for(var i in this.snakeBody){
				var obj=this.snakeBody[i];
				if(obj.x==foodX&&obj.y==foodY){
					isCover=true;
					break;
				}
			}
		}
		this.food=new Rect({
			x:foodX,
			y:foodY,
			w:this.wh,
			h:this.wh,
			fillStyle : randomColor(),
			strokeStyle: randomColor()

		})
	},
	gameIsOver:function(){
		var isOver = false;
		if(this.head.x<0
			||this.head.y<0
			||this.head.x>=canvas.width
			||this.head.y>=canvas.height){
			return true;
		}
		for(var i=1;i<this.snakeBody.length;i++){
			if(this.head.x==this.snakeBody[i].x
				&&this.head.y==this.snakeBody[i].y){
				return true;
			}
		}
	},
	randomColor:function(){
		var colorEles=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
			var color="#";
			for(var i=0;i<6;i++){
				color+=colorEles[randomInt(colorEles.length)];
			}
				return color
	}
}
function randomInt(num){
			return parseInt(Math.random()*num);

		}
function randomColor(){
			var colorEles=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
			var color="#";
			for(var i=0;i<6;i++){
				color+=colorEles[randomInt(colorEles.length)];
			}
				return color
		}
