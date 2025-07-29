# Credenciais de Login - PIX Gateway

## 🔐 Usuário Administrador

**Email:** `admin@pixgateway.com`  
**Senha:** `admin123`

**Permissões:**
- Acesso completo ao painel administrativo
- Aprovação/rejeição de documentos
- Gerenciamento de usuários
- Configuração do gateway
- Visualização de todas as transações

---

## 📋 Como Usar

### 1. **Configurar Banco de Dados**
Execute o arquivo `database.sql` no seu MySQL:
```bash
mysql -u root -p < database.sql
```

### 2. **Configurar Variáveis de Ambiente**
Edite o arquivo `.env.local`:
```env
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/pix_gateway"
NEXTAUTH_URL="http://localhost:8000"
NEXTAUTH_SECRET="seu-secret-aqui"
```

### 3. **Iniciar Aplicação**
```bash
npm run dev
```

### 4. **Acessar Sistema**
- Abra: `http://localhost:8000`
- Clique em "Entrar na Plataforma"
- Use as credenciais do admin acima

---

## 🎯 Funcionalidades Disponíveis

### **Como Admin:**
- `/admin` - Painel administrativo
- `/admin/documents` - Revisar documentos
- Aprovar/rejeitar documentos dos usuários
- Ver estatísticas completas do sistema

### **Como Usuário:**
- `/dashboard` - Dashboard principal
- `/dashboard/payment` - Pagamentos PIX
- `/dashboard/transfer` - Transferências internas
- `/dashboard/reports` - Relatórios
- `/dashboard/documents` - Upload de documentos

---

## 🔧 Criar Novos Usuários

### Via Interface:
1. Acesse `http://localhost:8000`
2. Clique em "Criar Conta"
3. Preencha os dados
4. Faça login normalmente

### Via SQL (Direto no banco):
```sql
INSERT INTO users (id, email, name, password, isAdmin, isActive, balance) VALUES 
('user-001', 'usuario@teste.com', 'Usuário Teste', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', FALSE, TRUE, 100.00);
```
**Senha:** `admin123` (mesmo hash)

---

## ⚠️ Importante

- **Altere as senhas padrão em produção!**
- Configure as credenciais do PixUp no `.env.local`
- O sistema está pronto para uso completo
- Todas as funcionalidades estão implementadas

---

## 📞 Suporte

Se precisar de ajuda:
- Verifique se o MySQL está rodando
- Confirme se as variáveis de ambiente estão corretas
- Execute `npm install` se houver problemas de dependências
