
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sendEmail = require('../utils/emailservice');

const getAllServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            include: {
                customer: true // Include customer details in the response
            }
        });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve services', error });
    }
};

const selectService = async (req,res) => {
    const {serviceName,customerId}=req.body;
    try {
        const service = await prisma.service.create({
            data: {
                name: serviceName,
                customerId: parseInt(customerId)
            }
        });
       // console.log(customerId);
        //const customer = await prisma.customer.findUnique({ where: { id: customerId } });
        //await sendEmail(customer.email, 'Service Selection', `You have selected the service: ${serviceName}`);

        res.status(201).json({ message: 'Service selected successfully', service });
    } catch (error) {
        res.status(500).json({ message: 'Service selection failed', error });
    }
};

const activateService = async (req, res) => {
    const { serviceId } = req.body;

    try {
        const service = await prisma.service.update({
            where: { id: parseInt(serviceId) },
            data: { isActive: true }
        });

        const customer = await prisma.customer.findUnique({ where: { id: service.customerId } });
        await sendEmail(customer.email, 'Service Activation', 'Your service has been successfully activated.');

        res.status(200).json({ message: 'Service activated successfully', service });
    } catch (error) {
        res.status(500).json({ message: 'Service activation failed', error });
    }
};

module.exports = { getAllServices, selectService, activateService };

