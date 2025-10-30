import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const config = useRuntimeConfig()
    const username = config.adminDefaultUser || 'admin'
    const password = config.adminDefaultPass || 'admin123'
    
    // Verificar se já existe um admin
    const existingAdmin = await prisma.admin.findUnique({
      where: { username }
    })

    if (existingAdmin) {
      console.log('Usuário admin já existe')
      return
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar admin
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        name: 'Administrador',
        email: 'admin@santarita.gov.br'
      }
    })

    console.log('Usuário admin criado com sucesso!')
    console.log('Username:', admin.username)
    console.log('Email:', admin.email)
    console.log('Senha padrão:', password)
    console.log('IMPORTANTE: Altere a senha padrão após o primeiro login!')

  } catch (error) {
    console.error('Erro ao criar admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
