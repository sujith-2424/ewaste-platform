const Center = require('../models/Center');

const assignOptimalCenter = async (coordinates, wasteType) => {
    const centers = await Center.aggregate([
        {
            $geoNear: {
                near: {type: 'Point', coordinates},
                distanceField: 'distance',
                spherical: true,
                query: {accepted_materials: wasteType}
            }
        },
        { $limit: 5}
    ]);

    const available = centers.find( c => c.currentLoad < c.capacity);
    return available || null;
};

module.exports = { assignOptimalCenter};