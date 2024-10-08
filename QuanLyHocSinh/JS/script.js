// Load header
fetch('../User-interface/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// Load Menu
fetch('../User-interface/FunctionMenu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('functionMenu').innerHTML = data;
    });

// Load footer
fetch('../User-interface/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });
