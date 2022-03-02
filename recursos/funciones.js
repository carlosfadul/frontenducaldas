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
  documento.getElementById("txtEdad").value = edad.toString();
  let mayor15 = document.querySelector("#txtMayor15").value;
  let colombiano = document.querySelector("#txtColombiano").value;
  let bachiller = document.querySelector("#txtBachiller").value;

  if (mayor15 === "Si" && colombiano === "Si" && bachiller === "Si")
    document.getElementById("txtCumple").value = "Si";
  else
    document.getElementById("txtCumple").value = "No";
}

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
  let observaciones = document.querySelector("#txtObservaciones").value;

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