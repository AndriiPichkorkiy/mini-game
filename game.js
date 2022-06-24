console.log("game.js start");
grassTile1.onload = beginScript; //доработать

var ctx; //canvas.context
var player = [];
var arrows = [];
var arrowsMobs = [];
var mobs = [];
var kills = [];
var terra = [];
var arrayMap = []; //препядствия
var arrayMapObj = [];
var arrayMapEnity = []; //кустики, камушки
var lastTime = Date.now()+1;
var score = 0;
var camera;
var pause = false;
/*beginScript1();
function beginScript1() {
	if (tempForResourse > 0) {
		console.log(tempForResourse);
		window.requestAnimationFrame(beginScript1);
	} else {
		console.log(tempForResourse);
		beginScript();
	}
} */
function beginScript() { //start!!! =) [11*64-1, 9*64-1] 
	camera = new Camera ([0, 0], [15*64, 11*64], [1024, 1024]);
	setupCanvas();
	ctx.translate(196, 128);
	createMap()
	createPlayer("playerName", 128, "stay", "down", [65, 65], KyPolein, [0, 64*10], [64, 64], 12, false, [0],
											  "bow", 512, 9*64, 45, Math.floor(Math.random() * 6) * 64, 200, "player", 1);
	//createMobs;
	for(var i = 0; i < 1; i++) {createMob("skeletonName", 128, "walk", "down", [4*64-1, 3*64-1], skeletonArcher, [0, 64*10], [64, 64], 12, false, [0],
											  "bow", 512, 9*64, 45, Math.floor(Math.random() * 6) * 64, 100, "mob", 1.5);
	}
	//create objects
	createaMapObj("tower", 0, "stay", "down", [10.5*64, 10*64], tower06, [0, 0], [128, 128], 1, false, [0],
					  "building", 0, 0, 0, 0, 250, "building", 1.5);
	
	//startGame
	main();
}

function setupCanvas() {
	var canvas = document.getElementById("game");
	canvas.width  = camera.size[0];
	canvas.height = camera.size[1];
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, ctx.width, ctx.hight);
	
}

var map = [
		//0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
		[ 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],//0
		[ 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2],//1
		[ 2, 7, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 0, 0, 0, 0, 8, 8, 8, 7, 2],//2
		[ 2, 7, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 0, 0, 8, 8, 8, 0, 8, 8, 2],//3
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 0, 0, 0, 0, 0, 0, 8, 7, 2],//4
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 8, 7, 2],//5
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 8, 0, 8, 7, 2],//6
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 8, 8, 8, 7, 2],//7
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 8, 0, 7, 2],//8
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 8, 0, 7, 2],//9
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 3, 0, 7, 0, 0, 0, 0, 0, 8, 0, 7, 2],//10
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 2, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 2],//11
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 2],//12
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 2],//13
		[ 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 7, 2],//14
		[ 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4] //15
];
/*var mapObj = [
		//0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//0
		[ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//1
		[ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//2
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//3
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//4
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//5
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//6
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//7
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//8
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//9
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],//10
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//11
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//12
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//13
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//14
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //15
]; */
function createMap() {
	for( var i = 0; i < map.length; i++) {
		for ( j = 0; j < map[i].length; j++) {
			var x = j * 64;
			var y = i * 64;
			//createMap
			

			if(map[i][j] == 0) { //grass
				arrayMap.push({
					pos: [x, y],
					type: "grass",
					playerCanWalk : true,
					bulletCanWalk : true,
					sprite: new Sprite(grassTile1, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
			else if (map[i][j] == 1) { //waterChannel1
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterChannel1, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
			else if(map[i][j] == 2) { //waterChannel2
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterChannel2, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
			else if(map[i][j] == 3) { //waterAngel1
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterAngel1, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
			else if(map[i][j] == 4) { //waterAngel2
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterAngel2, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
			else if(map[i][j] == 5) { //waterAngel3
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterAngel3, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
			else if(map[i][j] == 6) { //waterAngel4
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterAngel4, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
			else if(map[i][j] == 7) { //sand
				arrayMap.push({
					pos: [x, y],
					type: "sand",
					playerCanWalk : true,
					bulletCanWalk : true,
					sprite: new Sprite(sandTile, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
			else if(map[i][j] == 8) { //box
				arrayMapObj.push({
					pos: [x, y],
					type: "box64",
					playerCanWalk : false,
					bulletCanWalk : false,
					sprite: new Sprite(box64, [0, 0], [64, 64], 0 , false, [0]),
					enityPosSprite : function() {
						this.sprite.enityPos = this.pos;
					}
				});
			}
 
		}
	}
}
function main() {
	//time is:
	var now = Date.now();
	var dt = (now - lastTime) / 1000;
	lastTime = now;
	
	if(pause == true) {
		window.requestAnimationFrame(main);
	}
	//mobs spawn:
	spawnMobs(dt);//test
	
	//render
	//ctx.fillStyle = "black";
	ctx.fillStyle = "#485";
	ctx.fillRect(-256, -256, 2048, 256);
	ctx.fillRect(-256,    0, 256, 1280);
	ctx.fillRect(-256, 1024, 2048, 256);
	//ctx.fillStyle = "#596";
	ctx.fillRect(1536, -256, 1280, 1280);
	renderMap(arrayMap);
	renderMap(arrayMapObj);
	
	renderEnities(kills);
	renderEnities(arrows);
	renderEnities(arrowsMobs);
	renderEnities(mobs);
	renderEnities(arrayMapEnity);
	renderScore();
	//renderWTF(); //debug
	
	if(player.length == 0) {
		renderNewGame(false);
		
		return;
	} else {
		//what is a button input?
		setupHandle(dt);
		renderEnities(player[0]);
		
	}
	//Artificial Intelligence
	AIorders(dt, now);
	
	spritesArrayUpdate(dt);
	collidesArrays(arrows, mobs);
	collidesArrays(arrows, arrayMapObj);
	collidesArrays(arrows, arrayMapEnity);
	collidesArrays(arrowsMobs, player);
	collidesArrays(arrowsMobs, arrayMapObj);

	window.requestAnimationFrame(main);

};
function Enity(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames, 
				type, speedAttack, range, damage, imageAttack, hp, who, timeForAttack){
				this.name = name;
				this.speed = speed;
				this.status = status;
				this.dir = dir;
				this.pos = pos;
				this.sprite = new Sprite(spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames);
				this.type = type;
				this.speedAttack= speedAttack;
				this.range = range; //not used
				this.damage = damage;
				this._indexAttack = 0;
				this.lastTimeFire = Date.now(); //not used
				this.imageAttack = imageAttack;
				this._AIcollides = false;
				this._AItimeForOrder = 0;
				this._AIorder = "";
				this._AIangry = false;
				this.hp = hp || 100;
				this.maxHP = hp || 100;
				this.who = who || "mob";
				this._AIradiusWatch = 256
				this.enityPosSprite = function() {
					this.sprite.enityPos = this.pos;
					}
				this._AItimeForAttack = timeForAttack || 1.5;
};
//camera = new Camera ([0, 0], [9*64, 9*64], [1024, 1024]);
function Camera(pos, size, mapSize) {
	this.pos = pos;
	this.size = size;
	this.mapSize = mapSize;
	this.posMax = [mapSize[0] - size[0], mapSize[1] - size[1]];
	this.move = function(dt, dir) {
		//console.log(this.pos);
		//ctx.translate(player[0].pos[0], player[0].pos[1]);
		//if(player[0].pos[1] > this.posMax[1]) { return } else {
		//if (this.pos[1] - tempY > this.posMax[1]) { return } else {	
		
		//if (player[0].pos[1] + this.size[1]/2 > this.mapSize[1] || player[0].pos[1] - this.size[1]/2 < 0 ||
		//	player[0].pos[0] + this.size[0]/2 > this.mapSize[0] || player[0].pos[0] + this.size[0]/2 > 0) { return }
		var tempPos = this.pos;
		if(dir == "down") {
			var tempY = 0 - player[0].speed * dt;
			this.pos[1] -= tempY;
			ctx.translate(0, tempY);
		} else if(dir == "up") {
			var tempY = player[0].speed * dt;
			this.pos[1] -= tempY;
			ctx.translate(0, tempY);
		} else if(dir == "left") {
			var tempX = player[0].speed * dt;
			this.pos[0] -= tempX;
			ctx.translate(tempX, 0);
		} else if(dir == "right") {
			var tempX = 0 - player[0].speed * dt;
			this.pos[0] -= tempX;
			ctx.translate(tempX, 0);
		}
	}
}

function createPlayer(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp, who, timeForAttack){
					  var tempVar = new Enity(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp, who, timeForAttack);
					  player.push(tempVar);
					  }

function createMob(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp, timeForAttack){
					  var tempVar = new Enity(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp, timeForAttack);
					  mobs.push(tempVar);
					  }

function createMobkills(pos, spriteUrl){
					  var tempVar = new Enity("name", 0, "stay", "down", pos, spriteUrl, [0, 64*20], [64, 64], 8, true, [0, 1, 2, 3, 4, 5],
					  "mob", 0, 0, 0, 0, 0);
					  kills.push(tempVar);
					  }

function createaMapObj(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp, timeForAttack){
					  var tempVar = new Enity(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp, timeForAttack);
					  arrayMapEnity.push(tempVar);
					  }

Enity.prototype.enityAttack = function(dt) {
	this.status = "attack";
	this.sprite.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	this.sprite._index = 0;
	this._indexAttack = (this.sprite.frames.length / this.sprite.speed) ;
	switch(this.dir) {
		case "up":  this.sprite.pos[1] = 16*64; break;
		case "down": this.sprite.pos[1] = 18*64; break;
		case "left": this.sprite.pos[1] = 17*64; break;
		default: this.sprite.pos[1] = 19*64;
	}
	this._tempIndexForAttack = 1;
}

Enity.prototype.addArrow = function(who) {
	who.push({pos: [this.pos[0], this.pos[1]], 
				 type: this.type,
				 speed: this.speedAttack, 
				 dir: this.dir,
				 range: this.range, 
				 damage: this.damage,
				 _indexAttack: 0,
				 sprite: new Sprite(arrowsPaintNet, [256, this.imageAttack], [64, 64], 1, false, [0]),
				 move: function(dt) {
					 this.damage -= 20*dt;
					 switch(this.dir) {
						 
						 case "up": this.pos[1] -= 		this.speed*dt; 
														this.sprite.dir(this.dir, this.type); break;
						 case "down": this.pos[1] +=	this.speed*dt;
														this.sprite.dir(this.dir, this.type); break;
						 case "left": this.pos[0] -= 	this.speed*dt;
														this.sprite.dir(this.dir, this.type); break;
						 case "right": this.pos[0] += 	this.speed*dt;
														this.sprite.dir(this.dir, this.type); break;
						 
						 default: console.log("something wrong, this.dir = " + this.dir);
					 }
				 },
				enityPosSprite : function() {
					this.sprite.enityPos = this.pos;
				}
				});
}
function Sprite(url, pos, size, speed, once, frames) {
	this.url = url;
	this.pos = pos; //
	this.size = size;
	this.speed = speed;
	this._index = 0;
	this.status = "stay";
	this.once = once;
	this.frames = frames || [1, 2, 3, 4, 5, 6, 7, 8];
	this.frameStatus = 0;
};

Sprite.prototype.update = function(dt) {
	this._index += this.speed*dt;
}
Sprite.prototype.dir = function(dir, type) {
	if (!type == "bow") {
		return;
	}
	
	switch(dir) {
		case "up":  this.pos[0] = 3*this.size[0]; break;
		case "down": this.pos[0] = 2*this.size[0]; break;
		case "left": this.pos[0] = 1*this.size[0]; break;
		default: this.pos[0] = 0;
	}
}
Enity.prototype.stay = function() {
	this.sprite.frames = [0];
	this.status = "stay";
	//this.sprite._index = 0;
}
Enity.prototype.hpRender = function() {
	if((this.hp)< this.maxHP ) {
		ctx.textAlign = "center";
		ctx.font = "bold 12px sans-serif";
		ctx.fillStyle = "black";
		ctx.fillRect(this.pos[0], this.pos[1] - 4, 64, 16); //доделать
		
		var varTeml = this.hp/this.maxHP * 100;
		if(varTeml > 75) { ctx.fillStyle = "lime"; }
		else if (varTeml > 50) { ctx.fillStyle = "orange";}
		else { ctx.fillStyle = "yellow";}
		ctx.fillText(Math.floor(this.hp) + " / " + this.maxHP, this.pos[0] + 32, this.pos[1] + 8);
	}
}
		
Enity.prototype.move = function(dt, dir) {
		var tempPos1 = this.pos[0];
		var tempPos2 = this.pos[1];

		this.status = "walk";
		this.sprite.frames = [1, 2, 3, 4, 5, 6, 7, 8];

		
		if(dir == "down") {
			this.sprite.pos[1] = 64*10;
			this.pos[1] += this.speed * dt;
			if (enityCollision(this)) {
				//console.log(status);
				this._AIcollides = true;
				this.pos[1] = tempPos2;
			} else if (this.who == "player") {
				camera.move(dt, "down");
			}
		} else if(dir == "up") {
			this.sprite.pos[1] = 64*8;
			this.pos[1] -= this.speed * dt;
			if (enityCollision(this)) {
				//console.log(status);
				this._AIcollides = true;
				this.pos[1] = tempPos2;
			} else if (this.who == "player") {
				camera.move(dt, "up");
			}
		} 
		if(dir == "left") {
			this.sprite.pos[1] = 64*9;
			this.pos[0] -= this.speed * dt;
			if (enityCollision(this)) {
				//console.log(status);
				this._AIcollides = true;
				this.pos[0] = tempPos1;
			} else if (this.who == "player") {
				camera.move(dt, "left"); 
			}
		} else if(dir == "right") {
			this.sprite.pos[1] = 64*11;
			this.pos[0] += this.speed * dt;
			if (enityCollision(this)) {
				//console.log(status);
				this._AIcollides = true;
				this.pos[0] = tempPos1;
			} else if (this.who == "player") {
				camera.move(dt, "right");
			}
		}
		//---
		this.dir = dir;
		
}
Sprite.prototype.render = function() {
	var frame;
	
	
	if(this.speed > 0) {
		var max = this.frames.length;
		var index = Math.floor(this._index);
		var frame = this.frames[index % max]; //console.log("frame = " + frame);
			
		if( this.once && index >= max ) {
			this.done = true; //console.log("name: " + this.url + ", is done o_0");
			return;
		}
	} else {
		frame = 0;
	}
	
	var x = this.pos[0] + frame * this.size[0];
	var y = this.pos[1]; //console.log("x = " + x + " y = " + y); //console.log(this);
	
	ctx.drawImage(this.url,
				  x, y,
				  this.size[0], this.size[1],
				  this.enityPos[0], this.enityPos[1],
				  this.size[0], this.size[1]);
	this.frameStatus = frame;
}
	
function renderEnities(enity) {
	if (enity instanceof Array){
		for (var i = 0; i < enity.length; i++) {
		enity[i].enityPosSprite();
		//ctx.save();
		//ctx.translate(enity[i].pos[0], enity[i].pos[1]);
		enity[i].sprite.render();
		if(enity[i].who == "player" || enity[i].who == "mob" || enity[i].who == "building") {
			enity[i].hpRender();
		}
		//ctx.restore();
		}
	} else { 
		//ctx.save();
		//ctx.translate(enity.pos[0], enity.pos[1]);
		enity.enityPosSprite();
		enity.sprite.render();
		if(enity.who == "player" || enity.who == "mob") {
			enity.hpRender();
		}
		//ctx.restore();
	}
}

function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return true;
        }
    }
    return false;
}

function setupHandle(dt) {
	if(player[0].status == "attack") {
		return;
	}
//isEmptyObject(pressedKeys
	if(!(input.isDown('DOWN') && input.isDown("s") && input.isDown('UP') && input.isDown("w") &&
	   input.isDown('LEFT') && input.isDown("a") && input.isDown('RIGHT') && input.isDown("d") && input.isDown('SPACE'))) {

		player[0].stay();
	}
	var tempPos1 = player[0].pos[0];
	var tempPos2 = player[0].pos[1];
	if(input.isDown('DOWN') || input.isDown("s")) {	
		player[0].move(dt, "down");
		
	} else if(input.isDown('UP') || input.isDown("w")) {
		player[0].move(dt, "up");
		
	}
	if(input.isDown('LEFT') || input.isDown("a")) {
		player[0].move(dt, "left");
		
	} else if(input.isDown('RIGHT') || input.isDown("d")) {
		player[0].move(dt, "right");
		
	}
	
	if (input.isDown('SPACE')) {
		player[0].enityAttack(dt);
	}
	


}

function renderMap(array) {
	for( var i = 0; i < array.length; i++) {
		//ctx.save();
		//ctx.translate(array[i].pos[0], array[i].pos[1]);
		array[i].enityPosSprite();
		array[i].sprite.render();
		//ctx.restore();
	}
}

function enityCollision(obj) {
	var pos = [(obj.pos[0] + 32), (obj.pos[1] + 32)];
	//var pos = player.pos;
	//var tempSize = [player.sprite.size[0], (player.sprite.size[1] - 32)];
	var size = [obj.sprite.size[0] - 64, (obj.sprite.size[1] - 48)];
	
	for (var i = 0; i < arrayMap.length; i++) {
		if (!arrayMap[i].playerCanWalk) {
			var pos2 = arrayMap[i].pos;
			var size2 = arrayMap[i].sprite.size;
			
			if (boxCollides(pos, size, pos2, size2)) {

				return true;
			}
		}
	}
	for (var i = 0; i < arrayMapObj.length; i++) {
		if (!arrayMapObj[i].playerCanWalk) {
			var pos2 = arrayMapObj[i].pos;
			var size2 = arrayMapObj[i].sprite.size;
			
			if (boxCollides(pos, size, pos2, size2)) {

				return true;
			}
		}
	}
}

function collides(x, y, r, b, x2, y2, r2, b2) {
			 //console.log("" + r + " <= " + x2 + " или " + x + " > " + r2 + " или ");
			//console.log("" + b + " <= " + y2 + " или " + y + ">" + b2);
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);

}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}


function Attack(type, speed, range, damage) {
	this.type = type,
	this.speed = speed,
	this.range = range,
	this.damage = damage
	this._index = 0;
}

function spritesArrayUpdate(dt) {
	//update player
	player[0].sprite.update(dt);
	if (player[0]._indexAttack <= 0) {
		player[0].status="stay";
	} else if (player[0].status == "attack"){
		player[0]._indexAttack -= dt;
		if(player[0].sprite.frameStatus == 8 && player[0]._tempIndexForAttack == 1) {
			//console.log("frameStatus = " + player[0].sprite.frameStatus); //console.log(player[0]); //console.log(arrows);
			player[0]._tempIndexForAttack = 0;
			player[0].addArrow(arrows);
		}
	}
	
	//update arrows
	for(var i = 0; i < arrows.length; i++) {;
		arrows[i].sprite.update(dt);
		arrows[i].move(dt);
	}
	
	//update arrowsMobs
	for(var i = 0; i < arrowsMobs.length; i++) {;
		arrowsMobs[i].sprite.update(dt);
		arrowsMobs[i].move(dt);
	}
	
	//update mobs
	for(var i = 0; i < mobs.length; i++) {;
		mobs[i].sprite.update(dt);
	}
	
	for(var w = 0; w < mobs.length; w++) {;
		
		if (mobs[w]._indexAttack <= 0) {
			//mobs[w].status="stay";
		} else if (mobs[w].status == "attack"){
				mobs[w]._indexAttack -= dt;
				if(mobs[w].sprite.frameStatus == 8 && mobs[w]._tempIndexForAttack == 1) {
					//console.log("frameStatus = " + player[0].sprite.frameStatus);
					//console.log(arrows);
					mobs[w]._tempIndexForAttack = 0;
					mobs[w].addArrow(arrowsMobs);
					mobs[w]._AIorder = "stay";
				}
		}
	}
	
	//update kills
	for(var i = 0; i < kills.length; i++) {;
		kills[i].sprite.update(dt);
		if(kills[i].sprite.done) {
			kills.splice[i, 1];
		}
	}
}

function deleteObjMet(obj) {
	delete obj;
}

function collidesArrays(arrayOne, arrayTwo) {
	//arrayOne = arrayArrows!
	

/*	for(var i = 0; i < mobs.length; i++) {        //check mobs vs player
		for(var j = 0; j< player.length; j++) {
			var pos = [player[j].pos[0] + 32), (player[j].pos[1] + 32)];
			var size = [player[j].sprite.size[0] - 64, (player[j].sprite.size[1] - 48)];
			var pos2 = mob[i].pos;
			var size2 = mob[i].sprite.size;
			if(boxCollides(pos, size, pos2, size2)){
				console.log("player and mob are together");
			}
		}
	} */
	
	//check  arrow us mobs\player
	
	for(var j = 0; j< arrayOne.length; j++) { //arrows array
		if (arrayOne[j].sprite._index > 1) {
			arrayOne.splice(j, 1);
			i--;
			break;
		}
		for(var i = 0; i < arrayTwo.length; i++) { //mobs' or players' arrays
			if (arrayOne[j].dir == "left") {
				var pos = [(arrayOne[j].pos[0] + 0), (arrayOne[j].pos[1] + 24)];
				var size = [(arrayOne[j].sprite.size[0] -56), (arrayOne[j].sprite.size[1] - 32)];
			} else if (arrayOne[j].dir == "right"){ //+
				var pos = [(arrayOne[j].pos[0] + 56), (arrayOne[j].pos[1] + 22)];
				var size = [(arrayOne[j].sprite.size[0] - 54), (arrayOne[j].sprite.size[1] - 11)];
			} else if (arrayOne[j].dir == "down"){
				var pos = [(arrayOne[j].pos[0] + 24), (arrayOne[j].pos[1] + 56)];
				var size = [(arrayOne[j].sprite.size[0] - 32), (arrayOne[j].sprite.size[1] - 56)];
			} else {
				var pos = [(arrayOne[j].pos[0] +24), (arrayOne[j].pos[1])];
				var size = [(arrayOne[j].sprite.size[0] - 32), (arrayOne[j].sprite.size[1]) - 56];
			}
			var pos2 = arrayTwo[i].pos;
			var size2 = arrayTwo[i].sprite.size;

			if(boxCollides(pos, size, pos2, size2)){
				arrayTwo[i].hp -= arrayOne[j].damage
				arrayTwo[i]._AIangry =  true;
				arrayOne.splice(j, 1);
				if(arrayTwo[i].hp <= 0) {
					if(arrayTwo[i].who == "mob") {
						createMobkills(arrayTwo[i].pos, arrayTwo[i].sprite.url);
					} 
					arrayTwo.splice(i, 1);
					score += 100;
				} else if (arrayTwo[i].type == "building") {
					console.log("!");
					createMob("skeletonName", 196, "walk", "down", [(arrayTwo[i].pos[0] + 32), (arrayTwo[i].pos[1] + 32)], skeletonArcher2, [0, 64*10], [64, 64], 24, false, [0],
							 "bow", 512, 9*64, 85, Math.floor(Math.random() * 6) * 64, 40, "mob", 0.55);
					mobs[mobs.length - 1]._AIangry = true;
					console.log(arrayTwo[i].pos);
				}
				i--;
				break;
			}
		
		}
	}
}

function collidesForAI(ePos1, ePos2) {
	var pos = ePos1;
	var size = ePos2;
	for(var i = 0; i < arrayMapObj.length; i++) { //maps objects
		var pos2 = arrayMapObj[i].pos;
		var size2 = arrayMapObj[i].sprite.size;
		var tempVar = boxCollides(pos, size, pos2, size2);
		if(tempVar) {
			//console.log(arrayMapObj[i]);
			WTF.push([pos[0], pos[1], size[0], size[1], pos2[0], pos2[1], size2[0], size2[1]]); //debug
			//console.log("pos: " + ePos1 + ", size: " + ePos2 + ", pos2: " + pos2 + ", size2: " + size2);
			return true;
		}
	}
}
/* cheast
mobs.push({
	speed: 128,
	status: "stay",
	dir: "down",
	pos: [512, 512],
	sprite: new Sprite(chestGif64, [0, 0], [64, 64], 12, false, [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 6, 5, 4, 3, 2, 1]),
	
}); */

function AI_Enable(enity) {
	
		/*var pos = player[0].pos;
		var size = player[0].sprite.size;
		var pos2 = [enity.pos[0] - 64, enity.pos[1] - 64];
		var size2 = [enity.sprite.size[0] + 128, enity.sprite.size[0] + 128];
		if (boxCollides(pos, size, pos2, size2)) {
			(console.log(hunter));
		}*/
	//choose 
		var choose = Math.floor(Math.random()*6); ctx.fillStyle = "green";

		var distanseToPlayer = AI_disToEnity(player[0], enity);
	//check that player is near? if it's true - hunter
		if (!(enity._AIangry)) {
			
			//console.log("long = " + Math.sqrt(Math.pow(pos[0] - pos2[0], 2) + Math.pow(pos[1] - pos2[1], 2)));
			if (distanseToPlayer < enity._AIradiusWatch) {
				//console.log(enity._AIangry);
				enity._AIangry = true;
				return;
			}
	
			if(enity._AIcollides) {
				enity._AIcollides = false;
			} else {
				var randomTime = Math.random()*3;
			}
		} else {
			if(enity._AIcollides) {
				targetMapPos = [Math.floor(player[0].pos[0] /64), Math.floor(player[0].pos[1])];
				enityMapPos = [Math.floor(enity.pos[0] /64), Math.floor(enity.pos[1])];
				//AI_detour(enity, enityMapPos, targetMapPos);
				
				enity._AIcollides = false; //!
			}
				
			//check that the player is on the same line
				var tempDir = AIplayerSameLine(enity.pos)
				//console.log(tempDir);
				if (tempDir) {
					enity.dir = tempDir;
					choose = 5;//attack him!
					/*if(barrier(tempDir, distanseToPlayer, enity.pos)) {
						targetMapPos = [Math.floor(player[0].pos[0] /64), Math.floor(player[0].pos[1])];
						enityMapPos = [Math.floor(enity.pos[0] /64), Math.floor(enity.pos[1])];
						AI_detour(enity, enityMapPos, targetMapPos);
					}*/
				} else {

				//choose = 4;
				//var randomTime = .5
				var testLeftRight = enity.pos[0] - player[0].pos[0];
				var testUpDown = enity.pos[1] - player[0].pos[1];
				var randomTime = Math.random()*3;
				if(choose <= 3) { 
				//console.log(" testLeftRight = " + testLeftRight + ", randomTime = " + randomTime);
					if(testUpDown > 0) {
						//go up
						if (Math.abs(testUpDown < 192)) { var randomTime = Math.abs(testUpDown) / enity.speed; }
						choose = 1;
					} else {
						if (Math.abs(testUpDown < 192)) { var randomTime = Math.abs(testUpDown) / enity.speed; }
						//go down
						choose = 0;
					}
				} else {
					if(testLeftRight > 0) {
						//go left
						if (Math.abs(testLeftRight < 192)) { var randomTime = Math.abs(testLeftRight) / enity.speed; }
						choose = 2;
					} else {
						//go right
						if (Math.abs(testLeftRight < 192)) { var randomTime = Math.abs(testLeftRight) / enity.speed; }
						choose = 3
					}
				}
			}
			
			
			/*
			if(!(testLeftRight < -16 && testLeftRight > 16)) {
				choose = 5; //attack him!
				if(testLeftRight < 0) { //player on the right
				enity.dir = "right";
				console.log("player on the righ " + testLeftRight);
				} else { // player on the left
					enity.dir = "left";
					console.log("player on the left " + testLeftRight);
				}
				
			} else if (!(testUpDown < - 16 && testUpDown > 16)) {
				choose = 5; //attack him!
				if(testUpDown < 0) { //player on the up
					enity.dir = "up";
					console.log("player on the up " + testUpDown);
				} else { //player on the down
					enity.dir = "down";
					console.log("player on the down " + testUpDown);
				}
			} else {
				console.log("angry stay");
				choose = 4;
			} */
			
		}
		// var choose = 4;
		//var randomTime = 5;
		//console.log(choose);
		//choose random direction
		switch(choose) {
			case 0 : enity._AIorder = "down"; enity.status = "walk"; enity._AItimeForOrder = randomTime; break;
			case 1 : enity._AIorder = "up"; enity.status = "walk"; enity._AItimeForOrder = randomTime; break;
			case 2 : enity._AIorder = "left"; enity.status = "walk"; enity._AItimeForOrder = randomTime; break;
			case 3 : enity._AIorder = "right"; enity.status = "walk"; enity._AItimeForOrder = randomTime;  break;
			case 4 : enity._AIorder = "stay"; enity.status = "stay"; enity._AItimeForOrder = randomTime; break;
			case 5 : enity._AIorder = "attack"; enity.status = "attack"; enity._AItimeForOrder = enity._AItimeForAttack; break;
			default : console.log("AI - something wrong");
		} //console.log(choose);
}

function AIorders(dt, now) {
	
	for(q = 0; q < mobs.length; q++) {
		
		if(mobs[q]._AIcollides) {
			AI_Enable(mobs[q]);
		} else if(mobs[q]._AItimeForOrder > 0 && mobs[q].status == "walk") {
			if ((mobs[q]._AIangry) && AIplayerSameLine(mobs[q].pos)) {
				mobs[q]._AItimeForOrder = 0;
				break;
			}
			mobs[q].move(dt, mobs[q]._AIorder);
			mobs[q]._AItimeForOrder -= dt;
		} else if (mobs[q]._AItimeForOrder > 0 && mobs[q]._AIorder == "stay"){
			if (!(mobs[q]._AIangry) && AI_disToEnity(player[0], mobs[q]) < mobs[q]._AIradiusWatch) {
				mobs[q]._AIangry = true;
				mobs[q]._AItimeForOrder = 0;
				break;
			}
			mobs[q].stay();
			mobs[q]._AItimeForOrder -= dt;
		} else if (mobs[q]._AItimeForOrder > 0 && mobs[q]._AIorder == "attack"){
			mobs[q]._AItimeForOrder -= dt;
			if(!mobs[q]._tempIndexForAttack > 0) {
				mobs[q].enityAttack(dt);
			}
		} else {
			AI_Enable(mobs[q]);
		}
	}
}

function AIplayerSameLine(enityPos) {
	if (collides(player[0].pos[0] +24, player[0].pos[1] + 16, player[0].pos[0] + 32, player[0].pos[1] + 48, enityPos[0] , enityPos[1], enityPos[0] + 448, enityPos[1] + 64)) { //player on the right
				//WTF.push([player[0].pos[0] +24, player[0].pos[1] + 16, player[0].pos[0] + 32, player[0].pos[1] + 48, enityPos[0] , enityPos[1], enityPos[0] + 448, enityPos[1] + 64]); //debug
				return "right";
			} else  if (collides(player[0].pos[0] + 16, player[0].pos[1] + 16, player[0].pos[0] + 48, player[0].pos[1] + 48, enityPos[0] - 448, enityPos[1], enityPos[0], enityPos[1] + 64)) { // player on the left
				return "left";
			} else if (collides(player[0].pos[0] + 16, player[0].pos[1] + 16, player[0].pos[0] + 48, player[0].pos[1] + 48, enityPos[0] , enityPos[1] - 448, enityPos[0] + 64, enityPos[1] + 64)) { //player on the up
				return "up";		
			} else if (collides(player[0].pos[0] +24, player[0].pos[1] + 16, player[0].pos[0] + 32, player[0].pos[1] + 48, enityPos[0] , enityPos[1], enityPos[0] + 64, enityPos[1] + 448)) { //player on the down
				return "down";
			} else {
				return false;
			}
}

		
function AI_disToEnity(enity0, enity1) {
	//console.log(enity0);
	//console.log(enity1);
	return Math.sqrt(Math.pow(enity0.pos[0] - enity1.pos[0], 2) + Math.pow(enity0.pos[1] - enity1.pos[1], 2))
}

function barrier(tempDir, distanse, enityPos) {
	if(tempDir == "right") {
		if(collidesForAI([enityPos[0] + 4, enityPos[1] + 4], [distanse - 4, 60])) { //if collides right //console.log("right");
			console.log(" right: enityPos[0] + 4 = " + (enityPos[0] + 4) + ", enityPos[1] + 4 = " + (enityPos[1] + 4) +  ", [distanse - 4, 60] = " + (distanse - 4, 60));
			return true;
			} 
		} else if(tempDir == "left") {
			if(collidesForAI([enityPos[0] - distanse + 4, enityPos[1] + 4], [distanse - 4, 60])) { //if collides left // console.log("left");
				return true;
			} 
		} else if(tempDir == "up") {
			if(collidesForAI([enityPos[0]  + 4, enityPos[1] - distanse +4], [distanse - 4, 60])) { //if collides up // console.log("up");
				return true;
			} 
		} else if(tempDir == "down") {
			if(collidesForAI([enityPos[0] + 4, enityPos[1] + 4], [60, distanse - 4])) { //if collides down // console.log("down");
				return true;
			} 
		} else {
			console.log("function barrier - somthing wrong");
		}
}

function AI_detour(enity, enityMapPos, targetMapPos){
	var tempArrayOrders =[[["start", [enity.pos[0] + 61.5, enity.pos[1] + 61.5] ]]];
	console.log(tempArrayOrders);
	//var tempArrayOrders =[[["start", enity.pos], ["left", enity.pos], ["left", enity.pos]], 
	//						[["start", enity.pos], ["left", enity.pos], ["right", enity.pos]]];
	
	for (var I = 0; I < 3; I ++) {
		//alert("--- --- --- I = " + I + " --- --- ---");
		for (var j = 0; j < tempArrayOrders.length; j++) {
			//alert("--- --- --- j = " + j + " --- --- ---");
			var tempEnityPos = {};
			// varible - T - it's  the last position in the array that we work with  
			var T = tempArrayOrders[j].length - 1;
			switch(tempArrayOrders[j][T][0]) {
				case "goUp": tempEnityPos.pos = [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]; break;
				case "goRight": tempEnityPos.pos = [tempArrayOrders[j][T][1][0] + 64, tempArrayOrders[j][T][1][1]]; break;
				case "goDown": tempEnityPos.pos = [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] + 64]; break;
				case "goLeft": tempEnityPos.pos = [tempArrayOrders[j][T][1][0] - 64, tempArrayOrders[j][T][1][1]]; break;
				case "start": tempEnityPos.pos = tempArrayOrders[j][T][1]; break;
				default: console.log("AI_detour, something wrong"); console.log(tempArrayOrders[j][T][0]);console.log(tempArrayOrders);
			}
			//console.log(tempEnityPos);
			var distanseToPlayer = AI_disToEnity(player[0], tempEnityPos);
			var tempDir = AIplayerSameLine(tempEnityPos.pos); 
			//console.log(tempDir);
			//renderWTF()
			var canGoUp = false;
			var canGoDown = false;
			var cangoLeft = false;
			var canGoRight = false;
			var waysArray =[];
			if( !(barrier("up", 64, tempEnityPos.pos)) ) {
				canGoUp = "up";
				waysArray.push("up");
			}
			if( !(barrier("down", 64, tempEnityPos.pos)) ) {
				canGoDown = "down";
				waysArray.push("down");
			}
			if( !(barrier("left", 64, tempEnityPos.pos)) ) {
				cangoLeft = "left";
				waysArray.push("left");
			}
			if( !(barrier("right", 64, tempEnityPos.pos)) ) {
				canGoRight = "right";
				waysArray.push("right");
			}
			//var canGoUp = !(barrier("up", 64, tempEnityPos.pos));
			//var canGoDown = !(barrier("down", 64, tempEnityPos.pos));
			//var cangoLeft = !(barrier("left", 64, tempEnityPos.pos));
			//var canGoRight = !(barrier("right", 64, tempEnityPos.pos));
			//console.log("canGoUp = " + canGoUp, "canGoDown = " + canGoDown, "cangoLeft = " + cangoLeft, "canGoRight = " + canGoRight);
			
			
			/*if(tempDir) {
				if(barrier(tempDir, distanseToPlayer, tempEnityPos.pos) && false) {
					//found another way //create one or two ways for next step
					
					if(tempDir == "up" || tempDir == "down") {
							if (cangoLeft && canGoRight && tempArrayOrders[j][T][0] == "start") { 
								tempArrayOrders.push(tempArrayOrders[j]);
								tempArrayOrders[j].push(["goLeft", [tempArrayOrders[j][T][1][0] - 64, tempArrayOrders[j][T][1][1]]]);
								j++;
								tempArrayOrders[j].push(["goRight", [tempArrayOrders[j][T][1][0] + 64, tempArrayOrders[j][T][1][1]]]);
							} else if (tempArrayOrders[j][T][0] == "goLeft" && cangoLeft) {
								tempArrayOrders[j].push(["goLeft", [tempArrayOrders[j][T][1][0] - 64, tempArrayOrders[j][T][1][1]]]);
							} else if (tempArrayOrders[j][T][0] == "goRight" && canGoRight) {
								tempArrayOrders[j].push(["goRight", [tempArrayOrders[j][T][1][0] + 64, tempArrayOrders[j][T][1][1]]]);
							} else if (tempDir == "up" && canGoDown) { 
								tempArrayOrders[j].push(["goDown", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] + 64]]);
							} else if (tempDir == "down" && canGoUp) { 
								tempArrayOrders[j].push(["goUp", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
							} else {
								console.log("something wrong with AI up-down: " + enity );
							}						
					} else if (tempDir == "left" || tempDir == "right") {
						if (cangoLeft && canGoRight && tempArrayOrders[j][T][0] == "start") { 
								tempArrayOrders.push(tempArrayOrders[j]);
								tempArrayOrders[j].push(["goUp", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
								j++;
								tempArrayOrders[j].push(["goDown", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
							} else if (tempArrayOrders[j][T][0] == "goUp" && canGoUp) {
								tempArrayOrders[j].push(["goUp", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
							} else if (tempArrayOrders[j][T][0] == "goDown" && canGoDown) {
								tempArrayOrders[j].push(["goDown", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] + 64]]);
							} else if (tempDir == "left" && canGoRight) { 
								tempArrayOrders[j].push(["goRight", [tempArrayOrders[j][T][1][0] + 64, tempArrayOrders[j][T][1][1]]]);
							} else if (tempDir == "right" && canGoLeft) { 
								tempArrayOrders[j].push(["goLeft", [tempArrayOrders[j][T][1][0] - 64, tempArrayOrders[j][T][1][1]]]);
							} else {
								console.log("something wrong with AI left-right: " + enity );
							}
					}

				} else {
					//can fire
					tempArrayOrders[j].push(["FIRE!", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
				} 
			} else { */
				//var tempArrayOrders =[[["start", [enity.pos[0] + 61.5, enity.pos[1] + 61.5]]]];
				
				//console.log(" I = " + I + " enity isn't on the same line =( " );//enity isn't on the same line =(
				var tempArrayClear = tempArrayOrders.slice(j);
				for (var a = 0; a < waysArray.length; a++) {
					alert("waysArray.length = " + waysArray.length + ", a = " + a + ", j = " + j);
					alert("waysArray = " + waysArray);
					if(waysArray[a] == "left") {
						tempArrayOrders.push(tempArrayClear[0].slice(0));
						tempArrayOrders[j].push(["goLeft", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
						j++;
					} else if (waysArray[a] == "right") {
						tempArrayOrders.push(tempArrayClear[0].slice(0));
						tempArrayOrders[j].push(["goRight", [tempArrayOrders[j][T][1][0] + 64, tempArrayOrders[j][T][1][1]]]);
						j++;
					} else if (waysArray[a] == "up") {
						tempArrayOrders.push(tempArrayClear[0].slice(0));
						tempArrayOrders[j].push(["goUp", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
						j++;
					} else if(waysArray[a] == "down") {
						tempArrayOrders.push(tempArrayClear[0].slice(0));
						tempArrayOrders[j].push(["goDown", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] + 64]]);
						j++;
					}
				}
				//j--;
				//console.log(tempArrayOrders);
				//alert(tempArrayOrders);
				//var testLeftRight = enityMapPos[0] - targetMapPos[0];
				//var testUpDown = enityMapPos[1] - targetMapPos[1];
				//var addAnotherWay;
					/*//if(testUpDown > 0) {
						//go up
						if(canGoUp) {
							tempArrayOrders[j].push(["goUp", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
							addAnotherWay = true;
						} else {
							addAnotherWay = false;
						}
					//} else {
						//go down
						if(canGoDown) {
							tempArrayOrders[j].push(["goDown", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] + 64]]);
							addAnotherWay = true;
						} else {
							addAnotherWay = false;
						}
					//} 
					//if (testLeftRight > 0) {
						//go left
						if(cangoLeft) {
							if(addAnotherWay) {
								tempArrayOrders.push(tempArrayOrders[j]);
								j++;
							}
							tempArrayOrders[j].push(["goLeft", [tempArrayOrders[j][T][1][0], tempArrayOrders[j][T][1][1] - 64]]);
						}
					//} else {
						//go right
						if(canGoRight) {
							if(addAnotherWay) {
								tempArrayOrders.push(tempArrayOrders[j]);
								j++;
							}
							tempArrayOrders[j].push(["goRight", [tempArrayOrders[j][T][1][0] + 64, tempArrayOrders[j][T][1][1]]]);
						}
					//}  */
			//}
		}
		//console.log(tempArrayOrders);
		//alert(tempArrayOrders);
	}
	//analitic
	//console.log(tempArrayOrders);
	pause = true;
	//alert("A");
	
}


function renderScore() {
	
	ctx.textAlign = "start";
	ctx.font = "bold 32px sans-serif";
	ctx.fillStyle = "lime";
	ctx.fillText("score: " + score, camera.pos[0]+16-196, camera.pos[1] + 32-64);
	ctx.font = "bold 16px sans-serif";
	ctx.fillStyle = "white";
	ctx.fillText("your position: " + Math.floor(player[0].pos[0]) + ", " + Math.floor(player[0].pos[1]), camera.pos[0] + 16 - 196, camera.pos[1]);
}

function spawnMobs(dt) {
	if (!arrayMapEnity[0]) { 
		return; 
	}
	arrayMapEnity[0].sprite.update(dt); //console.log(arrayMapEnity[0].sprite._index);
	
	if(arrayMapEnity[0].sprite._index > 9) {
		//console.log(arrayMapEnity[0].sprite._index);
		arrayMapEnity[0].sprite._index = 0;
		if(mobs.length < 4) {
			createMob("skeletonName", 128, "walk", "down", [11*64-1, 9*64-1], skeletonArcher, [0, 64*10], [64, 64], 12, false, [0],
											  "bow", 512, 9*64, 45, Math.floor(Math.random() * 6) * 64, 100, "mob");
		}
	}
}

function renderNewGame(x) {
	if(x) {
		var tempText = "New Game";
	} else {
		var tempText = "Game Over";
	}
	//ctx.font = "bold 64px sans-serif";
	//ctx.fillStyle = "Orange";
	//ctx.textAlign = "center";
	ctx.drawImage(gameover, 0, 0, 512, 512, camera.pos[0] + 96-64, camera.pos[1]+32, 512, 512);
	//ctx.fillText(tempText, camera.pos[0] + 308, camera.pos[1] + 256-64); //доделать
	document.getElementById('game-over').style.display = 'block';
}

function gameReset() {
	player = [];
	arrows = [];
	arrowsMobs = [];
	mobs = [];
	kills = [];
	terra = [];
	arrayMap = []; 
	arrayMapObj = [];
	arrayMapEnity = [];
	lastTime = Date.now()+1;
	document.getElementById('game-over').style.display = 'none';
	beginScript();
}

//create button 'reset'
window.onload = function() {
		var button = document.createElement("button");
	button.innerHTML = "Replay";
	button.id = "game-over";
	button.onclick = function() {
		gameReset();
	}
	//document.getElementById('game-over').style.display = 'none';
	document.body.appendChild(button);
}
var WTF = [];
function renderWTF() {
	for(i =0; i< WTF.length; i++) {
		ctx.fillStyle = "blue";
		ctx.fillRect(WTF[i][0], WTF[i][1], WTF[i][2], WTF[i][3]);
		//console.log(WTF[i][0] + " " + WTF[i][1]+ " " +   WTF[i][2]+ " " +   WTF[i][3] );
		//ctx.fillStyle = "#" + Math.floor(Math.random()) + Math.floor(Math.random())+ Math.floor(Math.random());
		ctx.fillStyle = "orange";
		ctx.fillRect(WTF[i][4], WTF[i][5], WTF[i][6], WTF[i][7]);
		//console.log(WTF[i][4] + " " + WTF[i][5] + " " + WTF[i][6] + " " + WTF[i][7]);
	}
}

