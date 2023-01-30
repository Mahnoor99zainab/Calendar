const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
let corsOption = {
    origin: '*'
}

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const eventRoutes = require("./routes/eventRouter");
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
    res.status(200).send({
        event_endpoints: {
            "insert event[post]": "/api/events/",
            "get events[get]": "/api/events/",        
            "update event[put]": "/api/events/:id",        
            "delete event[delete]": "/api/events/:id",        
        }
    });
});
app.get('*', function(req, res) {
    res.redirect('/');
});
// port
const PORT = process.env.PORT || 3000;
// starting server
app.listen(PORT, ()=>console.log("Server is listening at port "+ PORT));