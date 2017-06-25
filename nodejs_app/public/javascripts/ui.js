$(document).ready(function(){
	var triangleElement = $("#colorTriangle");
	
	var colorTriangle = new ColorTriangle("#FF0000", {
		size: triangleElement.width(),
		padding:20,
	});
	
	colorTriangle.addEventListener('drag', function(){
		var rgb = colorTriangle.getRGB();
		uiToColor(rgb);
		setColor(rgb);
	});
	
	triangleElement.on("recieveColor", function(e, rgb){
		colorTriangle.setRGB(rgb[0], rgb[1], rgb[2]);
		uiToColor(rgb);
	});
	
	//color in rgb[0-1, 0-1, 0-1]
	function uiToColor(rgb){
		var byteRgb = [Math.floor(rgb[0]*255), Math.floor(rgb[1]*255), Math.floor(rgb[2]*255)];
		$("#rgbInfo").html(byteRgb[0]+"R "+byteRgb[1]+"G "+byteRgb[2]+"B");
		$("body").css({
			"background-color": "rgb("+byteRgb[0]+","+byteRgb[1]+","+byteRgb[2]+")"
		});
	}
	
	colorTriangle.inject(triangleElement[0]);
	
	function createOptionElement(el){
		switch(el.attr("action-type")){
			case "hold":		
				el.html('Hold<div class="inputs"><input type="number" min="1" max="6000000" value="1000"></div>');
				
				var input = $('<BUTTON class="jscolorButton"></BUTTON>');
				el.find('.inputs').append(input);
				var picker = new jscolor(input[0], {
					valueElement: null,
					styleElement: el[0],
					required: false,
					refine: false
				});
				break;
			case "sweep":
				el.html('Sweep<div class="inputs"><input type="number" min="1" max="6000000" value="1000"></div>');
				
				var input = $('<BUTTON class="jscolorButton"></BUTTON>');
				el.find('.inputs').append(input);
				var picker = new jscolor(input[0], {
					valueElement: null,
					styleElement: el[0],
					required: false,
					refine: false
				});
				break;
		}
	}
	
	//DRAGGING
	$("#designOptions div.option").draggable({
		cursor:'move',
		connectToSortable: "#designBox",
		containment: $("#design"),
		helper: 'clone',
		revert: 'invalid',
		revertDuration: 50
	})
	
	$("#designBox").sortable({
		revert: 50,
		cursor:'move',
		containment: $("#design"),
		stop: function(event, ui){
			if($(ui.item).hasClass("draggable")){
				$(ui.item).html("");
				$(ui.item).removeClass("draggable").removeAttr("style");
				createOptionElement($(ui.item));
			}
		}
	});
	
});
	