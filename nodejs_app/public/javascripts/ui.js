$(document).ready(function(){
	var colorPickerElement = document.getElementById("colorPicker");
	console.log(colorPickerElement);

	var colors = new Colors({
		color: 'rgba(253,0,0,1)'
	})

	var colorPicker = new ColorPicker({
		mode: 'rgb-b',
		fps: 60,
		size: 3,
		appendTo: colorPickerElement
	})
});