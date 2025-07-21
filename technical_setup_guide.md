# Technical Setup Guide

This document outlines the technical steps required to set up to run the web application, primarily focusing on replicating the Appwrite database structure.

## 1. Environment Variables (.env)
REACT_APP_APPWRITE_PROJECT_ID=YOUR_APPWRITE_PROJECT_ID<br>
REACT_APP_APPWRITE_DATABASE_ID=YOUR_APPWRITE_DATABASE_ID<br>
REACT_APP_APPWRITE_COLLECTION_ID=YOUR_APPWRITE_COLLECTION_ID<br>
REACT_APP_APPWRITE_KEY=YOUR_APPWRITE_API_KEY

Before running the application, you'll need to create a `.env` file in the root directory of your project. This file will store your Appwrite project credentials securely.

**Important:** Never commit your actual keys directly into your repository. Use placeholder values in your `.env.example` (if you have one) and ensure `.env` is listed in your `.gitignore` file.

Create a file named `.env` and add the following variables. **Replace the placeholder values with your actual Appwrite credentials.**

## 2. Appwrite Database Structure Replication

The application interacts with an Appwrite backend to manage product data. You'll need to set up your Appwrite instance with a specific database and collection structure to match what the frontend expects.

### Appwrite Project Details:

* **Appwrite Endpoint:** `https://cloud.appwrite.io/v1` (This is the default cloud endpoint.)
* **Project ID:** `YOUR_APPWRITE_PROJECT_ID` (This corresponds to `REACT_APP_APPWRITE_PROJECT_ID`)

### Database and Collection Setup:

You need to create one database and one collection within your Appwrite project.

1.  **Database:**
    * **Name:** (You can choose any name, e.g., `H&M_Cosmetics_DB`)
    * **ID:** `YOUR_APPWRITE_DATABASE_ID` (This corresponds to `REACT_APP_APPWRITE_DATABASE_ID`)

2.  **Collection (within the above Database):**
    * **Name:** (You can choose any name, e.g., `Products`)
    * **ID:** `YOUR_APPWRITE_COLLECTION_ID` (This corresponds to `REACT_APP_APPWRITE_COLLECTION_ID`)

### Collection Attributes (Fields):

Once you've created the collection, you need to define the following attributes (fields) for it. These attributes directly map to the `ItemData` interface used in the application's frontend.

| Attribute Name | Type    | Required | Array | Default Value | Notes                                   |
| :------------- | :------ | :------- | :---- | :------------ | :-------------------------------------- |
| `name`         | String  | Yes      | No    | None          | Product name                            |
| `price`        | Float   | Yes      | No    | None          | Product price (e.g., `19.99`)           |
| `description`  | String  | Yes      | No    | None          | Detailed product description            |
| `image`        | String  | Yes      | No    | None          | URL to the product image (e.g., `https://example.com/image.jpg`) |

**Note on `id`:** The `id` property in the `ItemData` interface (`doc.$id`) refers to Appwrite's automatically generated document ID (`$id`). You do **not** need to create a separate attribute named `id` in your collection.


## 3. API Key Permissions

Ensure that the Appwrite API Key (`REACT_APP_APPWRITE_KEY`) you are using has the necessary permissions to perform **read** operations on documents within the `Products` collection (or whatever you named your collection). Specifically, it will need permissions for:

* `databases.documents.read`
