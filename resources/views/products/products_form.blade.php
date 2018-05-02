<div id="form-errors"></div>

  <form id="product-form" action="{{url('/product/store')}}" method="POST">

    {{ csrf_field() }}

    <div class="form-group">
        <label for="product">Product Name</label>
        <input type="text" class="form-control" id="product" name="product_name" placeholder="Enter Product Name">
    </div>

    <div class="form-group">
        <label for="product">Quantity in stock</label>
        <input type="text" class="form-control" name="quantity_in_stock" id="quantity_in_stock" placeholder="Enter Quantity in stock">
    </div>    
    
    <div class="form-group">
        <label for="product">Price per item</label>
        <input type="text" class="form-control" id="price_per_item" name="price_per_item" placeholder="Enter Price per item">
    </div>

    <div class="form-group">
        <input class="btn btn-lg btn-primary" id="submit" type="submit" value="Save" name="submit" />
     </div>

   </form>