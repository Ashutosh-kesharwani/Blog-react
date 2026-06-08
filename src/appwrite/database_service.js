import config from '../config/config.js'

import {Client,ID,Databases,Storage,Query} from "appwrite";

export class DatabaseService{

    client =  new Client();
    databases; 
    storage; 


    constructor(){

        // client setup
        this.client
        .setEndPoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        // create db and storage
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);  
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(error){
            console.log(`Appwrite Service ::  createPost :: error ${error}`);
        }
    }

 
    async updatePost(slug,{title,content,featuredImage,status}){
        try{

            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )

        }catch(error){
            console.log(`Appwrite Service ::  updatePost :: error ${error}`);
        }
    }


    
    async deletePost(slug){
        try{
            
            await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectiontId,
            slug
            )
        }catch(error){
            console.log(`Appwrite Service ::  deletePost :: error ${error}`);
            return false;
        }

    }


    async getPost(){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug,
            )
        }catch(error){
            console.log(`Appwrite Service ::  getPost :: error ${error}`);
            return false; 
        }
    }

    
    async getAllPost(queries= [Query.equal("status","active")]){
       try {
            return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectiontId,
            queries,
            );
       } catch (error) {
            console.log(`Appwrite Service ::  getAllPost :: error ${error}`);
            return  false;
       }
    }

    // Storage Service
    async uploadFile(file){
        try{
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file, 
            );
        }catch(error){
            console.log(`Appwrite Service ::  uploadFile :: error ${error}`);
            return false; 
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true;

        } catch (error) {
            console.log(`Appwrite Service ::  Delete File :: error ${error}`);
            return false; 
        }
    }

    getFilePreview(fileId){
       return this.storage.getFilePreview(
            this.appwriteBucketId, 
            fileId,    
       )
    }
}



const databaseService = new DatabaseService();

export default databaseService;