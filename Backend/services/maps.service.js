const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey =  process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);      
    }
}

module.exports.getDistanceTime = async (origin, destination) => {

    if(!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey =  process.env.GOOGLE_MAP_API;

    if (!apiKey) {
        throw new Error('Google Maps API key is missing');
    }
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

    try {
        const response = await axios.post(
            url,
            {
                origin: { address: origin },
                destination: { address: destination },
                travelMode: "DRIVE",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
                },
            }
        );

        if (response.data.routes && response.data.routes.length > 0) {
            return {
                duration: response.data.routes[0].duration,
                distance: response.data.routes[0].distanceMeters + " meters",
            };
        } else {
            throw new Error("No routes found");
        }
    } catch (error) {
        console.error(error);    
        throw error;  
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {

    if(!input) {
        throw new Error('Query is required');
    }

    const apiKey =  process.env.GOOGLE_MAP_API;

    if (!apiKey) {
        throw new Error('Google Maps API key is missing');
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;


    try {
        const response = await axios.get(url);

        if(response.data.status === 'OK') {

            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);    
        throw error;  
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });
    return captains;
}