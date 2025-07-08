FROM php:8.2-fpm

# Установка зависимостей с кешированием
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && pecl install -o -f redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Копируем только необходимые для composer файлы
COPY composer.json composer.lock ./

# Устанавливаем зависимости с оптимизацией
RUN composer install --no-dev --no-scripts --no-autoloader --optimize-autoloader

# Копируем остальные файлы
COPY . .

# Генерируем autoload
RUN composer dump-autoload --optimize

# Устанавливаем права
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=8000"]
