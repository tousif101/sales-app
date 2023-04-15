import React from 'react';

const JsonDataDisplay = ({ data }) => {
  const {
    closing_techniques_instances,
    highlights,
    improvements,
    rapport_building_instances,
    summary,
    call_structure_components,
  } = data;

  const renderList = (title, items) => (
    <div className="mb-4">
      <strong>{title}: </strong>
      <ul className="list-disc list-inside ml-4">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

  const handleUploadToCrm = async () => {
    // Here you would write the code to upload the JSON data to your CRM
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>

      <div className="mb-4">
        <strong>Summary: </strong>
        {summary}
      </div>

      {renderList("Closing Techniques Instances", closing_techniques_instances)}
      {renderList("Highlights", highlights)}
      {renderList("Improvements", improvements)}
      {renderList("Call Structure Components", call_structure_components)}
      {renderList("Rapport Building Instances", rapport_building_instances)}

      <div className="mt-6 flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleUploadToCrm}
                >
                  Upload to CRM
                </button>
              </div>
    </div>
  );
};

export default JsonDataDisplay;
