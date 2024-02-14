/// <reference types = "Cypress" />

describe('Teste end-to-end para realizar pedido na loja', () => {

    it('Acesso, Pesquisa, Adição ao carrinho, Preenchimento de Formulário, Finalização de Pedido', () => {
        cy.visit('https://shop.lm.mentorama.com.br/');

// Clicar no ícone de Pesquisa(Lupa) no header da página
        cy.get('a[class="quick_search icon popup-1 search-header_icon"]').click();

// Digitar o termo "Camisa" no campo de busca e pressionar o botão Enter        
        cy.get('#woocommerce-product-search-field-1').type("camisa{enter}");
        cy.wait(2000);

// Clicar em determinado produto e esperar carregar a página
        cy.get('.post-3675').click();
        cy.wait(2000);

// Escolher variação do produto
        cy.get('.variations_form > [data-product_id="3675"] > .variations > tbody > tr > .value > .variable-items-wrapper > .button-variable-item-pequeno').click();

// Clicar no botão Comprar
        cy.get('button[class="single_add_to_cart_button button alt wp-element-button"]').click();
        cy.wait(1000);

// Clicar no botão Ver Carrinho e esperar carregar a página
        cy.get('a[class="button wc-forward wp-element-button"]').click();
        cy.wait(1000);

// Clicar no botão Continuar para a finalização da compra
        cy.get('a[class="checkout-button button alt wc-forward wp-element-button"]').click();
        cy.wait(1000);

// Preenchimento do formulário de faturamento de pedido

        cy.get('label[for="billing_first_name"]').type('Tester');

        cy.get('label[for="billing_last_name"]').type('da Silva');

        cy.get('#select2-billing_country-container').click();
        cy.get('.select2-results__option').contains('Brasil').click()

        cy.get('label[for="billing_address_1"]').type('Rua Teste, Bairro Teste');

        cy.get('label[for="billing_address_2"]').type('Número 1234');

        cy.get('label[for="billing_city"]').type('Testerfield');

        cy.get('span[id="select2-billing_state-container"]').click();
        cy.get('ul[id="select2-billing_state-results"]').contains('Santa Catarina').click();

        cy.get('label[for="billing_postcode"]').type('12345678');

        cy.get('label[for="billing_phone"]').type('00 123444567');

        cy.get('label[for="billing_email"]').type('abc@abc.com');

// Condicional para escolher a opção "pagamento na entrega" se a opção estiver disponível
        cy.get('div[id="payment"]').then(($paymentField) => {
                if ($paymentField.text().includes('Pagamento na entrega')) {
                   cy.get('input[id="payment_method_cod"]').check()     
                } 
                }
        );

        cy.get('input[name="terms"]').check();

        cy.get('button[name="woocommerce_checkout_place_order"]').click();
        cy.wait(2000);
        
//Checagem de pedido recebido
        cy.get('h1[class="page-title"]').should('have.text','Pedido recebido');
        cy.get('.woocommerce-order-details').should('contain.text','Detalhes do pedido');

    })    
}

)
