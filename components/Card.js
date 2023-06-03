export default function Card({ data }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{data.title}</div>
                <p className="text-gray-700 text-base">
                    {data.transcript}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Recording
                </button>
            </div>
        </div>
    );
}
