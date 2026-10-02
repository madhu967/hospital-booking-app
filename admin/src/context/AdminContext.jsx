import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "Admin");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [dashboard, setDashboard] = useState({ stats: {}, recentAppointments: [] });
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { atoken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashboard = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", { headers: { atoken } });
      if (data.success) setDashboard({ stats: data.stats, recentAppointments: data.recentAppointments });
      else toast.error(data.message);
    } catch (error) { toast.error(error.message); }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-appointments", { headers: { atoken } });
      if (data.success) setAppointments(data.appointments);
      else toast.error(data.message);
    } catch (error) { toast.error(error.message); }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-users", { headers: { atoken } });
      if (data.success) setUsers(data.users);
      else toast.error(data.message);
    } catch (error) { toast.error(error.message); }
  };

  const changeAvailabilty = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  };
  const value = {
    atoken,
    setAToken: (token) => { setAToken(token); setRole(localStorage.getItem("role") || "Admin"); },
    role,
    backendUrl,
    getAllDoctors,
    doctors,changeAvailabilty,dashboard,getDashboard,appointments,getAllAppointments,users,getAllUsers
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
