import React from 'react';

const DisplayData = ({ data }) => {
  const parsedData = data.map((item) => {
    if (typeof item === 'string') {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
    return item;
  });

  return (
    <div className="container mx-auto px-4">
      {parsedData.map((item, index) => (
        <div key={index} className="my-4 p-4 bg-gray-200 rounded-md">
          {typeof item === 'string' ? (
            <p className="text-lg">{item}</p>
          ) : (
            Object.entries(item).map(([key, value]) => (
              <div key={key} className="my-2">
                <h2 className="text-xl font-semibold">{key}:</h2>
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside">
                    {value.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {typeof subItem === 'object' ? (
                          <div className="p-2 bg-gray-300 rounded-md">
                            {Object.entries(subItem).map(([subKey, subValue]) => (
                              <p key={subKey} className="my-1">
                                <span className="font-semibold">{subKey}:</span> {subValue}
                              </p>
                            ))}
                          </div>
                        ) : (
                          subItem
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{JSON.stringify(value, null, 2)}</p>
                )}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayData;
