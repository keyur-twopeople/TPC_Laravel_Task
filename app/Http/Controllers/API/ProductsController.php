<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;

class ProductsController extends Controller
{
    public function index()
    {
        return response()->json(Products::all()->toArray());
    }

    public function store(Request $request)
    {
        $data = json_decode($request->data);
        $product = Products::create((array)$data);

        //store image
        if ($request->file('file')) {
            $getImagePath = $this->getImagePath($request->file('file'), $product->id);
            $updateProduct = Products::find($product->id);
            $updateProduct->image = $getImagePath;
            $updateProduct->save();
        }

        return response()->json($updateProduct);
    }

    function getImagePath($file, $productId)
    {
        // get the file name & extension
        $originalFileName = $file->getClientOriginalName();
        $fileNameWithoutExtention = pathinfo($originalFileName, PATHINFO_FILENAME);
        $extensionOfFile = pathinfo($originalFileName, PATHINFO_EXTENSION);

        // creating source name to avoid the name collision
        $filename = $fileNameWithoutExtention . '_' . Carbon::now()->timestamp . '.' . $extensionOfFile;

        // specify the file path where to store
        $path = $file->storeAs('public', 'img/product/' . $productId . '/' . $filename);
        return $path;
    }


    public function edit($id)
    {
        $product = Products::find($id);
        return response()->json($product);
    }

    public function update($id, Request $request)
    {
        $product = Products::find($id);
        $product->update((array)json_decode($request->data));

        //store image
        if ($request->file('file')) {
            if (!is_null($product->image)) {
                $path = str_replace("public/", "storage/", $product->image);
                unlink($path);
            }
            $getImagePath = $this->getImagePath($request->file('file'), $id);
            $product = Products::find($id);
            $product->image = $getImagePath;
            $product->save();
        }
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Products::find($id);
        if (!is_null($product->image)) {
            $path = str_replace("public/", "storage/", $product->image);
            unlink($path);
        }
        $product->delete();

        return response()->json('The product successfully deleted');
    }
}
