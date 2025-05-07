#setup project
  # .env configurations
    - Посмотреть какие переменые окружения нужны для запуска проекта в файле __.env
    - Создать файл .env в тойже деректории что и __.env
    - Скопировать все переменные окружения из файла __.env в файл .env
    - переменая DB_CONNECTION_STRING является приватная относится к базе данных mongo. надо попросить у разработчика
  # Docker
    если в режиме development 
      - запекаем команду "docker compose up"
    если в режиме production 
      - запекаем команду "docker compose -f docker-compose.production.yml up"
