lookiehere.js
=============

Ask yourself these questions:

* Don't have your own server side image rescaling scripts?
* Still loading 2560x1440 images when your viewers may still be on their old 1024x768 monitors (or worse yet, on their mobile devices)?
* Embedding your landscape panoramics into a tiny ```<img>``` "thumbnail" fitted on some listing?

If you answered "yes" to any of them you should feel **bad** about yourself.

![Zoidberg agrees](http://i.ytimg.com/vi/jG2KMkQLZmI/hqdefault.jpg)

Just kidding.

Seriously, not everyone has the resources, know-how, or time to do that. Now ask yourselves these questions:

* Do you want to set ```src``` to something a little bigger than what your ```<img>``` container can fit?
* Do you want to give your viewers the ability to see the full (or whatever can fit in their viewport) image in a minimal modal?
* Do you want to use some code that a college kid wrote because they had nothing better to do on a Friday night?

Yeah? *You want lookiehere*.

## Usage

> Much simple, very consise, wow.

1. Download the .js file.
2. Embed it at the end of your ```<body>``` with ```<script src="lookiehere.js"></script>```.
3. Invoke lookiehere (```lookiehere.init();```) at the end of your script embeds, in a ```document.ready``` callback, or whenever.
4. Add ```lookiehere``` to ```<img>``` class attributes.
5. Added some more images dynamically? Invoke the bindImages method (```lookiehere.bindImages();```) in your callbacks.

## Customization

> Wow Kelvin, white on black tabs? Are you stupid? Only 10em padding on the modal? Just stop making stuff, dude.

If you want to customize some features you can either:

1. Edit the _options member in the lookiehere object 
2. Use the lookiehere.options method and give it an object with option keys and values (e.g; ```lookiehere.options({color: '#DC2C90', opacity: 0.3})```)

Speaking of the options...

##### General options:
* ```selector```: A CSS-style selector that indicates which images lookiehere creates a tab or click event for. The default is ```img.lookiehere```.
* ```attribute```: The attribute which indicates the URL of your full size image. By default is ```src```, but if you actually have a rescaling script on the backend and the URL of the full size is indicated by another attribute in your ```<img>``` tag, please set it here.

##### Tab options:
* ```activateByTab```: A boolean, true by default. If it is true, a small tab (a simple ```span```, really) will be created at the top-left of your image which can be clicked to activate the modal. If it is false, no tab will be created and the whole image will be clickable.
* ```tabText```: Tab text. Can be HTML since it just sets the ```<span>```'s ```innerHTML```. Go crazy with your Font Awesome.
* ```tabColor```: CSS color string, name or hex value. It's the tab's background color!
* ```tabFontColor```: Ummm...
* ```tabOpacity```: Yeah.

##### Modal options:
* ```padding```: Set the padding between the modal/viewport and the image bounds. A string with appropriate CSS units should be given.
* ```color```: The color of the modal background.
* ```opacity```: The opacity of the modal background.
* ```transition```: The transition time for the modal to fade in and out. Be sure it is a string with CSS time, like ```0.2s```!

## Conclusion

That's all! Go break it and file some issues!
