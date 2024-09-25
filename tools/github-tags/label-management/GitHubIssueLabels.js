import React, { useState } from 'react';
import { X } from 'lucide-react';

const defaultColors = [
  '#B60205', '#D93F0B', '#FBCA04', '#0E8A16', '#006B75', '#1D76DB', '#0052CC', '#5319E7',
  '#E99695', '#F9D0C4', '#FEF2C0', '#C2E0C6', '#BFDADC', '#C5DEF5', '#BFD4F2', '#D4C5F9'
];

const LabelItem = ({ label, onEdit, onDelete }) => (
  <div className="flex items-center justify-between p-2 border-b">
    <div>
      <span className="px-2 py-1 text-sm font-medium rounded" style={{ backgroundColor: label.color, color: '#fff' }}>
        {label.name}
      </span>
      <span className="ml-2 text-sm text-gray-600">{label.description}</span>
    </div>
    <div>
      <button onClick={() => onEdit(label)} className="mr-2 text-sm text-gray-600 hover:text-gray-900">Edit</button>
      <button onClick={() => onDelete(label.name)} className="text-sm text-red-600 hover:text-red-800">Delete</button>
    </div>
  </div>
);

const ColorPicker = ({ color, onChange }) => (
  <div className="relative">
    <input
      type="text"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1 border rounded"
    />
    <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg p-1 flex flex-wrap w-32">
      {defaultColors.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className="w-6 h-6 m-1 rounded-full"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  </div>
);

const LabelForm = ({ label, onSubmit, onCancel }) => {
  const [name, setName] = useState(label?.name || '');
  const [description, setDescription] = useState(label?.description || '');
  const [color, setColor] = useState(label?.color || '#1D76DB');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, color });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg mb-4">
      <div className="mb-2">
        <div className="px-2 py-1 text-sm font-medium rounded inline-block" style={{ backgroundColor: color, color: '#fff' }}>
          {name || 'Label preview'}
        </div>
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Label name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <ColorPicker color={color} onChange={setColor} />
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="mr-2 px-3 py-1 text-gray-600 hover:text-gray-900">
          Cancel
        </button>
        <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
          {label ? 'Save changes' : 'Create label'}
        </button>
      </div>
    </form>
  );
};

const GitHubIssueLabels = () => {
  const [labels, setLabels] = useState([
    { name: 'bug', description: "Something isn't working", color: '#d73a4a' },
    { name: 'enhancement', description: 'New feature or request', color: '#a2eeef' },
    { name: 'question', description: 'Further information is requested', color: '#d876e3' },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingLabel, setEditingLabel] = useState(null);

  const addLabel = (newLabel) => {
    setLabels([...labels, newLabel]);
    setIsFormVisible(false);
  };

  const updateLabel = (updatedLabel) => {
    setLabels(labels.map(label => 
      label.name === editingLabel.name ? updatedLabel : label
    ));
    setEditingLabel(null);
  };

  const deleteLabel = (name) => {
    setLabels(labels.filter(label => label.name !== name));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Labels</h2>
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          New label
        </button>
      </div>

      {isFormVisible && (
        <LabelForm
          onSubmit={addLabel}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      {editingLabel && (
        <LabelForm
          label={editingLabel}
          onSubmit={updateLabel}
          onCancel={() => setEditingLabel(null)}
        />
      )}

      <div className="bg-white rounded-lg shadow">
        {labels.map(label => (
          <LabelItem
            key={label.name}
            label={label}
            onEdit={() => setEditingLabel(label)}
            onDelete={deleteLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default GitHubIssueLabels;