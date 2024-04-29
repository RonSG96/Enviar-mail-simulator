document.addEventListener('DOMContentLoaded', function () {
  const datosEmail = {
    email: '',
    cc: '',
    asunto: '',
    mensaje: '',
  };

  const inputEmail = document.querySelector('#email');
  const inputCC = document.querySelector('#cc');
  const inputAsunto = document.querySelector('#asunto');
  const textMensaje = document.querySelector('#mensaje');
  const btnEnviar = document.querySelector('#formulario button[type="submit"]'),
    btnReset = document.querySelector('#formulario button[type="reset"]');

  const formulario = document.querySelector('#formulario');
  const spinner = document.querySelector('#spinner');

  //asignacion de eventos
  //!blur se ejecuta cuando el usuario sale del input
  //!input se ejecuta cuando el usuario escribe en el input

  inputEmail.addEventListener('input', validar);
  inputCC.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  textMensaje.addEventListener('input', validar);
  btnReset.addEventListener('click', function (e) {
    e.preventDefault();

    resetearFormulario();
  });

  formulario.addEventListener('submit', enviarEmail);

  function enviarEmail(e) {
    e.preventDefault();
    //mostrar spinner
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');

      resetearFormulario();

      //alerta

      const alertaExito = document.createElement('p');
      alertaExito.classList.add(
        'bg-green-500',
        'text-white',
        'p-2',
        'my-5',
        'text-center',
        'rounded-lg',
        'mt-10',
        'font-bold',
        'text-sm',
        'uppercase'
      );
      alertaExito.textContent = 'Mensaje enviado correctamente';
      formulario.appendChild(alertaExito);
      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(event) {
    //eventos
    eventoMessage = event.target.value;
    eventoId = event.target.id;
    elementoPadre = event.target.parentElement;

    if (eventoMessage.trim() === '') {
      mostrarAlerta(`El campo ${eventoId} es obligatorio`, elementoPadre);
      //cc no es obligatorio
      if (eventoId == 'cc') {
        limpiarAlerta(elementoPadre);
      }
      datosEmail[event.target.name] = '';
      comprobarEmail();
      return;
    }
    //Validar email con el id que corresponda a email
    if (eventoId == 'email' && !validarEmail(eventoMessage)) {
      mostrarAlerta('Email no valido', elementoPadre);
      datosEmail[event.target.name] = '';
      comprobarEmail();
      return;
    }

    if (eventoId == 'cc' && !validarEmail(eventoMessage)) {
      mostrarAlerta('Email de cc no valido', elementoPadre);
      datosEmail[event.target.name] = '';
      comprobarEmail();
      return;
    }
    limpiarAlerta(elementoPadre);

    //asignar valores al objeto
    datosEmail[event.target.name] = eventoMessage.trim().toLowerCase();
    // console.log(datosEmail);

    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    //generar alerta en html
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add(
      'bg-red-600',
      'text-white',
      'p-3',
      'my-5',
      'text-center',
      'error'
    );
    //inyectar el error al formulario

    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector('.error');
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const resutlado = regex.test(email);
    return resutlado;
  }

  function comprobarEmail() {
    // if (Object.values(datosEmail).includes('')) {
    //   btnEnviar.classList.add('opacity-50');
    //   btnEnviar.disabled = true;
    //   return;
    // }
    // btnEnviar.classList.remove('opacity-50');
    // btnEnviar.disabled = false;

    if (
      datosEmail.email.trim() === '' ||
      datosEmail.asunto.trim() === '' ||
      datosEmail.mensaje.trim() === ''
    ) {
      btnEnviar.classList.add('opacity-50');
      btnEnviar.disabled = true;
    } else {
      btnEnviar.classList.remove('opacity-50');
      btnEnviar.disabled = false;
    }
  }

  function resetearFormulario() {
    datosEmail.email = '';
    datosEmail.cc = '';
    datosEmail.asunto = '';
    datosEmail.mensaje = '';
    formulario.reset();
    comprobarEmail();
  }
});
