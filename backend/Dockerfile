FROM php:8.2-fpm

# зависимости
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql zip

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# work directory
WORKDIR /var/www/html

# зависимости Laravel
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader

# весь проект
COPY . .

# автозагрузка
RUN composer dump-autoload --optimize

# права
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache
