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

// Retrieve parent document and its subcollection
export const retrieveDataById = async (collectionName, docId, subcollectionName = 'other') => {
    const documentRef = doc(firestore, collectionName, docId);
    const snapshot = await getDoc(documentRef);

    if (!snapshot.exists()) {
        throw new Error("Document not found");
    }

    // Get subcollection documents
    const subcollectionDocs = await getSubcollectionDocs(collectionName, docId, subcollectionName);

    return {
        id: snapshot.id,
        ...snapshot.data(),
        [subcollectionName]: subcollectionDocs,
    };
};

// Helper to fetch all documents from a subcollection
const getSubcollectionDocs = async (parentCollection, parentId, subcollectionName) => {
    const subcollectionRef = collection(firestore, `${parentCollection}/${parentId}/${subcollectionName}`);
    const subcollectionSnapshot = await getDocs(subcollectionRef);

    return subcollectionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
