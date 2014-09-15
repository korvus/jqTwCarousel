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
            var rest = 0;
            var nodeW = $(wrapper);
            var parentNode = nodeW.parent();
            var elts = nodeW.children();
            nbrChildRoot = elts.length;
            widChild = elts.outerWidth(true);
            sizeShift = widChild*params.shift;
            //decalage = nbrChildRoot%params.shift;
            decalage = params.shift-(nbrChildRoot%params.shift);
            gap = decalage;
            forFullTurn = Math.floor(sw/params.shift);
            nbSlide = Math.ceil((nbrChildRoot-sw)/params.shift);
            nbSlide += forFullTurn;
            hl = sw-(nbrChildRoot%sw)+params.shift;
            if(hl>nbrChildRoot){
                rest = hl-nbrChildRoot;
            }
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
            //console.log(nbSlide+" - "+slided);
            slided++;
            $(nodeTarget).animate({'left': '-='+sizeShift+'px'},params.speed, function(){
                triggerClickNext(nodeTarget);
                triggerClickPrev(nodeTarget);
                console.log("test if slide : "+slided%nbSlide +" - slided : "+ slided);
                if(0==slided % nbSlide){
                    if(decalage>0){
                        if(gap==0){
                            $(nodeTarget).css('left', "-"+(gap*widChild)+"px");
                            console.log("cas 1 : has slided / gap : "+gap+ " Distance : "+(gap*widChild)+"px");
                            gap=decalage;
                        }else{
                            slided++;
                            console.log("cas 2 : has slided / gap : "+gap+ " Distance : "+(gap*widChild)+"px");
                            $(nodeTarget).css('left', "-"+(gap*widChild)+"px");
                            gap--;
                            //setTimeout(function(){$(nodeTarget).css('left', "-"+(gap*widChild)+"px");gap--;}, 1000);
                        }
                    }else{
                        setTimeout(function(){$(nodeTarget).css('left', "0px");}, 1000);
                    }
                }
            });
        }

        return this;

    }

})(jQuery);