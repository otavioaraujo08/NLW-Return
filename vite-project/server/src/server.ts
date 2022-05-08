// Biblioteca responsável por requisições HTTP
import express  from "express";
import nodemailer from "nodemailer";
import { prisma } from './prisma';

// Executando nossa aplicação
const app = express();

// Dizendo para nossa aplicação que ela deverá enviar o formulário de preenchimento em json
app.use(express.json());

// Configuração para envio de email
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6e5a3a66f7e45b",
      pass: "1c48040b01f000"
    }
});

// Caso o usuário acessar a rota usuários, irá executar está função
app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    
   const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedbacks <oi@feedback.com>',
        to: 'Email Fake <chekoff@tunrahn.com>',
        subject: 'Novo feedbacks',
        html: [
            `<div style="font-family: sans-serif; font-size: 16ps; color: #111">`,
            `<p>Tipo de feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })

    // Quando o usuário acessar essa rota, enviar de volta uma resposta com:
    return res.status(201).json({ data: feedback})
})

// Nossa aplicação funciona na porta 3333 e ira executar a função abaixo dela
app.listen(3333, () => {
    console.log("O servidor está no ar !")
});
