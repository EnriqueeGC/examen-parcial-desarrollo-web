
const env = {
  database: 'bd_examen_parcial',
  username: 'bd_examen_parcial_user',
  password: 'JXqMZ7Iks0UdEtIij5Kgj9SSfNNDicfA',
  host: 'dpg-croq6hg8fa8c73dpverg-a.oregon-postgres.render.com',
  dialect: 'postgres',
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
};

module.exports = env;