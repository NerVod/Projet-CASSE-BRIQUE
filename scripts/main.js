let balls = [];
let playfieldWidth, playfieldHeight;
let gameRefresh;
let ballSize;
let curLevel; //current level
let bricks = [];
let line = $('<div class="brickLine"></div>');

$(document).ready(init);

function init()
{
	curLevel = 0;
	playfieldWidth = $('.playfield').width();
	playfieldHeight= $('.playfield').height();
	drawPlayfield();
	addBall();
	gameRefresh = setInterval (drawBalls, 10);
}

function addBall()
{
	let idBall= createId();
	if(balls.length < 10)
	$('.playfield')
	.prepend('<div class="ball" data-id="' + idBall + '"></div');
	ballSize = $('.ball:first').width();
	balls.push (
		{
			id: idBall,
			left: 100,
			top: 100,
			hSpeed: 2,
			vSpeed: 2
		},
	);
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
		$('.ball[data-id="' + e.id + '"]')
		.css ({
			left : e.left + 'px',
			top : e.top + 'px'
			});
								}
				);
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
			1000
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