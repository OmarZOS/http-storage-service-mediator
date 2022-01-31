const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
    const hashedPass = await bcrypt.hash('secret', 5);
    // Deletes ALL existing entries
    await knex('USER').insert({
        NOM_USER: 'Nobody',
        PRENOM_USER: 'Knows',
        PASSWORD: hashedPass,
        EMAIL: 'nemo@outis.com',
        TYPE: 'Admin'
    });
};