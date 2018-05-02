<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AssignmentRequest;
use Illuminate\Support\Facades\Storage;

class AssignmentController extends Controller
{
    
    function index() {
      return view('assignment');
    }

    function store(AssignmentRequest $request) {

        try {

            $products = Storage::disk('local')->exists('data.json') ? json_decode(Storage::disk('local')->get('data.json')) : [];
        
            $inputData = $request->only(['product_name', 'quantity_in_stock', 'price_per_item']);
           
            $inputData['datetime_submitted'] = date('Y-m-d H:i:s');

            array_push($products,$inputData);
    
            Storage::disk('local')->put('data.json', json_encode($products));

            return $inputData;

        } catch(Exception $e) {

            return ['error' => true, 'message' => $e->getMessage()];

        }
    }

    function getAllProducts() {
        $products = Storage::disk('local')->exists('data.json') ? json_decode(Storage::disk('local')->get('data.json')) : [];
        return array_reverse($products);
    }
}
