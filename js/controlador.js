var app = angular.module('modTraductor',['pascalprecht.translate']);

//Se configura el módulo de multilenguaje
app.config(['$translateProvider', function ($translateProvider) {
	$translateProvider
	.useStaticFilesLoader({
		prefix: 'languages/textos-',
		suffix: '.json'
	})	
	.preferredLanguage(IDIOMA) //lenguaje predeterminado
	.useSanitizeValueStrategy('escape'); //Para evitar problemas de seguridad http://angular-translate.github.io/docs/#/guide/19_security	
}]);

//Controlador de la página
app.controller('ctrTraductor',function($scope,$translate,$http){

	/* Se carga Objeto con datos en traduccion (archivo textos-ES.json)*/
	$scope.cargarDatos = function(){
		cab = {
			method: "GET",
			url: 	"./languages/textos-ES.json"
		};
		$http(cab).then(function success(respuesta){
			$scope.datosTrad = respuesta.data;
			$scope.canForPrin = Object.keys($scope.datosTrad.formacion.principal).length -1;
			$scope.canForCer = Object.keys($scope.datosTrad.formacion.certificaciones).length -1;
			$scope.canForCom = Object.keys($scope.datosTrad.formacion.complementaria).length -1;
			

			/* Habilidades: detalle, titulos e iconos*/
			$scope.habilidades = [
				{
					"titulo":"programacion",
					"clase":"lista-habilidades",
					"icono": "fa fa-language",
					"listahab": [
						{ 	"nombre" :"Java (JSP, servlets)",
							"nivel"	 : "99%"
						},
						{ 	"nombre" :"Delphi 2007",
							"nivel"	 : "80%"
						},
						{ 	"nombre" :"PHP",
							"nivel"	 : "70%"
						},
						{ 	"nombre" :"HTML5",
							"nivel"	 : "70%"
						},
						{ 	"nombre" :"JavaScript",
							"nivel"	 : "80%"
						},
						{ 	"nombre" :"CSS3",
							"nivel"	 : "70%"
						},
						{ 	"nombre" :"SASS",
							"nivel"	 : "40%"
						},
						{ 	"nombre" :"Visual Basic",
							"nivel"	 : "50%"
						},
						{ 	"nombre" :"PL/SQL",
							"nivel"	 : "90%"
						},
						{ 	"nombre" :"Transact SQL" ,
							"nivel"	 : "70%"
						},
						{
							"nombre" :"XML" ,
							"nivel"	 : "70%"
						},
						{ 	"nombre" :"JSON",
							"nivel"	 : "80%"
						}
					]			
				},
				{
					"titulo":"basesdatos",
					"clase":"lista-habilidades-bd",
					"icono": "fa fa-database",
					"listahab":[		
						{
							"nombre":"Oracle 10g", 
							"nivel":"80%"
						},
						{
							"nombre":"SQL Server 2005", 
							"nivel":"70%"
						},
						{
							"nombre":"MySQL", 
							"nivel":"60%"
						},
						{
							"nombre":"Postgress", 
							"nivel":"70%"
						},
						{
							"nombre":"DB2",
							"nivel":"30%"
						}
					]			
				},
				{
					"titulo":"herramientas",
					"clase":"lista-habilidades-h",
					"icono": "fa fa-gears",
					"listahab": [

						{
							"nombre":"Git", 	
							"nivel":"90%"
						},
						{
							"nombre":"Eclipse", 	
							"nivel":"80%"
						},
						{
							"nombre":"NetBeans", 	
							"nivel":"80%"
						},
						{
							"nombre":"Delphi 2007", 	
							"nivel":"90%"
						},
						{
							"nombre":"Android Studio",
							"nivel":"60%"
						}
					]			
				},
					{
					"titulo":"frameworks",
					"clase":"lista-habilidades-f",
					"icono": "fa fa-cubes",
					"listahab": [

						{
							"nombre":"Bootstrap", 	
							"nivel":"70%"
						},
						{
							"nombre":"Angular.js", 	
							"nivel":"80%"
						},
						{
							"nombre":"JQuery", 	
							"nivel":"70%"
						},
						{
							"nombre":"Node.js", 	
							"nivel":"30%"
						}
					]			
				},
				{
					"titulo":"servidores",
					"clase":"lista-habilidades-s",
					"icono": "fa fa-server",
					"listahab":  [
						{
							"nombre":"Tomcat", 	
							"nivel":"70%"
						},
						{
							"nombre":"Apache", 	
							"nivel":"80%"
						},
						{
							"nombre":"Glassfish", 	
							"nivel":"40%"
						}
					]		
				},
				{
					"titulo":"programas",
					"clase":"lista-habilidades-p",
					"icono": "glyphicon glyphicon-cog",
					"listahab":  [
						{
							"nombre":"Adobe Illustrator", 	
							"nivel":"80%"
						},
						{
							"nombre":"Adobe Photoshop", 	
							"nivel":"80%"
						},
						{
							"nombre":"Excel", 	
							"nivel":"90%"
						},
						{
							"nombre":"Word", 	
							"nivel":"99%"
						}
					]		
				},					
			];

			/* Ordena Habilidades por nivel*/
			for (var i = 0; i < $scope.habilidades.length; i++) {
				$scope.habilidades[i].listahab.sort(function (a, b) {
				  if (a.nivel > b.nivel) {
				    return -1;
				  }
				  if (a.nivel < b.nivel) {
				    return 1;
				  }
				  return 0
				});
			}

			/* Formaciones: Títulos e iconos*/
			$scope.formaciones = [
				{
					"titulo":"principal",
					"cantidad":	generarArr($scope.canForPrin),
					"shtiempo":"false" ,
					"icono":"fa fa-graduation-cap"
				},
				{
					"titulo":"certificaciones",
					"cantidad":	generarArr($scope.canForCer),
					"shtiempo":"true",/*Oculta campo tiempo*/
					 "icono"	:"fa fa-drivers-license-o"
				},
						{
					"titulo":"complementaria",
					"cantidad":	generarArr($scope.canForCom),
					"shtiempo":"false",
					"icono":"glyphicon glyphicon-grain"
				}
			];	

			/* Experiencia: Iconos*/
			$scope.ExpIco =
				[{
					"icono" :   "fa fa-briefcase" /*Heinsohn*/
				},
				{
					"icono" :   "fa fa-desktop" /*Heinsohn*/
				},
				{
					"icono" :   "fa fa-group" /*Aseinfo*/
				},
				{
					"icono" :   "fa fa-industry" /*MTI*/
				},
				{
					"icono" :   "fa fa-group" /* Realizar*/
				}];

			/* Idiomas: Imagenes*/
			$scope.idiomas = [
				"",
				"img/ESP.jpg",
				"img/FRA.jpg",
				"img/GB.jpg"
			]

			$scope.ExpPri = generarArr(Object.keys($scope.datosTrad.experiencia).length);
			$scope.Expfun = generarArr(Object.keys($scope.datosTrad.experiencia.expe1.funciones).length-1);

		}, function error(respuesta){
			console.log(respuesta);
		});		
	}

	$scope.cargarDatos();    

	/* Inicializa arreglos */
	function generarArr(num){
		arr = new Array();
		for (var i = 1; i <= num; i++) {
			arr.push(i);
		}
		return arr;		
	}


	$scope.cambiaridioma = function(idioma){
		$translate.use(idioma);
	}
	
});


/* Directiva para funciones*/
app.directive('funciones',[function(){
	return{
		restrict: 		'A',
		templateUrl: 	function(elem, attr){
				return './directives/funciones.html';
			},
		scope: 	{
			numfun: "=",
			numexp: "="
		}
	}
}]);