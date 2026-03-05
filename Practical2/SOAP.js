const express = require("express");
const app = express();

app.get("/add/:num_1/:num_2", function(req, res) {
    const num1 = parseInt(req.params.num_1);
    const num2 = parseInt(req.params.num_2);
    
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers" });
    }
    
    const result = num1 + num2;
    res.json({ result: result });
});

app.get("/sub/:num_1/:num_2", function(req, res) {
    const num1 = parseInt(req.params.num_1);
    const num2 = parseInt(req.params.num_2);
    
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers" });
    }
    
    const result = num1 - num2;
    res.json({ result: result });
});

app.get("/mult/:num_1/:num_2", function(req, res) {
    const num1 = parseInt(req.params.num_1);
    const num2 = parseInt(req.params.num_2);
    
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers" });
    }
    
    const result = num1 * num2;
    res.json({ result: result });
});

app.get("/div/:num_1/:num_2", function(req, res) {
    const num1 = parseInt(req.params.num_1);
    const num2 = parseInt(req.params.num_2);
    
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers" });
    }
    
    if (num2 === 0) {
        return res.status(400).json({ error: "Division by zero" });
    }
    
    const result = num1 / num2;
    res.json({ result: result });
});

const PORT = 3300;
app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});