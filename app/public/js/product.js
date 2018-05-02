var total = 0;
$(document).ready(function(e){
 
  $('#product-form').submit(function(e) {
      $( '#form-errors' ).html('');
      // prevent default submit behaviour 
      e.preventDefault();
      // serialize total form data
      var postData = $(this).serializeArray();

      // get form action url
      var formActionURL = $(this).attr("action");

      $("#submit").val('Please wait...');
    
      $.post(formActionURL,postData).done(function(product) {
         
        var singe_product_price_per_item = product.price_per_item * product.quantity_in_stock;
        html = '<tr>'+
          '<td>'+product.product_name+'</td>'+
          '<td>'+product.quantity_in_stock+'</td>'+
          '<td>'+product.price_per_item+'</td>'+
          '<td>'+product.datetime_submitted+'</td>'+
          '<td class="price_per_item">'+ singe_product_price_per_item +'</td>'+
        '</tr>';

        $('tbody').prepend(html);

        $('#sum_of_price_per_item').html(total+singe_product_price_per_item);

       $('#product-form')[0].reset();

      }).fail(function( jqXHR, textStatus) {
          
        if( jqXHR.status === 422 ) {
        //process validation errors here.
        var errors = jqXHR.responseJSON.errors; //this will get the errors response data.

        errorsHtml = '<div class="alert alert-danger"><ul>';

        $.each( errors , function( key, value ) {
            errorsHtml += '<li>' + value[0] + '</li>'; //showing only the first error.
        });
        errorsHtml += '</ul></di>';
            
        $( '#form-errors' ).html( errorsHtml ); //appending to a <div id="form-errors"></div> inside form
        } else {
          alert('error');
        }

      }).always(function() {
          $("#submit").val('Save');
      });
  })

  $.get('/products').done(function(products) {
 
    var noDataHtml =  '<tr> <td colspan="5"> No data...</td></tr>';

    var html =  products.length === 0 ? noDataHtml : '';
    
    

    products.forEach(function(product) {

      var price_per_item = product.price_per_item * product.quantity_in_stock;

      total += price_per_item; 

      html += '<tr>'+
          '<td>'+product.product_name+'</td>'+
          '<td>'+product.quantity_in_stock+'</td>'+
          '<td>'+product.price_per_item+'</td>'+
          '<td>'+product.datetime_submitted+'</td>'+
          '<td class="price_per_item">'+ price_per_item +'</td>'+
        '</tr>';
    });

    if(products.length > 0) {
      html += '<tr><td align="right" colspan="4"> Total:</td> <td id="sum_of_price_per_item">'+total+'</td></tr>';
    }

    $('tbody').html(html);

    }).fail(function() {
      alert("error");
    }).always(function() {
      $("#submit").val('submit');
  });
});