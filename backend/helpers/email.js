import nodemailer from 'nodemailer';

export const emailRegsitro = async(datos)=>{
    const {nombre, email, token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.sandbox.smtp.mailtrap.io,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });


      //Información del email
      const info = await transport.sendMail({
        from: '"Jorge Perea Administrador del Proyecto" <prueba@gmail.com>',
        to: email,
        subject: "Confirma tu cuenta",
        text: "Confirma tu cuenta en esta APP",
        html: ` <p> Hola: ${nombre} confirma tu cuenta en esta App </p>
            <p> Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:
                <a href="${process.env.FROTEND_URL}/confirmar/${token}"> Confirma tu Cuenta</a>
             </p>

             <p> Si tu no creaste esta cuenta, ignora este mensaje</p>

              `
      })

}



export const emailOlvidePassword = async(datos)=>{
  const {nombre, email, token} = datos;

  const transport = nodemailer.createTransport({
      host: process.env.sandbox.smtp.mailtrap.io,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


    //Información del email
    const info = await transport.sendMail({
      from: '"Jorge Perea Administrador del Proyecto" <prueba@gmail.com>',
      to: email,
      subject: "Restablece tu Password",
      text: "Restablece tu Password en esta APP",
      html: ` <p> Hola: ${nombre}  has solicitado reestablecer tu password  </p>

          <p> Sigue el siguiente enlace para generar un nuevo password:
              <a href="${process.env.FROTEND_URL}/Olvide-Password/${token}"> Reestablecer password</a>
           </p>

           <p> Si tu no solicitaste este email, ignora este mensaje</p>

            `
    })

}