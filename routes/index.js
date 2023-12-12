var express = require("express");
var router = express.Router();
var connection = require("../config");
const mysql = require("mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection.query("select * from customers", (err, result) => {
    if (err) {
      console.log("Some Error in Query", err.message);
    } else {
      res.json({
        code: 200,
        message: "Success",
        data: result,
      });
    }
  });
});

router.post("/add", function (req, res, next) {
  const data = {
    customerNumber: 500,
    customerName: "Raj",
    contactLastName: "Kumar",
    contactFirstName: "Raj",
    phone: "9999999999",
    addressLine1: "Address",
    addressLine2: "Address",
    city: "City",
    state: "State",
    postalCode: 462010,
    country: "Country",
    //salesRepEmployeeNumber:100,
    creditLimit: 1000,
  };
  connection.query(
    "INSERT INTO customers SET ?",
    data,
    (err, result, field) => {
      if (err) {
        return res.json({
          code: 400,
          message: "Some Error in Query",
          data: err.message,
        });
      } else {
        return res.json({
          code: 200,
          message: "Success",
          data: result,
        });
      }
    }
  );
});

router.put("/update/:id", function (req, res, next) {
  const { contactFirstName, contactLastName } = req.body;
  const data = [contactFirstName, contactLastName, req.params.id];
  connection.query(
    "UPDATE customers SET contactFirstName=? ,contactLastName=?  WHERE customerNumber=?",
    data,
    (err, result, field) => {
      if (err) {
        return res.json({
          code: 400,
          message: "Some Error in Query",
          data: err.message,
        });
      } else {
        return res.json({
          code: 200,
          message: "Success",
        });
      }
    }
  );
});

router.delete("/delete/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    connection.query(
      "DELETE FROM customers WHERE customerNumber=?",
      id,
      (err, result, field) => {
        if (err) {
          res.json({
            code: 400,
            message: "Some Error in Query",
          });
        } else {
          res.json({
            code: 200,
            message: "Success",
            data: result,
          });
        }
      }
    );
  } catch (error) {
    res.json({
      code: 500,
      message: "Some Error in Server",
    });
  }
});

/**------------------------------50 EXCESICES WITH NODE JS-------------------------------*/

//Select only the customerName and phone columns.

router.get("/getNameAndPhone", function (req, res, next) {
  try {
    connection.query(
      "SELECT customerName,phone FROM customers",
      (err, result, field) => {
        if (err) {
          res.status(400).json({
            code: 400,
            message: "Some Error in Query",
            data: err.message,
          });
        } else {
          res.status(200).json({
            code: 200,
            message: "Success",
            data: result,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Some Error in server",
      code: 500,
      data: error.message,
    });
  }
});

router.get("/filterByState", function (req, res, next) {
  try {
    const { bodyState } = req.body;
    console.log(bodyState);
    connection.query(
      "SELECT * FROM customers WHERE state=?",
      [bodyState],
      (err, result, field) => {
        if (err) {
          return res.json({
            code: 400,
            message: "Some Error in Query",
            error: err.message,
          });
        } else {
          return res.json({
            code: 200,
            message: "Success",
            data: result,
          });
        }
      }
    );
  } catch (error) {
    return res.json({
      code: 500,
      message: "Some Error in server",
      data: error.message,
    });
  }
});

//Sort the records by customerName in ascending order AND Descending Order.

router.get("/arrangeInAscedingOrder", function (req, res, next) {
  try {
    connection.query(
      "SELECT * FROM customers ORDER BY contactFirstName DESC",
      (err, result, field) => {
        if (err) {
          return res.json({
            code: 400,
            message: "Some Error in Query",
            error: err.message,
          });
        } else {
          return res.json({
            code: 200,
            message: "Success",
            data: result,
          });
        }
      }
    );
  } catch (error) {
    return res.json({
      code: 500,
      message: "Some Error in server",
      error: error.message,
    });
  }
});

//Count the total number of customers in the table.

router.get("/countTotalCustomer", function (req, res, next) {
  try {
    connection.query(
      "SELECT COUNT(*) FROM AS total customers",
      (err, result, field) => {
        if (err) {
          return res.json({
            code: 400,
            message: "Some Error in Query",
            error: err.message,
          });
        } else {
          return res.json({
            code: 200,
            message: "Success",
            data: result,
          });
        }
      }
    );
  } catch (error) {
    res.json({
      code: 500,
      message: "Some Error in server",
      error: error.message,
    });
  }
});

//Find the customers with a credit limit greater than 500.

router.get("/findCustomerGreaterLimit", function (req, res, next) {
  const { creditLimit } = req.body;
  try {
    connection.query(
      "SELECT * FROM customers WHERE creditLimit>?",
      [creditLimit],
      (err, result, field) => {
        if (err) {
          return res.json({
            code: 400,
            message: "Some Error in Query",
            error: err.message,
          });
        } else {
          return res.json({
            code: 200,
            message: "Success",
            data: result,
          });
        }
      }
    );
  } catch (error) {
    res.json({
      code: 500,
      message: "Some Error in server",
    });
  }
});

//Update the phone number for customerNumber 500.

router.put("/updatePhoneNumber", function (req, res, next) {
  try {
    const { customerNumber, phone } = req.body;
    const data = [phone, customerNumber];
    connection.query(
      "UPDATE customers SET phone=? WHERE customerNumber=?",
      data,
      (err, result, field) => {
        if (err) {
          res.json({
            code: 400,
            message: "Some Error in Query",
            error: err.message,
          });
        } else {
          res.json({
            code: 200,
            message: "Success",
            data: result,
          });
        }
      }
    );
  } catch (error) {
    res.json({
      code: 500,
      message: "Some Error in server",
    });
  }
});

//Find the customers whose names start with 'R'.

router.get("/filterCustomerByName", function (req, res, next) {
  const { filterName } = req.body;
  try {
    connection.query(
      "SELECT * FROM customers WHERE contactFirstName LIKE ?",
      [filterName+"%"],
      (err, result, field) => {
        if (err) {
          res.json({
            code: 400,
            message: "Some Error in Query",
            error: err.message,
          });
        }else{
          res.json({
            code:200,
            message:"Success",
            data:result
          })
        }
      }
    );
  } catch (error) {
    return res.json({
      code: 500,
      message: "Some Error in server",
      error: error.message,
    });
  }
});

//Calculate the average credit limit of all customers.

router.get("/averageCreditLimit", function (req, res, next) {
  try {
    connection.query("SELECT AVG(creditLimit) as total FROM customers",(err,result,field)=>{
         if(err){
            return res.json({
               code:400,
               message:"Some Error in Query",
               error:err.message
            })
         }else{
           return res.json({
             code:200,
             message:"Success",
             data:result
           })
         }
    }) 
  } catch (error) {
      return  res.json({
        code:500,
        message:"Some Error in server",
        error:error.message
     })
  }
})


//Select distinct countries from the table.

router.get("/distinctCountry", function (req, res, next) {
  try {
    connection.query("SELECT DISTINCT country FROM customers",(err,result,field)=>{
         if(err){
            res.json({
              code:400,
              message:"Some Error in Query",
              error:err.message
            })
         }else{
           res.json({
             code:200,
             message:"Success",
             data:result
           })
         }
    })    
  } catch (error) {
    return res.json({
      code:500,
      message:"Some Error in server",
      error:error.message
    })
  }
})



module.exports = router;
