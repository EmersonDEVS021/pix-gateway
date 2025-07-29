const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar usuário admin padrão
  const adminEmail = 'admin@pixgateway.com'
  const adminPassword = 'admin123'

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12)

    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
        isActive: true,
        balance: 0,
      }
    })

    console.log('✅ Usuário admin criado:')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Senha: ${adminPassword}`)
    console.log(`   ID: ${admin.id}`)
  } else {
    console.log('ℹ️  Usuário admin já existe')
  }

  // Criar configuração padrão do gateway
  const existingConfig = await prisma.gatewayConfig.findFirst()

  if (!existingConfig) {
    const config = await prisma.gatewayConfig.create({
      data: {
        name: 'PIX Gateway',
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        supportEmail: 'suporte@pixgateway.com',
        supportPhone: '+55 11 99999-9999',
      }
    })

    console.log('✅ Configuração padrão do gateway criada')
    console.log(`   Nome: ${config.name}`)
  } else {
    console.log('ℹ️  Configuração do gateway já existe')
  }

  // Criar taxas padrão
  const existingFees = await prisma.fee.findMany({
    where: { userId: null }
  })

  if (existingFees.length === 0) {
    const fees = await prisma.fee.createMany({
      data: [
        {
          type: 'PIX_PAYMENT',
          percentage: 0.01, // 1%
          fixedAmount: 0.50, // R$ 0,50
          minAmount: 0.50,
          maxAmount: 10.00,
          isActive: true,
        },
        {
          type: 'PIX_TRANSFER',
          percentage: 0.005, // 0.5%
          fixedAmount: 0.25, // R$ 0,25
          minAmount: 0.25,
          maxAmount: 5.00,
          isActive: true,
        },
        {
          type: 'INTERNAL_TRANSFER',
          percentage: 0, // Sem taxa percentual
          fixedAmount: 0, // Sem taxa fixa
          isActive: true,
        },
      ]
    })

    console.log('✅ Taxas padrão criadas')
    console.log(`   ${fees.count} taxas configuradas`)
  } else {
    console.log('ℹ️  Taxas padrão já existem')
  }

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
