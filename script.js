var elemTorii = document.getElementById('Torii');
var AVG_X = parseInt(elemTorii.style.width)/2;
var AVG_Y = parseInt(elemTorii.style.height)/2;

var IMG_LIST = elemTorii.getElementsByTagName('img'); //HTMLCollection из элементов "img"

initTorii();

document.getElementById('setCount').oninput = initTorii;
document.getElementById('distanceRange').oninput = setDistance;
document.getElementById('apertureRange').oninput = setAperture;
document.getElementById('effectRange').oninput = setEffect;
document.getElementById('focusRange').oninput = setFocus;

document.getElementById('offsetX').innerText = 'offsetX: ' + AVG_X;
document.getElementById('offsetY').innerText = 'offsetY: ' + AVG_Y;

elemTorii.onmousemove = Paralax;

//Расчет при первоначальной загрузке страницы
function initTorii() {
	
	updateLabelValue('setCount', 'setCountValue');
	
	removeImg();
	createImg();
	setFocus();
	setAperture();
	setDistance();
	setEffect();
	
}

//Изменение "расстояния" между соседними элементами
function setDistance() {
	
	updateLabelValue('distanceRange', 'distanceRangeValue');
	
	for(let i = 0; i < IMG_LIST.length; i++) {
		IMG_LIST[i].style.transform = 'scale(' + (1*Math.pow(document.getElementById('distanceRange').value,i+1-1)) + ')';
		//console.log(i);
	}
	
	setAperture();
}

//Обновление значения "effectRange"
function setFocus() {
	
	updateLabelValue('focusRange', 'focusRangeValue');
	
	document.getElementById('focusRange').max = document.getElementById('setCount').value;
	
	setAperture();
	
}


//Обновление значения "effectRange"
function setEffect() {
	
	updateLabelValue('effectRange', 'effectRangeValue');
}

//Пересчет псевдо-ГРИП
function setAperture() {
	
	updateLabelValue('apertureRange', 'apertureRangeValue');
	
	for(var i = document.getElementById('focusRange').value-1, n = 0; i < IMG_LIST.length; i++, n++) {
		IMG_LIST[i].style.filter = 'blur(' + ((n*5) / +document.getElementById('apertureRange').value) / (Math.pow(+document.getElementById('distanceRange').value,3)) +'px)';
	}
	
	let backgroundBlur = ((n*5) / +document.getElementById('apertureRange').value) / (Math.pow(+document.getElementById('distanceRange').value,3));
	document.getElementById('ToriiBackground').style.filter = 'blur(' + ( backgroundBlur <= 25? backgroundBlur : 25 ) + 'px)';
	
	
	for(var i = document.getElementById('focusRange').value-2, n = 1; i >= 0; i--, n++) {
		IMG_LIST[i].style.filter = 'blur(' + ((n*5) / +document.getElementById('apertureRange').value) / (Math.pow(+document.getElementById('distanceRange').value,3)) +'px)';
	}
	
}

//Создание новых элементов в контейнере "elemTorii"
function createImg(){
	
	for(let i = 0; i < document.getElementById('setCount').value; i++) {
	
		let newImage = document.createElement('img');
		
		newImage.setAttribute('src', 'http://pluspng.com/img-png/torii-gate-png-torii-gate-by-herbertrocha-610.png');
		newImage.setAttribute('style', 'z-index: ' + -i + ';transform-origin: 50% 75%;');
		
		elemTorii.appendChild(newImage);
	}
}

//Удаждение всех элементов в контейнере "elemTorii"
function removeImg() {
	
	let currentImgLength = IMG_LIST.length;
	
	for(let i = 0; i < currentImgLength; i++) {
		IMG_LIST[0].remove();
		//console.log(IMG_LIST.length);
	}
}

//Реализация эффекта параллакса для всех элементов "img" в контейнере "elemTorii"
function Paralax() {

	document.getElementById('mouseX').innerText = 'X: ' + event.offsetX;
	document.getElementById('mouseY').innerText = 'Y: ' + event.offsetY;

	for(let i = IMG_LIST.length-1, j = 0; i >= 0, j < IMG_LIST.length; i-- ,j++) {
		
		if(event.offsetX > AVG_X) {
			IMG_LIST[i].style.left = -(event.offsetX - AVG_X) * j / document.getElementById('effectRange').value + 'px';
		} else {
			IMG_LIST[i].style.left = (AVG_X - event.offsetX) * j / document.getElementById('effectRange').value + 'px';
		}
		
		//Вертикалный параллакс
		/*if(event.offsetY > AVG_Y) {
			IMG_LIST[i].style.top = -(event.offsetY - AVG_Y)*j/document.getElementById('effectRange').value + 'px';
		} else { 
			IMG_LIST[i].style.top = (AVG_Y - event.offsetY)*j/document.getElementById('effectRange').value + 'px';
		}
		*/
	}

}

//Обновление содержимого элементов "label"
function updateLabelValue(rangeId, rangeLabelId) {
	
		document.getElementById(rangeLabelId).innerText = document.getElementById(rangeId).value;
	
}