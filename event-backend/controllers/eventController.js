const db = require("../models");
const apiResponse = require("../helpers/apiResponse");

const Event = db.events;

const addEvent = async (req, res) => {
    let response = {};
    try {
        const info = {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end
        };
        const event = await Event.create(info);
        response = apiResponse(true, 200, 'Inserting new event.', event);
    } catch (err) {
        response = apiResponse(false, 500, err.message, null);
    }
    res.status(200).json(response);
}

const getEvents = async (req, res) => {
    let response = {};
    try {
        const events = await Event.findAll(
            {
                attributes: ['title', 'start', 'end']
            }
        );
        response = apiResponse(true, 200, 'Getting all events.', events);
    } catch (err) {
        response = apiResponse(false, 500, err.message, null);
    }
    res.status(200).json(response);
}

const updateEvent = async (req, res) => {
    let response = {};
    try {
        const event = await Event.update(req.body, {where: { id: req.params.id}});
        response = apiResponse(true, 200, "Product updated successfully", event);
    } catch (error) {
        response = apiResponse(false, 500, error.message, null);
    }
    res.status(200).json(response);
}

const deleteEvent = async (req, res) => {
    let response = {};
    try {
        const event = await Review.destroy({where:{id: req.params.id}});;
        response = apiResponse(true, 200, "Product deleted successfully", event);
    } catch (error) {
        response = apiResponse(false, 500, error.message, null);
    }
    res.status(200).json(response);
}


module.exports = {
    addEvent,
    getEvents,
    updateEvent,
    deleteEvent
}