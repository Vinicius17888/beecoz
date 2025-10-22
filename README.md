# <h1 align="center"> BEECOZ </h1>

# BEECOZ — Setup rápido
Criar automaticamente (Windows PowerShell – na pasta C:\dev\beecoz)

## Pré-requisitos
- **Git**
- **Node.js 20+** (recomendado 22 LTS)
- **Expo Go** no celular (Android/iOS)
- Banco **PostgreSQL** (usamos Neon em dev) e API (Render) — ou rode a API localmente

---

## Clonar
```bash
git clone https://github.com/Vinicius17888/beecoz.git
cd beecoz
```

# Estrutura
```
beecoz/
  beecoz-api/   # API Node/Express + Prisma
  beecoz-app/   # App Expo (React Native, SDK 54)
```


# 1) API (beecoz-api)
## 1.1 Criar .env

Crie beecoz-api/.env com:

## Postgres (Neon)
```
DATABASE_URL="postgresql://<usuario>:<senha>@<host>.neon.tech/beecoz?sslmode=require&channel_binding=require"
```

## JWT
```
JWT_SECRET="viniciusyagobeecoz"
```

## Porta local (opcional)
```
APP_PORT=3333
```


## 1.2 Instalar e preparar Prisma
```
cd beecoz-api
npm i
npx prisma generate
```
# primeira vez no banco:
```
npx prisma migrate deploy   # (ou: npx prisma db push)
```
## 1.3 Rodar local
```
npm run dev     # http://localhost:3333
# teste: GET /health  ->  {"ok":true}
```

## 1.4 Deploy (Render – referência)
```
# Root Directory: beecoz-api

# Environment:

DATABASE_URL (Neon)

# JWT_SECRET

NODE_ENV=production

NPM_CONFIG_PRODUCTION=false
```
Build Command
```
npm ci --include=dev && npx prisma generate && npm run build

```
Start Command
```

npx prisma migrate deploy && npm start
```

# 2) App (beecoz-app)
## 2.1 Configurar a API
Edite beecoz-app/app/lib/api.ts:
```
// API online (Render) — substitua pela sua URL:
export const BASE_URL = "https://beecoz.onrender.com";
// ou local (mesma rede):
// export const BASE_URL = "http://SEU_IP:3333";
```

## 2.2 Instalar e rodar
```
cd ../beecoz-app
npm i
npx expo start -c --tunnel
```
Escaneie o QR com o Expo Go.

Se ficar carregando: use --tunnel, atualize o Expo Go e limpe o cache do app.

# 3) Testes rápidos (PowerShell)
```
Testar se tá online o render:
https://beecoz.onrender.com/health
```

```
$api = "https://SUA-API.onrender.com"

# Registro
Invoke-RestMethod -Uri "$api/auth/register" -Method Post -ContentType "application/json" -Body (@{
  email="ana@ex.com"; senha="123456"; perfil="CLIENTE"; nome="Ana"
} | ConvertTo-Json)

# Login
Invoke-RestMethod -Uri "$api/auth/login" -Method Post -ContentType "application/json" -Body (@{
  login="ana@ex.com"; senha="123456"
} | ConvertTo-Json)
```

# 4) Comandos úteis

## API

```
#dentro de beecoz-api
npm run dev                 # dev (ts-node)
npm run build && npm start  # produção local (usa dist/)
npx prisma studio           # inspecionar o banco
```

## App
```
# dentro de beecoz-app
npx expo start -c --tunnel
```

# 5) Problemas comuns

Expo Go: “Failed to download remote update”
```
Use --tunnel, atualize o Expo Go, feche e limpe cache do app. Libere a porta 8081 no firewall.
```

API 502/404 no Render
```
Confirme Root Directory = beecoz-api, variáveis de ambiente e os comandos de Build/Start.
```

Prisma P1000/P1012
```
Verifique DATABASE_URL (formato postgresql://...), rode npx prisma generate e npx prisma migrate deploy.
```

App não fala com API local
```
Use o IP do PC (ex.: http://192.168.x.x:3333) ou a API online (Render).
```

# 6) Contribuir/Commits
```
git checkout -b feat/minha-feature
# alterações...
git commit -m "feat: minha-feature"
git push -u origin feat/minha-feature
# abra PR para main
```



