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
                    // $.fancybox.close();
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
    $('input[name=step_2]').change(function(){
        var val = $(this).attr('data-value');
        $('.step2_img').find('img').removeClass('active');
        $('.step2_img').find('.step2_img_'+val).toggleClass('active');        
    });
    
    $('input[name=step_3]').change(function(){
        var val = $(this).attr('data-value');
        $('.step3_img').find('.step3_img_'+val).toggleClass('active');        
    });
    $('input[name=step_4]').change(function(){
        var val = $(this).attr('data-value');
        $('.step4_img').find('img').removeClass('active');
        $('.step4_img').find('.step4_img_'+val).toggleClass('active');        
    });
    $('input[name=step_5]').change(function(){
        var val = $(this).attr('data-value');
        $('.step4_img').find('img').removeClass('active');
        $('.step4_img').find('.step4_img_'+val).toggleClass('active');        
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
			
			
			
			
			
			//var data = new FormData();
			var formData = new FormData(this);
		// AJAX запрос
	$.ajax({
		url         : '/send.php',
		type        : 'POST', // важно!
		data        : formData,
		success     : function(data){
			console.log(data);
		},
		// функция ошибки ответа сервера
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