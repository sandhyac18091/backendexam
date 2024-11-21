import router from 'express';
import mongoose from 'mongoose';

const vehicleRoute=router();

mongoose.connect('mongodb://localhost27017/Veicle')


const vehicleSchema=new mongoose.Schema({
    vehicleno:String,
    vehicletype:String,
    vehiclename:String,
    serviceno:String,
})
const vehicles=mongoose.model('Vehicledetails',vehicleSchema)

vehicleRoute.post('/addvehicle',async(req,res)=>{
    const{
        VehicleNo,
        VehicleType,
        VehicleName,
        ServiceNo,
        }=req.body
    const existinguser= await vehicles.findOne({vehicleno:VehicleNo})

    if(existinguser){
        res.status(403).json({message:"Already added vehicle"})
        console.log('Already added vehicle');
        
    }else{
        const newuser=new vehicles({
            vehicleno:VehicleNo,
            vehicletype:VehicleType,
            vehiclename:VehicleName,
            serviceno:ServiceNo,
        })
        await newuser.save()
        res.status(200).json({message:"successfully Added vehicle"})
        console.log("Successfully added vehicle");
        console.log(newuser);
        
        
    }
});
vehicleRoute.put('/update/:no', async (req, res) => {
    try {
        const updatedVehicle = await vehicles.findOne(req.params.id, req.body, { new: true });
        if (!updatedVehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
vehicleRoute.delete('/:serviceNo', async (req, res) => {
    try {
        const { serviceNo } = req.params;

        const vehicle = await vehicles.findOne({ serviceNo: serviceNo });

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle', error });
    }
});

export{vehicleRoute}

