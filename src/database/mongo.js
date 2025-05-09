const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://franciscofernandes10:8vw6zstZn0QCODZc@projeto-bd.nkv8tmf.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
    }

    module.exports = connectToDatabase;
   