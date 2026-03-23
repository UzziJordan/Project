import React, { useState } from "react";

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);

  const tags = ["Work", "Planning", "Interview", "Lecture", "ProjectX"];
  const folders = [
    "Work Projects",
    "University Lectures",
    "Interviews 2026",
    "Personal Notes",
  ];

  // Toggle item in the list
  const toggleItem = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Handle apply button click
  const handleApply = () => {
    onApply({ tags: selectedTags, folders: selectedFolders });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    > 
      <div
        className="bg-white max-w-[50vw] rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Title */}
        <h2 className="text-center font-bold text-[22px]">Search Filter</h2>

        {/* Tags Section */}
        <div className="mt-7">
          <p className="text-[18px] font-semibold">Tags</p>
          <div className="flex flex-wrap gap-4 mt-7 border border-[#EBEBEB] p-2.5 rounded-2xl">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleItem(tag, selectedTags, setSelectedTags)}
                className={`px-3 py-1.5  w-30 rounded-lg text-[14px] font-semibold border border-[#CCCCCC] transition ${
                  selectedTags.includes(tag)
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Folders Section */}
        <div className=" mt-8 mb-8">
          <p className="text-[16px] font-semibold">Folder</p>
          <div className="flex gap-4 mt-7 border border-[#EBEBEB] p-2.5 rounded-2xl">
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => toggleItem(folder, selectedFolders, setSelectedFolders)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold border border-[#CCCCCC] transition ${
                  selectedFolders.includes(folder)
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                {folder}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-7 text-[16px] font-semibold">
          <button
            onClick={handleApply}
            className="w-full py-3 rounded-lg text-white font-medium bg-[#4C4CFB]"
          >
            Apply
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg border border-[#EBEBEB]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
