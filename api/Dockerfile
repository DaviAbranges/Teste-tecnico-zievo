# syntax=docker/dockerfile:1
# Laravel Dockerfile

# Use uma imagem base com PHP e extensões necessárias para Laravel
FROM php:8.2-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    locales

# Gerar locale para pt_BR
RUN locale-gen pt_BR.UTF-8
RUN dpkg-reconfigure locales
RUN locale -a

# Instalar extensões PHP necessárias para Laravel e PostgreSQL
RUN docker-php-ext-install pdo pdo_pgsql zip

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Criar e definir diretório de trabalho
WORKDIR /var/www/html

# Copiar o arquivo composer.json e instalar dependências
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# Copiar o restante dos arquivos do projeto
COPY . .

# Configurar permissões corretas
RUN chown -R www-data:www-data /var/www/html

# Expor a porta usada pelo Laravel
EXPOSE 8000

# Rodar o Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
