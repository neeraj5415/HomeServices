const Service = require('../models/service.js');

exports.getServices = async (req, res) => {
    try{
        const query = req.query.q || '';
        const services = await Service.find({
            name: { $regex: query, $options: 'i'},
        });
        res.status(200).json(services);
    } catch (error){
        res.status(500).json({message: `Failed to fetch services`, error});
    }
};