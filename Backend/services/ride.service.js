const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Invalid pickup or destination address');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };


    const distanceInMeters = parseInt(distanceTime.distance.match(/\d+/)?.[0] || "0", 10);
    const durationInSeconds = parseInt(distanceTime.duration.match(/\d+/)?.[0] || "0", 10);
    const distance = distanceInMeters / 1000;
    const duration = durationInSeconds / 60;


    const fare = {
        auto: Math.round(baseFare.auto + ((distance) * perKmRate.auto) + ((duration) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distance) * perKmRate.car) + ((duration) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distance) * perKmRate.motorcycle) + ((duration) * perMinuteRate.motorcycle))
    };

    return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('Invalid ride details');
    }

    const fare = await getFare(pickup, destination);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });    
    return ride;
}

module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Invalid ride id');
    }
    
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'accepted',
            captain: captain?._id
        },
        { new: true }
    )
  

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Invalid ride id or otp');
    }

    const ride = await rideModel.findOne({ _id: rideId}).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found or you are not assigned to this ride');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride is not accepted yet');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'ongoing'
        },
        { new: true }
    );

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });

    return ride;
} 

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Invalid ride id');
    }

    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found or you are not assigned to this ride');
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not ongoing yet');
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'completed'
        },
        { new: true }
    );

    return ride;
}
    



