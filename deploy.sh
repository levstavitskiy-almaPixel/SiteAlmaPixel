#!/bin/bash

echo "🚀 Начинаем деплой на GitHub Pages..."

# Переходим в директорию проекта
cd /Users/levstavitskiy/SiteAlmaPixel

echo "📁 Текущая директория: $(pwd)"

# Проверяем статус git
echo "📊 Проверяем статус git..."
git status

# Добавляем все изменения
echo "➕ Добавляем изменения в git..."
git add .

# Делаем коммит
echo "💾 Создаем коммит..."
git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# Собираем проект
echo " Собираем проект..."
npm run build

# Деплоим на GitHub Pages
echo "🌐 Деплоим на GitHub Pages..."
npm run deploy

echo "✅ Деплой завершен!"
echo "🌍 Сайт будет доступен через несколько минут на: https://www.alma-pixel.com"
