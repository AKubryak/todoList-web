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

### 2. Развертывание приложения с помощью Docker

#### **Требования**

- Установленный Docker Desktop (или Docker Engine + Docker Compose)
- Git (для клонирования репозитория)

#### **Инструкция**

**1. Клонируйте репозиторий**

```
   git clone https://github.com/AKubryak/todoList-web.git
   cd todoList-web
```

**2. Настройте окружение**

Создайте .env файл:

```
copy backend\.env.example backend\.env
```

**3.  Редактирование конфигурации**

Откройте файл backend/.env и настройте подключение к БД:

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=todo
DB_USERNAME=root
DB_PASSWORD=root

# Настройки JWT (значение JWT_SECRET будет сгенерировано позже)
JWT_SECRET=
JWT_TTL=1440
```

**4. Запуск и сборка контейнеров**

Запустите Docker Desktop и запустите сборку:

```
docker-compose up -d --build
```

**5. Установка зависимостей**:

```
docker-compose run --rm backend composer install
docker-compose run --rm frontend-dev npm install
```

**6. Генерация ключей и настройка приложения:**

```
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan jwt:secret
```

**7. **Настройка базы данных:****

```
docker-compose exec backend php artisan migrate --seed
```

**8. Перезапуск контейнеров (при необходимости)**

```
docker-compose down
docker-compose up -d
```

**9. Доступ к приложению**

* **Бэкенд** : [http://localhost](http://localhost/)
* **Фронтенд** : [http://localhost:5173](http://localhost:5173/)

## Команды управления

Запуск контейнеров:

```
docker-compose up -d
```

Остановка контейнеров:

```
docker-compose down
```

Просмотр логов:

```
docker-compose logs -f [service_name]
```

Проверка контейнеров:

```
docker-compose ps
```

Пересборка контейнеров (после изменений в конфигурации):

```
docker-compose up -d --build
```

Перезапуск контейнера:

```
docker-compose restart [имя контейнера]
```
