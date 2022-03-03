// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  let encontrado = true

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          BuscarBeneficiario();
          event.preventDefault()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function Validar() {

  let fecha = document.querySelector("#txtFechaNac").value;
  let edad = calcularEdad(fecha)
  if (edad > 14)
    document.getElementById("txtMayor15").value = "Si";
  else
    document.getElementById("txtMayor15").value = "No";
  document.getElementById("txtEdad").value = edad.toString();
  let mayor15 = document.querySelector("#txtMayor15").value;
  let colombiano = document.querySelector("#txtColombiano").value;
  let bachiller = document.querySelector("#txtBachiller").value;

  if (mayor15 === "Si" && colombiano === "Si" && bachiller === "Si")
    document.getElementById("txtCumple").value = "Si";
  else
    document.getElementById("txtCumple").value = "No";
}

/*
function calcularEdad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  return edad;
}
*/

//calcular la edad de una persona
//recibe la fecha como un string en formato español
//devuelve un entero con la edad. Devuelve false en caso de que la fecha sea incorrecta o mayor que el dia actual
function calcularEdad(fecha){

  //calculo la fecha de hoy
  hoy=new Date()
  //alert(hoy)

  //calculo la fecha que recibo
  //La descompongo en un array
  var array_fecha = fecha.split("/")
  //si el array no tiene tres partes, la fecha es incorrecta
  if (array_fecha.length!=3)
     return false

  //compruebo que los ano, mes, dia son correctos
  var ano
  ano = parseInt(array_fecha[2]);
  if (isNaN(ano))
     return false

  var mes
  mes = parseInt(array_fecha[1]);
  if (isNaN(mes))
     return false

  var dia
  dia = parseInt(array_fecha[0]);
  if (isNaN(dia))
     return false


  //si el año de la fecha que recibo solo tiene 2 cifras hay que cambiarlo a 4
  if (ano<=99)
     ano +=1900

  //resto los años de las dos fechas
  edad=hoy.getYear()- ano - 1; //-1 porque no se si ha cumplido años ya este año

  //si resto los meses y me da menor que 0 entonces no ha cumplido años. Si da mayor si ha cumplido
  if (hoy.getMonth() + 1 - mes < 0) //+ 1 porque los meses empiezan en 0
     return edad
  if (hoy.getMonth() + 1 - mes > 0)
     return edad+1

  //entonces es que eran iguales. miro los dias
  //si resto los dias y me da menor que 0 entonces no ha cumplido años. Si da mayor o igual si ha cumplido
  if (hoy.getUTCDate() - dia >= 0)
     return edad + 1

  return edad
}

function BuscarBeneficiario() {
  let identificacion = document.querySelector("#txtIdentificacion").value;
  let documentoIgual = document.querySelector("#txtIgualMinTic").value;
  let fechaNac = document.querySelector("#txtFechaNac").value;
  let mayor15 = document.querySelector("#txtMayor15").value;
  let colombiano = document.querySelector("#txtColombiano").value;
  let bachiller = document.querySelector("#txtBachiller").value;
  let cumpleReq = document.querySelector("#txtCumple").value;
  let revisor = document.querySelector("#txtRevisor").value;
  let observaciones = document.querySelector("#txtObservaciones").value;

  let url = `https://beneficiariosucaldas.herokuapp.com/beneficiarios/?filter={"where":{"identificacion":${identificacion}}}`;

  let datos = {
    identificacion: identificacion,
    documentoIgual: documentoIgual,
    fechaNac: fechaNac,
    mayor15: mayor15,
    colombiano: colombiano,
    bachiller: bachiller,
    cumpleReq: cumpleReq,
    revisor: revisor,
    observaciones: observaciones
  };



  fetch(url, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
    .then(mensaje => {

      console.log(mensaje)
      if (mensaje != "")
        alert("Este beneficiario ya fue procesado")
      else {

        RegistrarBeneficiario()
      }
    })
}

function RegistrarBeneficiario() {
  let identificacion = document.querySelector("#txtIdentificacion").value;
  let documentoIgual = document.querySelector("#txtIgualMinTic").value;
  let fechaNac = document.querySelector("#txtFechaNac").value;
  let mayor15 = document.querySelector("#txtMayor15").value;
  let colombiano = document.querySelector("#txtColombiano").value;
  let bachiller = document.querySelector("#txtBachiller").value;
  let cumpleReq = document.querySelector("#txtCumple").value;
  let revisor = document.querySelector("#txtRevisor").value;
  let observaciones = document.querySelector("#txtObservaciones").value ? document.querySelector("#txtObservaciones").value : " ";

  let url = `https://beneficiariosucaldas.herokuapp.com/beneficiarios`;
  let datos = {
    identificacion: identificacion,
    documentoIgual: documentoIgual,
    fechaNac: fechaNac,
    mayor15: mayor15,
    colombiano: colombiano,
    bachiller: bachiller,
    cumpleReq: cumpleReq,
    revisor: revisor,
    observaciones: observaciones
  };



  fetch(url, {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(mensaje => {
      console.log(mensaje)
      alert("Beneficiario almacenado correctamente")
    })
}