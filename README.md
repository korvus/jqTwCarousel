jqTwCarousel
=========

  - jq because use jquery
  - Tw because maded for Twenga company
  - Carousel because it's a carousel. You can call it slider if you prefer.

The particularity is this carousel accept two mains parameters :
 - wrap size (number of elements displaying simultaneously)
 - shift size

Version
----

1.0.0

Params
----

* launch: number (milliseconds). Time in miliseconds when the carousel start. If 0, not launched, default 1.
* pulse: number (milliseconds). Time in millisecond between each move
* sizeWindow:number. How much child DOM must appear simultaneously in the wrap
* shift: number. How much elements shift simultaneously
* speed: number (milliseconds). Parameter for animate jquery function.
* bTnext:jquery object. It's the node you need for button next. You can omit it if you won't it.
* bTprev: the same as previous param execpt is for previous button.
* interactStopAll: boolean. If true, when user click on arrow, it will stop all the animation.
* direction: string "<" or ">". Indicate which side do slide.
* addFunctionOnClick: function. This function will be call each time user click on one of the button for slide the carousel.
* addFunctionAfterSlide: function. This function will be call each time the slider finish to slide. You can call it and receiving as a callback two arguments wich are "direction" (for knowing wich side the carousel slided) and wich pics/units is displayed in first position in the current state of the carousel.

How to use it
--------------

HTML need just 2 node DOM for wrap same child-type, if possible.

```html
<wrap>
    <list id="carousel">
        <xx>txt content or other dom elets </xx>
        <xx>txt content or other dom elets </xx>
        <xx>txt content or other dom elets </xx>
    </list>
</wrap>
<button class="prev">prev</button>
<button class="next">next</button>
```

CSS
---

CSS need the minimum. just be sure child elements are in one line. Script will automatically add overflow:hidden; and position:relative; on wrap node, and that's the minimum. Add height on element is webcoming by the way.
```css
wrap{height:100px;}
xx{float:left;width:150px;height:100px;}
```

JS
--

* Call jquery and plugin in your header (rocket science)

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="jq.twCarousel.js"></script>
```

* And here we go (basic example with not a whole bunch of parameters):

```javascript
	$(document).ready(function(){

		$("#carousel").twCarousel({
			pulse : 3000,
			sizeWindow : 4,
			shift : 4,
			speed : 600,
			direction : '>',
			bTnext : $(".next"),
			bTprev : $(".prev")
		});

	})

```

More example
----

Take a look on doc.jqtwCarousel.php. Need an apache server (local or not).


License
----

MIT


**Free Software, Hell Yeah!**

