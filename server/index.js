const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:8080', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
app.use(express.static("public"));
app.use(bodyParser.json());

// Connect to MongoDB with Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/iotDB", { useNewUrlParser: true });

// Create IoT device Schema
const deviceSchema = new mongoose.Schema({
    name: String,
    serialNo: String,
    location: String,
    deviceType: {
        type: String,
        enum: {
            values: ['seismic', 'energy', 'waterflow'],
            message: '{VALUE} is not supported.',
        }
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive', 'decommissioned'],
            message: '{VALUE} is not supported.',
        }
    },
});

// Create new Model (Collection) in iotDB with Mongoose
const Device = mongoose.model("Device", deviceSchema);

// Display all devices
app.get('/posts', (req, res) => {

    // get all devices from iotDB
    Device.find({}).then(posts => {
        //console.log("Success!\n" + posts);
        res.json(posts);
    }).catch(error => {
        console.log("Error!" + error);
    });

})

// Get device by id
app.get('/:id', (req, res)=>{
    const id = req.params.id;

    Device.findById(id).then(data=>{
        res.json(data);
    }).catch(error=>{
        console.log("Error!\n" + error);
    })
})

// Remove specific device based on id
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    Device.findByIdAndRemove(id).then(data => {
        console.log(data);
        res.json(data);
    }).catch(error => {
        console.log(error);
    })
})

// Add new device
app.post('/create', (req, res) => {

    // Create Dummy Document
    const newDevice = new Device({
        name: req.body.name,
        serialNo: req.body.serialNo,
        location: req.body.location,
        deviceType: req.body.deviceType,
        status: req.body.status
    });

    newDevice.save().then(data=>{
        res.json(data);
    })
})

// Update device
app.post('/edit/:id', (req, res)=>{
    console.log(req.body.status);
    Device.findByIdAndUpdate(req.params.id, 
        {status: req.body.status,
        location: req.body.location}).then(data=>{
            res.json(data);
        }).catch(error=>{
            res.json(error);
            console.log("Error!" + error);
        });
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000..');
})