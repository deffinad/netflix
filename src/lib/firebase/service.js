import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import app from './firebase'

const firestore = getFirestore(app)

export const retrieveHome = async () => {
    const snapshot = await getDocs(collection(firestore, 'movie'))

    const data = {
        home: {},
        popular: [],
        new: [],
        trending: []
    }
    snapshot.docs.map(item => {
        let category = item.data().category
        if (category === 'Home') {
            data['home'] = {
                id: item.id,
                ...item.data()
            }
        } else if (category === 'Populer') {
            data['popular'].push({
                id: item.id,
                ...item.data()
            })
        } else if (category === 'New') {
            data['new'].push({
                id: item.id,
                ...item.data()
            })
        } else if (category === 'Trending') {
            data['trending'].push({
                id: item.id,
                ...item.data()
            })
        }
    })

    return data
}

export const retrieveDataById = async (collectionName, id) => {
    const snapshot = await getDoc(doc(firestore, collectionName, id))
    const data = {
        id: snapshot.id,
        ...snapshot.data()
    }

    return data
}