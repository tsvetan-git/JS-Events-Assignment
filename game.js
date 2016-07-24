(function() {
	var ship = document.getElementById('ship'),
		rocket = document.getElementById('rocket'),
		enemy = document.getElementById('enemy'),
		points = document.getElementById('points'),
		rockets = document.getElementById('rockets'),
		
		containerWidth = 960,
		
		fieldWidth = 960,
		fieldHeight = 480,
		
		enemyWidth = 150,
		enemyHeight = 150,
		
		shipWidth = 100,
		shipHeight = 100,
		
		rocketWidth = 20,
		rocketHeight = 48,
		
		shipPositionLeft = (fieldWidth - shipWidth)/2,
		enemyPositionLeft = fieldWidth - enemyWidth,
		
		rocketPositionLeft,
		rocketPositionBottom = shipHeight,
		
		speed = 5,
		enemyspeed = 6,
		
		countPoints = 0,
		winScore = 10,
		countrockets = 20,
		
		events = {
			gameloop: true,
			left: false,
			right: false,
			shoot: false,
			collision: false
		};
	
	function enemyMove() {
		if (events.gameloop) {
			if (enemyPositionLeft < Math.abs(enemyspeed) 
					|| enemyPositionLeft > fieldWidth - enemyWidth - enemyspeed) {
				enemyspeed = -enemyspeed;
			}			
			enemyPositionLeft += enemyspeed;
			enemy.style.left = enemyPositionLeft + 'px';
		}
		window.requestAnimationFrame(enemyMove);
	}
	window.requestAnimationFrame(enemyMove);
	
	document.addEventListener('keydown', function(event) {
		if (events.gameloop) {
			getKeyCode(event.keyCode, true);
		}
	}, false);
	
	document.addEventListener('keyup', function(event) {
		if (events.gameloop) {
			getKeyCode(event.keyCode, false);
		}
	}, false);
	
	function getKeyCode(keyCode, state) {
		if (keyCode == '37') {
			events.left = state;
		} else if (keyCode == '39') {
			events.right = state;
		} else if (keyCode == '32' && state) {
			events.shoot = state;
		}
	}
	
	function moveship() {
		if (events.gameloop && events.left && speed < shipPositionLeft) {
			shipPositionLeft -= speed;
		} else if (events.gameloop && events.right
				&& shipPositionLeft < fieldWidth - shipWidth - speed) {
			shipPositionLeft += speed;
		}
		
		ship.style.left = shipPositionLeft + 'px';
		
		window.requestAnimationFrame(moveship);
	}
	
	window.requestAnimationFrame(moveship);
	
	function shoot() {
		if (events.gameloop && events.shoot) {
			rocket.style.visibility = "visible";
			rocket.style.bottom = rocketPositionBottom + 'px';
			rocketPositionLeft = shipPositionLeft + shipWidth / 2 - rocketWidth / 2;
			rocket.style.left = rocketPositionLeft + 'px';
			rocketPositionBottom += speed;
			
			if (rocketPositionLeft > enemyPositionLeft
					&& rocketPositionLeft < enemyPositionLeft + enemyWidth
					&& rocketPositionBottom > fieldHeight - enemyHeight) {
				events.collision = true;
				countPoints += 1;
				points.innerHTML = countPoints;
				enemy.style.backgroundImage = "url('images/enemy-ship2.png')";
				
				setTimeout(function(){
				enemy.style.backgroundImage = "url('images/enemy-ship.png')";
				}, 300);
			}
		
			if (events.collision
					|| rocketPositionBottom > fieldHeight - rocketHeight) {
				events.shoot = false;
				rocket.style.visibility = "hidden";
				rocketPositionBottom = shipHeight;
				events.collision = false;
				countrockets -= 1;
				rockets.innerHTML = countrockets;
				
				if (countrockets == 0 || countPoints == winScore) {
					gameOver();
				}
			}
		}	
		window.requestAnimationFrame(shoot);
	}	
	window.requestAnimationFrame(shoot);
	
	function gameOver() {
		events.gameloop = false;	
		if (countPoints >= winScore) {
			msg = 'YOU WIN !!!';
			alert(msg);
		} else {
			msg = 'you lose.';
			alert(msg);
		}
	}
}());