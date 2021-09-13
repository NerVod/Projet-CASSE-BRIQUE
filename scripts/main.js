let balls = [];
let playfieldWidth, playfieldHeight;
let gameRefresh;
let ballSize;
let curLevel; //current level
let bricks = [];
let line = $('<div class="brickLine"></div>');
let racket;

$(document).ready(init);

function init()
{
	curLevel= 0;
	playfieldWidth = $('.playfield').width() - ballSize;
	playfieldHeight= $('.playfield').height() - ballSize;
	drawPlayfield();
	racket = {width: $('.racket').width(), top: $('.racket').offset().top - $('.playfield').offset().top};
	 $(window).on('mousemove', drawRacket);
	setInterval (drawBalls, 10);
	if (e.top + ballSize >= racket.top)
	{
		if (e.left >= racket.left && e.left + ballSize <= racket.left + racket.width)
		{
			e.vSpeed = -e.vSpeed;
		}
	}
	if(e.top > racket.top)
	{
		$('.ball[data-id="' + e.id + '"]').remove();
		balls.splice(balls.indexOf(e), 1);
	}
	racket = { width : $('.racket').width()};
}

function addBall()
{
	let idBall= createId();
	if(balls.length < 10)
	{
	$('.playfield').prepend('<div class="ball" data-id="' + idBall + '"></div');
	ballSize = $('.ball:first').width();
	balls.push (
		{
			id: idBall,
			left: Math.random() * (playfieldWidth - ballSize),
			top: ($('.brickLine').length * 34) + ballSize,
			hSpeed: Math.random() > .5 ? 2 : -2,
			vSpeed: 2
		},
	);
	}
}

function createId()
{
	let code = "";
	for(let $compteur = 0; $compteur < 8; $compteur++)
	{
		code += String.fromCharCode (65 + Math.random() * 26);
	}
	return code;
}

function drawBalls()
{
	balls.forEach (function (e) {
		e.left += e.hSpeed;
		e.top += e.vSpeed;
		let nearBricks = bricks.filter(function (f)
		{
			return f.top + 34 > e.top && f.left <= e.left && f.left + 100 >= e.left + ballSize;
		});
		if (nearBricks.length > 0)
		{
			$('.brick[data-id="' + nearBricks[0].id + '"]').remove();
			bricks.splice(bricks.indexOf(nearBricks[0]), 1);
			e.vSpeed = -e.vSpeed;
		}
		if (e.left < 0)
		{
			e.hSpeed = -e.hSpeed;
		}
		if (e.top < 0)
		{
			e.vSpeed = -e.vSpeed;
		}
		if (e.left > playfieldWidth - ballSize)
		{
			e.hSpeed = -e.hSpeed;
		}
		if (e.top > playfieldHeight - ballSize)
		{
			e.vSpeed = -e.vSpeed;
		}
		if (e.top > racket.top)
		{
			$('.ball[data-id"' + e.id + '"]').remove();
			balls.splice(balls.indexOf(e), 1);
		}
		if (e.top + ballSize >= racket.top)
		{
			if (e.left >= racket.left && e.left <= racket.left + racket.width - ballSize)
			{
				e.vSpeed = -e.vSpeed;
			}
		}
		$('.ball[data-id="' + e.id + '"]').css ({
			left : e.left + 'px',
			top : e.top + 'px'
			});
								});
}

// f pour une brique de la ligne e, et j pour son numéro d'ordre dans la ligne
e.forEach (function (f, j)
{
	line.append('<div class="brick ' + f + 'Brick" data-id="' + i + '-' + j + '" ></div>');
}
);
$('.playfield').append(line);

bricks.push ({
	id: i + '-' + j,
	top : i * 34,
	left: j * 104
});

// fonction appelée pour dessiner un nouveau niveau
function drawPlayfield()
{
	showCurrentLevel();
	levels[curLevel].forEach(function (e, i)
	{
	let line = $('<div class="briclLine"></div>');
	e.forEach (function (f, j)
	{
		bricks.push ({
			id: i + '-' + j,
			top: i * 34,
			left: j * 104
		});
		line.append('<div class="brick ' + f + 'Brick" data-id="' + i + '-' + j + '" ></div>');
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
	bricks.forEach (function (e, i)
	{
		$('.brick[data-id="' + e.id + '"]')
		.animate(
			{
				left: e.left + 'px'
			},
			1000,
			function()
			{
				if (i == bricks.length - 1)
				{
					addBall();
				}
			}
		);
		});
}

// fonction pour animation texte affichage niveau
function showCurrentLevel()
{
	$('.lblCurrentLevel')
	.text ('Niveau ' + (curLevel + 1))
	.css ('opacity', 1)
	.animate (
		{
			opacity: 0,
		},
		3000
	);
}

//fonctions pour déplacement de la raquette 
function drawRacket(e)
{
	racket.left = Math.min(playfieldWidth - racket.width,
	 Math.max(2, e.offsetX));
	$('.racket').css ('left', racket.left + 'px');
}

