//ejemplo de conección en caso de usar mongoDB para así suplantar persistencia en archivos
import mongoose from 'mongoose'

const connectionString = /*Ingresar connection string con mongodbatlas*/ 'mongodb://localhost:27017/' 

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
    console.log(`ERROR => ${error}`);
}

export default mongoose