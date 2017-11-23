//圆形滑块
$(document).ready(function(){
        // 变量的设置
        var slider = $('.slider');
        var sliderInner = slider.find('.slider-inner');
        var sliderOrigin = slider.find('.slider-origin');
        var sliderItems = slider.find('.slider-item');
        var itemsLength = sliderItems.length;
        var calcDeg = 270 / itemsLength;
        var clickDown = false;
        var mouseMove = false;
        var moveFrom = null;
        var moveTo = null;
        var extraDeg = 0;
        var currentItem = sliderItems.eq(0);
    
        // 滑块的其实宽度、高度
        sliderOrigin.width(sliderItems.outerHeight() / 2);
        sliderOrigin.height(sliderItems.outerHeight() / 2);
        
        // 滑块里面的宽度
        sliderInner.width(sliderItems.outerHeight()*3.5);
        sliderInner.height(sliderItems.outerHeight()*3.5);
    
        var sliderInnerWidth = sliderInner.outerWidth();
        var sliderInnerOffset = sliderInner.offset();
    
        sliderOrigin.css('margin-top',(sliderInner.height() / 2) - (sliderOrigin.height() / 2));
        
        // 计算旋转位置
        function rotationPosition(exceptIndex){
            exceptIndex = exceptIndex | 0;
            var i = 1;
            sliderItems.each(function(e){
                var $this = $(this);
                extraDeg = exceptIndex > itemsLength/2? 360: 0;
                if(e === exceptIndex){
                    $this.addClass('active').css('transform', 'rotate('+extraDeg+'deg)');
                }else{
                    $this.css('transform', 'rotate('+((i*calcDeg)+45)+'deg)');
                    i++;
                }
            });
        }rotationPosition();
    
    
        // 点击
        var clickedItemIndex = null;
        function sliderItemsClickEvent(){
    
            sliderItems.mousedown(function(e){
                if(clickedItemIndex == null && e.which == 1){
                    clickedItemIndex = $(this).index();
                }
            });
            sliderItems.mouseup(function(){
                var $this = $(this);
                if(clickedItemIndex === $this.index()){
                    currentItem = $this;
                    pushIndex($this.index());
                }
            });
        }sliderItemsClickEvent();
    
        // 为active加index
        function pushIndex(index){
            sliderItems.removeClass('active');
            rotationPosition(index);
        }
    
        // 如果鼠标点击
        sliderInner.mousedown(function(e){
            clickDown = true;
            moveFrom = e.pageX;
        });
    
    
        //鼠标抬起执行  clickDown=false
        $(document).mouseup(function(e){
            clickDown = false;
            setTimeout(function(){ clickedItemIndex = null; }, 505);
            // setTimeout(function(){clickDown = false;}, 505);
            if(mouseMove){
                mouseMove = false;
                moveto = e.pageX;
                swipe(moveFrom, moveto);
            }
        });
    
    
        //鼠标移动到滑块里面的div
        sliderInner.mousemove(function(e){
            if(clickDown){
                if(!mouseMove){mouseMove = true;}
                var offsetX = e.pageX - sliderInnerOffset.left;
                var move = moveFrom - sliderInnerOffset.left;
                var motionDeg = ((offsetX - move)/sliderInnerWidth) * (calcDeg*2);
                extraDeg = currentItem.index() > itemsLength/2? 360:0; 
                sliderInner.find('.slider-item.active').css('transform', 'rotate('+(motionDeg+extraDeg)+'deg)');
            }
        });
    
        function swipe(from, to){
            var distance = Math.abs(from - to); // 鼠标移动距离
            var rightDir = from < to;
            if(distance > sliderInnerWidth/4){
                navigate();
            }else{
                currentItem.css('transform', 'rotate('+(currentItem.index() > itemsLength/2? 360:0)+'deg)');
            }
    
            function navigate(){
                if(rightDir){
                    var nextIndex = currentItem.next().index();
                    pushIndex(nextIndex != -1? nextIndex:  0);
                }else{
                    var prevIndex = currentItem.prev().index();
                    pushIndex( prevIndex != -1? prevIndex:  sliderItems.length -1);
                }
                currentItem = sliderInner.find('.slider-item.active');
            }
    
        }
    });


    //锚点切换动画
    $(function(){
        $("#to_demo").click(function(){
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset},800);
                return false;
                }
            }
        });
    });
    $(function(){
        $("#to_aboutme").click(function(){
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset},800);
                return false;
                }
            }
        });
    });
    $(function(){
        $("#to_lianxi").click(function(){
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset},800);
                return false;
                }
            }
        });
    });


