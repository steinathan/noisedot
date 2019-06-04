# noisedot

> noisedot is a library that makes it easy to add `noisedot texture` to your web apps

With `noisedot` you can customize noisedot effects on your webpage, it has customizable options that makes it easy to generate noisedot effect on your site, the main noisedot is just css3 key-frame animation and many noisedot pngs

> TIP => You can also mix this script along side with typed.js to create a very fancyfull webpage, please check the `/dev/index.html` for relative examples

## Installation

noisedot is made with [`pnpm`](https://github.com/pnpm/pnpm/)
so you can give it a try

```sh
# with pnpm
$ pnpm i noisedot --save
```

Alternatively

```sh
# with npm
$ npm i noisedot --save
```

## Initialze noisedot

In your script or html

```js
noisedot(element [, options])
```

Where element is your html selector entity eg `#noisedot` or `.noisedot`

### Example

<!-- TODO: change `src` to unpkg -->

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Example noisedot | example.com</title>
  <script src="/path/to/noisedot.umd.js"/></script>
</head>
<body id="noisedot">
    <div id="main">
       <h3>Hello World</h3>
       <a href="//gitlab.com/navicstein">This is a reactive link</a>
    </div>

    <style>
    .container {
        position: absoulte;
        z-index: 100 !important
    }
    </style>
    <!-- initialize noisedot here -->
    <script>
          noisedot("#noisedot", {
        animate: true,
        patternWidth: 100,
        patternHeight: 100,
        grainOpacity: 0.1,
        grainDensity: 1,
        grainWidth: 1,
        grainHeight: 1,
        grainChaos: 0.5,
        grainSpeed: 20,
      });
</script>
</body>
</html>

```

## Things to note

> When mounted every link is not reactive, you'll have to manually specify your `elements` `z-index`

Thanks for using this script :)

### TODO

- Add test
- Add global css rules
- etc?
