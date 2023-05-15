import React from 'react';

const AnalysisDisplay = ({ analysis }) => {
    const sections = [
        { title: 'Product Knowledge Analysis', content: analysis.product_knowledge_analysis },
        { title: 'Tailoring Analysis', content: analysis.tailoring_analysis },
        { title: 'Product Positioning Analysis', content: analysis.product_positioning_analysis },
        { title: 'MEDDIC Analysis', content: analysis.meddic_analysis },
        { title: 'Additional Analysis', content: analysis.additional_analysis },
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Analysis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalysisDisplay;
