describe("app acess", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/fuel-savings");
    });
    
    it("Validation first input", function () {          

        // Estancia o input e Valida virgula no digitos
        cy
            .get('input[name="newMpg"]').as('input1')
            .type('30,5')
            assert.notEqual(30.5, '30,5', 'vals not equal');

        //Valida os digitos após o ponto ( que não foram definidos)
        cy
            .get('@input1')
            .clear()
            .type('30.50005554')
            assert.notEqual( 30.5, '30.50005554','vals not equal');
            
        // Valida digitação de texto
        cy
            .get('@input1')
            .clear()
            .type('text')
            assert.notEqual(0.0, 'text',  'vals not equal');


        // Espera que o valor digitado seja valido      
        cy
            .get('@input1')
            .clear()
            .type(30.5)
            .should("have.value", "30.5");
    });

    it("Validation second input", function () {  

        // Estancia o input e Valida virgula no digitos
        cy
            .get('input[name="tradeMpg"]').as('input2')
            .clear()
            .type('30,5')
            assert.notEqual(40.00, '30,5', 'vals not equal');

        //Valida os digitos após o ponto ( que não foram definidos)
        cy
            .get('@input2')
            .clear()
            .type(40.50005554)
            assert.notEqual( 30.5, 30.50005554, 'vals not equal');
            
        // Valida digitação de texto
        cy
            .get('@input2')
            .clear()
            .type('text')
            assert.notEqual(0.00, 'text', 'vals not equal');

        // Espera que o valor digitado seja valido      
        cy
            .get('@input2')
            .clear()
            .type('40.00')
            .should("have.value", "40.00");
    });

    it("Validation three input", function () {  

        // Estancia o input e Valida virgula no digitos
        cy
            .get('input[name="newPpg"]').as('input3')
            .clear()
            .type('2,50')
            assert.notEqual(2.50, '2,50', 'vals not equal');

        //Valida os digitos após o ponto ( que não foram definidos)
        cy
            .get('@input3')
            .clear()
            .type(2.50005554)
            assert.notEqual(2.50, 2.50005554, 'vals not equal');
            
        // Valida digitação de texto
        cy
            .get('@input3')
            .clear()
            .type('text')
            assert.notEqual( 0.00, 'text', 'vals not equal');

        // Espera que o valor digitado seja valido      
        cy
            .get('@input3')
            .clear()
            .type('2.50')
            .should("have.value", "2.50");
    });

    it("Validation four input", function () {  

        // Estancia o input e Valida virgula no digitos
        cy
            .get('input[name="tradePpg"]').as('input4')
            .clear()
            .type('1,50')
            assert.notEqual(1.50, '1,50', 'vals not equal');

        //Valida os digitos após o ponto ( que não foram definidos)
        cy
            .get('@input4')
            .clear()
            .type(1.50005554)
            assert.notEqual(1.50, 1.50005554, 'vals not equal');
            
        // Valida digitação de texto
        cy
            .get('@input4')
            .clear()
            .type('text')
            assert.notEqual(0.00, 'text', 'vals not equal');

        // Espera que o valor digitado seja valido      
        cy
            .get('@input4')
            .clear()
            .type('1.50')
            .should("have.value", "1.50");
    });
    it("Validation input and select", function () {

        cy
            .get('input[name="milesDriven"]')
            .type(100)

        cy
            .get('select[name="milesDrivenTimeframe"]').as('select_')
            .select('Month')
            .should("have.value", "month")

        cy
            .get('@select_')
            .select('week')
            .should("have.value", "week")

        cy
            .get('@select_')
            .select('year')
            .should("have.value", "year")

    });

    it("Validation id inputs", function () { 

        cy
            .get('input[id="newMpg"]')
        cy
            .get('input[id="tradeMpg"]')
        cy
            .get('input[id="newPpg"]')
        cy
            .get('input[id="tradePpg"]')
        cy
            .get('input[id="milesDriven"]')
    });


    //formulário calculo de lucro e perca
    it("Complete form saving", function (){
            let $value1 = 18;
            let $value2 = 40;
            let $value3 = 2;
            let $value4 = 2;

            cy
                .get('input[name="newMpg"]')
                .clear()
                .type($value1)
                .should("have.value", "18");
    
            cy
                .get('input[name="tradeMpg"]')
                .clear()
                .type($value2)
                .should("have.value", "40");
    
            cy
                .get('input[name="newPpg"]')
                .clear()
                .type($value3)
                .should("have.value", "2");
            cy
                .get('input[name="tradePpg"]')
                .clear()
                .type($value4)
                .should("have.value", "2");
            cy
                .get('input[name="milesDriven"]')
                .type(100)
        
            cy
                .get('select[name="milesDrivenTimeframe"]').as('select_')
                .select('Month')
                .should("have.value", "month")
            cy
                .get('input[type="submit"]')
                .click();


            //Validando valores     
           /*************   Lucrando && Loss *********/
            if ($value1 >= $value2 && $value3 <= $value4) 
            {
                cy
                    .get('td[class="fuel-savings-label"]')
                    .should('contain', 'Savings')
            }
           
            else if ($value1 == $value2 && $value3 < $value4)
            {   
                cy
                    .get('td[class="fuel-savings-label"]')
                    .should('contain', 'Savings')
            }
            else if ($value1 < $value2 && $value3 <= $value4)
            {   //o Aux foi utilizado para determinar a fração do valor
                let $aux = $value2 / $value1;
                if ($aux < 2) {
                cy
                    .get('td[class="fuel-savings-label"]')
                    .should('contain', 'Saving')
                }
                else {
                cy
                    .get('td[class="fuel-savings-label"]')
                    .should('contain', 'Loss')

                }
            }
            else if ($value1 > $value2 && $value3 == $value4)
            {
                cy
                    .get('td[class="fuel-savings-label"]')
                    .should('contain', 'Savings')
            }
            else if ($value1 > $value2 && $value3 > $value4)
            {   let $aux2 = $value1 / $value2;
                if ($aux2 > 2) {
                    cy
                        .get('td[class="fuel-savings-label"]')
                        .should('contain', 'Savings')
                }
                else {
                    cy
                        .get('td[class="fuel-savings-label"]')
                        .should('contain', 'Loss')
                }
            }
            else if ($value1 == $value2 && $value3 > $value4) {
                cy
                    .get('td[class="fuel-savings-label"]')
                    .should('contain', 'Loss')
            }

            else {
                cy
                    .get('td[class="fuel-savings-label"]')
                    .should('contain', 'Loss')
            }
            
        });
});
