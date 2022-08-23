//"https://apisandbox.cieloecommerce.cielo.com.br/1/sales"
//merchantid: "b3fd05f7-f922-46b2-b7d7-bb039b1156ce"
//merchantkey: "JOPMPESXEDUIDRWYJSSNBNSHNBLEVUJZAWZZXEII"
//
// XXXX.XXXX.XXXX.XXX0
// XXXX.XXXX.XXXX.XXX1
// XXXX.XXXX.XXXX.XXX4	Autorizado	4/6	Operação realizada com sucesso

// XXXX.XXXX.XXXX.XXX2	Não Autorizado	05	Não Autorizada
// XXXX.XXXX.XXXX.XXX3	Não Autorizado	57	Cartão Expirado
// XXXX.XXXX.XXXX.XXX5	Não Autorizado	78	Cartão Bloqueado
// XXXX.XXXX.XXXX.XXX6	Não Autorizado	99	Time Out
// XXXX.XXXX.XXXX.XXX7	Não Autorizado	77	Cartão Cancelado
// XXXX.XXXX.XXXX.XXX8	Não Autorizado	70	Problemas com o Cartão de Crédito
// XXXX.XXXX.XXXX.XXX9	Autorização Aleatória	4 a 99	Operation Successful / Time Out

// O cartão de teste 4024007153763190, por exemplo, irá simular o status autorizado.

var numCartao = document.querySelector("#cardnumber");
var expiracao = document.querySelector('#cardexpiration');
var cvv = document.querySelector("#cardcvc");
var bandeira = document.querySelector("#brand");
var valor = document.querySelector("#valor");
var pagar = document.querySelector('.button-cta');


var dados = {
    MerchantOrderId: "2014111701",
    Customer: {
        Name: "Comprador Teste",
        Identity: "11225468954",
        IdentityType: "CPF",
        Email: "compradorteste@teste.com",
        Birthdate: "1991-01-02",
        Address: {
            Street: "Rua Teste",
            Number: "123",
            Complement: "AP 123",
            ZipCode: "12345987",
            City: "Rio de Janeiro",
            State: "RJ",
            Country: "BRA"
        },
        DeliveryAddress: {
            Street: "Rua Teste",
            Number: "123",
            Complement: "AP 123",
            ZipCode: "12345987",
            City: "Rio de Janeiro",
            State: "RJ",
            Country: "BRA"
        }
    },
    Payment: {
        Type: "CreditCard",
        Amount: 16750,
        Currency: "BRL",
        Country: "BRA",
        Provider: "Simulado",
        ServiceTaxAmount: 0,
        Installments: 1,
        Interest: "ByMerchant",
        Capture: true,
        Authenticate: false,
        Recurrent: false,
        SoftDescriptor: "123456789ABCD",
        CreditCard: {
            CardNumber: "4024007197692931",
            Holder: "Teste Holder",
            ExpirationDate: "12/2021",
            SecurityCode: "123",
            SaveCard: "false",
            Brand: "Visa"
        }
    }
}

pagar.addEventListener('click', () => {
    dados.Payment.CreditCard.CardNumber = numCartao.value
    dados.Payment.CreditCard.ExpirationDate = expiracao.value
    dados.Payment.CreditCard.SecurityCode = cvv.value
    dados.Payment.CreditCard.Brand = bandeira.value;
    comprar()
});

function comprar() {
    fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "merchantid": "b3fd05f7-f922-46b2-b7d7-bb039b1156ce",
            "merchantkey": "JOPMPESXEDUIDRWYJSSNBNSHNBLEVUJZAWZZXEII"
        },
        body: JSON.stringify(dados)
    }).then(response => response.json()).then(resultado => console.log(resultado));
}