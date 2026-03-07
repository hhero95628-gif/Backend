const fs = require("fs");
const path = require("path");
const sendWhatsApp = require("../utils/whatsapp");

const serviceFile = path.join(__dirname, "../data/service.json");
const queryFile = path.join(__dirname, "../data/query.json");

const ADMIN_NUMBER = "918299487208"; // change to admin number


exports.addService = async (req, res) => {

  const { 
    name, 
    phone, 
    city, 
    address, 
    service, 
    notes,
    patientName,
    age,
    weight,
    gender,
    condition
  } = req.body;

  if (!name || !phone || !city || !address) {
    return res.status(400).json({
      message: "Required fields missing"
    });
  }

  const data = {
    name,
    phone,
    city,
    address,
    service: service || null,
    notes: notes || "",

    patientName: patientName || null,
    age: age || null,
    weight: weight || null,
    gender: gender || null,
    condition: condition || null,

    createdAt: new Date()
  };


  const message = `
Care Assessment Form

Name: ${name}
Phone: ${phone}
City: ${city}
Address: ${address}

Patient Name: ${patientName || "-"}
Age: ${age || "-"}
Weight: ${weight || "-"}
Gender: ${gender || "-"}

Condition:
${condition || "-"}

Service Required:
${service || "General Query"}

Notes:
${notes || "-"}
`;


  if (service) {

    const fileData = JSON.parse(fs.readFileSync(serviceFile));
    fileData.services.push(data);
    fs.writeFileSync(serviceFile, JSON.stringify(fileData, null, 2));

    await sendWhatsApp(ADMIN_NUMBER, message);

    return res.json({
      message: "Service request saved",
      data
    });

  } else {

    const fileData = JSON.parse(fs.readFileSync(queryFile));
    fileData.queries.push(data);
    fs.writeFileSync(queryFile, JSON.stringify(fileData, null, 2));

    await sendWhatsApp(ADMIN_NUMBER, message);

    return res.json({
      message: "Query saved",
      data
    });
  }
};




exports.getServices = (req, res) => {

  const fileData = JSON.parse(fs.readFileSync(serviceFile));

  res.json({
    total: fileData.services.length,
    services: fileData.services
  });

};



exports.getQueries = (req, res) => {

  const fileData = JSON.parse(fs.readFileSync(queryFile));

  res.json({
    total: fileData.queries.length,
    queries: fileData.queries
  });

};



exports.getAllData = (req, res) => {

  const serviceData = JSON.parse(fs.readFileSync(serviceFile));
  const queryData = JSON.parse(fs.readFileSync(queryFile));

  res.json({
    totalServices: serviceData.services.length,
    totalQueries: queryData.queries.length,
    services: serviceData.services,
    queries: queryData.queries
  });

};