<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\Traits\DisableForeignKeys;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Class UserTableSeeder.
 */
class UsersTableSeeder extends Seeder
{
    use DisableForeignKeys;

    /**
     * Run the database seed.
     */
    public function run()
    {
        $this->disableForeignKeys();

        User::insert([
            [
                'name' => 'Shop1',
                'email' => 'shop1@devrepublic.nl',
                'role' => 'shop',
                'username' => 'shop1',
                'password' => Hash::make('devhero'),
                'language' => 'en',
                'currency' => 'USD',
                'active' => true,
                'email_verified_at' => now()
            ],
            [
                'name' => 'Shop2',
                'email' => 'shop2@devrepublic.nl',
                'role' => 'shop',
                'username' => 'shop2',
                'password' => Hash::make('devhero'),
                'language' => 'en',
                'currency' => 'USD',
                'active' => true,
                'email_verified_at' => now()
            ],
            [
                'name' => 'User1',
                'email' => 'user1@devrepublic.nl',
                'role' => 'user',
                'username' => 'user1',
                'password' => Hash::make('devhero'),
                'language' => 'en',
                'currency' => 'USD',
                'active' => true,
                'email_verified_at' => now()
            ],
            [
                'name' => 'User2',
                'email' => 'user2@devrepublic.nl',
                'role' => 'user',
                'username' => 'user2',
                'password' => Hash::make('devhero'),
                'language' => 'nl',
                'currency' => 'EUR',
                'active' => true,
                'email_verified_at' => now()
            ],
        ]);

        $this->enableForeignKeys();
    }
}

