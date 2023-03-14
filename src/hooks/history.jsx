import { useEffect, useState } from 'react'
import { database as db } from '../utils/firebase';
import { onValue, ref, get } from 'firebase/database';

const useFirebaseDataHistory = (path) => {
    const [result, setResult] = useState([])

    const getCleanData = (data) => {
        const cleanData = []
        for (let date in data) {
            const time = data[date];
            
            for ( let hour in time) {
                const record = {
                    date : `${date}`,
                    time : `${hour}` ,
                    temperatura : data[date][hour]['temperatura'],
                    batimento : data[date][hour]['batimento']
                }
                cleanData.push(record)
            }
        }

        return cleanData
    }

    useEffect(() => {
        const query = ref(db, path)
        get(query).then((snapshot) => {
            if (snapshot.exists()) {
                const value = snapshot.val() || '';
                setResult(getCleanData(value))
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
        })
    }, [])

    return result
}

export default useFirebaseDataHistory;