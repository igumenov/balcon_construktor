$(document).ready(function() {
    $("[data-fancybox]").fancybox({
        touch:false,
    });
    $("input[name=tel]").mask("+7(999)999-99-99");
    $("#steps").steps({
        headerTag: "h3",
        bodyTag: "section",
        // transitionEffect: "slideLeft",
        autoFocus: true,
        titleTemplate: '#title#',
        labels:{
            cancel:"Cancel",
            current:"current step:",
            pagination:"Pagination",
            finish:"Далее",
            next:"Далее",
            previous:"Назад",
            loading:"Loading ..."
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            if(currentIndex==1){
               // $('.step2 .first').trigger('click');
            }
            if(currentIndex==5){
                $('.img_step').css('opacity',0);
                $('.step_6_images').css('opacity',1);
            }else{
                $('.img_step').css('opacity',1);
                $('.step_6_images').css('opacity', 0);
            }
        },
        onFinished: function (event, currentIndex) { 
            //скрываем контент
            $('.step_6_images').hide();
            $('#steps').hide();
            //показываем таймер
            $('#finished').show();
            $('#countdown').jQuerySimpleCounter({
                start:  6,
                end:    100,
                duration: 2000,
                complete: function(){
                    $('#finished').hide();
                    $('#formular').show();
                }   
            });
        },
    });
    $("#range1").ionRangeSlider({
        min: 5,
        max: 100,
        from: 20,
        postfix: " м<sup>2</sup>",
        onChange: function (data) {
            $('#range1_val').html(parseFloat(data.from)+' м<sup>2</sup>');
        },
    });
    $("#range2").ionRangeSlider({
        min: 5000,
        max: 300000,
        from: 80000,
        postfix: " руб",
        onChange: function (data) {
            $('#range2_val').html(parseFloat(data.from)+' руб');
        },
    });

    $("#modal_form #steps .content .left .item label svg").click(function (event) {
        event.preventDefault();
        var content = $(this).closest('.item').find('.hover');
        content.addClass('mobile_hover');
        $.fancybox.open(content);
    });

    $('input[name=step_2]').change(function(){
        var val = $(this).attr('data-value');
        $('.step2_img').find('img').removeClass('active');
        $('.step2_img').find('.step2_img_'+val).toggleClass('active'); 
        
        if(val==1){
            $('.active_step_2_1').show();
            $('.active_step_2_2').hide();
            $('.active_step_2_3').hide();

            $('.step3 .vinos').show();
        }else if(val==2){
            $('.active_step_2_1').hide();
            $('.active_step_2_2').show();
            $('.active_step_2_3').hide();

            $('.step3 .vinos').show();
        }else if(val==3){
            $('.active_step_2_1').hide();
            $('.active_step_2_2').hide();
            $('.active_step_2_3').show();

            $('.step3 .vinos').show();
        }else if(val==4){
            $('.step3 .vinos').hide();
            $('.active_step_2_1').show();
            $('.active_step_2_2').show();
            $('.active_step_2_3').show();


            $('.checkbox_list input').prop('checked',false);
            $('.img_step .step3_img img').removeClass('active');

        }else{

        }      
    });
    
    $('.step3 .checkbox_list input').change(function(){
        var val = $(this).attr('data-value');
        $('.step3_img').find('.step3_img_'+val).toggleClass('active');
        if(val==1){
            $('.active_step_3_1_1').hide();
            $('.active_step_3_1_2').show();
            $('.hide_on_vinos').hide();
            $('.checkbox_list .no_info').find('input').prop('checked',false);
        }else if(val==2){
            $('.hide_on_vinos').show();
            $('.active_step_3_1_1').show();
            $('.active_step_3_1_2').hide();
            $('.checkbox_list .no_info').find('input').prop('checked',false);
        }else if(val==3){
            $('.step3_img_3').toggleClass('anim');
            $('.checkbox_list .no_info').find('input').prop('checked',false);
        }else if(val==4){
            $('.hide_on_vinos').show();
            $('.step3_img_4').toggleClass('anim');
            $('.checkbox_list .no_info').find('input').prop('checked',false);
        }else if(val==5){
            $('.checkbox_list .no_info').find('input').prop('checked',false);

        }else if(val==6){
            $('.checkbox_list').find('input').prop('checked',false);
            $('.checkbox_list .no_info').find('input').prop('checked',true);
            $('.img_step .step3_img').find('img').removeClass('active');
        }else{
            $('.active_step_2_1').show();
            $('.active_step_2_2').show();
            $('.active_step_2_3').show();
            $('.hide_on_vinos').show();
            $('.step3_img_4').toggleClass('anim');
            $('.step3_img_3').toggleClass('anim');
        }
        //подмена картинок если и вынос и крыша
        if($('#step3_active_1:checked').length==1 && $('#step3_active_2:checked').length==1){
            $('.active_step_3_1_1').show();
            $('.active_step_3_1_2').show();
        }
        //подмена картинок если и вынос и крыша была а осталось только крыша
        if($('#step3_active_1:checked').length!=1 && $('#step3_active_2:checked').length==1){
            $('.active_step_3_1_1').show();
            $('.active_step_3_1_2').hide();
        }


        if($('#step3_active_1:checked').length==1){
            $('.hide_on_vinos').show();
        }else{
            $('.hide_on_vinos').hide();
            $('.step3_img_4').removeClass('anim');
            $('.step3_img_4').removeClass('active');
            $('.hide_on_vinos').find('input').prop('checked',false);
        }
    });
    $('input[name=step_4]').change(function(){
        var val = $(this).attr('data-value');
        $('.step4_img').find('img').removeClass('active');
        $('.step4_img').find('.step4_img_'+val).toggleClass('active');   
        if($('#step3_active_1:checked').length==1){
            $('.step4_img .only_vinos').show();
        }else{
            $('.step4_img .only_vinos').hide();
        }
    });
    $('input[name=step_5]').change(function(){
        var val = $(this).attr('data-value');
        $('.step5_img').find('img').removeClass('active');
        $('.step5_img').find('.step5_img_'+val).toggleClass('active');        
    });
    $('input[name=step_6]').change(function(){
        var val = $(this).attr('data-value');
        $('.step_6_images').find('.item').removeClass('active');
        $('.step_6_images').find('.item'+val).addClass('active');    
    });
    $('#modal_form #steps ul[role=tablist]').append('<li class="disabled last"><a>Расчёт готов!</a></li>');

    function close() {
        $.fancybox.close();
    }
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;
    
        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();
    
            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });
    $('#modal_form form').submit(function(e){
        e.preventDefault();
        var name = $('#formular input[name=name]');
        var tell = $('#formular input[name=tel]');
        var rules = $('#rules1:checked');
        if(name.val()=='' | tell.val()=='' | rules.length==0){
            if(name.val()==''){
               name.css({'border': '1px solid #f00', 'box-shadow' : 'rgba(247, 57, 0, 0.72) 0px 0px 10px'});
                setTimeout(
                    function() {
                        name.css({'border': '1px solid #d7d7d7', 'box-shadow' : 'initial'});
                    }, 2000
                );
            }
            if(tell.val()==''){
                tell.css({'border': '1px solid #f00', 'box-shadow' : 'rgba(247, 57, 0, 0.72) 0px 0px 10px'});
                setTimeout(
                    function() {
                        tell.css({'border': '1px solid #d7d7d7', 'box-shadow' : 'initial'});
                    }, 2000
                );
            }
            if(rules.length==0){
                $('#formular .form_line .item').addClass('shake');
                setTimeout(
                    function() {
                        $('#formular .form_line .item').removeClass('shake');
                    }, 300
                );    
            }
        }else{
			var formData = new FormData(this);
            $.ajax({
                url         : '/send.php',
                type        : 'POST',
                data        : formData,
                success     : function(data){
                    close();
                    $.fancybox.open('<div id="sended"> <div class="text1">Заявка отправлена успешно!</div> <div class="text2">В ближайшее время с вами свяжется наш менеджер</div> </div>');
                    setTimeout(close, 3000);
                    setTimeout( window.location.reload.bind( window.location ), 3500 );
                },
                error: function(data){
                    console.log(data);
                },
                cache: false,
                contentType: false,
                processData: false
        
            });

        }
    });


    $("#callback .btn").click(function (event) {
        event.preventDefault();


        if($('#callback input[type=text]').val()=='' | $('#callback input[type=checkbox]:checked').length==0){
            if($('#callback input[type=text]').val()==''){
                $('#callback input[type=text]').css({'border': '1px solid #f00', 'box-shadow' : 'rgba(247, 57, 0, 0.72) 0px 0px 10px'});
                setTimeout(
                    function() {
                        $('#callback input[type=text]').css({'border': '1px solid #d7d7d7', 'box-shadow' : 'initial'});
                    }, 2000
                );
            }
            if($('#callback input[type=checkbox]:checked').length==0){
                $('#callback .item').addClass('shake');
                setTimeout(
                    function() {
                        $('#callback .item').removeClass('shake');
                    }, 300
                );
            }
        }else{
            //action отправки заявки

            $('.simple-timer').simpletimer({
                day: 0,
                dayDom: '.timer-day',
                hour: 0,
                hourDom: '.timer-hour',
                minute: 0,
                minuteDom: '.timer-minute',
                second: 5,
                secondDom: '.timer-second',
                millisecond: 0,
                millisecondDom: '.timer-millisecond',
                blank: 100,
                pause: '#pause_btn',
                endFun: function(){
                    //действие по окончанию счетчика
                }
            });
        }
    });    
});