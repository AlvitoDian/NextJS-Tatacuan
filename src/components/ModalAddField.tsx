import { MessageSquare, Logs, Image, PaintBucket, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Button from "./Button";

export default function ModalAddField({ onClose, onAdd }) {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const fields = [
    {
      id: "bannerImage",
      label: "Add Banner Image",
      label2: "Banner Image",
      description: "Upload a banner image for your page",
      icon: <Image className="text-indigo-600" strokeWidth={2} size={20} />,
    },
    {
      id: "bgColor",
      label: "Add Background Color",
      label2: "Background Color",
      description: "Choose a background color for your page",
      icon: (
        <PaintBucket className="text-green-600" strokeWidth={2} size={20} />
      ),
    },
    {
      id: "socialMedia",
      label: "Add Social Media",
      label2: "Social Media",
      description: "Connect your social media accounts",
      icon: (
        <MessageSquare className="text-blue-600" strokeWidth={2} size={20} />
      ),
    },
    {
      id: "menu",
      label: "Add Menu",
      label2: "Menu",
      description: "Create navigation menu for your page",
      icon: <Logs className="text-amber-600" strokeWidth={2} size={20} />,
    },
  ];

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleFieldSelect = (fieldId, fieldLabel) => {
    onAdd(fieldId, fieldLabel);
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className={`py-6 px-6 bg-white rounded-xl shadow-xl w-full max-w-md transition-all duration-300 transform ${
          isVisible ? "translate-y-0 scale-100" : "-translate-y-8 scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl text-gray-800">
            Add Content Element
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={20} color="#e44b37" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            Select an element to add to your page
          </p>
        </div>

        <div className="space-y-3">
          {fields.map((field) => (
            <button
              key={field.id}
              className="flex w-full items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => handleFieldSelect(field.id, field.label2)}
            >
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-white transition-colors">
                {field.icon}
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium text-gray-800">{field.label}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {field.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleClose}
            variant="primary"
            label="Cancel"
            icon="Undo"
          />
        </div>
      </div>
    </div>
  );
}
