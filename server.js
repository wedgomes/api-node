import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/users', async (req, res) => {

    await prisma.usuario.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/users', async (req, res) => {

    let usuarios = []

    if (req.query) {
        usuarios = await prisma.usuario.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age

            }
        })
    } else {

    }

    const users = await prisma.usuario.findMany()

    res.status(200).json(users)
})

app.put('/users/:id', async (req, res) => {

    await prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/users/:id', async (req, res) => {

    await prisma.usuario.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário deletado com Sucesso!' })
})

app.listen(3000)
