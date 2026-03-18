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

  const toggleItem = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

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
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-center font-semibold text-lg mb-6">
          Search Filter
        </h2>

        {/* TAGS */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  toggleItem(tag, selectedTags, setSelectedTags)
                }
                className={`px-3 py-1.5 rounded-lg text-sm border transition
                  ${
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

        {/* FOLDERS */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">Folder</p>
          <div className="flex flex-wrap gap-2">
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() =>
                  toggleItem(folder, selectedFolders, setSelectedFolders)
                }
                className={`px-3 py-1.5 rounded-lg text-sm border transition
                  ${
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

        {/* ACTIONS */}
        <div className="space-y-3">
          <button
            onClick={handleApply}
            className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-500"
          >
            Apply
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg border text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;