// TypeScript interface for ItemData
export interface ItemData {
    id: string;
    name: string;
    displayName: string;
    price: number;
    description: string;
    image: string;
    imageList: string[];
}


const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT = process.env.REACT_APP_APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASE = process.env.REACT_APP_APPWRITE_DATABASE_ID!;
const APPWRITE_COLLECTION = process.env.REACT_APP_APPWRITE_COLLECTION_ID!;
const APPWRITE_KEY = process.env.REACT_APP_APPWRITE_KEY!;

// REST API: Fetch items
export async function fetchItems(): Promise<ItemData[]> {
    const url = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE}/collections/${APPWRITE_COLLECTION}/documents`;
    const res = await fetch(url, {
        headers: {
            'X-Appwrite-Project': APPWRITE_PROJECT,
            'X-Appwrite-Key': APPWRITE_KEY,
            'Content-Type': 'application/json',
        },
    });

    console.log("res = ", res);
    if (!res.ok) throw new Error('Failed to fetch items');
    const response = await res.json();
    return response.documents.map((doc: any) => ({
        id: doc.$id,
        name: doc.name,
        displayName: doc.displayName || doc.name,
        price: doc.price,
        description: doc.description,
        image: Array.isArray(doc.imageList) && doc.imageList.length > 0 ? doc.imageList[0] : '',
        imageList: doc.imageList || [],
    }));
}

// REST API: Fetch single item
export async function getItem(itemId: string): Promise<ItemData> {
    const url = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE}/collections/${APPWRITE_COLLECTION}/documents/${itemId}`;
    const res = await fetch(url, {
        headers: {
            'X-Appwrite-Project': APPWRITE_PROJECT,
            'X-Appwrite-Key': APPWRITE_KEY,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error('Failed to fetch item');
    const doc = await res.json();
    return {
        id: doc.$id,
        name: doc.name,
        displayName: doc.displayName || doc.name,
        price: doc.price,
        description: doc.description,
        image: Array.isArray(doc.imageList) && doc.imageList.length > 0 ? doc.imageList[0] : '',
        imageList: doc.imageList || [],
    };
}
