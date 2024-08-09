$(document).ready(function() {
    // Array to store expenses
    let expenses = [];

    // Theme toggle
    $('#theme-switch').on('change', function() {
        if ($(this).is(':checked')) {
            $('body').removeClass('light-mode').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode').addClass('light-mode');
        }
    });

    // Add expense
    $('#expense-form').on('submit', function(e) {
        e.preventDefault();

        let name = $('#expense-name').val();
        let amount = parseFloat($('#expense-amount').val());
        let category = $('#expense-category').val();

        let expense = {
            name: name,
            amount: amount,
            category: category
        };

        expenses.push(expense);

        renderExpenses();
        calculateTotals();

        $('#expense-form')[0].reset();
    });

    // Render expenses
    function renderExpenses() {
        $('#expense-items').empty();
        expenses.forEach(function(expense, index) {
            $('#expense-items').append(`
                <li class="expense-item">
                    ${expense.name} - $${expense.amount.toFixed(2)} (${expense.category})
                    <button onclick="removeExpense(${index})">Delete</button>
                </li>
            `);
        });
    }

    // Calculate totals
    function calculateTotals() {
        let totals = {};

        expenses.forEach(function(expense) {
            if (!totals[expense.category]) {
                totals[expense.category] = 0;
            }
            totals[expense.category] += expense.amount;
        });

        $('#total-expenses').empty();
        for (let category in totals) {
            $('#total-expenses').append(`
                <li>${category}: $${totals[category].toFixed(2)}</li>
            `);
        }
    }

    // Remove expense
    window.removeExpense = function(index) {
        expenses.splice(index, 1);
        renderExpenses();
        calculateTotals();
    };
});
