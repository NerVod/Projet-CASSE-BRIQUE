let balls = [];
let playfieldWidth, playfieldHeight;
let gameRefresh;
let ballSize;
let curLevel;
let bricks = []; 
let racket;

$(document).ready(init);

function init()
{
	curLevel = 0;
    playfieldWidth = $('.playfield').width();
    playfieldHeight = $('.playfield').height();
	drawPlayfield();
	
	$(window).on('mousemove', drawRacket);
	racket = {width: $('.racket').width(), top: $('.racket').offset().top - $('.playfield').offset().top};
}

function addBall()
{
	if( balls.length < 10)
	{
		$('.playfield').prepend('<div class="ball" data-id="' + balls.length + '"></div>');
        ballSize = $('.ball:first').width();
		balls.push 	(
						{
							id: balls.length, 
							left: Math.random() * (playfieldWidth - ballSize), 
							top: ($('.brickLine').length * 34) + ballSize, 
							hSpeed: 2, 
							vSpeed: 2
						}
					);
	}
}

function drawRacket(e)
{
	racket.left = Math.min(playfieldWidth - racket.width, Math.max(2, e.offsetX));
	$('.racket').css ('left', racket.left + 'px');
}

// fonction à refactorer
function drawBalls()
{
	balls.forEach (
					function (e)
                  	 {
						   let nearBricks;
						   moveBall(e)
						   nearBricks = getNearBricks(e);
						   touchBrick(e, nearBricks);
						   checkBorders(e);
						   checkRacket(e);
					}
	);
}

function drawPlayfield()
{
	showCurrentLevel();
	levels[curLevel].forEach(function (e, i)
                             {
								let line = $('<div class="brickLine"></div>');
			          				  e.forEach (function (f, j)
			                                       {
			                                         bricks.push ({
			                                                   		id: i + '-' + j, 
			                                      		    	 	top: i * 34,										     
			                                      		     		left: j * 104
			                                                     }) ;
			                                         line.append('<div class="brick ' + f + 'Brick" data-id="' + i + '-' + j + '"></div>');
			   						   });
			    			         $('.playfield').prepend(line);
					         }
 				      );
	bricks.forEach(function (e, i)
					  {
					     $('.brick[data-id="' + e.id + '"]')
		                          .animate(
								{
								   top: e.top + 'px'
								},
								500
							     );
						}
					);
	bricks.forEach(function (e, i)
					  {
						$('.brick[data-id="' + e.id + '"]')
					          .animate(
								{
								    left: e.left + 'px'
								},
								1000,
								function ()
								{
								   	if (i == bricks.length - 1)
								    {
			                           	showGamePanel();
									}
							     });
				   });
}

function showCurrentLevel()
{
 	$('.lblCurrentLevel')
 		.text('Niveau ' + (curLevel + 1))
 		.fadeOut(3000);
}

//fonctions refactoring de drawBalls

function moveBall(e)
{
	e.left += e.hSpeed;
	e.top += e.vSpeed;
	$('.ball [data-id="' + e.id + '"]')
		.css (
				{
					left : e.left + 'px',
					top: e.top + 'px'
				}
		);
}

function getNearBrick(e)
{
	return bricks
		.filter (
			function(f)
				{
					return f.top + 34 > e.top && f.left <= e.left && f.left + 100 >= e.left + ballSize;
				}
		);
}

function touchBrick(e, nearBricks)
{
	if (nearBricks.length >0)
		{
			$('.brick [data-id="' + nearBricks[0].id + '"]').remove();
			bricks.splice(bricks.indexOf(nearBricks[0]), 1);
		}
}

function checkBorders(e)
{
	if (e.left < 0)
		{
			e.hSpeed = -e.hSpeed;
		}
	if (e.top < 0)
		{
			e.vSpeed = -e.vSpeed;
		}
	if (e.left > playdieldWidth - ballSize)
		{
			e.hSpeed = -e.hSpeed;
		}
	if (e.top > playfieldHeight - ballSize)
		{
			e.vSpeed = -e.vSpeed;
		}
}

function checkRacket(e)
{
	if (e.top> racket.top)
		{
			$('.ball [data-id="' + e.id + '"]').remove();
			balls.splice(balls.indexOf(e), 1);
		}
	if (e.top + ballSize >= racket.top)
		{
			if (e.left >= racket.left && e.left <= racket.left + racket.width - ballSize)
				{
					e.vSpeed = -e.vSpeed;
				}
		}
}

function gameMessage(title, messageText, messageButton, buttonFunction)
{
	$('body').append('<div class="messageBox"><label class="lblMessageTitle">' + title + '</label><label class="lblMessage">' + messageText + '</label><button class="btnMessage">' + messageButton + '</button></div');
	$('.btnMessage').on('click', buttonFunction);
}

function showGamePanel()
{
	gameMessage ("Casse-briques", "Petit jeu de raquette simple, minimaliste, servant de support de formation au développement JavaScript et jQuery", "Cliquez pour lancer une partie", startGame, 'styles/images/logo_ENI.png');
}

function cleanMessage()
{
	$('.btnMessage')
		.off ();
	$('.messageBox')
		.remove();
}

function startGame()
{
 	cleanMessage();
	addBall(); 
	gameRefresh = setInterval(drawBalls, 10);
}