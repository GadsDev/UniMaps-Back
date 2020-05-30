const conect = require('../mongoConnect');
const userSchema = require('../schemas/userSchema');

module.exports = {
    // Traz x dados do schema informado     
    read(query, skip = 0, limit = 10) {
        return userSchema.find(query).skip(skip).limit(limit);
    },
    create(item) {
        return userSchema.create(item);
    },
    update(id, item, upsert = false) {
        userSchema.findOneAndUpdate({_id: id}, item, {upsert: upsert, setDefaultsOnInsert: true});
    }
}