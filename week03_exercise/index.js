var http = require("http");
//TODO - Use Employee Module here
var employees = require("./Employee")
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise
function sortByCharacter(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.write("<h1>Welcome to Lab Exercise 03</h1>");
        }

        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            res.write(JSON.stringify(employees, null, 2));
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            let newArr = [];
            for (employee of employees) {
                let firstName = employee.firstName;
                let lastName = employee.lastName;
                let concat = `${firstName} ${lastName}`;
                newArr.push(concat);
            }
            newArr.sort(sortByCharacter);
            res.write(JSON.stringify(newArr, null, 2));
        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
            let total = 0;
            for (employee of employees) {
                total += employee.Salary;
            }
            let newArr = {"Total": total}
            res.write(JSON.stringify(newArr, null, 2));
    }
    // res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    res.end();
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})