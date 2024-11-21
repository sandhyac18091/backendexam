import express, { json } from 'express'; 
import { vehicleRoute } from './Adminrouter.js'; 


const vehicle = express();

vehicle.use(json());
vehicle.use(cookieParser());
vehicle.use('/', vehicleRoute); 

const port = 5000;

vehicle.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
