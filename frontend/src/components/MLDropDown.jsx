import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  LogOut,
  Settings,
  Wheat,
  Archive,
  MessageSquareText,
  BrainCircuit,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import YardIcon from "@mui/icons-material/Yard";

function MLDropDown({ isOpen, onClose }) {
  const { logout, user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className=" p-1 absolute right-0 mt-2  sm:w-80 bg-white rounded-lg shadow-xl z-50 ">
      <div className="p-1 m-1 border-2 border-gray-200 rounded-lg">
        <Link
          to="/chat"
          onClick={onClose}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <MessageSquareText className="h-5 w-5 text-green-600" />
          <span>AI ChatBot</span>
        </Link>
      </div>
      <div className="p-1 m-1 border-2 border-gray-200 rounded-lg">
        <Link
          to="/ml-models"
          onClick={onClose}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <BrainCircuit className="text-green-600 h-5 w-5" />
          <span>ML Models</span>
        </Link>
      </div>
    </div>
  );
}

export default MLDropDown;
