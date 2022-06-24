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
function beginScript() { //start!!! =)
	setupCanvas();
	createMap()
	createPlayer("playerName", 128, "stay", "down", [65, 65], KyPolein, [0, 64*10], [64, 64], 12, false, [0],
											  "bow", 512, 9*64, 45, Math.floor(Math.random() * 6) * 64, 300, "player");
	//createMobs;
	for(var i = 0; i < 3; i++) {createMob("skeletonName", 128, "walk", "down", [11*64-1, 9*64-1], skeletonArcher, [0, 64*10], [64, 64], 12, false, [0],
											  "bow", 512, 9*64, 45, Math.floor(Math.random() * 6) * 64, 100, "mob");
	}
	//create objects
	createaMapObj("tower", 0, "stay", "down", [10.5*64, 10*64], tower06, [0, 0], [128, 128], 1, false, [0],
					  "building", 0, 0, 0, 0, 250);
	
	//startGame
	main();
}

function setupCanvas() {
	var canvas = document.getElementById("game");
	canvas.width = 1024;
	canvas.height = 1024;
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, ctx.width, ctx.hight);
	
}

var map = [
		//0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
		[ 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],//0
		[ 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2],//1
		[ 2, 7, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 2],//2
		[ 2, 7, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 2],//3
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 2],//4
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],//5
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],//6
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],//7
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],//8
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],//9
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 3, 0, 7, 2],//10
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 2, 0, 7, 2],//11
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 0, 7, 2],//12
		[ 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],//13
		[ 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2],//14
		[ 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4] //15
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
					sprite: new Sprite(grassTile1, [0, 0], [64, 64], 0 , false, [0])
				});
			}
			else if (map[i][j] == 1) { //waterChannel1
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterChannel1, [0, 0], [64, 64], 0 , false, [0])
				});
			}
			else if(map[i][j] == 2) { //waterChannel2
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterChannel2, [0, 0], [64, 64], 0 , false, [0])
				});
			}
			else if(map[i][j] == 3) { //waterAngel1
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterAngel1, [0, 0], [64, 64], 0 , false, [0])
				});
			}
			else if(map[i][j] == 4) { //waterAngel2
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterAngel2, [0, 0], [64, 64], 0 , false, [0])
				});
			}
			else if(map[i][j] == 5) { //waterAngel3
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterAngel3, [0, 0], [64, 64], 0 , false, [0])
				});
			}
			else if(map[i][j] == 6) { //waterAngel4
				arrayMap.push({
					pos: [x, y],
					type: "river",
					playerCanWalk : false,
					bulletCanWalk : true,
					sprite: new Sprite(waterAngel4, [0, 0], [64, 64], 0 , false, [0])
				});
			}
			else if(map[i][j] == 7) { //sand
				arrayMap.push({
					pos: [x, y],
					type: "sand",
					playerCanWalk : true,
					bulletCanWalk : true,
					sprite: new Sprite(sandTile, [0, 0], [64, 64], 0 , false, [0])
				});
			}
			else if(map[i][j] == 8) { //box
				arrayMapObj.push({
					pos: [x, y],
					type: "box64",
					playerCanWalk : false,
					bulletCanWalk : false,
					sprite: new Sprite(box64, [0, 0], [64, 64], 0 , false, [0])
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

	
	//mobs spawn:
	spawnMobs(dt);//test
	
	

	//skynet();
	
	//render
	renderMap(arrayMap);
	renderMap(arrayMapObj);
	
	renderEnities(kills);
	renderEnities(arrows);
	renderEnities(arrowsMobs);
	renderEnities(mobs);
	renderEnities(arrayMapEnity);
	renderScore();
	
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

	//console.log("lastTime is " + lastTime + ". dt = " + dt);
	window.requestAnimationFrame(main);

};
function Enity(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames, 
				type, speedAttack, range, damage, imageAttack, hp, who){
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
				this.zAIcollides = false;
				this.zAItimeForOrder = 0;
				this.zAIorder = "";
				this.zAIangry = false;
				this.hp = hp || 100;
				this.maxHP = hp || 100;
				this.who = who || "mob";
				this.zAIradiusWatch = 256
				};


function createPlayer(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp, who){
					  var tempVar = new Enity(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp, who);
					  player.push(tempVar);
					  }

function createMob(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp){
					  var tempVar = new Enity(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp);
					  mobs.push(tempVar);
					  }

function createMobkills(pos, spriteUrl){
					  var tempVar = new Enity("name", 0, "stay", "down", pos, spriteUrl, [0, 64*20], [64, 64], 8, true, [0, 1, 2, 3, 4, 5],
					  "mob", 0, 0, 0, 0, 0);
					  kills.push(tempVar);
					  }

function createaMapObj(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp){
					  var tempVar = new Enity(name, speed, status, dir, pos, spriteUrl, spritePos, spriteSize, spriteSpeed, spriteOnce, spriteFrames,
					  type, speedAttack, range, damage, imageAttack, hp);
					  arrayMapEnity.push(tempVar);
					  }

/*
function createPlayer() { //player --- --- --- --- ---
	player.push({
		speed: 128,
		status: "walk",
		dir: "down",
		pos: [256, 256],
		sprite: new Sprite(KyPolein, [0, 64*10], [64, 64], 12, false),
		//attack
		type: "bow",
		speedAttack : 512,
		range : 9*64,
		damage : 45,
		_indexAttack: 0,
		lastTimeFire: Date.now(),
		imageAttack: (Math.floor(Math.random() * 6) * 64)
	//	begine: function() {
	//				arrows.push({pos: this.pos, speed: this.speedAttack, 
	//				range: this.range, sprite: new Sprite(KyPolein, [0, 64*10], [64, 64], 12, false)
	//			})
	//	//attack: new Attack("bow", 256, 9*64, 45)
	//}
	});
} */

/*function playerAttack(dt) {
	player[0].status = "attack";
	player[0].sprite.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	player[0].sprite._index = 0;
	player[0]._indexAttack = (player[0].sprite.frames.length /player[0].sprite.speed) ;
	switch(player[0].dir) {
		case "up":  player[0].sprite.pos[1] = 16*64; break;
		case "down": player[0].sprite.pos[1] = 18*64; break;
		case "left": player[0].sprite.pos[1] = 17*64; break;
		default: player[0].sprite.pos[1] = 19*64;
	}
	player[0].addPlayersArrow = addPlayersArrow;
	player[0]._tempIndexForAttack = 1;
} */

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
						 
						 default: console.log("something wrong");
					 }
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
		ctx.fillRect(0, -12, 56, 16); //доделать
		
		var varTeml = this.hp/this.maxHP * 100;
		if(varTeml > 75) { ctx.fillStyle = "lime"; }
		else if (varTeml > 50) { ctx.fillStyle = "orange";}
		else { ctx.fillStyle = "yellow";}
		ctx.fillText(Math.floor(this.hp) + " / " + this.maxHP, 8, 0);
	}
}
		
Enity.prototype.move = function(dt, dir) {
		var tempPos1 = this.pos[0];
		var tempPos2 = this.pos[1];
		//console.log("move");
		//if (this.status == "stay") {return;}
		this.status = "walk";
		this.sprite.frames = [1, 2, 3, 4, 5, 6, 7, 8];
		//--- 
		
		if(dir == "down") {
			this.sprite.pos[1] = 64*10;
			this.pos[1] += this.speed * dt;
			if (enityCollision(this)) {
				//console.log(status);
				this.zAIcollides = true;
				this.pos[1] = tempPos2;
			}
		} else if(dir == "up") {
			this.sprite.pos[1] = 64*8;
			this.pos[1] -= this.speed * dt;
			if (enityCollision(this)) {
				//console.log(status);
				this.zAIcollides = true;
				this.pos[1] = tempPos2;
			}
		}
		if(dir == "left") {
			this.sprite.pos[1] = 64*9;
			this.pos[0] -= this.speed * dt;
			if (enityCollision(this)) {
				//console.log(status);
				this.zAIcollides = true;
				this.pos[0] = tempPos1;
			}
		} else if(dir == "right") {
			this.sprite.pos[1] = 64*11;
			this.pos[0] += this.speed * dt;
			if (enityCollision(this)) {
				//console.log(status);
				this.zAIcollides = true;
				this.pos[0] = tempPos1;
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
		var frame = this.frames[index % max];
			//console.log("frame = " + frame);
		
		if( this.once && index >= max ) {
			this.done = true;
			//console.log("name: " + this.url + ", is done o_0");
			return;
		}
	} else {
		frame = 0;
	}
	
	var x = this.pos[0] + frame * this.size[0];
	var y = this.pos[1];
	//console.log("x = " + x + " y = " + y);
	ctx.drawImage(this.url,
				  x, y,
				  this.size[0], this.size[1],
				  0, 0,
				  this.size[0], this.size[1]);
	this.frameStatus = frame;
}
	
function renderEnities(enity) {
	if (enity instanceof Array){
		for (var i = 0; i < enity.length; i++) {
		ctx.save();
		ctx.translate(enity[i].pos[0], enity[i].pos[1]);
		enity[i].sprite.render();
		if(enity[i].who == "player" || enity[i].who == "mob") {
			enity[i].hpRender();
		}
		ctx.restore();
		}
	} else { 
		ctx.save();
		ctx.translate(enity.pos[0], enity.pos[1]);
		enity.sprite.render();
		if(enity.who == "player" || enity.who == "mob") {
			enity.hpRender();
		}
		ctx.restore();
	}
}

/*function renderEnitiesAR(enity) {
	if (enity instanceof Array){
		for (var i = 0; i < enity.length; i++) {
		var pos = [(enity[i].pos[0] + 56), (enity[i].pos[1] + 22)];
		var size = [(enity[i].sprite.size[0] - 54), (enity[i].sprite.size[1] - 11)];
		alert("pos = " + pos + ",size = " + size);
		//ctx.fillRect(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1]);
		ctx.fillRect(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1]);
		ctx.save();
		ctx.translate(enity[i].pos[0], enity[i].pos[1]);
		enity[i].sprite.render();
		ctx.restore();

		}
	} else { 
		ctx.save();
		ctx.translate(enity.pos[0], enity.pos[1]);
		enity.sprite.render();
		if(enity.who == "player" || enity.who == "mob") {
			enity.hpRender();
		}
		ctx.restore();
	}
} */

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
		/*player[0].status = "walk";
		player[0].pos[1] += player[0].speed * dt;
		player[0].dir = "down";
		player[0].sprite.pos[1] = 64*10;
		player[0].sprite.frames = [1, 2, 3, 4, 5, 6, 7, 8];
		if (playerCollision()) {
			console.log("down!");
			player[0].pos[1] = tempPos2;
		} */
	} else if(input.isDown('UP') || input.isDown("w")) {
		player[0].move(dt, "up");
		/*player[0].status = "walk";
		player[0].pos[1] -= player[0].speed * dt;
		player[0].dir = "up";
		player[0].sprite.pos[1] = 64*8;
		player[0].sprite.frames = [1, 2, 3, 4, 5, 6, 7, 8];
		if (playerCollision()) {
			console.log("up");
			player[0].pos[1] = tempPos2;
		}*/
	}
	if(input.isDown('LEFT') || input.isDown("a")) {
		player[0].move(dt, "left");
		/*player[0].status = "walk";
		player[0].pos[0] -= player[0].speed * dt;
		player[0].dir="left"
		player[0].sprite.pos[1] = 64*9;
		player[0].sprite.frames = [1, 2, 3, 4, 5, 6, 7, 8];
		if (playerCollision()) {
			console.log("left");
			player[0].pos[0] = tempPos1;
		}*/
	} else if(input.isDown('RIGHT') || input.isDown("d")) {
		player[0].move(dt, "right");
		/*player[0].status = "walk";
		player[0].pos[0] += player[0].speed * dt;
		player[0].dir="right";
		player[0].sprite.pos[1] = 64*11;
		player[0].sprite.frames = [1, 2, 3, 4, 5, 6, 7, 8];
		if (playerCollision()) {
			console.log("right");
			player[0].pos[0] = tempPos1;
		}*/
	}
	
	if (input.isDown('SPACE')) {
		player[0].enityAttack(dt);
	}
	


}

function renderMap(array) {
	for( var i = 0; i < array.length; i++) {
		ctx.save();
		ctx.translate(array[i].pos[0], array[i].pos[1]);
		array[i].sprite.render();
		ctx.restore();
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
			//console.log("frameStatus = " + player[0].sprite.frameStatus);
			//console.log(arrows);
			console.log(player[0]);
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
					mobs[w].zAIorder = "stay";
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
				arrayOne.splice(j, 1);
				if(arrayTwo[i].hp <= 0) {
					if(arrayTwo[i].who == "mob") {
						createMobkills(arrayTwo[i].pos, arrayTwo[i].sprite.url);
					} 
					arrayTwo.splice(i, 1);
					score += 100;
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
			//console.log("pos: " + ePos1 + ", size: " + ePos2 + ", pos2: " + pos2 + ", size2: " + size2);
			return true;
		}
	}
}
/*
mobs.push({
	speed: 128,
	status: "stay",
	dir: "down",
	pos: [512, 512],
	sprite: new Sprite(chestGif64, [0, 0], [64, 64], 12, false, [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 6, 5, 4, 3, 2, 1]),
	
});
mobs.push({
	speed: 128,
	status: "stay",
	dir: "down",
	pos: [725, 512],
	sprite: new Sprite(chestGif64, [0, 0], [64, 64], 12, false, [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 6, 5, 4, 3, 2, 1]),
	
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
	//check that player is near? if it's true - hunter
		if (!(enity.zAIangry)) {
			var pos = player[0].pos;
			var size = player[0].sprite.size;
			var pos2 = [enity.pos[0] - 64, enity.pos[1] - 64];
			var size2 = [enity.sprite.size[0] + 128, enity.sprite.size[0] + 128];
			//console.log("long = " + Math.sqrt(Math.pow(pos[0] - pos2[0], 2) + Math.pow(pos[1] - pos2[1], 2)));
			if (Math.sqrt(Math.pow(pos[0] - pos2[0], 2) + Math.pow(pos[1] - pos2[1], 2)) < enity.zAIradiusWatch) {
				//console.log(enity.zAIangry);
				enity.zAIangry = true;
				return;
			}
	
			if(enity.zAIcollides) {
				enity.zAIcollides = false;
			} else {
				var randomTime = Math.random()*3;
			}
		} else {
			//check that the player is on the same line
				enity.zAIcollides = false; //!
				var tempDir = AIplayerSameLine(enity)
				if (tempDir) {
					choose = 5;//attack him!
					if(tempDir == "right") {
						if(collidesForAI([enity.pos[0] , enity.pos[1]], [enity.pos[0] + 448, enity.pos[1] + 64])) { //if collides right
							
							console.log("right");
						} 
					} else if(tempDir == "left") {
						if(collidesForAI([enity.pos[0] - 448, enity.pos[1]], [enity.pos[0] + 448, enity.pos[1] + 64])) { //if collides left
							console.log("left");
						} 
					} else if(tempDir == "up") {
						if(collidesForAI([enity.pos[0] , enity.pos[1] - 448], [enity.pos[0] + 64, enity.pos[1] + 64])) { //if collides up
							console.log("up");
						} 
					} else if(tempDir == "down") {
						if(collidesForAI([enity.pos[0] , enity.pos[1]], [enity.pos[0] + 64, enity.pos[1] + 448])) { //if collides down
							console.log("down");
						} 
					}
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
						if (Math.abs(testUpDown < 192)) { var randomTime = Math.abs(testUpDown) / enity.speed; 
}
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
		//var choose = 3;
		//var randomTime = 5;
		//console.log(choose);
		//choose random direction
		switch(choose) {
			case 0 : enity.zAIorder = "down"; enity.status = "walk"; enity.zAItimeForOrder = randomTime; break;
			case 1 : enity.zAIorder = "up"; enity.status = "walk"; enity.zAItimeForOrder = randomTime; break;
			case 2 : enity.zAIorder = "left"; enity.status = "walk"; enity.zAItimeForOrder = randomTime; break;
			case 3 : enity.zAIorder = "right"; enity.status = "walk"; enity.zAItimeForOrder = randomTime;  break;
			case 4 : enity.zAIorder = "stay"; enity.status = "stay"; enity.zAItimeForOrder = randomTime; break;
			case 5 : enity.zAIorder = "attack"; enity.status = "attack"; enity.zAItimeForOrder = 1.5; break;
			default : console.log("AI - something wrong");
		} //console.log(choose);
}

function AIorders(dt, now) {
	
	for(q = 0; q < mobs.length; q++) {
		
		if(mobs[q].zAIcollides) {
			AI_Enable(mobs[q]);
		} else if(mobs[q].zAItimeForOrder > 0 && mobs[q].status == "walk") {
			mobs[q].move(dt, mobs[q].zAIorder);
			mobs[q].zAItimeForOrder -= dt;
		} else if (mobs[q].zAItimeForOrder > 0 && mobs[q].zAIorder == "stay"){
			mobs[q].stay();
			mobs[q].zAItimeForOrder -= dt;
		} else if (mobs[q].zAItimeForOrder > 0 && mobs[q].zAIorder == "attack"){
			mobs[q].zAItimeForOrder -= dt;
			if(!mobs[q]._tempIndexForAttack > 0) {
				mobs[q].enityAttack(dt);
			}
		} else {
			AI_Enable(mobs[q]);
		}
	}
}

function AIplayerSameLine(enity) {
	if (collides(player[0].pos[0] +24, player[0].pos[1] + 16, player[0].pos[0] + 32, player[0].pos[1] + 48, enity.pos[0] , enity.pos[1], enity.pos[0] + 448, enity.pos[1] + 64)) { //player on the right
				enity.dir = "right"; 
				return "right";
				//console.log("player on the righ " + testLeftRight); 
				//ctx.fillRect(enity.pos[0] , enity.pos[1], 964, 64);
			} else  if (collides(player[0].pos[0] + 16, player[0].pos[1] + 16, player[0].pos[0] + 48, player[0].pos[1] + 48, enity.pos[0] - 448, enity.pos[1], enity.pos[0] + 448, enity.pos[1] + 64)) { // player on the left
				enity.dir = "left";
				return "left";
				//console.log("player on the left " + testLeftRight); 
				//ctx.fillRect(enity.pos[0] - 964, enity.pos[1], 964, 64);
				//ctx.fillRect(player[0].pos[0] + 16, player[0].pos[1] + 16, 32, 32);	
			} else if (collides(player[0].pos[0] + 16, player[0].pos[1] + 16, player[0].pos[0] + 48, player[0].pos[1] + 48, enity.pos[0] , enity.pos[1] - 448, enity.pos[0] + 64, enity.pos[1] + 64)) { //player on the up
				enity.dir = "up";
				return "up";
				//console.log("player on the up " + testUpDown);
				//ctx.fillRect(enity.pos[0], enity.pos[1] - 964, 64, 964);
				//ctx.fillStyle = "lime";
				//ctx.fillRect(player[0].pos[0], player[0].pos[1], 64, 64);			
			} else if (collides(player[0].pos[0] +24, player[0].pos[1] + 16, player[0].pos[0] + 32, player[0].pos[1] + 48, enity.pos[0] , enity.pos[1], enity.pos[0] + 64, enity.pos[1] + 448)) { //player on the down
				enity.dir = "down";
				return "down";
				//console.log("player on the down " + testUpDown);
			} else {
				return false;
			}
}

function renderScore() {
	ctx.save;
	ctx.textAlign = "start";
	ctx.font = "bold 32px sans-serif";
	ctx.fillStyle = "lime";
	ctx.fillText("score: " + score, 16, 32);
	ctx.restore;
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
	ctx.font = "bold 64px sans-serif";
	ctx.fillStyle = "Orange";
	ctx.textAlign = "center";
	ctx.fillText(tempText, 512, 512-64); //доделать
	var button = document.createElement("button");
	button.innerHTML = "Replay";
	button.id = "game-over";
	button.onclick = function() {
		gameReset();
	}
	document.body.appendChild(button);
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