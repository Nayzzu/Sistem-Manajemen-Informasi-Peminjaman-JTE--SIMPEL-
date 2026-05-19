<!DOCTYPE html>
<html>
   <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="shortcut icon" href="/images/logo-petir.png" type="image/png">
    <link rel="icon" href="/images/logo-petir.png" type="image/png">
    @routes 
    @viteReactRefresh
    {{-- Pastikan resources/css/app.css ikut dipanggil --}}
    @vite(['resources/js/app.jsx', 'resources/css/app.css']) 
    @inertiaHead
</head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>