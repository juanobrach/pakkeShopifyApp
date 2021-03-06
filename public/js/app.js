$(document).ready( function(){
  // Inicio validacion
  $.validate({
    modules : 'date, security, toggleDisabled',
    validateOnBlur : true,
    disabledFormFilter : 'form#setup_form'
  });

  /*
  *  Formulario alta de tienda shopify / pakke  a la aplicacion
  *  se ejecuta esta funcion si se es validado el formulario
  *  views/includes/adminDev.pug  .form-group
        h6 Nombre usuario
        .input-group
          input(type="text" name="user_name" )
      .form-group
        h6 Correo usuario
        .input-group
          input(type="mail" name="user_mail" )
  */
  $('.btn-setup-form-submit').click( function(e){
      e.preventDefault();
      console.log("submit signup")
      var data = {
        shop: $("input[name='shopify_shop_name']").val().toLowerCase(),
        key_pake: $("input[name='pakke_api_key']").val(),
        token_shopify: ''
      }

      var form_valid = false;
      $('#shopify_shop_name').validate( function(valid ){
          if( valid ){
             $('#pakke_api_key').validate( function( _valid ){
               form_valid = true;
             })
          }
      })

      console.log(form_valid);
      if( form_valid ){
        console.log("enviando signup")
        $.ajax({
          url:'/pakkeShopify/signup',
          data: data,
          dataType: 'json',
          type:'post',
          success: function(res){
            console.log(res)
            if( !res.error ){
              window.location.replace( res.installUrl )
            }else{
              console.log(res.error_message);
            }
            // TODO: manejar respuesta
          },
          error: function(err){
            console.log(err)
            // TODO: manejar errores
          }
        })
      }else{
        console.log("no valido")
        $("form").validate();
      }


  })

  /*
  * TODO:
  * Formulario para desarrollador.
  * Captura toda la informacion de una tienda especifica si existe en nuestra db
  */

  $(".btn-dev-form-submit").click( function(e){
    e.preventDefault();
    var data = {
      shop_name: $("input[name='shop_name']").val(),
    }

    $.ajax({
      url:'/dev/getUserDataByShopName',
      data: data,
      dataType: 'json',
      type:'post',
      success: function(res){
        console.log(res)
        if( !res.error ){
          console.log( "usuario", res );
          $("input[name='key_pake']").val( res.key_pake )
          $("input[name='token_shopify']").val( res.token_shopify )
          // TODO: agregar a la respuesta la informacion de los siguientes campos:
          // $("input[name='shopify_webhook_paid_cb_url']").val( res.webhooks.hopify_webhook_paid_cb_url )
          // $("input[name='shopify_webhook_paid_cb_url']").val( res.shopify_webhook_paid_cb_url )
        }else{
          console.log("error",res.error_message);
        }
        // TODO: manejar respuesta
      },
      error: function(err){
        console.log(err)
        // TODO: manejar errores
      }
    })
  })

  /*
  * Cada input puede o no tener un boton de instalar. Dependiente si se obtuvo o no
  * informacion
  */
  $("button.install").click( function(e){
    var $refEl = $(this).closest('input');
    if ($($refEl).val() <= 0 ){

        const install_element = $($refEl).attr('data-service');
        const url = "";


        $.ajax({

        })
    }
  })
})
