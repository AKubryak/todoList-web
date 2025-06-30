# **To-Do App with JWT Authentication**

**Full-stack приложение для управления задачами**

## **Технологии**

* **Backend** : Laravel 10, PHP 8.2, JWT-auth
* **Frontend** : Vue.js 3, Pinia, Bootstrap 5
* **База данных** : MySQL 8.0
* **Сервер** : Nginx
* **Контейнеризация** : Docker

## ** Запуск проекта**

### **1. Локальный запуск (без Docker)**

#### **Требования**

* PHP 8.2, Composer
* Node.js 18+, npm
* MySQL

#### **Инструкция**

**1. Настройка бэкенда (Laravel)**

```
cd backend/
composer install
cp .env.example .env
php artisan key:generate
```

**2. Настройка базы данных**
В файле `.env` укажите:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo
DB_USERNAME=root
DB_PASSWORD=root
```

**3. Запуск миграций**

```
php artisan migrate
php artisan serve
```

Бэкенд доступен: [http://localhost:8000](http://localhost:8000/)

**4. Настройка фронтенда (Vue.js)**

```
cd frontend/
npm install
npm run dev
```

Фронтенд доступен: [http://localhost:5173](http://localhost:5173/)


### **2. Запуск через Docker**

#### **Требования**

* Docker + Docker Compose

#### **Инструкция**

**1. Клонируйте репозиторий**

**2. Запустите контейнеры**

```
docker-compose up -d
```

**3. Настройка Laravel**

```
docker exec -it <container-id-php> bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

**4. Доступ к приложению**

* **Бэкенд** : [http://localhost](http://localhost/)
* **Фронтенд** : [http://localhost:5173](http://localhost:5173/)
