## TPC Laravel Task

Please follow the steps to run the project,

```sh
npm i
conposer install
cp .env.example .env
php artisan key:generate
php artisan config:cache
php artisan migrate --seed
php artisan storage:link
```

Run Below commands on different terminals,

```sh
npm run watch
php artisan serve
```
