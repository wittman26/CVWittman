/************************/
/* VARIABLES GLOBALES */
/************************/

var IDIOMA = 'ES'; /* Idioma por defaul*/
var pos = 1;	/* Posición de imagen*/
var cargahabilidad = 1; /* Indicador de carga de habilidades*/

/************************/
/* IDIOMA DEL NAVEGADOR*/
/************************/

window.onload = function(){
	var lang = window.navigator.userLanguage || window.navigator.language;
	IDIOMA = lang.substring(0,2).toUpperCase();
	// console.log("Verifica el idioma!");
	// console.log("window.navigator.userLanguage || window.navigator.language = " + IDIOMA);
}

/************************/
/* FUNCION INICIAL */
/************************/

$(document).ready(function(){
	// animarBarras(1);
	
	/* Habilita animación en scroll*/
	$('#barra-principal').localScroll();

	/* Coloca o quita movilidad a menú principal*/
	manejarMenuMovil();

	/* INICIO - Evento mostrar menú en Inicio*/
	$('.boton-flecha').on('click',mostrarMenuSuave);

	/* INICIO - Manejo de imagenes de fondo*/
	var width = $('.slider_container').width();

	/* INICIO - Cada 5 segs cambia imagen */
	// intervalo = setInterval(cambioImagen, 5000);

	/* INICIO - Anima el botón flecha */
	setInterval(function(){
        $("#animaflecha").animate({ 'opacity': '1', 'top' : '8px'},500)
        $("#animaflecha").animate({ 'opacity': '0.5', 'top' : '-4px'},500)
        },1000); 	

	/* IDIOMA - Inicializa estilo de botón según idioma del navegador */
	$(".barra-idioma>ul>li>a>img").each(function(){
		$(".barra-idioma>ul>li>a>img").each(function(){
			if($(this).attr("id") == IDIOMA){
				$(this).addClass("activo");
			}
		});
	});

	/* IDIOMA - Resalta botón del idioma */
	$(".barra-idioma>ul>li>a>img").each(function(){
		$(this).click(function(){
			$(".barra-idioma>ul>li>a>img").each(function(){
				$(this).removeClass("activo");						
			});
			$(this).addClass("activo");
		});
	});

	/* Resalta botón del menú de acuerdo a ubicación */
	$("#navPrincipal>ul>li>a").each(function(){
		$(this).click(function(){
			if($(this).attr('href')=='#habilidades'){
				animarBarras();				
			}

		});
	});		

});


/************************/
/** FUNCIONES **/
/************************/

function animarBarras(anima){
	if(anima==1){
		$(".progress-bar").each(function(){
			  var data = $(this).data('nivel');   
	        $(this).animate({ 'width': data},800);
		});
		cargahabilidad=0;		
	} 
	// if(anima==0){
	// 	$(".progress-bar").each(function(){
	//         $(this).animate({ 'width': 0},500);
	// 	});
	// 	cargahabilidad=1;		
	// }
}

/* Mover menú si la sección es inicio */
function manejarMenuMovil(){
	var z = $(".nav li.active > a").attr("href");
	verificaId(z);

    $(window).on('scroll', function() 
	{  
   		/*Guarda nombre de seccion*/
        var x = $(".nav li.active > a").attr("href");

        /*Si seccion es inicio, menu debe ser móvil*/
        verificaId(x);

        var posi = $(window).scrollTop();
		if( (x=="#habilidades" || posi >750) && cargahabilidad==1)
			animarBarras(1);
		// if(x!="#habilidades" && x!="#perfil" && cargahabilidad==0)
		// 	animarBarras(0);

	});
}

function verificaId(ide){
	/* Si sección es incio, el menú debe ser móvil */
	if(ide=="#inicio"){
    	$('#barra-principal').removeClass('barra-principal-fija');
    	$('#barra-principal').addClass('barra-principal-movil');
    } else {
    	$('#barra-principal').removeClass('barra-principal-movil');
		$('#barra-principal').addClass('barra-principal-fija');     	
    }
}

/* Activa efecto smooth al hacer click en flecha en INCIO */
function mostrarMenuSuave(){
	// Smoot scroll
	// https://www.w3schools.com/bootstrap/bootstrap_ref_js_scrollspy.asp
	  if (this.hash !== "") {

	    // Prevent default anchor click behavior
	    event.preventDefault();

	    // Store hash
	    var hash = this.hash;

	    // Using jQuery's animate() method to add smooth page scroll
	    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	    $('html, body').animate({
	      scrollTop: $(hash).offset().top
	    }, 900, function(){

	    // Add hash (#) to URL when done scrolling (default click behavior)
	      window.location.hash = hash;
	    });

	  } // End if		
}

/* Al hacer click, llama a la función cambioImagen */
function cambioImagen(){
	
	var slide_target = 0;
	
	pos++;
		if(pos>$('.slide').length){
			pos=0;
		}
	slide_target = pos;

	//Cambia la animación para mover la imagen de izquierda a derecha
	var aux=pos-1;
	if (aux==0) {
		aux=$('.slide').length;
	}
	/* Imagen anterior */
	$('.slideContainer #slideimg'+aux).animate({
		'opacity':'0',
		'background-size': 'cover'
	},1500);
	
	/* Imagen siguiente */
	$('.slideContainer #slideimg'+pos).animate({
		'opacity':'1',
		'background-size': 'cover'
	},1500);
}
