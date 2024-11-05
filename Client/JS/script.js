// Load header
fetch('/User/Header-Footer/Header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// Load Menu
fetch('/User/Header-Footer/FunctionMenu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('functionMenu').innerHTML = data;
    });

// Load footer
fetch('/User/Header-Footer/Footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });
