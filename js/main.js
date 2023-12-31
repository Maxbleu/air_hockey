window.onload = function() {

	let idAnimacionHockey;
	let idAnimacionAbrirCerrarBoca;
	let idAnimacionTimer;
	let idModoFiesta;

	let dificulty;

	let ctx;
	let canvas;
	let tablaRecords;

	let inputNickName;
	let botonStartGame;
	let tituloMasInformacion;
	let textoInformativoMF;
	let card;

	let radioButtonEassy;
	let radioButtonMedium;
	let radioButtonYashin;

	let sonidoPuck;
	let sonidoGol;
	let sonidoVictoria;
	let sonidoDerrota;
	let cancionSecreta;

	let timer;
	let puckComeCocos;

	let stickLocal;
	let marcadorLocal;
	let porteriaLocal;

	let stickVisitante;
	let marcadorVisitante;
	let porteriaVisitante;


	//	DIFICULTADES

	class Dificultades{

		static listaDificultades = [
			new Dificultad(1,"EASSY"),
			new Dificultad(2,"MEDIUM"),
			new Dificultad(3,"YASHIN")
		];

		static obtenerDificultadSeleccionada = function(){
			if(radioButtonEassy.checked){
				return this.listaDificultades[0];
			}
	
			if(radioButtonMedium.checked){
				return this.listaDificultades[1];
			}
	
			if(radioButtonYashin.checked){
				return this.listaDificultades[2];
			}

			return null;
		}
	}


	//	TIMER

	/**
	 * Este objeto representa el 
	 * tipo que pasa en la partida
	 */
	function Timer(){

		this.segundos = 0;
		this.minutos = 0;

	}
	Timer.prototype.obtenerTiempo = function(){
		return new TiempoJugado(this.minutos,this.segundos);
	}
	Timer.prototype.actualizarTiempo = function(){
		this.segundos++;
		if (this.segundos === 60) {
			this.minutos++;
			this.segundos = 0;
		}
	}
	Timer.prototype.showTimer = function(){

		let unidades = [];

		//	MINUTOS

		let minutosString = this.minutos.toString();
		unidades = minutosString.split('');
		if(unidades.length === 1){unidades.unshift(0);}
		unidades.forEach(function(value){
			return parseInt(value);
		});

		//	PRIMER NÚMERO MINUTOS
		ctx.drawImage
				(
					HOCKEYASSETS,
					this.NUMEROS[unidades[0]].SKINCOORDS[0],
					this.NUMEROS[unidades[0]].SKINCOORDS[1],
					this.NUMEROS[unidades[0]].anchura,
					this.NUMEROS[unidades[0]].altura,
					18,
					16,
					this.NUMEROS[unidades[0]].anchura,
					this.NUMEROS[unidades[0]].altura
				);

		//	SEGUNDO NÚMERO MINUTOS
		ctx.drawImage
				(
					HOCKEYASSETS,
					this.NUMEROS[unidades[1]].SKINCOORDS[0],
					this.NUMEROS[unidades[1]].SKINCOORDS[1],
					this.NUMEROS[unidades[1]].anchura,
					this.NUMEROS[unidades[1]].altura,
					39,
					16,
					this.NUMEROS[unidades[1]].anchura,
					this.NUMEROS[unidades[1]].altura
				);

		//	DOS PUNTOS
		ctx.drawImage
				(
					HOCKEYASSETS,
					this.DOSPUNTOS.SKINCOORDS[0],
					this.DOSPUNTOS.SKINCOORDS[1],
					this.DOSPUNTOS.anchura,
					this.DOSPUNTOS.altura,
					this.DOSPUNTOS.x,
					this.DOSPUNTOS.y,
					this.DOSPUNTOS.anchura,
					this.DOSPUNTOS.altura
				);

		//	SEGUNDOS
		
		unidades = [];
		let segundosString = this.segundos.toString();
		unidades = segundosString.split('');
		if(unidades.length == 1){unidades.unshift(0);}
		unidades.forEach(function(value){
			return parseInt(value);
		});

		//	PRIMER NÚMERO SEGUNDOS
		ctx.drawImage
				(
					HOCKEYASSETS,
					this.NUMEROS[unidades[0]].SKINCOORDS[0],
					this.NUMEROS[unidades[0]].SKINCOORDS[1],
					this.NUMEROS[unidades[0]].anchura,
					this.NUMEROS[unidades[0]].altura,
					66,
					16,
					this.NUMEROS[unidades[0]].anchura,
					this.NUMEROS[unidades[0]].altura
				);

		//	SEGUNDO NÚMERO SEGUNDOS
		ctx.drawImage
				(
					HOCKEYASSETS,
					this.NUMEROS[unidades[1]].SKINCOORDS[0],
					this.NUMEROS[unidades[1]].SKINCOORDS[1],
					this.NUMEROS[unidades[1]].anchura,
					this.NUMEROS[unidades[1]].altura,
					87,
					16,
					this.NUMEROS[unidades[1]].anchura,
					this.NUMEROS[unidades[1]].altura
				);
	}
	Timer.prototype.DOSPUNTOS = {
		SKINCOORDS : [339,50],
		altura :24,
		anchura:4,
		x:60,
		y:20
	};
	Timer.prototype.NUMEROS = [
		{
			SKINCOORDS : [305,43],
			altura: 31,
			anchura: 19
		},
		{
	
			SKINCOORDS : [16,43],
			altura: 31,
			anchura: 5
		},
		{
			SKINCOORDS : [36,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [70,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [103,43],
			altura: 31,
			anchura: 19 
		},
		{
			SKINCOORDS : [138,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [170,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [204,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [238,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [271,43],
			altura: 31,
			anchura: 19
		}
	];


	//	PUCK

	class PuckComeCocos extends HockeyElement {

		ANIMACIONESCOMECOCOS = [[203,243],[235,243]];
		VELOCIDADPUCK = 4;
	
		/**
		 * 		OBJETO PUCKCOMECOCOS
		 * Este objeto se encarga de gestionar todas 
		 * las acciones del objeto PuckComeCocos
		 * @param {number} _x 
		 * @param {number} _y
		 */
		constructor(_x, _y){
			
			super(_x, _y, 30, 30);
			this.direccion = 0;
			this.posicionAnimacionComecocos = 0;
			this.haEntradoUnaParteEnLaPorteriaLocal = false;
			this.haEntradoUnaParteEnLaPorteriaVisitante = false;

		}

		abrirCierraBoca(){
			this.posicionAnimacionComecocos = (this.posicionAnimacionComecocos + 1) % 2;
		}

		mantenerPuckEnElCanvas(){
			if(this.direccion != 0){
				if(Math.floor(this.y) < LIMITEARRIBA) {
	
					if(this.haEntradoUnaParteEnLaPorteriaVisitante){
						if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
							this.direccion = Math.PI - this.direccion;
							puckComeCocos.reproducirAudio();
						}
	
					}else if(Math.floor(this.x) <= Porteria.prototype.INICIOPORTERIA && Math.floor(this.x) >= 118 
							|| 
							Math.floor(this.coordsLadoDerecho()) >= Porteria.prototype.FINPORTERIA && Math.floor(this.coordsLadoDerecho() <= 262)){
	
						this.direccion = -this.direccion;
						puckComeCocos.reproducirAudio();
	
					}else if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
						this.direccion = -this.direccion;
						puckComeCocos.reproducirAudio();
					}
	
				}
				if(Math.floor(this.x) < LIMITELADOIZQUIERDO || Math.floor(this.coordsLadoDerecho()) > LIMITELADODERECHO){
					this.direccion = Math.PI - this.direccion;
					puckComeCocos.reproducirAudio();
				}
				if(Math.floor(this.coordsParteAbajo()) > LIMITEABAJO){
	
					if(this.haEntradoUnaParteEnLaPorteriaLocal){
						if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
							this.direccion = Math.PI - this.direccion;
							puckComeCocos.reproducirAudio();
						}
					}else if(Math.floor(this.x) <= Porteria.prototype.INICIOPORTERIA && Math.floor(this.x) >= 118 
							|| 
							Math.floor(this.coordsLadoDerecho()) >= Porteria.prototype.FINPORTERIA && Math.floor(this.coordsLadoDerecho() <= 262)){
	
						this.direccion = -this.direccion;
						puckComeCocos.reproducirAudio();
	
					}else if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
						this.direccion = -this.direccion;
						puckComeCocos.reproducirAudio();
					}
				}
				if(Math.floor(this.coordsParteAbajo() > LIMITEMEDIOCAMPO)){
					stickVisitante.cantidadDeContactosConDiscoCadaVezQueEntraASuCampo = 0;
				}
			}
		}

		moverPuck(){
			if(this.direccion != 0){
				this.x += this.VELOCIDADPUCK * Math.cos(this.direccion);
				this.y += this.VELOCIDADPUCK * Math.sin(this.direccion);
			}
		}

		detectarColisionEntrePuckStick(stick){
			let distanciaX = Math.floor(Math.pow((stick.rx() - this.rx()),2));
			let distanciaY = Math.floor(Math.pow((stick.ry() - this.ry()),2));
	
			let distanciaEntreElementos = Math.sqrt(distanciaX + distanciaY);
			let sumaRadiosPuckyStick = stick.radio() + puckComeCocos.radio();
	
			if (distanciaEntreElementos<sumaRadiosPuckyStick) {
				return true;
			}
			return false;
		}

		showPuck(){
			ctx.drawImage
				(
					HOCKEYASSETS,
					this.ANIMACIONESCOMECOCOS[this.posicionAnimacionComecocos][0],
					this.ANIMACIONESCOMECOCOS[this.posicionAnimacionComecocos][1],
					this.anchura,
					this.altura,
					this.x,
					this.y,
					this.anchura,
					this.altura
				);
		}

		modificarDireccionDelPuck(stick){
			this.direccion = Math.atan2(this.ry() - stick.ry(), this.rx() - stick.rx());
		}

		reproducirAudio(){

			sonidoPuck.play();
			sonidoPuck.currentTime = 0;
	
		}
	
	}


	//	STICKHOCKEY

	class StickLocal extends StickHockey{

		VELOCIDADSTICKHOCKEYLOCAL = 3;

		/**
		 * 		OBJETO STICKLOCAL
		 * @param {number} _x 
		 * @param {number} _y 
		 */
		constructor(_x, _y){
			super(_x, _y);

			this.arriba = false;
			this.abajo = false;
			this.izquierda = false;
			this.derecha = false;
		}

		moverStickLocal(){
			if(this.izquierda){
				this.x -= this.VELOCIDADSTICKHOCKEYLOCAL;
			}
			if(this.arriba){
				this.y -= this.VELOCIDADSTICKHOCKEYLOCAL;
			}
			if(this.derecha){
				this.x += this.VELOCIDADSTICKHOCKEYLOCAL;
			}
			if(this.abajo){
				this.y += this.VELOCIDADSTICKHOCKEYLOCAL;
			}
		}

		mantenerStickLocalEnElCanvas(){
			if(this.direccion != 0){
				if(this.x < LIMITELADOIZQUIERDO){
					this.x = LIMITELADOIZQUIERDO;
				}
				if(this.y < LIMITEMEDIOCAMPO){
					this.y = LIMITEMEDIOCAMPO;
				}
				if(this.coordsLadoDerecho() > LIMITELADODERECHO){
					this.x = 295;
				}
				if(this.coordsParteAbajo() > LIMITEABAJO){
					this.y = 516;
				}
			}
		}

		showStickLocal(){
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.SKINCOORDS[0],
						this.SKINCOORDS[1],
						this.anchura,
						this.altura,
						this.x,
						this.y,
						this.anchura,
						this.altura
					);
		}

	}


	class StickVisitante extends StickHockey {

		/**
		 * 		OBJETO STICKVISITANTE
		 * @param {number} _x 
		 * @param {number} _y 
		 */
		constructor(_x, _y, _velocidad){
			super(_x, _y,);
			this.velocidad = _velocidad;
			this.cantidadDeContactosConDiscoCadaVezQueEntraASuCampo = 0;
		}

		moverStickVisitante(){

			if (puckComeCocos.y < LIMITEMEDIOCAMPO) {
	
				if(this.cantidadDeContactosConDiscoCadaVezQueEntraASuCampo < 2){
					if ((puckComeCocos.x + puckComeCocos.radio()+6) < this.x) {
						this.x -= this.velocidad;
					} else if (puckComeCocos.x > (this.x + this.radio())) {
						this.x += this.velocidad;
					}
	
					if ((puckComeCocos.y + puckComeCocos.radio()) < this.y) {
						this.y -= this.velocidad;
					} else {
						this.y += this.velocidad;
					}
				} else {
				
					if(this.x > this.posicionInicalEnX){
						this.x -= this.velocidad;
					}else if(this.x < this.posicionInicalEnX){
						this.x += this.velocidad;
					}
	
					if(this.y > this.posicionInicalEnY){
						this.y -= this.velocidad;
					}else if(this.y < this.posicionInicalEnY){
						this.y += this.velocidad;
					}
	
				}
			
			} else {
				
				if(this.x > this.posicionInicalEnX){
					this.x -= this.velocidad;
				}else if(this.x < this.posicionInicalEnX){
					this.x += this.velocidad;
				}
	
				if(this.y > this.posicionInicalEnY){
					this.y -= this.velocidad;
				}else if(this.y < this.posicionInicalEnY){
					this.y += this.velocidad;
				}
	
			}
	
		}

		mantenerStickVisitanteEnElCanvas(){
			if(this.direccion != 0){
				if(this.y < LIMITEARRIBA){
					this.y = LIMITEARRIBA;
				}
				if(this.x < LIMITELADOIZQUIERDO){
					this.x = LIMITELADOIZQUIERDO;
				}
				if(this.coordsParteAbajo() > LIMITEMEDIOCAMPO){
					this.y = 227;
				}
				if(this.coordsLadoDerecho() > LIMITELADODERECHO){
					this.x = 295;
				}
			}
		}

		showStickVisitante(){
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.SKINCOORDS[0],
						this.SKINCOORDS[1],
						this.anchura,
						this.altura,
						this.x,
						this.y,
						this.anchura,
						this.altura
					);
	}

	}



	//	MARCADORES

	class MarcadorLocal extends Marcador {

		/**
		 * Este objeto representa el 
		 * marcador del equipo local
		 * @param {number} _x 
		 * @param {number} _y 
		 */
		constructor(_x, _y){
			super(_x, _y);
		}

		anotarGolDelLocal(){
			this.goles += 1;
		}

		haGanadoElEquipoLocal(){
			if(this.goles === CANTIDADGOLESPARAGANAR){
				return true;
			}
			return false;
		}

		showMarcadorLocal(){
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.NUMEROS[this.goles].SKINCOORDS[0],
						this.NUMEROS[this.goles].SKINCOORDS[1],
						this.anchura,
						this.altura,
						this.x,
						this.y,
						this.anchura,
						this.altura
					);
	}	

	}

	class MarcadorVisitante extends Marcador {

		/**
		 * Este objeto representa el 
		 * marcador del equipo visitante
		 * @param {number} _x 
		 * @param {number} _y 
		 */
		constructor(_x, _y){
			super(_x, _y);
		}

		anotarGolDelVisitante(){
			this.goles += 1;
		}

		haGanadoElEquipoVisitante(){
			if(this.goles === CANTIDADGOLESPARAGANAR){
				return true;
			}
			return false;
		}

		showMarcadorVisitante(){
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.NUMEROS[this.goles].SKINCOORDS[0],
						this.NUMEROS[this.goles].SKINCOORDS[1],
						this.anchura,
						this.altura,
						this.x,
						this.y,
						this.anchura,
						this.altura
					);
		}

	}


	function gameLoop() {
		
		//	borramos el canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//	cargamos el fondo
		ctx.drawImage(BACKGROUND,0,0,380,599,0,0,380,599);

		puckComeCocos.mantenerPuckEnElCanvas();
		puckComeCocos.moverPuck();

		stickLocal.mantenerStickLocalEnElCanvas();
		stickLocal.moverStickLocal();

		stickVisitante.mantenerStickVisitanteEnElCanvas();
		stickVisitante.moverStickVisitante();

		//	Comprobamos si el puck ha colisionado con el stick user
		if(puckComeCocos.detectarColisionEntrePuckStick(stickLocal)){
			puckComeCocos.modificarDireccionDelPuck(stickLocal);
			puckComeCocos.reproducirAudio();
		}

		//	Comprobamos si el puck ha colisionado con el stick IA
		if(puckComeCocos.detectarColisionEntrePuckStick(stickVisitante)){
			puckComeCocos.modificarDireccionDelPuck(stickVisitante);
			puckComeCocos.reproducirAudio();
			stickVisitante.cantidadDeContactosConDiscoCadaVezQueEntraASuCampo++;
		}

		//	Comprobamos si el disco ha entrado en la portería local
		if(porteriaLocal.elDiscoHaEntrado(puckComeCocos)){
			marcadorVisitante.anotarGolDelVisitante();
			sonidoGol.play();
			if(marcadorVisitante.haGanadoElEquipoVisitante()){
				iaHaGanado();
			}else{
				volverALasPosicionesIniciales();
			}
		}

		//	Comprobamos si el disco ha entrado en la portería visitante
		if(porteriaVisitante.elDiscoHaEntrado(puckComeCocos)){
			marcadorLocal.anotarGolDelLocal();
			sonidoGol.play();
			if(marcadorLocal.haGanadoElEquipoLocal()){
				usuarioHaGanado();
			}else{
				volverALasPosicionesIniciales();
			}
		}

		timer.showTimer();
		marcadorLocal.showMarcadorLocal();
		marcadorVisitante.showMarcadorVisitante();
		puckComeCocos.showPuck();
		stickLocal.showStickLocal();
		stickVisitante.showStickVisitante();
	}
	/**
	 * Este método se encarga de iniciar el funcionamiento del juego
	 */
	function startGame(){
		
		//	Lanzamos la animación
		idAnimacionHockey = setInterval(gameLoop, 1000/50);
		
		//	Animación encargada de abrir y cerra la boca
		idAnimacionAbrirCerrarBoca = setInterval(function(){
			puckComeCocos.abrirCierraBoca()
		}, 1000/8);

		//	Lanzamos la animación timer
		idAnimacionTimer = setInterval(function(){
			timer.actualizarTiempo()
		},1000);
	}
	/**
	 * Este método se encarga de cerrar 
	 * parar el funcionamiento del juego
	 */
	function finishGame(){
		
		clearInterval(idAnimacionAbrirCerrarBoca);
		clearInterval(idAnimacionHockey);
		clearInterval(idAnimacionTimer);

		buttonStartGame.disabled = false;

	}
	/**
	 * Este método se encarga de volver devolver a los
	 * objetos a sus posiciones inciales para volver a
	 * jugar el siguiente punto
	 */
	function volverALasPosicionesIniciales(){
		puckComeCocos.volverALaPosicionInicial();
		puckComeCocos.direccion = 0;
		puckComeCocos.haEntradoUnaParteEnLaPorteriaLocal = false;
		puckComeCocos.haEntradoUnaParteEnLaPorteriaVisitante = false;
		stickLocal.volverALaPosicionInicial();
		stickVisitante.volverALaPosicionInicial();
	}
	/**
	 * Este método realiza la funcionalidad
	 * cuando gana el usuario la partida
	 */
	function usuarioHaGanado(){
		finishGame();
		sonidoVictoria.play();
		let record = new Record(inputNickName.value,timer.obtenerTiempo(),dificulty);
		Records.saveRecordInList(record);
		actualizarListaDeRecords();
	}
	/**
	 * Este método se encarga de la funcionalidad
	 * cuando la ia gana la partida.
	 */
	function iaHaGanado(){
		finishGame();
		sonidoDerrota.play();
	}


	/**
	 * Este método se encarga de 
	 * recargar la tabla de records
	 */
	function actualizarListaDeRecords(){
        while (tablaRecords.firstChild) {
            tablaRecords.removeChild(tablaRecords.firstChild);
        }

		let liElements = [];
        for(let iterador = 0; iterador<Records.listRecords.length; iterador++){
            let liElement = document.createElement("li");
			let pElement = document.createElement("p");
            pElement.textContent = `${iterador+1}. ${Records.listRecords[iterador].toStringRecord()}`;
			if(iterador == 0){
				pElement.setAttribute("class","primerPuesto");
			}else if(iterador == 1){
				pElement.setAttribute("class","segundoPuesto");
			}else if(iterador == 2){
				pElement.setAttribute("class","tercerPuesto");
			}
			liElement.appendChild(pElement);
            liElements.push(liElement);
        }

		liElements.forEach(function(liElement){
			tablaRecords.appendChild(liElement);
		});
    }



	/**
	 * Este método se encarga de configurar los elementos de 
	 * la aplicación necesarios para que comienze el juego
	 */
	function prepararComponentesDeLaAplicacion(){

		//	Creamos los elementos del canvas

		//	Disco
		puckComeCocos = new PuckComeCocos(176,288);

		//	Sticks
		stickLocal = new StickLocal(176,500);

		//	Obetner dificultad
		dificulty = Dificultades.obtenerDificultadSeleccionada();

		stickVisitante = new StickVisitante(176,41,dificulty.obtenerVelocidadIA());

		//	Porterias
		porteriaLocal = new PorteriaLocal();
		porteriaVisitante = new PorteriaVisitante();

		//	Marcadores
		marcadorLocal = new MarcadorLocal(338,317);
		marcadorVisitante = new MarcadorVisitante(338,250);

		//	Timer
		timer = new Timer();

	}
	/**
	 * Este método se encarga de enlazar los elementos de la página a los ficheros javascript
	 */
	function cargarComponentesDeLaPagina(){
		//	Cargar botones de las dificultades

		radioButtonEassy = document.getElementById("radioButtonEassy");

		radioButtonMedium = document.getElementById("radioButtonMedium");

		radioButtonYashin = document.getElementById("radioButtonYashin");

		//	Cargar elemento de la tabla de records

		tablaRecords = document.getElementById("tablaRecords");

		actualizarListaDeRecords();

		//	Preparemos los componentes de la aplicación
		//	Preparación del evento que lanza el programa

		botonStartGame = document.getElementById("buttonStartGame");

		inputNickName = document.getElementsByClassName("inputNickName")[0];

		botonStartGame.addEventListener("click", () =>{

			if(inputNickName.value != ""){

				if(Dificultades.obtenerDificultadSeleccionada() != null){
					buttonStartGame.disabled = true;
					prepararComponentesDeLaAplicacion();
					startGame();
				}else{
					alert("Seleccione la dificultad de su partida");
				}

			}else{
				alert("Intruzca un nombre para su usuario");
			}

		});

		sonidoPuck = document.getElementById("sonidoPuck");
		sonidoGol = document.getElementById("sonidoGol");
		sonidoVictoria = document.getElementById("sonidoVictoria");
		sonidoDerrota = document.getElementById("sonidoDerrota");
		cancionSecreta = document.getElementById("cancionSecreta");

		tituloMasInformacion = document.getElementById("tituloMasInformacion");
		textoInformativoMF = document.getElementById("textoInformativoMF");
		card = document.getElementById("card");

		tituloMasInformacion.addEventListener("mouseenter", function(){
			textoInformativoMF.classList.remove("no-ver");
			tituloMasInformacion.classList.add("hoverH1");
		});

		tituloMasInformacion.addEventListener('mouseleave', function() {
			textoInformativoMF.classList.add("no-ver");
			tituloMasInformacion.classList.remove("hoverH1");
		});
		
	}



	/**
	 * Este método se encarga de activar 
	 * la tecla que ha pulsado el usuario
	 * @param {event} event 
	 */
	function activarTeclaPulsada(event) {	

		if(event.shiftKey && event.key === 'Tab'){
			cancionSecreta.play();
			card.firstElementChild.classList.add("bg");
			idModoFiesta = setTimeout(function() {
				card.firstElementChild.classList.remove("bg");
				clearTimeout(idModoFiesta);
			},82000);
		}

        switch (event.keyCode) {
		
			case MOVIMIENTOS.IZQUIERDA: 
					stickLocal.izquierda = true;
				break;

			case MOVIMIENTOS.ARRIBA:
					stickLocal.arriba = true;
				break;

			case MOVIMIENTOS.DERECHA:
					stickLocal.derecha = true;
				break;
			
			case MOVIMIENTOS.ABAJO:
					stickLocal.abajo = true;
				break;
		
			default:
		}
	}
	/**
	 * Este método se encarga de desactivar
	 * la tecla que ha pulsado el usuario
	 * @param {event} event 
	 */
	function desactivarTeclaPulsada(event){
		switch (event.keyCode) {
		
			case MOVIMIENTOS.IZQUIERDA: 
					stickLocal.izquierda = false;
				break;

			case MOVIMIENTOS.ARRIBA:
					stickLocal.arriba = false;
				break;

			case MOVIMIENTOS.DERECHA:
					stickLocal.derecha = false;
				break;
			
			case MOVIMIENTOS.ABAJO:
					stickLocal.abajo = false;
				break;
		}
	}



	
	//	MAIN

	//	Preparación del canvas

	canvas = document.getElementById("miCanvas");

	ctx = canvas.getContext("2d");

	//	Colocamos el fondo
	ctx.drawImage(BACKGROUND,0,0,380,599,0,0,380,599);

	//	Establecemos los eventos necesarios para detectar 
	//	cuando pulsamos y levantamos el dedo de una tecla

	document.addEventListener("keydown", activarTeclaPulsada, false);
	document.addEventListener("keyup", desactivarTeclaPulsada, false);

	cargarComponentesDeLaPagina();

	canvas.focus();
}