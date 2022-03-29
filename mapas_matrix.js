///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, 0],
		zoom: 6,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});




///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultmarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h2>Riesgo de muerte por COVID-19<br> de personas mayores (2020)';
	 return div;
	};
	title2.addTo(map);
//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/Logo_Matrix_AltaResolucion.jpg"  width="212px" height="123px" ></img></a>';
	 return div;
	};
	title1.addTo(map);


		//Logo demos
var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="135px" height="94px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 
	
//Logo mayorsig
/*var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  
*/



///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetmap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>@Fundación Matrix 2021</strong></a>',
	}).addTo(map);		
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '©OpenStreetmap, ©CartoDB',
    attribution: '| <a href="https://www.fundacionmatrix.es"><strong>@Fundación Matrix 2021</strong></a>'
    });
var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: '©OpenStreetmap, ©CartoDB',
    pane: 'labels'
    });


var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	opacity: 0.5,
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetmap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetmap </a>',
	});

/*
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
*/
//rasters overlay



///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -2.5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////











    



//estilo y popups de tasas


function getColor1(a) {
	
return a < 0.312? '#1A9640' :
	a < 0.625? '#58B352':
	a < 1.25? '#97D264':
	a < 2.5? '#C4E687':
	a < 5? '#ECF6AD':
	a < 10? '#FFEDAB':
	a < 20? '#FECA81':
	a < 40? '#F89D5A':
	a < 80? '#E75B3A':
	a < 100? '#D7191B':
	
	'#C2523C';
};


function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.A60),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup1(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Riesgo de muerte: </strong>"+  
			feature.properties.A60.toFixed(1).toString().replace(".", ",")+
			"‰<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson1 = L.geoJson(TCR, {
	style: style1,
	onEachFeature: popup1
});

//estilo mapa Cambio
function getColor2(a) {
	
return a < 0.312? '#1A9640' :
	a < 0.625? '#58B352':
	a < 1.25? '#97D264':
	a < 2.5? '#C4E687':
	a < 5? '#ECF6AD':
	a < 10? '#FFEDAB':
	a < 20? '#FECA81':
	a < 40? '#F89D5A':
	a < 80? '#E75B3A':
	a < 100? '#D7191B':
	
	'#C2523C';
};


function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.A80),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup2(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Riesgo de muerte: </strong>"+  
			feature.properties.A80.toFixed(1).toString().replace(".", ",")+
			"‰<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson2 = L.geoJson(TCR, {
	style: style2,
	onEachFeature: popup2
});




//estilo y popups de situación detallada
function getColor3(a) {
	
return a < 0.312? '#1A9640' :
	a < 0.625? '#58B352':
	a < 1.25? '#97D264':
	a < 2.5? '#C4E687':
	a < 5? '#ECF6AD':
	a < 10? '#FFEDAB':
	a < 20? '#FECA81':
	a < 40? '#F89D5A':
	a < 80? '#E75B3A':
	a < 100? '#D7191B':
	
	'#C2523C';
};


function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.B60),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup3(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Riesgo de muerte: </strong>"+  
			feature.properties.B60.toFixed(1).toString().replace(".", ",")+
			"‰<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson3 = L.geoJson(TCR, {
	style: style3,
	onEachFeature: popup3
});


//estilo y popups de tasas


function getColor4(a) {
	
return a < 0.312? '#1A9640' :
	a < 0.625? '#58B352':
	a < 1.25? '#97D264':
	a < 2.5? '#C4E687':
	a < 5? '#ECF6AD':
	a < 10? '#FFEDAB':
	a < 20? '#FECA81':
	a < 40? '#F89D5A':
	a < 80? '#E75B3A':
	a < 100? '#D7191B':
	
	'#b3cd8e';
};


function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.B80),
		weight: 0.9,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};

};
function popup4(feature, layer) {

	if (feature.properties && feature.properties.NAMEUNIT_1) {
		layer.bindTooltip("<strong>Riesgo de muerte: </strong>"+  
			feature.properties.B80.toFixed(1).toString().replace(".", ",")+
			"‰<br><strong>Provincia: </strong>"+
			feature.properties.NAMEUNIT_1,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson4 = L.geoJson(TCR, {
	style: style4,
	onEachFeature: popup4
});





var mapa1 = L.layerGroup([geojson2]).addTo(map);
var mapa2 = L.layerGroup([geojson4]);
var mapa3 = L.layerGroup([geojson1]);
var mapa4 = L.layerGroup([geojson3]);

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Riesgo de muerte de personas de 80 años y más',
	children: [
		{ label: "Periodo A (marzo a mayo de 2020)", layer: mapa1 },
		{ label: "Periodo B (junio a diciembre de 2020)", layer: mapa2 },
	]
	},
	{
	label: '<strong>Riesgo de muerte de personas de 60-69 años',
	children: [
		{ label: "Periodo A (marzo a mayo de 2020)", layer: mapa3 },
		{ label: "Periodo B (junio a diciembre de 2020)", layer: mapa4},
	]},
	
];





	
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},
		{ label: "Hidrografía", layer: positron},
		{ label: "Toponimia", layer: positronLabels},

	]
};	

//leyenda modelo espacial 

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Riesgo de muerte por COVID-19 de personas mayores de edad intermedia. Periodo A'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style1,
			layer: geojson1,
			elements: [{
/*return a > 3.0 ? '#d7191c' :
    a > 2.5 ? '#ea643f' :
	a > 2.0 ? '#fdae61' :
	a > 1.5 ? '#fed791' :
	a > 1.0 ? '#ffffc0' :
	a > 0.5 ? '#d3ec95' :
	a > 0.0? '#a6d96a' : 
	a > -0.5? '#60b856' : 
	a > -1.0? '#1a9641':*/
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Riesgo absoluto anual de personas de 60-69 años estimado mediante un modelo de Poisson. Periodo: 03/03/2020 al 21/05/2020'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: ‰<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '0,001 - 0,312 '+"<\h4>",html: '',style: {'background-color': '#1A9640','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '0,313 - 0,625'+"<\h4>",html: '',style: {'background-color': '#58B352','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,626 - 1,25'+"<\h4>",html: '',style: {'background-color': '#97D264','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,26 - 2,50'+"<\h4>",html: '',style: {'background-color': '#C4E687','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,51 - 5,00'+"<\h4>",html: '',style: {'background-color': '#ECF6AD','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '5,01 - 10,0'+"<\h4>",html: '',style: {'background-color': '#FFEDAB','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '10,1 - 20,0'+"<\h4>",html: '',style: {'background-color': '#FECA81','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '20,1 - 40,0'+"<\h4>",html: '',style: {'background-color': '#F89D5A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '40,1 - 80,0'+"<\h4>",html: '',style: {'background-color': '#E75B3A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '80,1 - 96,4'+"<\h4>",html: '',style: {'background-color': '#D7191B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Instituto de Salud Carlos III y el Instituto Nacional de Estadística (2020).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);


	//H 65


	var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Riesgo de muerte por COVID-19 de personas mayores de edad muy avanzada. Periodo A'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style2,
			layer: geojson2,
			elements: [{
/*return  a > 1.5 ? '#e01600' :
	a > 1.0 ? '#fe6703' :
	a > 0.5 ? '#fdb419' :
	a > 0 ? '#ffd780' :
	a > -0.5 ? '#fbfd76' : 
	a > -1.0? '#e9f498' : 
	a > -2.0? '#b3cd8e':*/
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Riesgo absoluto anual de personas de 80 años y más estimado mediante un modelo de Poisson. Periodo: 03/03/2020 al 21/05/2020'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: ‰<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '0,001 - 0,312 '+"<\h4>",html: '',style: {'background-color': '#1A9640','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '0,313 - 0,625'+"<\h4>",html: '',style: {'background-color': '#58B352','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,626 - 1,25'+"<\h4>",html: '',style: {'background-color': '#97D264','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,26 - 2,50'+"<\h4>",html: '',style: {'background-color': '#C4E687','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,51 - 5,00'+"<\h4>",html: '',style: {'background-color': '#ECF6AD','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '5,01 - 10,0'+"<\h4>",html: '',style: {'background-color': '#FFEDAB','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '10,1 - 20,0'+"<\h4>",html: '',style: {'background-color': '#FECA81','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '20,1 - 40,0'+"<\h4>",html: '',style: {'background-color': '#F89D5A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '40,1 - 80,0'+"<\h4>",html: '',style: {'background-color': '#E75B3A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '80,1 - 96,4'+"<\h4>",html: '',style: {'background-color': '#D7191B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Instituto de Salud Carlos III y el Instituto Nacional de Estadística (2020).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);

	// M 65


		var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Riesgo de muerte por COVID-19 de personas mayores de edad intermedia. Periodo B'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style3,
			layer: geojson3,
			elements: [{
/*return  a > 1.5 ? '#e01600' :
	a > 1.0 ? '#fe6703' :
	a > 0.5 ? '#fdb419' :
	a > 0 ? '#ffd780' :
	a > -0.5 ? '#fbfd76' : 
	a > -1.0? '#e9f498' : 
	a > -2.0? '#b3cd8e':*/
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Riesgo absoluto anual de personas de 60-69 años estimado mediante un modelo de Poisson. Periodo: 22/05/2020 al 31/12/2020'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: ‰<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '0,001 - 0,312 '+"<\h4>",html: '',style: {'background-color': '#1A9640','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '0,313 - 0,625'+"<\h4>",html: '',style: {'background-color': '#58B352','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,626 - 1,25'+"<\h4>",html: '',style: {'background-color': '#97D264','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,26 - 2,50'+"<\h4>",html: '',style: {'background-color': '#C4E687','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,51 - 5,00'+"<\h4>",html: '',style: {'background-color': '#ECF6AD','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '5,01 - 10,0'+"<\h4>",html: '',style: {'background-color': '#FFEDAB','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '10,1 - 20,0'+"<\h4>",html: '',style: {'background-color': '#FECA81','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '20,1 - 40,0'+"<\h4>",html: '',style: {'background-color': '#F89D5A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '40,1 - 80,0'+"<\h4>",html: '',style: {'background-color': '#E75B3A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '80,1 - 96,4'+"<\h4>",html: '',style: {'background-color': '#D7191B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Instituto de Salud Carlos III y el Instituto Nacional de Estadística (2020).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);




	// T 80

		var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			label:+'<br>',
			name: "<h3>"+ 'Riesgo de muerte por COVID-19 de personas mayores de edad muy avanzada. Periodo B<br>'+"<\h3>",
	/*return  a > 3.5 ? '#8d1f0e' :
	a > 3.0 ? '#e01e00' :
	a > 2.5 ? '#fe5602' :
	a > 2.0 ? '#ff9100' :
	a > 1.5 ? '#ffd782' :
	a > 1 ? '#ebfc6d' :
	a > 0.5 ? '#f1f888' : 
	a > 0.0? '#dfec9e' : 
	a > -0.5? '#b3cd8e':
	*/

			style: style4,
			layer: geojson4,
			elements: [{
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Riesgo absoluto anual de personas de 80 años y más estimado mediante un modelo de Poisson. Periodo: 22/05/2020 al 31/12/2020'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+'<br>Unidades: ‰<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				//label:"<h4>"+  ' ≤-1,5'+"<\h4>",html: '',style: {'background-color': '#FAE278','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '0,001 - 0,312 '+"<\h4>",html: '',style: {'background-color': '#1A9640','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '0,313 - 0,625'+"<\h4>",html: '',style: {'background-color': '#58B352','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,626 - 1,25'+"<\h4>",html: '',style: {'background-color': '#97D264','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,26 - 2,50'+"<\h4>",html: '',style: {'background-color': '#C4E687','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,51 - 5,00'+"<\h4>",html: '',style: {'background-color': '#ECF6AD','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '5,01 - 10,0'+"<\h4>",html: '',style: {'background-color': '#FFEDAB','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '10,1 - 20,0'+"<\h4>",html: '',style: {'background-color': '#FECA81','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '20,1 - 40,0'+"<\h4>",html: '',style: {'background-color': '#F89D5A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '40,1 - 80,0'+"<\h4>",html: '',style: {'background-color': '#E75B3A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '80,1 - 96,4'+"<\h4>",html: '',style: {'background-color': '#D7191B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Instituto de Salud Carlos III y el Instituto Nacional de Estadística (2020).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			
			}]

		}],

		
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);

	


//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree,{collapsed:true}).collapseTree(baseTree,overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});