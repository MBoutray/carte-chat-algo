<template>
  <!DOCTYPE html>
  <html lang="fr">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cours algo</title>
  </head>

  <body>
    <div id="content">
      <slot></slot>
    </div>
  </body>

  </html>
</template>

<script>

</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#content {
  display: grid;
  grid-template-columns: 2fr 7fr 3fr;
}
</style>
