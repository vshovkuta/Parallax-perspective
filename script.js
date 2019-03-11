	/*
<img style="z-index: -1; transform: scale(1)" src="http://pluspng.com/img-png/torii-gate-png-torii-gate-by-herbertrocha-610.png">
*/

var elemTorii = document.getElementById('Torii');
var AVG_X = parseInt(elemTorii.style.width)/2;
var AVG_Y = parseInt(elemTorii.style.height)/2;

var IMG_LIST = elemTorii.getElementsByTagName('img'); //HTMLCollection

initTorii();

document.getElementById('setCount').oninput = initTorii;
document.getElementById('distanceRange').oninput = setDistance;
document.getElementById('apertureRange').oninput = setAperture;
document.getElementById('effectRange').oninput = setEffect;

document.getElementById('offsetX').innerText = 'offsetX: ' + AVG_X;
document.getElementById('offsetY').innerText = 'offsetY: ' + AVG_Y;

elemTorii.onmousemove = Paralax;

function initTorii() {
	
	updateLabelValue('setCount', 'setCountValue');
	
	removeImg();
	createImg();
	setAperture();
	setDistance();
	setEffect();
	
}

function setDistance() {
	
	updateLabelValue('distanceRange', 'distanceRangeValue');
	
	for(let i = 0; i < IMG_LIST.length; i++) {
		IMG_LIST[i].style.transform = 'scale(' + (1*Math.pow(document.getElementById('distanceRange').value,i+1-1)) + ')';
		//console.log(i);
	}
	
	setAperture();
}

function setEffect() {
	
	updateLabelValue('effectRange', 'effectRangeValue');
}


function setAperture() {
	
	updateLabelValue('apertureRange', 'apertureRangeValue');
	
	for(let i = 0; i < IMG_LIST.length; i++) {
		IMG_LIST[i].style.filter = 'blur(' + 
			/*(( i * ( (20/(+document.getElementById('apertureRange').value)/(+document.getElementById('distanceRange').value+document.getElementById('apertureRange').value )) 
			/ ( +document.getElementById('apertureRange').value * 50) 
			) 
		) / (document.getElementById('distanceRange').value*document.getElementById('distanceRange').value) ) */
		
		((i*5) / +document.getElementById('apertureRange').value) / (Math.pow(+document.getElementById('distanceRange').value,3))
		
		//Math.log(i*10 + +document.getElementById('apertureRange').value) 
		+'px)';
	}
}


function createImg(){
	
	for(let i = 0; i < document.getElementById('setCount').value; i++) {
	
		let newImage = document.createElement('img');
		
		newImage.setAttribute('src', 'http://pluspng.com/img-png/torii-gate-png-torii-gate-by-herbertrocha-610.png');
		newImage.setAttribute('style', 'z-index: ' + -i + ';transform-origin: 50% 75%;');
		
		elemTorii.appendChild(newImage);
	}
}




function removeImg() {
	
	let currentImgLength = IMG_LIST.length;
	
	for(let i = 0; i < currentImgLength; i++) {
		IMG_LIST[0].remove();
		//console.log(IMG_LIST.length);
	}
 
}






function Paralax() {

	document.getElementById('mouseX').innerText = 'X: ' + event.offsetX;
	document.getElementById('mouseY').innerText = 'Y: ' + event.offsetY;

	for(let i = IMG_LIST.length-1, j = 0; i >= 0, j < IMG_LIST.length; i-- ,j++) {
		
		if(event.offsetX > AVG_X) {
			IMG_LIST[i].style.left = -(event.offsetX - AVG_X) * j / document.getElementById('effectRange').value + 'px';
		} else {
			IMG_LIST[i].style.left = (AVG_X - event.offsetX) * j / document.getElementById('effectRange').value + 'px';
		}
		
		/*if(event.offsetY > AVG_Y) {
			IMG_LIST[i].style.top = -(event.offsetY - AVG_Y)*j/document.getElementById('effectRange').value + 'px';
		} else { 
		IMG_LIST[i].style.top = (AVG_Y - event.offsetY)*j/document.getElementById('effectRange').value + 'px';
		}
		*/
	}

}



function updateLabelValue(rangeId, rangeLabelId) {
	//if(document.getElementById(rangeId).value == '0') {
	//	document.getElementById(rangeLabelId).innerText = 'off'
	//} else {
		document.getElementById(rangeLabelId).innerText = document.getElementById(rangeId).value;
	//}	 
}