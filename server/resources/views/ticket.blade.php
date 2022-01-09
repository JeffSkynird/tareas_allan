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

     
        <!--End InvoiceTop-->

        <div id="mid">
            <div class="info">
              
                <div style=" display: flex;margin-top:0px;padding-top:0px;">
                    <div style="display:block;text-align:left; width: auto;">
                        <span style="display:block;">Fecha: {{$data['created_at']}}</span>
                        <span style="display:block;">Caja: Principal</span>
                        <span style="display:block;">RUC/CI: {{$data['document']!=null?$data['document']:'9999999999'}}</span>
                        <span style="display:block;">Nombre: {{$data['names']!=null?$data['names']:"Consumidor Final"}}</span>

                    </div>
                    <div style="display:block;text-align:right;height:10px;">
                        <span style="display:block;">Número: {{$data['id']}}</span>
                        <span>Usuario: {{str_replace(' ', '', $data['last_names'])}}</span>
                    </div>
                </div>

            </div>
        </div>
        <!--End Invoice Mid-->

        <div id="bot">
            <table id="table">
                <thead>


                    <tr class="tabletitle">
                        <td class="item">
                            <h2>Producto</h2>
                        </td>
                        <td class="Hours">
                            <h2>[U]  [F]</h2>
                        </td>
                        <td class="Rate">
                            <h2>P.V.P.</h2>
                        </td>
                        <td class="Rate">
                            <h2>Total</h2>
                        </td>
                </thead>

                <tbody>


                    @foreach ($body as $dt)
                    <tr class="service">
                        <td class="tableitem">
                            <p class="itemtext"> {{ $dt['name'] }}</p>
                        </td>

                        <td class="tableitem">
                            <p class="itemtext"> {{ $dt['unidad_fraccion'] }}</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext"> {{ $dt['sale_price'] }}</p>
                        </td>

                        <td class="tableitem">
                            <p class="itemtext"> {{ $dt['subtotal'] }}</p>
                        </td>

                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>



        <span style=" margin-top:10px; font-size: .6em;text-align:right;display:block;">SUB-TOTAL: {{$subtotal}} </span>
        <span style=" margin-top:10px; font-size: .6em;text-align:right;display:block;">DESCUENTO: {{$data['discount']}} </span>
        <span style=" font-size: .6em;text-align:right;display:block;margin-top:5px;">IVA 12%: {{$data['iva']}} </span>
        <span style=" font-size: .6em;text-align:right;display:block;margin-top:5px;">VALOR A PAGAR: {{$data['total']}} </span>
        <!--End Table-->



    </div>

    <!--End InvoiceBot-->
    </div>
    <!--End Invoice-->

</body>

</html>