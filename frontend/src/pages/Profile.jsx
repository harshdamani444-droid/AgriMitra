import { useDispatch, useSelector } from "react-redux";
import { Camera, Save } from "lucide-react";
import { useState } from "react";
import { updateAvatar } from "../redux/slices/authSlice";

const Profile = () => {
  const profile = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(
    profile?.avatar ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  );
  const [preview, setPreview] = useState(avatar);
  const [formData, setFormData] = useState({
    avatar: null,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        avatar: file,
      });
      console.log(formData);
    }
  };
  const handleSave = () => {
    dispatch(updateAvatar(formData));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48 bg-green-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={preview}
                  alt="Profile Avatar"
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                  <Camera className="h-5 w-5 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="pt-20 px-8 pb-8">
            <h1 className="text-2xl font-bold  mb-6">{profile?.name}</h1>
            <button
              onClick={handleSave}
              className="flex items-center justify-center w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              <Save className="h-5 w-5 mr-2" />
              Update Avatar
            </button>
          </div>

          <div className="px-8 pb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{profile?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1">{profile?.phoneNumber || "Not provided"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Role</h3>
                <p className="mt-1">{profile?.role || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
