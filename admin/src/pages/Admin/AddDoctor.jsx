import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";


const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, atoken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const inputClass = "w-full border border-[#d6e2dd] rounded-xl bg-[#fbfdfc] px-4 py-2.5 outline-none focus:border-[#0f766e] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] transition-all text-sm";
  const labelClass = "text-sm font-semibold text-[#183a34] mb-1.5 block";

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <div className='mb-5'>
        <p className='admin-eyebrow'>Doctor Management</p>
        <h1 className="text-3xl font-semibold text-[#183a34] mt-1">Add New Doctor</h1>
      </div>

      <div className="bg-white border border-[#dfeae5] rounded-2xl shadow-sm px-8 py-8 w-full max-w-4xl max-h-[80vh] overflow-y-scroll">

        {/* Photo Upload */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-[#e8efec]">
          <label htmlFor="doc-img" className="cursor-pointer group">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#e6f4f1] border-2 border-dashed border-[#b7ded9] group-hover:border-[#0f766e] transition-colors flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
            </div>
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <div>
            <p className="font-semibold text-[#183a34]">Doctor Photo</p>
            <p className="text-sm text-gray-500 mt-1">Upload a clear, professional photo</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Left column */}
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div>
              <label className={labelClass}>Doctor Name</label>
              <input onChange={(e) => setName(e.target.value)} value={name} className={inputClass} type="text" placeholder="Dr. Full Name" required />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className={inputClass} type="email" placeholder="doctor@clinic.com" required />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className={inputClass} type="password" placeholder="Secure password" required />
            </div>
            <div>
              <label className={labelClass}>Experience</label>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className={inputClass} id="experience">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={`${n} year`}>{n} Year{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Consultation Fee ($)</label>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className={inputClass} type="number" placeholder="0" required />
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div>
              <label className={labelClass}>Speciality</label>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className={inputClass}>
                <option value="General physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Education / Degree</label>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className={inputClass} type="text" placeholder="MBBS, MD..." required />
            </div>
            <div>
              <label className={labelClass}>Clinic Address</label>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className={inputClass + ' mb-2'} type="text" placeholder="Address line 1" required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className={inputClass} type="text" placeholder="Address line 2" required />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className={labelClass}>About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full border border-[#d6e2dd] rounded-xl bg-[#fbfdfc] px-4 py-3 outline-none focus:border-[#0f766e] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] transition-all text-sm resize-none"
            placeholder="Write a short professional bio..."
            rows={4}
            required
          />
        </div>

        <button type="submit" className="bg-[#0f766e] text-white px-10 py-3 mt-6 rounded-full font-semibold hover:bg-[#0b5f59] hover:shadow-md transition-all">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
