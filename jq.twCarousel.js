(function($){

    $.fn.twCarousel = function(parametres){

        var defauts = {
            "pulse": 4000,
            "sizeWindow": 1,
            "shift": 1,
            "speed": 1000,
            "bTnext": 0,
            "bTprev": 0,
        };

        var params = $.extend(defauts, parametres); 
        var parent = "";
        var nbrChild = 0;
        var widChild = 0;
        var turnCarouSel = "";
        var sizeShift = 0;
        var slided = 0;
        var nbSlide = 0;
        var decalage = 0;
        var nbTurn = 0;
        var gap = 0;

        this.each(function(){
            wrapper = this;
            initSInterval(wrapper);
            initTwCa(wrapper,params.sizeWindow);
            //initTwCaBt(wrapper);
        })

        function initSInterval(wrapper){
            turnCarouSel = setInterval(function(){moveToLeft(wrapper)}, params.pulse);
        }

        function setArrows(e){
            e.preventDefault();
            clearInterval(turnCarouSel);
            if(params.bTnext !== 0){params.bTnext.unbind("click");}
            if(params.bTprev !== 0){params.bTprev.unbind("click");}
        }

        function liftNoSenseValues(){
            if(params.shift>params.sizeWindow){
                params.shift = params.sizeWindow;
            }
        }

        function initTwCa(wrapper,sw){
            liftNoSenseValues();
            var nodeW = $(wrapper);
            var parentNode = nodeW.parent();
            var elts = nodeW.children();
            nbrChildRoot = elts.length;
            widChild = elts.outerWidth(true);
            sizeShift = widChild*params.shift;
            decalage = nbrChildRoot%params.shift;
            nbSlide = Math.ceil((nbrChildRoot-sw)/params.shift);
            //console.log(nbSlide);
            //console.log(sw-(nbrChildRoot%sw)
            var toDuplicate = Array.prototype.slice.call(elts, 0, sw);
            $(toDuplicate).clone().appendTo(nodeW);
            var nbrChild = nodeW.children().length;
            if(sw!=0){
                parentNode.css({"overflow":"hidden","width":(sw*widChild)+"px","position":"relative"});
            }
            nodeW.css({'width':(widChild*nbrChild)+"px","position":"absolute","top":"0","left":"0"});
            triggerClickPrev(wrapper);
            triggerClickNext(wrapper);
        }


        function triggerClickPrev(elt){
            if(params.bTprev !== 0){
                params.bTprev.unbind("click");
                params.bTprev.click(function(e){
                    setArrows(e);
                    moveToRight(elt);
                    //initSInterval(wrapper);
                });
            }
        }

        function triggerClickNext(elt){
            if(params.bTnext !== 0){
                params.bTnext.unbind("click");
                params.bTnext.click(function(e){
                    setArrows(e);
                    moveToLeft(elt);
                    //initSInterval(wrapper);
                });
            }
        }

        function moveToRight(nodeTarget){
            //console.log(slided+" - "+decalage);
            if(slided==0){
                $(nodeTarget).css('left', "0px");
            }
            $(nodeTarget).animate({'left': '+='+sizeShift+'px'},params.speed, function(){
                triggerClickNext(nodeTarget);
                triggerClickPrev(nodeTarget);
            });

        }

        function moveToLeft(nodeTarget){
            slided++;
            //console.log(nbSlide+" - "+slided);
            $(nodeTarget).animate({'left': '-='+sizeShift+'px'},params.speed, function(){
                triggerClickNext(nodeTarget);
                triggerClickPrev(nodeTarget);
                if(0==slided%nbSlide){
                    if(decalage>0){
                        if(gap==decalage){gap=0;}else{gap++;}
                        
                        console.log(gap);
                        //$(nodeTarget).css('left', "-"+(gap*widChild)+"px");
                    }else{
                        $(nodeTarget).css('left', "0px");
                    }
                }
            });
        }

        return this;

    }

})(jQuery);