# Bot de Propinas 💸🤖

Este es un bot hecho en Node.js que registra tus propinas enviadas desde Telegram y las guarda en una hoja de Google Sheets. Ideal para deliverys, propineros o para trackear ingresos diarios.

## ¿Cómo funciona?

Le mandás un mensaje al bot en Telegram como:


Y se guarda así:

| Fecha | Día | Descripción | Monto | Nota |
|-------|-----|-------------|-------|------|

## ¿Tecnologías?

- Node.js
- Telegram Bot API
- Google Sheets API
- Render.com (hosting gratuito)

## Configuración

1. Cloná el proyecto
2. Creá un archivo `.env` con estas variables:


> ⚠️ No subas tu `.env` ni credenciales a GitHub

git init
git add .
git commit -m "versión lista para render"
git branch -M main
git remote add origin https://github.com/tu-usuario/bot-propinas.git
git push -u origin main
