import React from 'react';

const ScopeDropdown = ({ scopeData, onSelectScope }) => {
    const handleScopeChange = (event) => {
        onSelectScope(event.target.value);
    };

    return (
        <div className="flex justify-center mb-10">
            <div>
                <label htmlFor="dropdown" className="block text-gray-700 text-sm font-bold mb-2">
                    Select document:
                </label>
                <select id="dropdown" className="block border rounded-md" onChange={handleScopeChange}>
                    {scopeData.map((item) => (
                        <option key={item.checklist_id} value={item.checklist_id}>
                            {item.checklist_item}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ScopeDropdown;
