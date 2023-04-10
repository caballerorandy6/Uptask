import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1423e62d902436",
      pass: "b4b426e335f857",
    },
  });

  //Informacion del email
  const info = await transport.sendMail({
    from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Comprueba tu cuenta.",
    text: "Comprueba tu cuenta en Uptask.",
    html: `<p> Hola: ${nombre}! Comprueba tu cuenta en Uptask. </p>
    <p> Tu Cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar Cuenta </a>
    <p> Si tu no creaste esta cuenta puedes ignorar el mensaje. <p>
    `,
  });
};
