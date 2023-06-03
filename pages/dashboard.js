import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import {useAuthSession} from "@/hooks/useAuthSession.js";
import {supabase} from "@/lib/supabase.js";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const session = useAuthSession();



    useEffect(() => {

        // fetch data when component mounts
        // Create an async function inside the useEffect
        async function fetchData() {
            const { data, error } = await supabase.auth.getSession()
            console.log("HERE")
            console.log(data);
            console.log("HERE")

            try {
                const response = await axios.get('/api/zoomrecordings', {
                    headers: {
                        'Authorization': `Bearer ${data.session.access_token} ${data.session.provider_token}`
                    }
                });

                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        // Call the async function
        fetchData();
    }, []);


    return (
        <div className="flex flex-wrap justify-around p-10">
            {data.map((item, index) => (
                <Card key={index} data={item} />
            ))}
        </div>
    );
}
