<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Class UserTableSeeder.
 */
class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seed.
     */
    public function run()
    {

        Categories::insert([
            [
                'parent_id' => 0,
                'category_name' => 'Category1'
            ],
            [
                'parent_id' => 0,
                'category_name' => 'Category2'
            ],
            [
                'parent_id' => 1,
                'category_name' => 'Category1-1'
            ],
            [
                'parent_id' => 1,
                'category_name' => 'Category1-2'
            ],
            [
                'parent_id' => 2,
                'category_name' => 'Category2-1'
            ],
            [
                'parent_id' => 2,
                'category_name' => 'Category2-2'
            ],
        ]);
    }
}

