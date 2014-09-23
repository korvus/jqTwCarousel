(function($){

    $.fn.twCarousel = function(parametres){

        var defauts = {
            "launch": 1,
            "pulse": 4000,
            "sizeWindow": 1,
            "shift": 1,
            "speed": 1000,
            "bTnext": 0,
            "bTprev": 0,
            "interactStopAll": 0,
            "direction": "<",
            "addFunctionOnClick": 0,
            "addFunctionAfterSlide": 0
        };

        var params = $.extend(defauts, parametres); 
        var parent =        "";
        var turnCarouSel =  "";
        var nbrChild =      0;
        var widChild =      0;
        var nbrChildRoot =  0;
        var sizeShift =     0;
        var gap =           0;

        this.each(function(){
            wrapper = this;
            prepareSlidingTiming(wrapper);
            initTwCa(wrapper,params.sizeWindow);
            //initTwCaBt(wrapper);
        })

        function prepareSlidingTiming(wrapper){
            if(params.launch!=0){
                setTimeout(function(){initSInterval(wrapper);},params.launch);
            }
        }

        function initSInterval(wrapper){
            if(params.direction=="<"){
                turnCarouSel = setInterval(function(){moveToLeft(wrapper)}, params.pulse);
            }else{
                turnCarouSel = setInterval(function(){moveToRight(wrapper)}, params.pulse);
            }
        }

        function setArrows(e){
            e.preventDefault();
            clearInterval(turnCarouSel);
            if(params.addFunctionOnClick!==0){
                params.addFunctionOnClick();
            }
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
            var rest = 0;
            var nodeW = $(wrapper);
            var parentNode = nodeW.parent();
            var elts = nodeW.children();
            nbrChildRoot = elts.length;
            widChild = elts.outerWidth(true);
            sizeShift = widChild*params.shift;
            hl = sw+params.shift;
            if(hl>nbrChildRoot){
                rest = hl-nbrChildRoot;
            }
            //console.log(hl);
            var toDuplicate = Array.prototype.slice.call(elts, 0, hl);
            $(toDuplicate).clone().appendTo(nodeW);
            if(rest > 0){
                var toDuplicate2 = Array.prototype.slice.call(elts, 0, rest);
            }
            $(toDuplicate2).clone().appendTo(nodeW);
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
                    if(params.interactStopAll==0){
                        initSInterval(wrapper);
                    }
                });
            }
        }

        function triggerClickNext(elt){
            if(params.bTnext !== 0){
                params.bTnext.unbind("click");                                                        
                params.bTnext.click(function(e){
                    setArrows(e);
                    moveToLeft(elt);
                    if(params.interactStopAll==0){
                        initSInterval(wrapper);
                    }
                });
            }
        }

        function functionAfterSlide(direction,gap){
            if(params.addFunctionAfterSlide!==0){
                params.addFunctionAfterSlide(direction,gap+1);
            }
        }

        function moveToRight(nodeTarget){
            if(gap<params.shift){
                gap = gap+nbrChildRoot;
                $(nodeTarget).css("left","-"+(gap*widChild)+"px");
            }
            $(nodeTarget).animate({'left': '+='+sizeShift+'px'},params.speed, function(){
                gap = gap-params.shift;
                functionAfterSlide(">",gap);
                triggerClickNext(nodeTarget);
                triggerClickPrev(nodeTarget);
            });

        }

        function moveToLeft(nodeTarget){
            $(nodeTarget).animate({'left': '-='+sizeShift+'px'},params.speed, function(){
                gap = gap+params.shift;
                if(gap>=nbrChildRoot){
                    gap = gap-nbrChildRoot;
                    $(nodeTarget).css('left', "-"+(gap*widChild)+"px");
                }
                functionAfterSlide("<",gap);
                triggerClickNext(nodeTarget);
                triggerClickPrev(nodeTarget);
            });
        }

        return this;

    }

})(jQuery);