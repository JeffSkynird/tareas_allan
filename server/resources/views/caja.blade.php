<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #invoice-POS {
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
            padding: 2mm;
            margin: 0 auto;
            width: 7.5cm;
            background: #FFF;




        }

        h1 {
            font-size: 1.5em;
            color: #222;
        }

        h2 {
            font-size: .9em;
        }

        h3 {
            font-size: 1.2em;
            font-weight: 300;
            line-height: 2em;
        }

        p {
            font-size: .7em;
            color: #666;
            line-height: 1.2em;
        }

        span {
            font-size: .7em;
            color: #666;
            line-height: 1.2em;
        }

        #top,
        #mid,
        #bot {
            /* Targets all id with 'col-' */
            border-bottom: 1px solid #EEE;
        }

        #top {
            min-height: 100px;
        }

        #mid {
            min-height: 80px;
        }

        #bot {
            min-height: 50px;
           
        }

        #top>.logo {

            height: 60px;
            width: 60px;
            background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
            background-size: 60px 60px;
        }

        .clientlogo {
            float: left;
            height: 60px;
            width: 60px;
            background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
            background-size: 60px 60px;
            border-radius: 50px;
        }

        .info {
            display: block;

            margin-left: 0;
        }

        .title {
            float: right;
        }

        .title p {
            text-align: right;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }



        .tabletitle {

            font-size: .5em;
            background: #EEE;
        }

        .service {
            border-bottom: 1px solid #EEE;
        }

        .item {
            width: 24mm;
        }

        .itemtext {
            font-size: .5em;
        }

        #legalcopy {
            margin-top: 5mm;
        }
    </style>
</head>

<body>

    <div id="invoice-POS">

     
        <center id="top">
 
        <div class="info"> 
            <h2>Cierre de Caja</h2>
            <p>Matriz: Sucre s/n y Juan Montalvo</p>
        </div><!--End Info-->
        </center>

        <div id="mid">
            <div class="info">
              
                <div style=" display: flex;margin-top:0px;padding-top:0px;">
                    <div style="display:block;text-align:left; width: auto;">
                    <span style="display:block;">Usuario aper: {{str_replace(' ', '', $cash['last_names'])}}</span>
                        <span style="display:block;">Fecha aper: {{$cash['created_at']}}</span>
                        <span style="display:block;">Usuario cie: {{str_replace(' ', '', $cash['last_names'])}}</span>
                        <span style="display:block;">Fecha cie: {{$cash['updated_at']}}</span>
                        <span style="display:block;">Usuario imp: {{str_replace(' ', '', $cash['last_names'])}}</span>
                        <span style="display:block;">Id cierre: {{$cash['id']}}</span>
                    </div>

            </div>
        </div>
        <!--End Invoice Mid-->

        <div id="bot">
            <p style="text-align:left;">Movimientos de caja:</p>
            <table id="table">
                <thead>


                    <tr class="tabletitle">
                        <td class="item">
                            <h2>Fecha</h2>
                        </td>
                        <td class="Hours">
                            <h2>Descripción</h2>
                        </td>
                        <td class="Rate">
                            <h2>Total</h2>
                        </td>
                     
                </thead>
                <tbody>
                    @foreach ($mov as $dt)
                    
                    <tr class="service">
                        <td class="tableitem">
                            <p class="itemtext"> {{ $dt['created'] }}</p>
                        </td>

                        <td class="tableitem">
                            <p class="itemtext"> {{ $dt['description'] }}</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext"> ${{ $dt['total'] }}</p>
                        </td>
                    </tr>
                  
                    @endforeach
                </tbody>
            </table>
            <span style=" margin-top:10px; font-size: .6em;text-align:left;display:block;">Total: ${{$total_mov}} </span>

            <p style="text-align:left;">Desglose de cierre de caja:</p>
            <table id="table">
                <thead>
                    <tr class="tabletitle">
                        <td class="item">
                            <h2>Denominación</h2>
                        </td>
                        <td class="Hours">
                            <h2>Cantidad</h2>
                        </td>
                        <td class="Rate">
                            <h2>Valor</h2>
                        </td>
                </thead>
                <tbody>
                    @foreach ($split as $dt)
                    <tr class="service">
                        <td class="tableitem">
                            <p class="itemtext"> {{ $dt['amount'] }}</p>
                        </td>

                        <td class="tableitem">
                            <p class="itemtext"> {{ $dt['quantity'] }}</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext"> ${{ $dt['total'] }}</p>
                        </td>

                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <p style="text-align:left;">Detalle de formas de pago:</p>

        <span style=" margin-top:10px; font-size: .6em;text-align:left;display:block;">Efectivo en caja: {{$total_cash}} </span>
        <span style=" font-size: .6em;text-align:left;display:block;margin-top:5px;">EFE x VTA: {{$total_invoice}} </span>
        <!--End Table-->



    </div>

    <!--End InvoiceBot-->
    </div>
    <!--End Invoice-->

</body>

</html>