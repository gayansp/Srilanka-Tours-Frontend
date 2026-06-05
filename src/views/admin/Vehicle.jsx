import { useEffect, useState } from "react";
import { Modal } from "../../components/admin/Model";
import toast, { LoaderIcon } from "react-hot-toast";
import api from "../../api/axios";
import { Trash2 } from "lucide-react";
import ErrorPage from "../ErrorPage";
import { BeatLoader, RingLoader } from "react-spinners";


const Vehicle = () => {

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleName, setSelectedVehicleName] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [isError,setIsError] = useState(false);


  const vehicleTypes = [
    { name: "Car", image: "/images/car.png" },
    { name: "Van", image: "/images/van.png" },
    { name: "SUV", image: "/images/SUV.png" },
  ]

  const fetchVehicles = async () => {
    try {
        setIsLoading(true);
        const response = await api.get("vehicles/get");
        setVehicles(response.data.vehicles);

    } catch (error) {
        console.error("Error fetching vehicles:", error);
        setIsError(true);
    } finally {
        setIsLoading(false);
    }
  }

  const addVehicle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        if(!selectedVehicleName || !selectedVehicleType) {
            toast.error("Please fill all fields");
            return;
        }

        const response = await api.post("vehicles/add", {
            name: selectedVehicleName,
            type: selectedVehicleType
        });
        toast.success("Vehicle added successfully");
        setIsModalOpen(false);
        fetchVehicles();
    } catch (error) {
        toast.error("Error adding vehicle: " + (error.response?.data?.message || error.message));
        setIsError(true);
    } finally {
        setIsSubmitting(false);
    }
  }

  const deleteVehicle = async (id) => {
    try {
        await api.delete(`vehicles/delete/${id}`);
        toast.success("Vehicle deleted successfully");
        fetchVehicles();
    } catch (error) {
        toast.error("Error deleting vehicle: " + (error.response?.data?.message || error.message));
        setIsError(true);
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, [])


  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
        <BeatLoader color="red" />
    </div>
  }

  if (isError) {
    return <ErrorPage/>;
  }

  return (
    <div className="p-6">
        <div className="flex justify-end mb-6">
            <button className="bg-red-200 p-2 rounded-md text-red-600 opacity-90 font-bold" onClick={() => setIsModalOpen(true)}>
                Vehicle Add
            </button>
        </div>

        <Modal title="Add New Vehicle" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
            <form className="space-y-4" onSubmit={addVehicle}>
                <input required type="text" placeholder="Vehicle Name" value={selectedVehicleName} onChange={(e) => setSelectedVehicleName(e.target.value)} />
                <p>Select Vehicle Type</p>
                <div className="grid grid-cols-3 gap-4">
                    
                    {
                    vehicleTypes.map((type) => (
                        <div key={type.name} className={`flex items-center gap-4 bg-red-200 justify-center cursor-pointer ${selectedVehicleType === type.name ? 'border-2 border-red-500' : ''}`} onClick={() => setSelectedVehicleType(type.name)}>
                            <img className="w-10 " src={type.image} alt={type.name} />
                            <p>{type.name}</p>

                             
                        </div>
                    ))
                }

                <button className="bg-blue-500 text-white p-2 rounded-md font-bold cursor-pointer" type="submit">
                     Add Vehicle
                </button>
                </div>

               
            </form>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {
                vehicles.map((vehicle) => (
                    <div key={vehicle._id} className="p-4 border rounded-md relative">
                        <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                        {
                            vehicleTypes.find(type => type.name === vehicle.type)?.image && (
                                <img className="w-20 mt-2" src={vehicleTypes.find(type => type.name === vehicle.type).image} alt={vehicle.type} />
                            )
                        }
                        <button onClick={() => deleteVehicle(vehicle._id)} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))
            }
        </div>

       
    </div>
  )
}

export default Vehicle