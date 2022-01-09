<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            font-family: Verdana, Geneva, sans-serif;
        }

        .title {
            display: flex;
            justify-content: center;
        }

        .personal_data>h3 {
            margin-top: 10px;
            margin-bottom: 10px;
            border-bottom-color: black;
            border-bottom-style: dashed;
            border-bottom-width: 2px;
            padding-bottom: 5px;
        }

        .personal_data {
            margin: 10px;
            background-color: whitesmoke;
            padding: 5px;
        }

        ul {
            margin: 0px;
            padding: 0px;
        }

        li {
            font-weight: bold;
            list-style: none;
            font-size: 14px;
            margin-bottom: 5px;
        }

        li>span {
            font-weight: normal;
        }

        #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td,
        #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #customers tr:hover {
            background-color: #ddd;
        }

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #3f51b5;
            color: white;
        }
        .banner {
            text-align: left;

            width: 250px;
            object-fit: cover;
            text-align: center;
            display: block;
            margin-bottom: 20px;
        }

        .left {
            text-align: left;


        }

        .right {
            text-align: right;


        }

        .cabecera {
            display: flex;
            margin: 0px;
        }

        .subtitle {
            display: block;
        }
    </style>
</head>

<body>
<div class="cabecera">
        <img src="{{ public_path('banner.jpg') }}" class="banner">
        <div class="right">
            <h3 style="margin-bottom:0px;margin-top:0px;">CENTRO NATURISTA F.CH</h3>
            <span class="subtitle">Chamba Morales Fausto Sebastian</span>
            <span class="subtitle">Matriz: Sucre s/n y Juan Montalvo</span>
            <span class="subtitle">Cell.: 0993040644</span>
        </div>
    </div>


    <header class="title" style="padding-bottom:0px;margin:0px;">
        <h3 style="text-align:center;margin:0px;">REPORTE DE PRODUCTOS</h3>

    </header>
    <p style="font-weight:bold;text-align:left;margin-top:5px;  font-size:17px; margin: 10px;">Total registros: {{count($data )}}</p>

    <section class="personal_data" style="margin-bottom:30px;">
        <table id="customers">
            <thead>

                <tr>
                    <th>Código B.</th>
                    <th>Nombre</th>
                    <th>Presentación</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Fracción</th>

                    <th>Precio</th>

                </tr>
            </thead>

            <tbody>
                @foreach ($data as $dt)
                <tr style="background-color:#E5E5E5;">
                    <td>{{ $dt['bar_code'] }}</td>

                    
                    <td>{{ $dt['name'] }}</td>
                    <td>{{ $dt['unity'] }}</td>
                    <td>{{ $dt['category'] }}</td>
                    <td>{{ $dt['stock'] }}</td>
                    <td>{{ $dt['fraction'] }}</td>

                    <td>${{ $dt['sale_price'] }}</td>

                </tr>
                @endforeach
            </tbody>
        </table>
    </section>




</body>

</html>