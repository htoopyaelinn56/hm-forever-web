import {Client, Databases} from 'appwrite';

// TypeScript interface for ItemData
export interface ItemData {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

// Appwrite client setup
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID!); // Use env variable

const databases = new Databases(client);

export const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID!;
export const collectionId = process.env.REACT_APP_APPWRITE_COLLECTION_ID!;

// Function to fetch items from Appwrite database
export async function fetchItems(databaseId: string, collectionId: string): Promise<ItemData[]> {
    const response = await databases.listDocuments(databaseId, collectionId);
    // Map Appwrite documents to ItemData
    return response.documents.map((doc: any) => ({
        id: doc.$id,
        name: doc.name,
        price: doc.price,
        description: doc.description,
        image: doc.image,
    }));
}

// Function to fetch a single item by ID from Appwrite database
export async function getItem(databaseId: string, collectionId: string, itemId: string): Promise<ItemData> {
    const response = await databases.getDocument(databaseId, collectionId, itemId);
    return {
        id: response.$id,
        name: response.name,
        price: response.price,
        description: response.description,
        image: response.image,
    };
}
